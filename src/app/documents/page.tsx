'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}

const REQUIRED_DOCUMENTS = [
  { type: 'tax_return_2024', label: 'Business Tax Return (2024)', required: true, description: 'Required for approval' },
  { type: 'tax_return_2023', label: 'Business Tax Return (2023)', required: true, description: 'Required for approval' },
  { type: 'bank_statements', label: 'Bank Statements (Last 3 months)', required: true, description: 'Required for approval' },
  { type: 'business_license', label: 'Business License', required: true, description: 'Required for approval' },
  { type: 'profit_loss', label: 'Profit & Loss Statement (2025)', required: true, description: 'Required for approval' },
  { type: 'debt_schedule', label: 'Business Debt Schedule', required: false, description: 'Required for SBA loans' },
  { type: 'personal_financial', label: 'Personal Financial Statement', required: false, description: 'Optional • Improves approval odds' },
];

export default function Documents() {
  const { user } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadDocuments();
  }, [user, router]);

  const loadDocuments = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (documentType: string) => {
    if (!user?.id) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(documentType);

      try {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save to database
        const { error: dbError } = await supabase
          .from('documents')
          .insert({
            user_id: user.id,
            document_type: documentType,
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
          });

        if (dbError) throw dbError;

        // Reload documents
        await loadDocuments();
      } catch (error) {
        console.error('Error uploading document:', error);
        alert('Failed to upload document. Please try again.');
      } finally {
        setUploading(null);
      }
    };

    input.click();
  };

  const handleView = async (doc: Document) => {
    try {
      const { data } = await supabase.storage
        .from('documents')
        .createSignedUrl(doc.file_path, 3600); // 1 hour expiry

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      alert('Failed to open document.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center text-neutral-400">Loading documents...</div>
      </div>
    );
  }

  const uploadedCount = documents.length;
  const requiredCount = REQUIRED_DOCUMENTS.filter(d => d.required).length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">Document Center</h1>
      <p className="text-neutral-400 mb-8">Upload and manage your funding documents</p>

      <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 mb-8">
        <h3 className="text-yellow-400 font-semibold mb-2">
          📄 {uploadedCount} of {REQUIRED_DOCUMENTS.length} documents uploaded
        </h3>
        <p className="text-neutral-300 text-sm">
          Complete your document checklist to unlock premium lender matches and expedite approval.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {REQUIRED_DOCUMENTS.map((docType) => {
          const uploaded = documents.find(d => d.document_type === docType.type);
          
          return uploaded ? (
            <div key={docType.type} className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500 text-black rounded-lg flex items-center justify-center text-xl">✓</div>
                <div>
                  <div className="font-semibold text-white">{docType.label}</div>
                  <div className="text-sm text-neutral-300">
                    Uploaded {new Date(uploaded.uploaded_at).toLocaleDateString()} • {uploaded.file_name}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleView(uploaded)}
                className="text-neutral-400 hover:text-white transition"
              >
                View
              </button>
            </div>
          ) : (
            <div key={docType.type} className="bg-neutral-900 border border-neutral-700 border-dashed rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">📄</div>
                <div>
                  <div className="font-semibold text-white">{docType.label}</div>
                  <div className="text-sm text-neutral-400">{docType.description} • Not yet uploaded</div>
                </div>
              </div>
              <button 
                onClick={() => handleUpload(docType.type)}
                disabled={uploading === docType.type}
                className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-600 transition disabled:opacity-50"
              >
                {uploading === docType.type ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Document Security</h3>
        <p className="text-neutral-300 text-sm">
          All documents are encrypted at rest and in transit using 256-bit SSL. Your files are stored 
          in SOC 2 compliant infrastructure and are never shared without your explicit permission.
        </p>
      </div>
    </div>
  );
}

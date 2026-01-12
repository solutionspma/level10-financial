'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Create mailto link and open in new window
      const mailtoLink = `mailto:solutions@pitchmarketing.agency?subject=${encodeURIComponent(`Level10 Contact: ${formData.subject}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-neutral-400">
          Have questions about Level10 Financial? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          {status === 'success' && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 rounded-lg p-4 mb-6 text-sm">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-900/20 border border-red-900 text-red-400 rounded-lg p-4 mb-6 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="John Doe"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="you@example.com"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
                placeholder="How can we help?"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition resize-none"
                placeholder="Tell us what's on your mind..."
                rows={6}
                required
                disabled={status === 'sending'}
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4 text-neutral-300">
              <div>
                <div className="text-sm text-neutral-500 mb-1">Business Hours</div>
                <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                <div className="text-sm text-neutral-500">We respond within 24 hours</div>
              </div>
              
              <div>
                <div className="text-sm text-neutral-500 mb-1">Response Time</div>
                <div>Most inquiries are answered within 24 hours</div>
                <div className="text-sm text-neutral-500">Urgent matters may take priority</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-3">💬 Need Quick Answers?</h3>
            <p className="text-sm text-neutral-300 mb-4">
              Check out our FAQ section or chat with our AI assistant for instant help with common questions.
            </p>
            <button 
              onClick={() => {
                const chatButton = document.querySelector('[data-chat-widget-button]') as HTMLButtonElement;
                if (chatButton) chatButton.click();
              }}
              className="w-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium py-2 rounded-lg hover:bg-green-500/20 transition"
            >
              Chat with AI Assistant
            </button>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">🔒 Security Notice</h3>
            <p className="text-sm text-neutral-400">
              Never share sensitive information like passwords, social security numbers, or account credentials via email or contact forms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

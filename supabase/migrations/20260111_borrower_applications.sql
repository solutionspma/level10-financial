-- Create borrower applications table for lender matching
CREATE TABLE public.borrower_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  business_name TEXT,
  industry TEXT,
  revenue DECIMAL(12,2),
  time_in_business INTEGER, -- months
  bankability_score DECIMAL(3,1),
  credit_score INTEGER,
  funding_requested DECIMAL(12,2),
  funding_purpose TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_review', 'funded', 'declined')),
  lender_notes TEXT,
  contacted_by UUID REFERENCES public.users(id),
  contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_borrower_applications_user_id ON public.borrower_applications(user_id);
CREATE INDEX idx_borrower_applications_status ON public.borrower_applications(status);
CREATE INDEX idx_borrower_applications_bankability ON public.borrower_applications(bankability_score);

-- Add RLS policies
ALTER TABLE public.borrower_applications ENABLE ROW LEVEL SECURITY;

-- Lenders can see all applications
CREATE POLICY "Lenders can view all applications"
ON public.borrower_applications FOR SELECT
TO public
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = 'lender'
  AND users.lender_status = 'active'
));

-- Lenders can update application status and notes
CREATE POLICY "Lenders can update applications"
ON public.borrower_applications FOR UPDATE
TO public
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = 'lender'
  AND users.lender_status = 'active'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = 'lender'
  AND users.lender_status = 'active'
));

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
ON public.borrower_applications FOR SELECT
TO public
USING (user_id = auth.uid());

-- Add updated_at trigger
CREATE TRIGGER update_borrower_applications_updated_at
  BEFORE UPDATE ON public.borrower_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Level10 Financial Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'public' CHECK (role IN ('public', 'lender', 'admin')),
  
  -- KYC fields
  kyc_status TEXT DEFAULT 'none' CHECK (kyc_status IN ('none', 'pending', 'verified')),
  ssn_last_4 TEXT,
  date_of_birth DATE,
  drivers_license TEXT,
  license_state TEXT,
  kyc_verified_date TIMESTAMPTZ,
  
  -- Payment/Subscription fields
  subscription_status TEXT DEFAULT 'none' CHECK (subscription_status IN ('none', 'active', 'cancelled', 'past_due')),
  subscription_plan TEXT,
  subscription_amount DECIMAL(10,2),
  next_billing_date TIMESTAMPTZ,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  last_payment_date TIMESTAMPTZ,
  
  -- Business fields
  business_name TEXT,
  ein TEXT,
  industry TEXT,
  
  -- Lender-specific fields
  organization_name TEXT,
  lender_type TEXT CHECK (lender_type IN ('bank', 'cdfi', 'fintech', 'private')),
  states_served TEXT[],
  products_offered TEXT[],
  agreement_accepted BOOLEAN DEFAULT FALSE,
  lender_status TEXT CHECK (lender_status IN ('pending', 'active', 'suspended', 'pending_admin_review', 'rejected')),
  
  -- Auth fields
  email_verified BOOLEAN DEFAULT FALSE,
  has_authorized_credit BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table (transaction history)
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'refunded')),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit reports table
CREATE TABLE public.credit_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  report_data JSONB NOT NULL,
  bankability_score INTEGER,
  pulled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_stripe_customer ON public.users(stripe_customer_id);
CREATE INDEX idx_users_subscription_status ON public.users(subscription_status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_credit_reports_user_id ON public.credit_reports(user_id);
CREATE INDEX idx_documents_user_id ON public.documents(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert new user"
  ON public.users
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for payments table
CREATE POLICY "Users can view their own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for credit_reports table
CREATE POLICY "Users can view their own credit reports"
  ON public.credit_reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for documents table
CREATE POLICY "Users can view their own documents"
  ON public.documents
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON public.documents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

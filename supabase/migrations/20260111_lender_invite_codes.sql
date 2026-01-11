-- Create lender invite codes table
CREATE TABLE IF NOT EXISTS lender_invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  notes TEXT
);

-- Create invite code requests table
CREATE TABLE IF NOT EXISTS lender_invite_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  invite_code_sent UUID REFERENCES lender_invite_codes(id)
);

-- Track which user used which invite code
CREATE TABLE IF NOT EXISTS lender_invite_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code_id UUID REFERENCES lender_invite_codes(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add invite_code_used column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS invite_code_used TEXT;

-- Insert some initial invite codes for testing
INSERT INTO lender_invite_codes (code, max_uses, notes, is_active) VALUES
  ('LENDER2026', 100, 'Initial launch code', true),
  ('FOUNDING', 25, 'Founding lender exclusive', true),
  ('PARTNER50', 50, 'Partner network code', true)
ON CONFLICT (code) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_invite_codes_code ON lender_invite_codes(code);
CREATE INDEX IF NOT EXISTS idx_invite_requests_email ON lender_invite_requests(email);
CREATE INDEX IF NOT EXISTS idx_invite_requests_status ON lender_invite_requests(status);

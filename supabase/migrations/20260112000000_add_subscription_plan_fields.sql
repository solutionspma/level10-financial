-- Add subscription plan and setup fee tracking to users table
-- Migration: Add subscription_plan and setup_fee_paid columns

-- Add subscription_plan column (replaces old string-based subscription_plan)
-- Values: 'none', 'core', 'pro'
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(10) DEFAULT 'none' CHECK (subscription_plan IN ('none', 'core', 'pro'));

-- Add setup_fee_paid column for Pro plan one-time setup fee tracking
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS setup_fee_paid BOOLEAN DEFAULT false;

-- Update existing users with 'active' status to 'core' plan as default
UPDATE users 
SET subscription_plan = 'core' 
WHERE subscription_status = 'active' AND (subscription_plan IS NULL OR subscription_plan = 'none');

-- Create index for faster plan lookups
CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan);

-- Add comment for documentation
COMMENT ON COLUMN users.subscription_plan IS 'User subscription tier: none (no subscription), core ($10/mo), or pro ($29/mo + $25 setup)';
COMMENT ON COLUMN users.setup_fee_paid IS 'Whether user has paid the one-time $25 Pro setup fee';

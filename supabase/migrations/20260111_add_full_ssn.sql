-- Add full SSN field for MicroBilt integration
-- This field is encrypted and should only be used for credit bureau API calls

ALTER TABLE public.users 
ADD COLUMN ssn_full TEXT;

COMMENT ON COLUMN public.users.ssn_full IS 'Full SSN encrypted for MicroBilt credit bureau integration';

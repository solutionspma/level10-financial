-- Add INSERT policy for credit_reports table so users can save their own credit scores
CREATE POLICY "Users can insert their own credit reports"
  ON public.credit_reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

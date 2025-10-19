-- Create a secure function to handle case acceptance
CREATE OR REPLACE FUNCTION public.accept_case_request(
  _request_id uuid,
  _case_id uuid,
  _lawyer_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result jsonb;
BEGIN
  -- Verify the request belongs to the lawyer
  IF NOT EXISTS (
    SELECT 1 FROM case_requests 
    WHERE id = _request_id 
    AND lawyer_id = _lawyer_id 
    AND status = 'pending'
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid request');
  END IF;

  -- Update the case with the assigned lawyer
  UPDATE cases 
  SET assigned_lawyer_id = _lawyer_id
  WHERE id = _case_id;

  -- Reject all other pending requests for this case
  UPDATE case_requests
  SET status = 'rejected'
  WHERE case_id = _case_id 
  AND id != _request_id
  AND status = 'pending';

  -- Accept this request
  UPDATE case_requests
  SET status = 'accepted'
  WHERE id = _request_id;

  RETURN jsonb_build_object('success', true);
END;
$$;
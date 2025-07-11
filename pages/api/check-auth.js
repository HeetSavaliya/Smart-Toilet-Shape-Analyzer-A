import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const cookie = req.headers.cookie || '';
  const token = cookie.split('supabase_token=')[1]?.split(';')[0];
  const { error } = await supabase.auth.api.getUser(token);

  if (error) return res.status(401).end();

  res.status(200).end();
}

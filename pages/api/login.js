import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUserToken({
    email,
    password,
    type: 'service_role'
  });

  if (error) return res.status(401).json({ error: error.message });

  res.setHeader('Set-Cookie', `supabase_token=${data.access_token}; HttpOnly; Path=/`);
  res.status(200).json({ success: true });
}

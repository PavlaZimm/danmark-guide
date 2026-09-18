import type { SupabaseClient } from '@supabase/supabase-js';

export type AdminAccess = 'signed-out' | 'denied' | 'mfa' | 'allowed';

// The database independently enforces admin role + AAL2. This check controls UI only.
export async function getAdminAccess(client: SupabaseClient): Promise<AdminAccess> {
  const { data: { user }, error: userError } = await client.auth.getUser();
  if (userError || !user) return 'signed-out';
  const { data: profile, error: profileError } = await client
    .from('profiles').select('role').eq('id', user.id).single();
  if (profileError) throw profileError;
  if (profile?.role !== 'admin') return 'denied';
  const { data, error } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) throw error;
  return data?.currentLevel === 'aal2' ? 'allowed' : 'mfa';
}

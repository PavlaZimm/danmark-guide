import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getAdminAccess, type AdminAccess } from '@/lib/admin-access';
import { Button } from '@/components/ui/button';
import AdminMfa from './AdminMfa';

interface ProtectedRouteProps { children: React.ReactNode }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [access, setAccess] = useState<AdminAccess | 'checking' | 'error'>('checking');
  const [revision, setRevision] = useState(0);
  const sessionUser = useRef<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Do not call asynchronous auth methods inside this callback (auth lock).
      const id = session?.user.id ?? null;
      if (id !== sessionUser.current || event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') setAccess('checking');
      sessionUser.current = id;
      setRevision(value => value + 1);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    getAdminAccess(supabase).then(result => {
      if (active) setAccess(result);
    }).catch(() => {
      if (active) setAccess('error');
    });
    return () => { active = false; };
  }, [revision]);

  if (access === 'checking') return (
    <div className="flex min-h-screen items-center justify-center" role="status">
      <p>Ověřuji přístup…</p>
    </div>
  );
  if (access === 'error') return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <p role="alert">Přístup se nepodařilo ověřit. Zkontrolujte připojení a zkuste to znovu.</p>
      <Button onClick={() => { setAccess('checking'); setRevision(value => value + 1); }}>Zkusit znovu</Button>
    </div>
  );
  if (access === 'signed-out' || access === 'denied') return <Navigate to="/tajnedvere" replace />;
  if (access === 'mfa') return <AdminMfa onVerified={() => {
    setAccess('checking');
    setRevision(value => value + 1);
  }} />;
  return <>{children}</>;
};
export default ProtectedRoute;

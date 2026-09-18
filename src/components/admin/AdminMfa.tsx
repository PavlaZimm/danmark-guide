import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Factor = { id: string; friendly_name?: string };
type Enrollment = { id: string; qr: string; secret: string };

export default function AdminMfa({ onVerified }: { onVerified: () => void }) {
  const [factors, setFactors] = useState<Factor[]>([]);
  const [factorId, setFactorId] = useState('');
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [loadFailed, setLoadFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const inFlight = useRef(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadFailed(false);
    supabase.auth.mfa.listFactors().then(({ data, error: failure }) => {
      if (!active) return;
      if (failure) {
        setLoadFailed(true);
        setError('Ověřovací aplikace se nepodařilo načíst. Zkuste to znovu.');
      } else {
        const verified = data.totp.filter(factor => factor.status === 'verified');
        setFactors(verified);
        setFactorId(verified[0]?.id ?? '');
        setError('');
      }
    }).catch(() => {
      if (active) { setLoadFailed(true); setError('Nepodařilo se spojit s přihlašovací službou.'); }
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [revision]);

  const enroll = async () => {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError('');
    try {
      // User-initiated only. Never delete another tab's pending or verified factors.
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp', issuer: 'Kastrup.cz',
        friendlyName: `Ověřovací aplikace ${crypto.randomUUID().slice(0, 8)}`,
      });
      if (error) throw error;
      const qr = data.totp.qr_code.startsWith('data:')
        ? data.totp.qr_code : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data.totp.qr_code)}`;
      setEnrollment({ id: data.id, qr, secret: data.totp.secret });
      setFactorId(data.id);
    } catch {
      setError('Nastavení se nepodařilo zahájit. Zkuste to znovu. Pokud chyba trvá, obraťte se na správce projektu.');
    } finally { inFlight.current = false; setBusy(false); }
  };

  const verify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current || !/^\d{6}$/.test(code) || !factorId) return;
    inFlight.current = true; setBusy(true); setError('');
    try {
      const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
      if (error) throw error;
      setCode(''); setEnrollment(null);
      onVerified();
    } catch {
      setCode('');
      setError('Kód se nepodařilo ověřit. Zadejte aktuální kód z vybrané aplikace. Při opakovaných pokusech chvíli počkejte.');
    } finally { inFlight.current = false; setBusy(false); }
  };

  const logout = async () => {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError('');
    try {
      // A pending factor created in this screen can safely be cancelled.
      if (enrollment) await supabase.auth.mfa.unenroll({ factorId: enrollment.id });
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw error;
      setEnrollment(null); setCode('');
      window.location.replace('/tajnedvere');
    } catch { setError('Odhlášení se nepodařilo. Zkuste to znovu.'); }
    finally { inFlight.current = false; setBusy(false); }
  };

  return (
    <>
      <Helmet><title>Dvoufaktorové ověření | Kastrup.cz</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
        <section className="w-full max-w-md space-y-5 rounded-2xl border bg-card p-6 shadow-lg sm:p-8">
          <h1 className="text-2xl font-bold">Dvoufaktorové ověření</h1>
          {loading ? <p role="status">Načítám ověření…</p> : loadFailed ? (
            <Button onClick={() => setRevision(value => value + 1)}>Zkusit znovu</Button>
          ) : !factors.length && !enrollment ? (
            <>
              <p>Pro vstup do administrace si nastavte ověřovací aplikaci, například Google Authenticator, Microsoft Authenticator nebo 1Password.</p>
              <p className="text-sm text-muted-foreground">V dalším kroku naskenujete QR kód a zadáte první šestimístný kód. Přístup se otevře až po jeho ověření.</p>
              <Button className="w-full" onClick={enroll} disabled={busy}>{busy ? 'Připravuji…' : 'Nastavit ověřovací aplikaci'}</Button>
            </>
          ) : (
            <form onSubmit={verify} className="space-y-5">
              {enrollment ? (
                <>
                  <p>Naskenujte QR kód ve své ověřovací aplikaci.</p>
                  <img src={enrollment.qr} alt="QR kód pro přidání účtu Kastrup.cz do ověřovací aplikace" className="mx-auto h-56 w-56 rounded bg-white p-3" />
                  <details className="text-sm"><summary className="cursor-pointer">Nemůžete naskenovat QR kód?</summary><p className="mt-2">Zadejte tento klíč ručně jako časový jednorázový kód:</p><code className="mt-2 block break-all rounded bg-muted p-3 select-all">{enrollment.secret}</code></details>
                  <p className="text-sm text-muted-foreground">Před potvrzením si zajistěte zálohu v ověřovací aplikaci nebo klíč uložte do bezpečného správce hesel. QR kód ani klíč nikomu neposílejte.</p>
                </>
              ) : <p>Zadejte aktuální šestimístný kód z ověřovací aplikace.</p>}
              {factors.length > 1 && <div><Label htmlFor="mfa-factor">Ověřovací aplikace</Label><select id="mfa-factor" className="mt-2 w-full rounded border bg-background p-2" value={factorId} disabled={busy} onChange={event => { setFactorId(event.target.value); setCode(''); }}>{factors.map(factor => <option key={factor.id} value={factor.id}>{factor.friendly_name || 'Ověřovací aplikace'}</option>)}</select></div>}
              <div><Label htmlFor="mfa-code">Šestimístný kód</Label><Input id="mfa-code" className="mt-2 text-center text-xl tracking-widest" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} disabled={busy} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} required autoFocus /></div>
              <Button type="submit" className="w-full" disabled={busy || code.length !== 6}>{busy ? 'Ověřuji…' : enrollment ? 'Potvrdit nastavení a pokračovat' : 'Ověřit a pokračovat'}</Button>
            </form>
          )}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <details className="text-sm text-muted-foreground"><summary className="cursor-pointer">Nemáte přístup k ověřovací aplikaci?</summary><p className="mt-2">Obnovte aplikaci ze své zálohy. Pokud zálohu nemáte, musí přístup obnovit vlastník projektu přes správu Supabase po ověření vaší totožnosti. Obnovení hesla druhý faktor nevypne.</p></details>
          <Button variant="outline" className="w-full" onClick={logout} disabled={busy}>Odhlásit se</Button>
        </section>
      </main>
    </>
  );
}

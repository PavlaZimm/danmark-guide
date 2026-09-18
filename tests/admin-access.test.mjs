import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const js = ts.transpileModule(readFileSync(new URL('../src/lib/admin-access.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { getAdminAccess } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
function client({ user = { id: 'user' }, role = 'admin', level = 'aal1', userError = null, profileError = null, mfaError = null } = {}) {
  return {
    auth: { getUser: async () => ({ data: { user }, error: userError }), mfa: { getAuthenticatorAssuranceLevel: async () => ({ data: { currentLevel: level }, error: mfaError }) } },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { role }, error: profileError }) }) }) }),
  };
}
test('anonymous and expired sessions never enter administration', async () => {
  assert.equal(await getAdminAccess(client({ user: null })), 'signed-out');
  assert.equal(await getAdminAccess(client({ userError: new Error('expired') })), 'signed-out');
});
test('MFA alone does not grant the admin role', async () => {
  assert.equal(await getAdminAccess(client({ role: 'user', level: 'aal2' })), 'denied');
});
test('password login, recovery and missing AAL must complete MFA', async () => {
  for (const level of ['aal1', null, undefined, 'unexpected']) {
    assert.equal(await getAdminAccess(client({ level })), 'mfa');
  }
});
test('only an admin with AAL2 enters', async () => {
  assert.equal(await getAdminAccess(client({ level: 'aal2' })), 'allowed');
});
test('profile and MFA lookup failures fail closed', async () => {
  await assert.rejects(getAdminAccess(client({ profileError: new Error('offline') })));
  await assert.rejects(getAdminAccess(client({ mfaError: new Error('offline') })));
});

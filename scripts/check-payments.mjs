import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
function load(path, imports) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports, require: name => imports[name], process });
  return exports;
}
const json = (body, options = {}) => ({ body, status: options.status || 200 });
const next = { NextResponse: { json } };
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_fixture';
let event = { id: 'evt_fixture', type: 'checkout.session.completed', data: { object: { id: 'cs_fixture' } } };
let session = { id: 'cs_fixture', metadata: { source: 'smg_store' }, payment_status: 'unpaid' };
let writes = 0;
const stripe = { webhooks: { constructEvent: (_body, signature) => { if (signature !== 'valid') throw Error('bad'); return event; } }, checkout: { sessions: {
  retrieve: async () => session,
  update: async (_id, data) => { writes++; Object.assign(session.metadata, data.metadata); },
} } };
const webhook = load('src/app/api/stripe/webhook/route.ts', { 'next/server': next, '@/lib/stripe-store': { stripeStore: () => stripe } }).POST;
const request = signature => ({ text: async () => '{}', headers: { get: () => signature } });
assert.equal((await webhook(request('bad'))).status, 400);
assert.equal(writes, 0);
await webhook(request('valid')); assert.equal(writes, 0); // completed but delayed payment
session.payment_status = 'paid'; event.type = 'checkout.session.async_payment_succeeded';
await webhook(request('valid')); assert.equal(writes, 1); assert.equal(session.metadata.fulfillment_status, 'pending_manual_review');
await webhook(request('valid')); assert.equal(writes, 1); // duplicate delivery
session.payment_status = 'unpaid'; event.type = 'checkout.session.async_payment_failed';
await webhook(request('valid')); assert.equal(writes, 1); // stale failure cannot downgrade verified payment
session = { id: 'cs_fixture', metadata: { source: 'smg_store' }, payment_status: 'unpaid' };
await webhook(request('valid')); assert.equal(session.metadata.fulfillment_status, 'payment_failed');
session = { id: 'cs_other', metadata: { source: 'another_store' }, payment_status: 'paid' };
await webhook(request('valid')); assert.equal(writes, 2);
stripe.checkout.sessions.retrieve = async () => { throw Error('temporary outage'); };
assert.equal((await webhook(request('valid'))).status, 500); // Stripe must retry
console.log('Verified signature rejection, pending payments, successful delayed payments, duplicate events, stale failures, unrelated sessions and retryable API failures.');

import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
function load(path,imports={}) {
  const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const exports={};
  vm.runInNewContext(code,{exports,require:name=>imports[name]||require(name),process,Intl},{filename:path});
  return exports;
}
const catalog=load('src/lib/store-products.ts');
const {storeProducts:products}=catalog;
const {storeCategories:categories}=load('src/lib/store-categories.ts');
assert.equal(categories.length,8);
for(const c of categories){assert.ok(products.some(p=>p.category===c.name));assert.ok(fs.existsSync('public'+c.image));}
for(const p of products)assert.ok(categories.some(c=>c.name===p.category),p.sku);
const {checkoutItems,stripeStore}=load('src/lib/stripe-store.ts',{'@/lib/store-products':catalog});
assert.equal(products.length,29);
assert.equal(new Set(products.map(p=>p.sku)).size,29);
assert.equal(new Set(products.map(p=>p.slug)).size,29);
for(const p of products) {
  assert.ok(Number.isSafeInteger(p.unitsPerCase)&&p.unitsPerCase>0);
  assert.ok(Number.isSafeInteger(p.minCases)&&p.minCases>0);
  assert.ok(p.price>0);
  if(p.image.startsWith('/'))assert.ok(fs.existsSync('public'+p.image),p.sku);
  assert.ok(!['CRSCT15-V-BC','CRSCT50-V-BC','CRLT-50-I-S'].includes(p.supplierSku));
  if(p.quoteOnly){assert.throws(()=>checkoutItems({[p.sku]:p.minCases}),/confirm packaging/);continue;}
  const item=checkoutItems({[p.sku]:p.minCases})[0];
  assert.equal(item.quantity,p.minCases);
  assert.equal(item.price_data.unit_amount,Math.round(p.price*100));
  assert.equal(item.price_data.product_data.metadata.sku,p.sku);
  assert.throws(()=>checkoutItems({[p.sku]:p.minCases-1}),/whole/);
  assert.throws(()=>checkoutItems({[p.sku]:p.minCases+.5}),/whole/);
}
assert.equal(products.find(p=>p.supplierSku==='CRFT200-TP-9').unitsPerCase,4800);
assert.equal(products.find(p=>p.supplierSku==='CRPC04-3-TP-FS').unitsPerCase,100);
assert.equal(products.find(p=>p.supplierSku==='CRDP-SC-9').orderUnit,'bag');
const cart=Object.fromEntries(products.filter(p=>!p.quoteOnly).map(p=>[p.sku,p.minCases]));
assert.equal(checkoutItems(cart).length,28);
assert.throws(()=>checkoutItems({}),/empty/);
assert.throws(()=>checkoutItems({'unlisted-sku':10}),/Unknown/);
assert.throws(()=>checkoutItems({[products[0].sku]:'10'}),/whole/);
assert.throws(()=>checkoutItems({[products[0].sku]:5000}),/whole/);
const first=products[0];const min=first.minCases;first.minCases=12;
assert.throws(()=>checkoutItems({[first.sku]:10}),/12/);first.minCases=min;
const prior=process.env.STRIPE_SECRET_KEY;
process.env.STRIPE_SECRET_KEY='sk_live_placeholder';assert.throws(stripeStore,/test key/);
if(prior===undefined)delete process.env.STRIPE_SECRET_KEY;else process.env.STRIPE_SECRET_KEY=prior;
console.log('Validated 29 listings, 28 purchasable sandbox products, local images, catalog-derived prices, pack sizes, per-product minimums and rejected invalid carts/live keys.');

assert.equal(Object.keys(catalog.legacyProductRedirects).length,3);
for(const [old,target] of Object.entries(catalog.legacyProductRedirects)){assert.ok(!products.some(p=>p.slug===old));assert.ok(products.some(p=>p.slug===target));}
assert.equal(new Set(products.filter(p=>p.supplierSku).map(p=>p.supplierSku)).size,28);
assert.equal(products.filter(p=>p.image.startsWith("/products/smg/")).length,27);

for(const p of products)assert.ok(fs.existsSync(`public/specifications/${p.slug}.pdf`),p.sku);
assert.ok(fs.existsSync("public/specifications/cotaus-thermocycler-compatibility.pdf"));

const guidance=load('src/lib/store-guidance.ts');
assert.match(guidance.compatibilityGuidance(products.find(p=>p.supplierSku==='CRAF300-H-TP-P')),/STARlet/);
assert.match(guidance.compatibilityGuidance(products.find(p=>p.supplierSku==='CRAF250-B-TP')),/Biomek/);
assert.match(guidance.technicalStatus(products.find(p=>p.supplierSku==='CRPC-SF-S')).dimensions,/137 x 80/);
assert.equal(guidance.unitPrice(305/4800),'$0.0635');

import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(path){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,Intl});return exports;}
const {storeProducts}=load('src/lib/store-products.ts');
const {compatibilityGuidance,technicalStatus,freightNote}=load('src/lib/store-guidance.ts');
fs.mkdirSync('tmp/pdfs',{recursive:true});
fs.writeFileSync('tmp/pdfs/store-spec-data.json',JSON.stringify(storeProducts.map(p=>({...p,compatibility:compatibilityGuidance(p),technical:technicalStatus(p),freightNote}))));

import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const required = ['index.html','styles.css','a11y.css','app.js','data.js','README.md','assets/og-atlas.svg','.github/workflows/ci.yml'];
required.forEach(file => assert.ok(fs.existsSync(file), `Missing ${file}`));
const html = fs.readFileSync('index.html','utf8');
const css = fs.readFileSync('styles.css','utf8') + fs.readFileSync('a11y.css','utf8');
const js = fs.readFileSync('app.js','utf8');
const dataSrc = fs.readFileSync('data.js','utf8');
assert.match(html, /<html lang="tr">/);
assert.match(html, /<meta name="viewport"/);
assert.match(html, /<main id="top">/);
assert.match(html, /id="atlas"/);
assert.match(html, /prefers-reduced-motion|styles\.css/);
assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
assert.match(js, /window\.ATLAS_DATA/);
assert.match(js, /ArrowRight/);
assert.match(js, /tabIndex = selected \? 0 : -1/);
assert.match(css, /:focus-visible/);
new Function(js);
const context = {window:{}};
vm.runInNewContext(dataSrc, context);
const data = context.window.ATLAS_DATA;
assert.deepEqual(Object.keys(data), ['campus','ea','say']);
assert.equal(data.campus.length, 10);
assert.equal(data.ea.length, 10);
assert.equal(data.say.length, 10);
for (const group of ['ea','say']) {
  const scored = data[group].map(item => ({item, score:item.future*.30+item.global*.25+item.income*.20+item.flex*.15+item.eco*.10}));
  scored.forEach(({item,score}) => {
    ['future','global','income','flex','eco'].forEach(k => assert.ok(item[k]>=0&&item[k]<=100, `${item.name} ${k}`));
    assert.ok(score>=0&&score<=100);
  });
  const ordered = [...scored].sort((a,b)=>b.score-a.score);
  ordered.forEach(({item},i)=>assert.equal(item.rank,i+1, `${group} composite rank mismatch: ${item.name}`));
}
data.campus.forEach((item,i)=>{assert.equal(item.rank,i+1);assert.ok(item.score>0);});
const links = [...html.matchAll(/href="(https?:\/\/[^\"]+)"/g)].map(x=>x[1]);
assert.ok(links.length>=5,'Expected at least five source links');
console.log(`PASS: ${required.length} files, 30 records, ${links.length} external source links counted.`);

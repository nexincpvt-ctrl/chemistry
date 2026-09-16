/* ============================================================
   NEXINC — OXOACIDS LAB · 9 ACIDS · SPEC-DRIVEN 3D
   Pyramidal · Tetrahedral · Octahedral · Bridge · S–S
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PI = Math.PI;

let current = -1;
function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }

/* ---------- 0. DATA — 9 oxoacids (table se) ---------- */
/* spec types:
   pyra  : pyramidal E, 1 =O + 2 OH + LP (~107°)
   tetra : tetrahedral E, 2 =O + 2 OH (109.5°)
   octa  : octahedral Te, 6 OH (90°)
   bridge: O-bridged dimer, per-S dbl count
   ss    : S–S direct dimer                       */
const ACIDS = [
  { f:'H₂SO₃', el:'S', name:'Sulfurous acid', vk:'--green', cat:0,
    hyb:'sp³', shape:'Pyramidal around S',
    bo:'S–O resonance; S=O double',
    bl:'Variable', ba:'~107°',
    mass:'82.08', state:'AQ/SOLN', tag:'LP ON S', warn:false,
    note:'H–O–S(=O)–O–H; one lone pair on S',
    fact:'Dibasic · SO₂ + H₂O · <b>reducing agent</b> · bleaching by reduction',
    spec:{type:'pyra', lp:true},
    arc:'107°' },
  { f:'H₂SO₄', el:'S', name:'Sulfuric acid', vk:'--green', cat:0,
    hyb:'sp³', shape:'Tetrahedral around S',
    bo:'S=O double (Lewis)',
    bl:'S=O ~1.42 Å', ba:'~109.5°',
    mass:'98.08', state:'LIQUID', tag:'KING OF ACIDS', warn:true,
    note:'HO–S(=O)₂–OH; tetrahedral S',
    fact:'<b>Dehydrating</b> + oxidizing (hot conc.) · Contact process · 260M t/yr',
    spec:{type:'tetra', lp:false},
    arc:'109.5°', bl3d:'1.42 Å' },
  { f:'H₂S₂O₇', el:'S', name:'Pyrosulfuric (oleum)', vk:'--green', cat:0,
    hyb:'sp³', shape:'Tetrahedral around each S',
    bo:'S–O–S bridge; terminal S=O',
    bl:'Variable', ba:'Variable',
    mass:'178.13', state:'LIQUID', tag:'OLEUM', warn:false,
    note:'HO–S(=O)₂–O–S(=O)₂–OH',
    fact:'<b>Oleum</b> = H₂SO₄ + SO₃ · fuming · transported in steel tanks',
    spec:{type:'bridge', per:[{dbl:2,oh:1},{dbl:2,oh:1}]},
    arc:'109.5°' },
  { f:'H₂S₂O₅', el:'S', name:'Pyrosulfurous acid', vk:'--green', cat:0,
    hyb:'sp³', shape:'Tetrahedral around each S',
    bo:'S–O–S bridge; terminal S=O',
    bl:'Variable', ba:'Variable',
    mass:'130.10', state:'UNSTABLE', tag:'S(IV) DIMER', warn:false,
    note:'HO–S(=O)–O–S(=O)–OH',
    fact:'Do <b>S(IV)</b> centers · O-bridged dimer of H₂SO₃ · unstable',
    spec:{type:'bridge', per:[{dbl:1,oh:1},{dbl:1,oh:1}]},
    arc:'109.5°' },
  { f:'H₂S₂O₆', el:'S', name:'Dithionic acid', vk:'--green', cat:0,
    hyb:'sp³', shape:'Tetrahedral around each S',
    bo:'S–S single; S–O bonds',
    bl:'Variable', ba:'Variable',
    mass:'162.12', state:'SOLID', tag:'S–S LINK', warn:false,
    note:'HO₃S–SO₃H; S–S bridge',
    fact:'Unique <b>S–S bond</b> · each S +5 · strong diprotic acid',
    spec:{type:'ss', per:[{dbl:2,oh:1},{dbl:2,oh:1}]},
    arc:'109.5°' },
  { f:'H₂SeO₃', el:'Se', name:'Selenous acid', vk:'--teal', cat:1,
    hyb:'sp³', shape:'Pyramidal around Se',
    bo:'Se–O resonance',
    bl:'Variable', ba:'~107°',
    mass:'128.97', state:'SOLID', tag:'OXIDIZING', warn:false,
    note:'H₂SeO₃; bent O–Se–O with lone pair',
    fact:'<b>Oxidizing agent</b> · Se +4 · pyramidal (LP on Se)',
    spec:{type:'pyra', lp:true},
    arc:'107°' },
  { f:'H₂SeO₄', el:'Se', name:'Selenic acid', vk:'--teal', cat:1,
    hyb:'sp³', shape:'Tetrahedral around Se',
    bo:'Se=O double (Lewis)',
    bl:'Variable', ba:'~109.5°',
    mass:'144.97', state:'SOLID', tag:'≈ H₂SO₄', warn:false,
    note:'H₂SeO₄; tetrahedral Se center',
    fact:'Jitni strong <b>H₂SO₄</b> · Se +6 · diprotic strong acid',
    spec:{type:'tetra', lp:false},
    arc:'109.5°' },
  { f:'H₂TeO₃', el:'Te', name:'Tellurous acid', vk:'--amber', cat:2,
    hyb:'sp³', shape:'Pyramidal around Te',
    bo:'Te–O resonance',
    bl:'Variable', ba:'~107°',
    mass:'159.63', state:'UNSTABLE', tag:'RARE', warn:false,
    note:'H₂TeO₃; pyramidal Te center',
    fact:'Te +4 · <b>unstable</b> · pyramidal (LP on Te)',
    spec:{type:'pyra', lp:true},
    arc:'107°' },
  { f:'H₆TeO₆', el:'Te', name:'Orthotelluric acid', vk:'--amber', cat:2,
    hyb:'sp³', shape:'Octahedral around Te',
    bo:'Te–O single bonds',
    bl:'Variable', ba:'90°',
    mass:'229.64', state:'SOLID', tag:'OCTAHEDRAL!', warn:true,
    note:'Te(OH)₆; octahedral Te center',
    fact:'<b>Exception!</b> Octahedral Te(OH)₆ · 6 OH · Te +6 · 90° angles',
    spec:{type:'octa', lp:false},
    arc:'90°' },
];

const ELEM = {
  S :{vk:'--green', r:.60},
  Se:{vk:'--teal',  r:.65},
  Te:{vk:'--amber', r:.70},
  O :{vk:'--verm',  r:.40},
  H :{r:.26},
};
const SC=1.2, L_EO=1.45, L_EOH=1.62, L_OH=.96, L_BR=1.62, L_SS=2.05, BOND_R=.095;

/* ---------- 1. THEME ---------- */
const themeBtn = $('#themeBtn');
let themeCur = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
themeBtn.addEventListener('click', () => {
  document.documentElement.classList.add('theming');
  themeCur = themeCur === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = themeCur;
  try{ localStorage.setItem('nexinc-theme', themeCur); }catch(e){}
  setTimeout(() => {
    document.documentElement.classList.remove('theming');
    if (current > -1 && threeReady){
      buildMolecule(ACIDS[current]);       /* colors refresh */
      applyToggles();
    }
    if (shadowMesh){
      shadowMesh.material.map.dispose();
      shadowMesh.material.map = makeShadowTex();
    }
  }, 550);
});

/* ---------- 2. CUSTOM CURSOR ---------- */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const dot = $('.cur-dot'), ring = $('.cur-ring');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
if (fine && !reduced){
  document.body.classList.add('cursor-on');
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('big', !!e.target.closest('a,button,.pick,.tgl,.drow,.dchip'));
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });
  const vpCur = $('#viewport');
  vpCur.addEventListener('mouseenter', () => document.body.classList.add('cur-hide'));
  vpCur.addEventListener('mouseleave', () => document.body.classList.remove('cur-hide'));
}

/* ---------- 3. background network ---------- */
const cv = $('#bg'), cx = cv.getContext('2d');
const THEMES = {
  light:{dot:'30,36,32',    acc:['#2E7D52','#C94F2E','#0E7C86','#A06B12']},
  dark :{dot:'239,232,216', acc:['#4CBF8B','#E8794F','#35B5C2','#E0AC4F']}
};
let W, H, nodes = [], pulses = [], lastT = 0;
function sizeCanvas(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  cv.style.width = W + 'px'; cv.style.height = H + 'px';
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function initNodes(){
  nodes = [];
  const n = Math.round(Math.min(92, (W * H) / 15000));
  for (let i = 0; i < n; i++){
    nodes.push({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r:1.4+Math.random()*1.4, a:.15+Math.random()*.2,
      acc:Math.random()<.1?(Math.random()*4)|0:-1, pt:2+Math.random()*8 });
  }
}
function drawBG(dt){
  const T = THEMES[themeCur];
  cx.clearRect(0,0,W,H);
  const LINK = 118;
  for (let i=0;i<nodes.length;i++){
    const a=nodes[i];
    for (let j=i+1;j<nodes.length;j++){
      const b=nodes[j], d=Math.hypot(a.x-b.x,a.y-b.y);
      if (d<LINK){ cx.strokeStyle='rgba('+T.dot+','+(.09*(1-d/LINK)).toFixed(3)+')'; cx.lineWidth=1;
        cx.beginPath(); cx.moveTo(a.x,a.y); cx.lineTo(b.x,b.y); cx.stroke(); }
    }
  }
  for (const n of nodes){
    if (fine){ const dx=n.x-mx, dy=n.y-my, d=Math.hypot(dx,dy);
      if (d<130 && d>1){ const f=(130-d)/130*.5; n.vx+=dx/d*f; n.vy+=dy/d*f; } }
    n.vx*=.992; n.vy*=.992;
    const sp=Math.hypot(n.vx,n.vy);
    if (sp>.7){ n.vx*=.7/sp; n.vy*=.7/sp; }
    n.x+=n.vx*dt; n.y+=n.vy*dt;
    if (n.x<-20)n.x=W+20; if(n.x>W+20)n.x=-20;
    if (n.y<-20)n.y=H+20; if(n.y>H+20)n.y=-20;
    n.pt-=dt;
    if (n.pt<0){ pulses.push({x:n.x,y:n.y,r:0,c:n.acc>=0?T.acc[n.acc]:'rgb('+T.dot+')'}); n.pt=6+Math.random()*9; }
    cx.fillStyle=n.acc>=0?T.acc[n.acc]:'rgba('+T.dot+','+n.a+')';
    cx.beginPath(); cx.arc(n.x,n.y,n.r,0,7); cx.fill();
  }
  for (let i=pulses.length-1;i>=0;i--){
    const p=pulses[i]; p.r+=1.1*dt;
    const al=.26*(1-p.r/64);
    if (al<=0){ pulses.splice(i,1); continue; }
    cx.strokeStyle=p.c; cx.globalAlpha=al; cx.lineWidth=1.2;
    cx.beginPath(); cx.arc(p.x,p.y,p.r,0,7); cx.stroke(); cx.globalAlpha=1;
  }
}
sizeCanvas(); initNodes();
addEventListener('resize', () => { sizeCanvas(); initNodes(); });

/* ---------- 4. scroll progress + toast ---------- */
const prog = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%';
}, {passive:true});

const toastEl = $('#toast');
let toastTimer = null;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ============================================================
   5. 3D — SPEC-DRIVEN MOLECULE BUILDER
   ============================================================ */
const vpBox    = $('#viewport');
const glCanvas = $('#gl');
const HAS3D = !!window.THREE;

let renderer=null, scene, camera, molGroup=null, lpGroup=null, angGroup=null, lenGroup=null, shadowMesh=null;
let spriteList=[];               /* {sp, getPos()} */
let spinOn = true, dragging3d = false;
let threeReady = false;
let lpOn = true, angOn = true, lenOn = false;

const orbit = { theta:-.6, phi:1.25, radius:9.8 };
const tgt   = { theta:-.6, phi:1.25, radius:9.8 };
const camTarget = HAS3D ? new THREE.Vector3(0,0,0) : null;
const _q   = HAS3D ? new THREE.Quaternion() : null;
const _up  = HAS3D ? new THREE.Vector3(0,1,0) : null;

function rr(g,x,y,w,h,r){ g.beginPath();
  g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }

function makeLabel(text, opt){
  opt = opt || {};
  const fs = opt.fs || 40, pad = opt.pad != null ? opt.pad : 16;
  const meas = document.createElement('canvas').getContext('2d');
  meas.font = '700 '+fs+'px "JetBrains Mono", monospace';
  const tw = Math.ceil(meas.measureText(text).width);
  const w = tw + pad*2, h = fs + pad*1.4;
  const cnv = document.createElement('canvas');
  cnv.width = Math.max(2,w*2); cnv.height = Math.max(2,h*2);
  const g = cnv.getContext('2d'); g.scale(2,2);
  if (!opt.plain){
    g.fillStyle = opt.bg || '#FFFDF8'; rr(g,1,1,w-2,h-2,h/2); g.fill();
    g.strokeStyle = opt.border || '#1E2420'; g.lineWidth = 3; rr(g,1,1,w-2,h-2,h/2); g.stroke();
  }
  g.font = '700 '+fs+'px "JetBrains Mono", monospace';
  g.fillStyle = opt.color || '#1E2420'; g.textBaseline = 'middle';
  g.fillText(text, pad, h/2 + fs*.06);
  const tex = new THREE.CanvasTexture(cnv);
  tex.minFilter = THREE.LinearFilter;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, transparent:true, depthTest:false }));
  const s = opt.scale || .0068;
  sp.scale.set(w*s, h*s, 1);
  sp.renderOrder = 10;
  return sp;
}

function makeShadowTex(){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64,64,4,64,64,62);
  const dark = themeCur === 'dark' ? '0,0,0' : '30,36,32';
  grd.addColorStop(0, 'rgba('+dark+',.26)');
  grd.addColorStop(1, 'rgba('+dark+',0)');
  g.fillStyle = grd; g.fillRect(0,0,128,128);
  return new THREE.CanvasTexture(c);
}

function initThree(){
  if (!HAS3D){ $('#vpFallback').style.display='grid'; return; }
  try{
    renderer = new THREE.WebGLRenderer({ canvas:glCanvas, alpha:true, antialias:true });
  }catch(e){ $('#vpFallback').style.display='grid'; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio||1, 2));
  renderer.setClearColor(0x000000, 0);

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, 1, .1, 100);

  scene.add(new THREE.HemisphereLight(0xfff6e6, 0x3a352a, .9));
  const key  = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(4,5,5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xfff2dd, .35); fill.position.set(-4,1,-3); scene.add(fill);
  const rim  = new THREE.PointLight(0x4A6FA5, .5, 34); rim.position.set(-4,-2.5,3); scene.add(rim);

  shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, 6.2),
    new THREE.MeshBasicMaterial({ map:makeShadowTex(), transparent:true, depthWrite:false })
  );
  shadowMesh.rotation.x = -Math.PI/2;
  shadowMesh.position.y = -3.4;
  scene.add(shadowMesh);

  threeReady = true;
  size3d();
  if (window.ResizeObserver) new ResizeObserver(size3d).observe(vpBox);
  addEventListener('resize', size3d);
  bindOrbitControls();
  requestAnimationFrame(threeLoop);
}
function size3d(){
  if (!renderer) return;
  const w = vpBox.clientWidth || 400, h = vpBox.clientHeight || 380;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function disposeGroup(g){
  if (!g) return;
  g.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material){
      if (o.material.map) o.material.map.dispose();
      o.material.dispose();
    }
  });
}

/* --- vector helpers --- */
const vlen  = v => Math.hypot(v[0],v[1],v[2]);
const vnorm = v => { const l=vlen(v)||1; return [v[0]/l,v[1]/l,v[2]/l]; };
const vadd  = (a,b) => [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const vmul  = (a,s) => [a[0]*s,a[1]*s,a[2]*s];
const vsub  = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const vcross= (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const vdot  = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
/* 3 dirs at 109.5° from main */
function tetraBasis(main){
  const c = -1/3, s = Math.sqrt(1 - c*c);
  let u = Math.abs(main[0]) < .9 ? [1,0,0] : [0,1,0];
  let v = vnorm(vcross(main, u));
  u = vnorm(vcross(v, main));
  const out = [];
  for (let k=0;k<3;k++){
    const az = k * 2*PI/3;
    out.push(vnorm([
      main[0]*c + (u[0]*Math.cos(az)+v[0]*Math.sin(az))*s,
      main[1]*c + (u[1]*Math.cos(az)+v[1]*Math.sin(az))*s,
      main[2]*c + (u[2]*Math.cos(az)+v[2]*Math.sin(az))*s
    ]));
  }
  return out;
}
function slerpDir(a, b, t){
  let d = Math.max(-1, Math.min(1, vdot(a,b)));
  const th = Math.acos(d);
  if (th < .001) return a.slice();
  const s = Math.sin(th);
  const A = Math.sin((1-t)*th)/s, B = Math.sin(t*th)/s;
  return vnorm([a[0]*A+b[0]*B, a[1]*A+b[1]*B, a[2]*A+b[2]*B]);
}

/* --- geometry spec → atoms & bonds --- */
function specToMol(d){
  const atoms = [];   /* {pos, kind:'E'|'O'|'H'} */
  const bonds = [];   /* {a,b,dbl} */
  const sp = d.spec;
  const E = ELEM[d.el];

  function addAtom(pos, kind){ atoms.push({pos, kind}); return atoms.length-1; }
  function addBond(a,b,dbl){ bonds.push({a,b,dbl:!!dbl}); }

  function attachOH(oIdx, dir){
    const hPos = vadd(atoms[oIdx].pos, vmul(dir, L_OH*SC*.92));
    const h = addAtom(hPos, 'H');
    addBond(oIdx, h, false);
  }

  if (sp.type === 'pyra'){
    const cE = addAtom([0,0,0], 'E');
    const pl = 73*PI/180;
    const dirs = [0,120,240].map(az => {
      const a = az*PI/180;
      return [Math.sin(pl)*Math.cos(a), Math.cos(pl), Math.sin(pl)*Math.sin(a)];
    });
    const o1 = addAtom(vmul(dirs[0], L_EO*SC), 'O');  addBond(cE, o1, true);
    const o2 = addAtom(vmul(dirs[1], L_EOH*SC), 'O'); addBond(cE, o2, false); attachOH(o2, dirs[1]);
    const o3 = addAtom(vmul(dirs[2], L_EOH*SC), 'O'); addBond(cE, o3, false); attachOH(o3, dirs[2]);
    return { atoms, bonds, cE,
      arc:{ c:cE, ua:dirs[0], ub:dirs[1] },
      lp:{ dir:[0,-1,0] },
      lenBond:[cE, o1] };
  }

  if (sp.type === 'tetra'){
    const cE = addAtom([0,0,0], 'E');
    const dirs = [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(vnorm);
    const o1 = addAtom(vmul(dirs[0], L_EO*SC),  'O');  addBond(cE, o1, true);
    const o2 = addAtom(vmul(dirs[1], L_EO*SC),  'O');  addBond(cE, o2, true);
    const o3 = addAtom(vmul(dirs[2], L_EOH*SC), 'O');  addBond(cE, o3, false); attachOH(o3, dirs[2]);
    const o4 = addAtom(vmul(dirs[3], L_EOH*SC), 'O');  addBond(cE, o4, false); attachOH(o4, dirs[3]);
    return { atoms, bonds, cE,
      arc:{ c:cE, ua:dirs[0], ub:dirs[2] },
      lp:null,
      lenBond:[cE, o1] };
  }

  if (sp.type === 'octa'){
    const cE = addAtom([0,0,0], 'E');
    const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    dirs.forEach(dr => {
      const o = addAtom(vmul(dr, L_EOH*SC), 'O');
      addBond(cE, o, false);
      attachOH(o, dr);
    });
    return { atoms, bonds, cE,
      arc:{ c:cE, ua:[1,0,0], ub:[0,1,0] },
      lp:null,
      lenBond:null };
  }

  if (sp.type === 'bridge' || sp.type === 'ss'){
    const gap = sp.type === 'bridge' ? L_BR*SC : (L_SS*SC)/2;
    const c1 = addAtom([-gap,0,0], 'E');
    const c2 = addAtom([ gap,0,0], 'E');
    if (sp.type === 'ss') addBond(c1, c2, false);
    else {
      const ob = addAtom([0,0,0], 'O');
      addBond(c1, ob, false); addBond(c2, ob, false);
    }
    const m1 = [1,0,0], m2 = [-1,0,0];
    const b1 = tetraBasis(m1), b2 = tetraBasis(m2);
    let firstO = null;
    [ [c1, b1, sp.per[0], m1], [c2, b2, sp.per[1], m2] ].forEach(([cE, basis, per, main]) => {
      let k = 0;
      for (let i=0;i<per.dbl;i++){
        const o = addAtom(vadd(atoms[cE].pos, vmul(basis[k], L_EO*SC)), 'O');
        addBond(cE, o, true);
        if (firstO === null) firstO = {c:cE, o, dir:basis[k]};
        k++;
      }
      for (let i=0;i<per.oh;i++){
        const dir = basis[k];
        const o = addAtom(vadd(atoms[cE].pos, vmul(dir, L_EOH*SC)), 'O');
        addBond(cE, o, false);
        attachOH(o, dir);
        if (!firstO) firstO = {c:cE, o, dir};
        k++;
      }
    });
    return { atoms, bonds, cE:c1,
      arc:{ c:c1, ua:firstO.dir, ub:tetraBasis([1,0,0])[1] },
      lp:null,
      lenBond: d.bl3d ? [firstO.c, firstO.o] : null };
  }
}

/* --- build the whole molecule in 3D --- */
let arcPill = null;
function buildMolecule(d){
  if (!threeReady) return;
  if (molGroup){ scene.remove(molGroup); disposeGroup(molGroup); }
  spriteList = [];

  molGroup = new THREE.Group(); scene.add(molGroup);
  lpGroup  = new THREE.Group();
  angGroup = new THREE.Group();
  lenGroup = new THREE.Group();
  molGroup.add(lpGroup, angGroup, lenGroup);

  const mol = specToMol(d);
  const cE  = cssVar(d.vk)  || '#2E7D52';
  const cO  = cssVar('--verm') || '#C94F2E';
  const cIn = cssVar('--ink')  || '#1E2420';

  const eMat = new THREE.MeshStandardMaterial({ color:cE, roughness:.28, metalness:.12, emissive:cE, emissiveIntensity:.13 });
  const oMat = new THREE.MeshStandardMaterial({ color:cO, roughness:.32, metalness:.08, emissive:cO, emissiveIntensity:.10 });
  const hMat = new THREE.MeshStandardMaterial({ color:0xF2ECDC, roughness:.35, metalness:.05 });
  const bMat = new THREE.MeshStandardMaterial({ color:0x6E7469, roughness:.45, metalness:.25 });

  /* atoms */
  mol.atoms.forEach(a => {
    const r = a.kind === 'E' ? ELEM[d.el].r : (a.kind === 'O' ? ELEM.O.r : ELEM.H.r);
    const mat = a.kind === 'E' ? eMat : (a.kind === 'O' ? oMat : hMat);
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 48), mat);
    m.position.set(a.pos[0], a.pos[1], a.pos[2]);
    molGroup.add(m);
    a.mesh = m; a.r = r;
    /* label */
    const lbl = a.kind === 'E' ? d.el : (a.kind === 'O' ? 'O' : 'H');
    const sp = makeLabel(lbl, {
      plain:true,
      fs: a.kind === 'E' ? 56 : (a.kind === 'O' ? 40 : 34),
      color: a.kind === 'H' ? cIn : '#ffffff',
      scale: a.kind === 'E' ? .0060 : .0052
    });
    molGroup.add(sp);
    spriteList.push({ sp, atom:a });
  });

  /* bonds */
  mol.bonds.forEach(b => {
    const A = mol.atoms[b.a].pos, B = mol.atoms[b.b].pos;
    const dir = vnorm(vsub(B, A));
    const L = vlen(vsub(B, A));
    const mid = vmul(vadd(A, B), .5);
    function cyl(off){
      const g = new THREE.CylinderGeometry(BOND_R, BOND_R, L, 20);
      const m = new THREE.Mesh(g, bMat);
      m.position.set(mid[0]+off[0], mid[1]+off[1], mid[2]+off[2]);
      _q.setFromUnitVectors(_up, new THREE.Vector3(dir[0],dir[1],dir[2]));
      m.quaternion.copy(_q);
      molGroup.add(m);
    }
    if (b.dbl){
      let per = vnorm(vcross(dir, Math.abs(dir[1]) < .9 ? [0,1,0] : [1,0,0]));
      per = vmul(per, .105);
      cyl(per); cyl(vmul(per, -1));
    } else cyl([0,0,0]);
  });

  /* lone pair */
  if (mol.lp && spHasLP(d)){
    const lmat = new THREE.MeshStandardMaterial({
      color:cE, transparent:true, opacity:.18, roughness:.2, metalness:0,
      emissive:cE, emissiveIntensity:.25, depthWrite:false });
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(.30, 32, 32), lmat);
    lobe.scale.set(.75, 1.4, .75);
    const holder = new THREE.Group();
    holder.add(lobe);
    const dir = new THREE.Vector3(...mol.lp.dir);
    holder.position.copy(dir.clone().multiplyScalar(ELEM[d.el].r + .38));
    _q.setFromUnitVectors(_up, dir);
    holder.quaternion.copy(_q);
    const eg = new THREE.Group();
    const dmat = new THREE.MeshBasicMaterial({ color:cE });
    [-.08,.08].forEach(off => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 16), dmat);
      dot.position.set(off, .05, 0); eg.add(dot);
    });
    lobe.add(eg);
    holder.userData.eg = eg;
    lpGroup.add(holder);
  }

  /* angle arc */
  const A = mol.arc;
  const R = .62;
  const arcPos = angGroup.add ? null : null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(40*3), 3));
  const arcLine = new THREE.Line(geo, new THREE.LineDashedMaterial({ color:cE, dashSize:.06, gapSize:.045 }));
  const cpos = mol.atoms[A.c].pos;
  const pts = geo.attributes.position;
  for (let i=0;i<40;i++){
    const t = i/39;
    const dv = slerpDir(A.ua, A.ub, t);
    pts.setXYZ(i, cpos[0]+dv[0]*R, cpos[1]+dv[1]*R, cpos[2]+dv[2]*R);
  }
  pts.needsUpdate = true;
  geo.computeBoundingSphere();
  arcLine.computeLineDistances();
  angGroup.add(arcLine);

  const mid = slerpDir(A.ua, A.ub, .5);
  arcPill = makeLabel(d.arc, {
    bg:cssVar('--card'), border:cIn, color:cE
  });
  arcPill.position.set(cpos[0]+mid[0]*(R+.55), cpos[1]+mid[1]*(R+.55), cpos[2]+mid[2]*(R+.55));
  angGroup.add(arcPill);

  /* bond length pill (sirf defined acids) */
  if (mol.lenBond && d.bl3d){
    const [ia, ib] = mol.lenBond;
    const pA = mol.atoms[ia].pos, pB = mol.atoms[ib].pos;
    const midB = vmul(vadd(pA, pB), .5);
    const pill = makeLabel(d.bl3d, { bg:cssVar('--card'), border:cIn, color:cssVar('--teal') || '#0E7C86' });
    let per = vnorm(vcross(vnorm(vsub(pB,pA)), [0,0,1]));
    if (!isFinite(per[0])) per = [1,0,0];
    pill.position.set(midB[0]+per[0]*.55, midB[1]+per[1]*.55, midB[2]+.55);
    lenGroup.add(pill);
  }

  molGroup.scale.setScalar(1.12);   /* pop */
}
function spHasLP(d){ return !!(d.spec && d.spec.lp); }

function applyToggles(){
  if (lpGroup){
    const hasLP = current > -1 && spHasLP(ACIDS[current]);
    lpGroup.visible = lpOn && hasLP;
  }
  if (angGroup) angGroup.visible = angOn;
  if (lenGroup){
    const hasLen = current > -1 && !!ACIDS[current].bl3d;
    lenGroup.visible = lenOn && hasLen;
  }
}

function bindOrbitControls(){
  const el = renderer.domElement;
  let px=0, py=0;
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown', e => {
    dragging3d = true; px = e.clientX; py = e.clientY;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', e => {
    if (!dragging3d) return;
    tgt.theta -= (e.clientX - px) * .0052;
    tgt.phi    = Math.max(.35, Math.min(2.65, tgt.phi - (e.clientY - py) * .0042));
    px = e.clientX; py = e.clientY;
  });
  const end = () => dragging3d = false;
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('wheel', e => {
    e.preventDefault();
    tgt.radius = Math.max(5.2, Math.min(15.5, tgt.radius * (1 + e.deltaY * .001)));
  }, {passive:false});
}
 $('#zin').addEventListener('click',  () => tgt.radius = Math.max(5.2,  tgt.radius - 1.1));
 $('#zout').addEventListener('click', () => tgt.radius = Math.min(15.5, tgt.radius + 1.1));
 $('#zreset').addEventListener('click', () => {
  tgt.theta = -.6; tgt.phi = 1.25; tgt.radius = 9.8;
  showToast('VIEW RESET');
});

let lastFrame = performance.now();
function threeLoop(now){
  requestAnimationFrame(threeLoop);
  const dt = Math.min(.05, (now - lastFrame)/1000); lastFrame = now;

  /* pop */
  if (molGroup && Math.abs(molGroup.scale.x - 1) > .002){
    const s = molGroup.scale.x + (1 - molGroup.scale.x) * Math.min(1, dt*5);
    molGroup.scale.setScalar(s);
  }

  /* breathing + shadow */
  if (!reduced && molGroup){
    const fl = Math.sin(now * .0011) * .10;
    molGroup.position.y = fl;
    if (shadowMesh){
      shadowMesh.material.opacity = .85 - fl * 1.1;
      const ss = 1 - fl * .05;
      shadowMesh.scale.set(ss, ss, 1);
    }
  }

  /* LP electron spin */
  if (lpGroup) lpGroup.children.forEach(h => { if (h.userData.eg) h.userData.eg.rotation.z += dt*2.2; });

  /* atom letters camera-facing */
  if (camera && spriteList.length){
    const camN = camera.position.clone().normalize();
    spriteList.forEach(({sp, atom}) => {
      sp.position.set(
        atom.pos[0] + camN.x*(atom.r + .08),
        atom.pos[1] + camN.y*(atom.r + .08),
        atom.pos[2] + camN.z*(atom.r + .08)
      );
    });
  }

  if (spinOn && !dragging3d && !reduced) tgt.theta += dt * .22;
  orbit.theta  += (tgt.theta  - orbit.theta)  * .1;
  orbit.phi    += (tgt.phi    - orbit.phi)    * .1;
  orbit.radius += (tgt.radius - orbit.radius) * .1;
  camera.position.set(
    camTarget.x + orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta),
    camTarget.y + orbit.radius * Math.cos(orbit.phi),
    camTarget.z + orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta)
  );
  camera.lookAt(camTarget);
  renderer.render(scene, camera);
}
initThree();

/* ============================================================
   6. LEWIS SVG BUILDER (spec-driven)
   ============================================================ */
function buildLewis(d){
  const L = d.lewis;
  const svg = $('#lewisSvg');
  if (!L){ svg.innerHTML = ''; return; }
  let s = '';
  /* edges */
  L.edges.forEach(([a,b,order]) => {
    const [x1,y1] = L.nodes[a], [x2,y2] = L.nodes[b];
    if (order === 2){
      const dx = x2-x1, dy = y2-y1, len = Math.hypot(dx,dy);
      const ox = -dy/len*3.4, oy = dx/len*3.4;
      s += '<line x1="'+(x1+ox)+'" y1="'+(y1+oy)+'" x2="'+(x2+ox)+'" y2="'+(y2+oy)+'" stroke="var(--ink)" stroke-width="2.6"/>';
      s += '<line x1="'+(x1-ox)+'" y1="'+(y1-oy)+'" x2="'+(x2-ox)+'" y2="'+(y2-oy)+'" stroke="var(--ink)" stroke-width="2.6"/>';
    } else {
      s += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="var(--ink)" stroke-width="3"/>';
    }
  });
  /* angle arc (optional) */
  if (L.arc){
    const [cx0,cy0] = L.nodes[L.arc.c];
    const a1 = Math.atan2(L.nodes[L.arc.a][1]-cy0, L.nodes[L.arc.a][0]-cx0);
    const a2 = Math.atan2(L.nodes[L.arc.b][1]-cy0, L.nodes[L.arc.b][0]-cx0);
    const R = 36;
    const x1 = cx0+R*Math.cos(a1), y1 = cy0+R*Math.sin(a1);
    const x2 = cx0+R*Math.cos(a2), y2 = cy0+R*Math.sin(a2);
    const am = (a1+a2)/2;
    s += '<g class="lewis-ang">';
    s += '<path d="M '+x1.toFixed(1)+' '+y1.toFixed(1)+' A '+R+' '+R+' 0 0 1 '+x2.toFixed(1)+' '+y2.toFixed(1)+'" fill="none" stroke="var(--tc)" stroke-width="2" stroke-dasharray="4 4"/>';
    s += '<text x="'+(cx0+(R+18)*Math.cos(am)).toFixed(0)+'" y="'+(cy0+(R+18)*Math.sin(am)).toFixed(0)+'" font-size="13" font-weight="700" fill="var(--tc)" text-anchor="middle" font-family="JetBrains Mono,monospace">'+d.arc+'</text>';
    s += '</g>';
  }
  /* lone pair dots */
  if (L.lp){
    s += '<g class="lewis-dots">';
    L.lp.forEach(([x,y]) => { s += '<circle cx="'+x+'" cy="'+y+'" r="4" fill="var(--tc)"/>'; });
    s += '</g>';
  }
  /* atoms */
  L.nodes.forEach(([x,y,txt,type]) => {
    if (type === 'H'){
      s += '<circle cx="'+x+'" cy="'+y+'" r="15" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>';
      s += '<text x="'+x+'" y="'+(y+5)+'" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)" font-family="Fraunces,serif">H</text>';
    } else if (type === 'O'){
      s += '<circle cx="'+x+'" cy="'+y+'" r="16" fill="var(--verm)" stroke="var(--ink)" stroke-width="2"/>';
      s += '<text x="'+x+'" y="'+(y+5)+'" font-size="14" font-weight="700" text-anchor="middle" fill="#fff" font-family="Fraunces,serif">O</text>';
    } else {
      s += '<circle cx="'+x+'" cy="'+y+'" r="21" fill="var(--tc)" stroke="var(--ink)" stroke-width="2"/>';
      s += '<text x="'+x+'" y="'+(y+6.5)+'" font-size="17" font-weight="700" text-anchor="middle" fill="#fff" font-family="Fraunces,serif">'+d.el+'</text>';
    }
  });
  svg.innerHTML = s;
}

/* lewis specs per acid (viewBox 460×290) */
const LAYOUTS = {
  pyraS: {
    nodes:[[230,125,'E','E'],[230,48,'O','O'],[140,185,'O','O'],[320,185,'O','O'],[72,232,'H','H'],[388,232,'H','H']],
    edges:[[0,1,2],[0,2,1],[0,3,1],[2,4,1],[3,5,1]],
    arc:{c:0,a:1,b:2},
    lp:[[243,152],[256,146],[212,158],[226,164]]
  },
  tetraS: {
    nodes:[[230,130,'E','E'],[155,58,'O','O'],[305,58,'O','O'],[128,200,'O','O'],[332,200,'O','O'],[62,244,'H','H'],[398,244,'H','H']],
    edges:[[0,1,2],[0,2,2],[0,3,1],[0,4,1],[3,5,1],[4,6,1]],
    arc:{c:0,a:1,b:3},
    lp:null
  },
  bridge2: {
    nodes:[[130,140,'E','E'],[330,140,'E','E'],[230,140,'O','O'],[62,58,'O','O'],[62,222,'O','O'],[398,58,'O','O'],[398,222,'O','O'],[130,252,'H','H'],[330,252,'H','H']],
    edges:[[0,2,1],[2,1,1],[0,3,2],[0,4,2],[1,5,2],[1,6,2],[4,7,1],[6,8,1]],
    arc:{c:0,a:3,b:4},
    lp:null
  },
  bridge1: {
    nodes:[[140,140,'E','E'],[320,140,'E','E'],[230,140,'O','O'],[66,58,'O','O'],[66,222,'O','O'],[394,58,'O','O'],[394,222,'O','O'],[38,262,'H','H'],[422,262,'H','H']],
    edges:[[0,2,1],[2,1,1],[0,3,2],[0,4,1],[1,5,2],[1,6,1],[4,7,1],[6,8,1]],
    arc:{c:0,a:3,b:4},
    lp:null
  },
  ss: {
    nodes:[[140,140,'E','E'],[320,140,'E','E'],[62,58,'O','O'],[62,222,'O','O'],[398,58,'O','O'],[398,222,'O','O'],[140,252,'H','H'],[320,252,'H','H']],
    edges:[[0,1,1],[0,2,2],[0,3,2],[1,4,2],[1,5,2],[3,6,1],[5,7,1]],
    arc:{c:0,a:2,b:3},
    lp:null
  },
  octa: {
    nodes:[[230,145,'E','E'],[230,62,'O','O'],[230,228,'O','O'],[128,145,'O','O'],[332,145,'O','O'],[152,84,'O','O'],[308,206,'O','O'],[230,24,'H','H'],[230,266,'H','H'],[76,145,'H','H'],[384,145,'H','H'],[108,52,'H','H'],[352,238,'H','H']],
    edges:[[0,1,1],[0,2,1],[0,3,1],[0,4,1],[0,5,1],[0,6,1],[1,7,1],[2,8,1],[3,9,1],[4,10,1],[5,11,1],[6,12,1]],
    arc:{c:0,a:1,b:3},
    lp:null
  }
};
ACIDS.forEach(d => {
  if (d.spec.type === 'pyra') d.lewis = LAYOUTS.pyraS;
  else if (d.spec.type === 'tetra') d.lewis = LAYOUTS.tetraS;
  else if (d.spec.type === 'octa') d.lewis = LAYOUTS.octa;
  else if (d.spec.type === 'bridge') d.lewis = d.spec.per[0].dbl === 2 ? LAYOUTS.bridge2 : LAYOUTS.bridge1;
  else if (d.spec.type === 'ss') d.lewis = LAYOUTS.ss;
});

/* ============================================================
   7. SELECTOR BUILD — 3 element groups
   ============================================================ */
const selwrap = $('#selwrap');
const GRP = [
  { name:'SULFUR OXOACIDS', vk:'--green', items:[0,1,2,3,4], cols:'' },
  { name:'SELENIUM OXOACIDS', vk:'--teal', items:[5,6], cols:'g2' },
  { name:'TELLURIUM OXOACIDS', vk:'--amber', items:[7,8], cols:'g2' },
];
GRP.forEach(g => {
  const h = document.createElement('div');
  h.className = 'grp-head';
  h.style.setProperty('--gc', 'var('+g.vk+')');
  h.innerHTML = '<b>'+g.name+'</b><span class="gc mono">'+g.items.length+' ACIDS</span>';
  selwrap.appendChild(h);

  const grid = document.createElement('div');
  grid.className = 'picks ' + g.cols;
  g.items.forEach((idx, k) => {
    const d = ACIDS[idx];
    const b = document.createElement('button');
    b.className = 'pick';
    b.style.setProperty('--tc', 'var(' + d.vk + ')');
    b.style.setProperty('--tilt', (k%2 ? 1 : -1) * .8 + 'deg');
    b.style.setProperty('--d', (.07*k + .08) + 's');
    b.innerHTML =
      '<span class="p-no mono">OA·0' + (idx+1) + '</span>' +
      '<span class="p-check"><i data-lucide="check"></i></span>' +
      '<div class="p-sym">' + d.f + '</div>' +
      '<div class="p-name mono">' + d.name.toUpperCase() + '</div>' +
      '<span class="p-angle">' + d.ba.replace('~','') + '</span>';
    b.addEventListener('click', () => selectAcid(idx, true));
    b.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){ e.preventDefault(); b.click(); } });
    grid.appendChild(b);
  });
  selwrap.appendChild(grid);
});
lucide.createIcons();

/* ============================================================
   8. SELECT + LOAD
   ============================================================ */
function selectAcid(i, scroll){
  if (i === current){ if (scroll) $('#viewer').scrollIntoView({behavior:'smooth'}); return; }
  current = i;
  const d = ACIDS[i];

  $$('.pick').forEach((p, k) => {
    /* map k → acid idx via DOM order: sari picks ek list me hain */
  });
  $$('.pick').forEach(p => {
    p.classList.toggle('active', p.querySelector('.p-sym').textContent === d.f);
  });

  $('#stage3d').style.setProperty('--tc', 'var('+d.vk+')');
  $('#datacard').style.setProperty('--tc', 'var('+d.vk+')');
  $('.lewiscard').style.setProperty('--tc', 'var('+d.vk+')');

  /* 3D rebuild */
  buildMolecule(d);

  /* toggles reset */
  lpOn = spHasLP(d); angOn = true; lenOn = false;
  $('#tglLP').classList.toggle('on', lpOn);
  $('#tglANG').classList.add('on');
  $('#tglLEN').classList.remove('on');
  document.body.classList.toggle('lp-off', !lpOn);
  document.body.classList.remove('ang-off');
  applyToggles();

  /* texts */
  $('#selChip').textContent = d.f;
  $('#mName').innerHTML = d.name + ' <em>· ' + d.f + '</em>';
  $('#mShape').textContent = d.hyb.toUpperCase() + ' · ' + d.shape.toUpperCase();
  $('#dTag').textContent = d.f;
  $('#dName').textContent = d.name;
  $('#dHyb').textContent = d.hyb;
  $('#dShape').textContent = d.shape;
  $('#dBO').textContent = d.bo;
  $('#dBL').textContent = d.bl;
  $('#dBA').innerHTML = '<span class="hl">' + d.ba.replace('~','').replace('°','') + '</span>°'.replace('°°','°');
  if (d.ba === 'Variable') $('#dBA').textContent = 'Variable';
  $('#dNote').textContent = d.note;
  $('#dFact').innerHTML = d.fact;

  $('#dMass').textContent = d.mass;
  $('#dState').textContent = d.state;
  $('#dTag3').textContent = d.tag;
  $('#dTag3').classList.toggle('warn', !!d.warn);

  /* lewis */
  $('#lE') && 0;
  $('#lSym2').textContent = '· ' + d.f;
  $('#lSub').textContent = d.shape.toUpperCase() + (spHasLP(d) ? ' · LP ON ' + d.el : '');
  buildLewis(d);

  /* swap animation */
  ['#drows','#dchips','#dNote','#dFact','#mName','#mShape','#lewisSvg'].forEach(sel => {
    const el=$(sel); if(!el) return;
    el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
  });

  showToast(d.f + ' LOADED · ' + d.shape.toUpperCase() + ' · ' + d.name.toUpperCase());
  if (scroll) $('#viewer').scrollIntoView({behavior:'smooth'});
}

/* ============================================================
   9. TOGGLES
   ============================================================ */
 $('#tglLP').addEventListener('click', function(){
  if (current > -1 && !spHasLP(ACIDS[current])){
    this.classList.remove('on'); lpOn = false; applyToggles();
    showToast('IS ACID ME VISIBLE LP NAHI · SIRF PYRAMIDAL ME');
    return;
  }
  this.classList.toggle('on');
  lpOn = this.classList.contains('on');
  applyToggles();
  document.body.classList.toggle('lp-off', !lpOn);
  showToast('LONE PAIRS · ' + (lpOn?'ON':'OFF'));
});
 $('#tglANG').addEventListener('click', function(){
  this.classList.toggle('on');
  angOn = this.classList.contains('on');
  applyToggles();
  document.body.classList.toggle('ang-off', !angOn);
  showToast('BOND ANGLE · ' + (angOn?'ON':'OFF'));
});
 $('#tglLEN').addEventListener('click', function(){
  if (current > -1 && !ACIDS[current].bl3d){
    this.classList.remove('on'); lenOn = false; applyToggles();
    showToast('VARIABLE — DATA ME FIXED LENGTH NAHI · SIRF H₂SO₄ DEFINED');
    return;
  }
  this.classList.toggle('on');
  lenOn = this.classList.contains('on');
  applyToggles();
  showToast('BOND LENGTH · ' + (lenOn?'ON':'OFF'));
});
 $('#tglSPIN').addEventListener('click', function(){
  this.classList.toggle('on');
  spinOn = this.classList.contains('on');
  showToast('AUTO SPIN · ' + (spinOn?'ON':'OFF'));
});

/* ============================================================
   10. entrances
   ============================================================ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.addEventListener('animationend', function h(){
      e.target.classList.add('done'); e.target.removeEventListener('animationend', h);
    }, {once:true});
    io.unobserve(e.target);
  }
}), {threshold:.12});
 $$('.pick').forEach(p => io.observe(p));

/* ---------- 11. misc ---------- */
 $('#userBtn').addEventListener('click', () => showToast('USER PROFILE — JALD AA RAHA HAI'));
 $('#backBtn').addEventListener('click', () => location.href = 'group16.html');
 $('#toTop').addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

/* default load: H₂SO₃ (first acid) */
selectAcid(0, false);
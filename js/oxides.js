/* ============================================================
   NEXINC — OXIDE LAB · v8 · TRUE-ANGLE

   ★ ANGLE RULE (user demand):
     - Bent (SO₂/SeO₂/TeO₂): bonds ±(ang/2) pe → beech ka angle
       = 2 × half = EXACT table angle (SO₂ 119.5° etc.)
     - Trigonal (SO₃/SeO₃/TeO₃): 3 bonds fixed 120° apart —
       arc label wahi 120° jo data me hai.
   ★ TeO₂: solid polymeric hai → 3D me simplified bent unit
     (~110°) + har jagah clear "SIMPLIFIED" tag. Real angles
     variable (≈80–170°) — ye note data panel me bhi hai.
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0. DATA — chhah oxides ---------- */
const SCALE = 1.5, BOND_R = .12, O_R = .40;

const OXD = [
  { f:'SO₂', sym:'S', name:'Sulfur dioxide', vk:'--blue',
    hyb:'sp²', shape:'Bent', geo:'Trigonal planar', bo:'1.5 (resonance)', boVal:1.5,
    bl:'1.43', ba:'119.5', ang:119.5, L:1.43*SCALE, rE:.58,
    bonds:2, lp:1, lpMode:'sp2', mass:'64.07', ox:'+4', state:'GAS', poly:false,
    pickAng:'119.5°',
    tag:'sp² · BENT · TRIGONAL PLANAR E.GEOMETRY',
    baHtml:'<span class="hl">119.5</span>°',
    lsub:'2 S=O · RESONANCE · BO 1.5 · 1 LONE PAIR',
    note:'<b>S central</b> — 1 lone pair + 2 S=O (resonance); bent · <b>LP repulsion</b> ne 120° ko 119.5° tak squeeze kiya',
    fact:'Acidic oxide · lab prep: <b>Na₂SO₃ + dil. H₂SO₄</b> · acidified K₂Cr₂O₇ <b>orange → green</b> · bleaching agent' },
  { f:'SO₃', sym:'S', name:'Sulfur trioxide', vk:'--green',
    hyb:'sp²', shape:'Trigonal planar', geo:'Trigonal planar', bo:'1.33 (resonance)', boVal:1.33,
    bl:'1.42', ba:'120', ang:120, L:1.42*SCALE, rE:.58,
    bonds:3, lp:0, lpMode:null, mass:'80.06', ox:'+6', state:'LIQUID', poly:false,
    pickAng:'120°',
    tag:'sp² · TRIGONAL PLANAR · D₃h',
    baHtml:'<span class="hl">120</span>° (EXACT)',
    lsub:'3 S=O · RESONANCE · BO 1.33 · NO LONE PAIR',
    note:'<b>S central</b> — zero lone pair, 3 S=O (resonance); perfect planar <b>D₃h</b> — saare O–S–O exactly 120°',
    fact:'<b>Contact process</b>: 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, ~700 K) · H₂SO₄ me gholve → <b>oleum H₂S₂O₇</b>' },
  { f:'SeO₂', sym:'Se', name:'Selenium dioxide', vk:'--teal',
    hyb:'sp² (gas-phase)', shape:'Bent (gas)', geo:'Trigonal planar (gas)', bo:'1.5 (resonance)', boVal:1.5,
    bl:'≈1.65', ba:'≈119', ang:119, L:1.65*SCALE, rE:.62,
    bonds:2, lp:1, lpMode:'sp2', mass:'110.97', ox:'+4', state:'SOLID', poly:true,
    pickAng:'≈119°',
    tag:'sp² (GAS) · BENT · SOLID = POLYMERIC',
    baHtml:'<span class="hl">≈119</span>° (GAS)',
    lsub:'2 Se=O · RESONANCE · BO 1.5 · 1 LP (GAS MONOMER)',
    note:'Gas me <b>bent monomer</b> (SO₂ jaisa) · solid me <b>polymeric Se–O–Se chains</b> — 3D me simplified monomer dikhaya hai',
    fact:'White, <b>sublimable</b> (~315 °C) · SO₂ → SO₃ oxidise karta hai, khud laal <b>Se</b> ban jata hai' },
  { f:'SeO₃', sym:'Se', name:'Selenium trioxide', vk:'--verm',
    hyb:'sp²', shape:'Trigonal planar', geo:'Trigonal planar', bo:'1.33 (resonance)', boVal:1.33,
    bl:'≈1.70', ba:'120', ang:120, L:1.70*SCALE, rE:.62,
    bonds:3, lp:0, lpMode:null, mass:'126.97', ox:'+6', state:'SOLID', poly:true,
    pickAng:'120°',
    tag:'sp² · TRIGONAL PLANAR MODEL',
    baHtml:'<span class="hl">120</span>°',
    lsub:'3 Se=O · RESONANCE · BO 1.33 · MODEL UNIT',
    note:'Model: <b>Se trigonal planar</b>, 120° · crystal me actually <b>cyclic tetramer</b> (Se₄O₁₂) hota hai',
    fact:'<b>SO₃ se kam stable</b> · H₂SeO₄ (selenic acid) ka anhydride · strong oxidising agent' },
  { f:'TeO₂', sym:'Te', name:'Tellurium dioxide', vk:'--amber',
    hyb:'sp³ (simplified)', shape:'Bent (unit)', geo:'Tetrahedral (simpl.)', bo:'Variable', boVal:2,
    bl:'≈1.90', ba:'≈110', ang:110, L:1.90*SCALE, rE:.68,
    bonds:2, lp:2, lpMode:'sp3', mass:'159.60', ox:'+4', state:'SOLID', poly:true,
    pickAng:'VARIABLE',
    tag:'sp³ SIMPLIFIED · BENT UNIT · POLYMERIC SOLID',
    baHtml:'<span class="hl">≈110</span>° (SIMPLIFIED UNIT)',
    lsub:'SIMPLIFIED: 2 Te=O + 2 LP · SOLID = EXTENDED NETWORK',
    note:'Solid = <b>extended Te–O network</b> (paratellurite α-TeO₂), Te 4-coordinate + stereoactive LP · 3D me sirf <b>simplified bent unit</b> (~110°) — real angles variable (≈80–170°)',
    fact:'<b>Amphoteric</b> — strong acid + alkali dono me soluble · acousto-optic devices me use hota hai' },
  { f:'TeO₃', sym:'Te', name:'Tellurium trioxide', vk:'--purple',
    hyb:'sp² (model)', shape:'Trigonal planar', geo:'Trigonal planar', bo:'1.33 (resonance)', boVal:1.33,
    bl:'≈1.75', ba:'120', ang:120, L:1.75*SCALE, rE:.68,
    bonds:3, lp:0, lpMode:null, mass:'175.60', ox:'+6', state:'SOLID', poly:true,
    pickAng:'120°',
    tag:'sp² · TRIGONAL PLANAR MODEL',
    baHtml:'<span class="hl">120</span>°',
    lsub:'3 Te=O · RESONANCE · BO 1.33 · MODEL UNIT',
    note:'Model = discrete <b>trigonal planar</b> unit (120°) · real solid <b>polymeric</b> — isliye "molecular model" bola jata hai',
    fact:'Yellow-orange solid · ~400 °C pe decompose: <b>TeO₃ → TeO₂ + O₂</b> · strong oxidiser' },
];

let current = -1;

/* toggle states */
let lpOn = true, angOn = true, lenOn = false, spinOn = true;

function cssVar(name){
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

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
    if (colTgt && current > -1){
      const c = cssVar(OXD[current].vk);
      if (c) colTgt.set(c);
    }
    if (shadowMesh){
      shadowMesh.material.map.dispose();
      shadowMesh.material.map = makeShadowTex();
    }
    refreshLabels();
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
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2100);
}

/* ============================================================
   5. REAL 3D — BALL & STICK · TRUE ANGLE
   ============================================================ */
const vpBox    = $('#viewport');
const glCanvas = $('#gl');
const HAS3D = !!window.THREE;

let renderer=null, scene, camera, molGroup=null, lpGroup=null, angGroup=null, lenGroup=null, shadowMesh=null;
let eMat=null, oMat=null, bondMat=null, lpMats=[], arcLine=null, arcLabel=null, lenLabels=[], symSprites=[];
let dragging3d = false;
let threeReady = false;
let popT = 1;

const orbit = { theta:-.55, phi:1.18, radius:8.6 };
const tgt   = { theta:-.55, phi:1.18, radius:8.6 };

/* crash-guards */
const colCur    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const colTgt    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const camTarget = HAS3D ? new THREE.Vector3(0,-.05,0) : null;
const _q        = HAS3D ? new THREE.Quaternion() : null;
const _up       = HAS3D ? new THREE.Vector3(0,1,0) : null;

/* ★ TRUE ANGLE: half = table angle ka ADHA (bonds ±half pe) */
const geo    = { half:119.5/2, L:1.43*SCALE, rE:.58 };

function colHex(){ return colTgt ? '#'+colTgt.getHexString() : '#4A6FA5'; }
function deg(r){ return r*180/Math.PI; }

function rr(g,x,y,w,h,r){ g.beginPath();
  g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }

function makeLabel(text, opt){
  opt = opt || {};
  const fs = opt.fs || 40, pad = opt.pad != null ? opt.pad : 18;
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
  const s = opt.scale || .0085;
  sp.scale.set(w*s, h*s, 1);
  sp.renderOrder = 10;
  return sp;
}
function labelColors(){
  return { bg:cssVar('--card'), border:cssVar('--ink'), color:colHex(), soft:cssVar('--ink-soft') };
}

function makeShadowTex(){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64,64,4,64,64,62);
  const dark = themeCur === 'dark' ? '0,0,0' : '30,36,32';
  grd.addColorStop(0, 'rgba('+dark+',.28)');
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
  const key  = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(3.5,5,4.5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xfff2dd, .35); fill.position.set(-4,1,-3); scene.add(fill);
  const rim  = new THREE.PointLight(0x4A6FA5, .6, 30); rim.position.set(-4,-2.5,3); scene.add(rim);
  window._rim = rim;

  shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.2),
    new THREE.MeshBasicMaterial({ map:makeShadowTex(), transparent:true, depthWrite:false })
  );
  shadowMesh.rotation.x = -Math.PI/2;
  shadowMesh.position.y = -2.9;
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
  g.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material){
      if (o.material.map) o.material.map.dispose();
      o.material.dispose();
    }
  });
}

/* ---------- bond directions (molecule plane z=0) ---------- */
function bondDirs(d){
  if (d.bonds === 2){
    /* BENT: bonds ±(ang/2) se → beech = ang (TRUE ANGLE) */
    const a = geo.half * Math.PI/180;
    return [ new THREE.Vector3(-Math.sin(a), -Math.cos(a), 0),
             new THREE.Vector3( Math.sin(a), -Math.cos(a), 0) ];
  }
  /* TRIGONAL PLANAR: exact 120° apart */
  return [ new THREE.Vector3(0, -1, 0),
           new THREE.Vector3(-Math.cos(Math.PI/6), Math.sin(Math.PI/6), 0),
           new THREE.Vector3( Math.cos(Math.PI/6), Math.sin(Math.PI/6), 0) ];
}

/* ---------- build molecule (per selection — bond count badalta hai) ---------- */
function buildMolecule(d){
  if (molGroup){ scene.remove(molGroup); disposeGroup(molGroup); }
  molGroup = new THREE.Group(); scene.add(molGroup);
  lpGroup  = new THREE.Group();
  angGroup = new THREE.Group();
  lenGroup = new THREE.Group();
  molGroup.add(lpGroup, angGroup, lenGroup);
  molGroup.userData = { o:[], bh:[], eMesh:null };

  const c = colHex();

  /* central atom */
  eMat = new THREE.MeshStandardMaterial({ color:c, roughness:.28, metalness:.12, emissive:c, emissiveIntensity:.14 });
  const eMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), eMat);
  molGroup.add(eMesh); molGroup.userData.eMesh = eMesh;

  /* O atoms — CPK-ish red */
  const ov = cssVar('--verm') || '#C94F2E';
  oMat = new THREE.MeshStandardMaterial({ color:ov, roughness:.32, metalness:.05, emissive:ov, emissiveIntensity:.10 });
  for (let i=0;i<d.bonds;i++){
    const m = new THREE.Mesh(new THREE.SphereGeometry(O_R, 48, 48), oMat);
    molGroup.add(m); molGroup.userData.o.push(m);
  }

  /* bonds — double-stick if BO > 1 (resonance visual) */
  bondMat = new THREE.MeshStandardMaterial({ color:c, roughness:.4, metalness:.2 });
  const dbl = d.boVal >= 1.25, br = dbl ? BOND_R*.62 : BOND_R;
  for (let i=0;i<d.bonds;i++){
    const holder = new THREE.Group(); holder.userData.cyls = [];
    if (dbl){
      [-.10,.10].forEach(off => {
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(br, br, 1, 20), bondMat);
        cyl.position.set(off, 0, 0); holder.add(cyl); holder.userData.cyls.push(cyl);
      });
    } else {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(br, br, 1, 24), bondMat);
      holder.add(cyl); holder.userData.cyls.push(cyl);
    }
    molGroup.add(holder); molGroup.userData.bh.push(holder);
  }

  /* lone pairs */
  lpMats = [];
  for (let i=0;i<d.lp;i++){
    const lmat = new THREE.MeshStandardMaterial({
      color:c, transparent:true, opacity:.18, roughness:.2, metalness:0,
      emissive:c, emissiveIntensity:.25, depthWrite:false });
    lpMats.push(lmat);
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(.30, 32, 32), lmat);
    lobe.scale.set(d.lpMode==='sp2' ? .85 : .75, d.lpMode==='sp2' ? 1.15 : 1.4, .75);
    const holder = new THREE.Group(); holder.add(lobe);
    const eg = new THREE.Group();
    const dmat = new THREE.MeshBasicMaterial({ color:c });
    [-.08,.08].forEach(off => {
      const dd = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 16), dmat);
      dd.position.set(off, .05, 0); eg.add(dd);
    });
    lobe.add(eg);
    lpGroup.add(holder);
  }

  /* angle arc — bent: -half→+half (bottom), trigonal: 30°→150° (top) */
  const arcGeo = new THREE.BufferGeometry();
  arcGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(40*3), 3));
  arcLine = new THREE.Line(arcGeo, new THREE.LineDashedMaterial({ color:c, dashSize:.07, gapSize:.05 }));
  angGroup.add(arcLine);
  arcLabel = makeLabel(d.ba + '°', labelColors());
  angGroup.add(arcLabel);

  /* bond-length labels */
  lenLabels = [];
  for (let i=0;i<d.bonds;i++){
    const s = makeLabel(d.bl + ' Å', labelColors());
    lenGroup.add(s); lenLabels.push(s);
  }

  /* element symbols */
  symSprites = [];
  const eSym = makeLabel(d.sym, { plain:true, fs:d.sym.length>1?46:60, color:'#ffffff', scale:.0062 });
  molGroup.add(eSym); symSprites.push(eSym);
  for (let i=0;i<d.bonds;i++){
    const s = makeLabel('O', { plain:true, fs:48, color:cssVar('--ink') || '#1E2420', scale:.0062 });
    molGroup.add(s); symSprites.push(s);
  }

  /* toggle states apply */
  angGroup.visible = angOn;
  lenGroup.visible = lenOn;
  lpGroup.visible  = lpOn && d.lp > 0;

  /* ★ geometry EXACT data se — koi tween-jugaad nahi */
  geo.half = d.ang / 2;
  geo.L    = d.L;
  geo.rE   = d.rE;
  updateGeometry();
  popT = 0;
}

function updateGeometry(){
  const d = OXD[current];
  if (!molGroup || !d || !_q) return;
  const L = geo.L, rE = geo.rE;

  molGroup.userData.eMesh.scale.setScalar(rE);

  const dirs = bondDirs(d);
  dirs.forEach((dir, i) => {
    molGroup.userData.o[i].position.copy(dir).multiplyScalar(L);
    symSprites[i+1].position.copy(dir).multiplyScalar(L);

    const holder = molGroup.userData.bh[i];
    _q.setFromUnitVectors(_up, dir);
    holder.quaternion.copy(_q);
    holder.userData.cyls.forEach(cyl => { cyl.scale.set(1, L, 1); cyl.position.y = L/2; });

    const perp = new THREE.Vector3(-dir.y, dir.x, 0).multiplyScalar(.55);
    lenLabels[i].position.copy(dir).multiplyScalar(L*.55).add(perp).add(new THREE.Vector3(0,0,.55));
  });
  symSprites[0].position.set(0,0,0);

  /* lone pairs */
  if (d.lp === 1){
    /* sp² LP — molecular plane ke ANDAR, bonds se 120° (chemically sahi) */
    const h = lpGroup.children[0];
    h.position.set(0, rE + .45, 0);
    h.quaternion.identity();
  } else if (d.lp === 2){
    /* sp³ simplified (TeO₂) — ±Z tetrahedral-ish */
    const halfRad = geo.half * Math.PI/180;
    const lpA = Math.acos(Math.min(.95, Math.max(.25, .334/Math.cos(halfRad))));
    lpGroup.children.forEach((h, i) => {
      const sg = i === 0 ? 1 : -1;
      const dir = new THREE.Vector3(0, Math.cos(lpA), sg*Math.sin(lpA));
      h.position.copy(dir).multiplyScalar(rE + .38);
      _q.setFromUnitVectors(_up, dir);
      h.quaternion.copy(_q);
    });
  }

  /* ★ angle arc — EXACT table angle */
  let a1, a2;
  if (d.bonds === 2){
    a1 = deg(Math.atan2(dirs[0].y, dirs[0].x));
    a2 = deg(Math.atan2(dirs[1].y, dirs[1].x));
  } else {
    a1 = deg(Math.atan2(dirs[2].y, dirs[2].x));
    a2 = deg(Math.atan2(dirs[1].y, dirs[1].x));
  }
  if (a1 > a2){ const t = a1; a1 = a2; a2 = t; }
  if (a2 - a1 > 180) a1 += 360;

  const R = Math.min(.95, L*.5);
  const pos = arcLine.geometry.attributes.position;
  for (let i=0;i<40;i++){
    const t = (a1 + (a2 - a1) * (i/39)) * Math.PI/180;
    pos.setXYZ(i, Math.cos(t)*R, Math.sin(t)*R, 0);
  }
  pos.needsUpdate = true;
  arcLine.geometry.computeBoundingSphere();
  arcLine.computeLineDistances();
  const mid = (a1 + a2)/2 * Math.PI/180;
  arcLabel.position.set(Math.cos(mid)*(R+.55), Math.sin(mid)*(R+.55), 0);
}

function refreshLabels(){
  if (!threeReady || current < 0 || !molGroup) return;
  const d = OXD[current];
  const LC = labelColors();
  const remap = (sp, text, opt) => {
    sp.material.map.dispose();
    sp.material = new THREE.SpriteMaterial({ map:makeLabel(text, opt || LC).material.map, transparent:true, depthTest:false });
    sp.renderOrder = 10;
  };
  remap(arcLabel, d.ba + '°');
  lenLabels.forEach(s => remap(s, d.bl + ' Å'));
  remap(symSprites[0], d.sym, { plain:true, fs:d.sym.length>1?46:60, color:'#ffffff', scale:.0062 });
  symSprites.forEach((s, i) => { if (i > 0) remap(s, 'O', { plain:true, fs:48, color:cssVar('--ink') || '#1E2420', scale:.0062 }); });
  if (oMat){
    const v = cssVar('--verm') || '#C94F2E';
    oMat.color.set(v); oMat.emissive.set(v);
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
    tgt.radius = Math.max(5.2, Math.min(12.5, tgt.radius * (1 + e.deltaY * .001)));
  }, {passive:false});
}
 $('#zin').addEventListener('click',  () => tgt.radius = Math.max(5.2,  tgt.radius - .9));
 $('#zout').addEventListener('click', () => tgt.radius = Math.min(12.5, tgt.radius + .9));
 $('#zreset').addEventListener('click', () => {
  tgt.theta = -.55; tgt.phi = 1.18; tgt.radius = 8.6;
  showToast('VIEW RESET');
});

let lastFrame = performance.now();
function threeLoop(now){
  requestAnimationFrame(threeLoop);
  const dt = Math.min(.05, (now - lastFrame)/1000); lastFrame = now;

  colCur.lerp(colTgt, Math.min(1, dt*5));
  if (eMat && bondMat){
    eMat.color.copy(colCur); eMat.emissive.copy(colCur);
    bondMat.color.copy(colCur);
    lpMats.forEach(m => { m.color.copy(colCur); m.emissive.copy(colCur); });
    if (window._rim) _rim.color.copy(colCur);
    if (arcLine) arcLine.material.color.copy(colCur);
  }

  if (popT < 1 && molGroup){
    popT = Math.min(1, popT + dt*2.2);
    const e = 1 - Math.pow(1 - popT, 3);
    molGroup.scale.setScalar(.7 + .3*e);
  }

  if (spinOn && !dragging3d && molGroup) molGroup.rotation.y += dt*.45;

  orbit.theta  += (tgt.theta  - orbit.theta)  * Math.min(1, dt*8);
  orbit.phi    += (tgt.phi    - orbit.phi)    * Math.min(1, dt*8);
  orbit.radius += (tgt.radius - orbit.radius) * Math.min(1, dt*8);
  const sp = Math.sin(orbit.phi);
  camera.position.set(
    camTarget.x + orbit.radius*sp*Math.sin(orbit.theta),
    camTarget.y + orbit.radius*Math.cos(orbit.phi),
    camTarget.z + orbit.radius*sp*Math.cos(orbit.theta)
  );
  camera.lookAt(camTarget);
  renderer.render(scene, camera);
}

/* ============================================================
   6. DYNAMIC LEWIS — double bonds + LP count + true angle
   ============================================================ */
function renderLewis(d){
  const svg = $('#lewisSvg');
  const half = (d.ang/2) * Math.PI/180;
  const cxL = 200, cyL = d.bonds === 2 ? 110 : 120;
  const R = 95, rE = 30, rO = 20;
  let dirs;
  if (d.bonds === 2){
    dirs = [[-Math.sin(half), Math.cos(half)], [Math.sin(half), Math.cos(half)]];
  } else {
    dirs = [[0,1], [-Math.sin(Math.PI/3), -.5], [Math.sin(Math.PI/3), -.5]];
  }
  let s = '';

  /* angle arc (peeche) */
  let path = '', labY;
  const pt = th => d.bonds === 2
    ? [cxL + Math.sin(th)*34, cyL + Math.cos(th)*34]
    : [cxL - Math.sin(th)*34, cyL - Math.cos(th)*34];
  const a1 = d.bonds === 2 ? -half : -Math.PI/3;
  const a2 = d.bonds === 2 ?  half :  Math.PI/3;
  for (let i=0;i<=24;i++){
    const th = a1 + (a2 - a1)*i/24;
    const [px,py] = pt(th);
    path += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1) + ' ';
  }
  labY = d.bonds === 2 ? cyL + 54 : cyL - 50;
  s += `<g class="lewis-ang"><path d="${path}" fill="none" stroke="var(--tc)" stroke-width="2" stroke-dasharray="4 4"/><text class="lA" font-size="15" fill="var(--tc)" text-anchor="middle" x="${cxL}" y="${labY}">${d.ba}°</text></g>`;

  /* bonds — solid + dashed (resonance = partial double) */
  dirs.forEach(dir => {
    const perp = [-dir[1], dir[0]];
    const sx = cxL + dir[0]*(rE-4), sy = cyL + dir[1]*(rE-4);
    const ox = cxL + dir[0]*R, oy = cyL + dir[1]*R;
    const ex = ox - dir[0]*(rO+2), ey = oy - dir[1]*(rO+2);
    [-3.2, 3.2].forEach(sg => {
      const dash = sg < 0 ? '' : ' stroke-dasharray="6 4"';
      s += `<line x1="${(sx+perp[0]*sg).toFixed(1)}" y1="${(sy+perp[1]*sg).toFixed(1)}" x2="${(ex+perp[0]*sg).toFixed(1)}" y2="${(ey+perp[1]*sg).toFixed(1)}" stroke="var(--ink)" stroke-width="2.6"${dash}/>`;
    });
  });

  /* O atoms */
  dirs.forEach(dir => {
    const ox = cxL + dir[0]*R, oy = cyL + dir[1]*R;
    s += `<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${rO}" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/><text class="lH" x="${ox.toFixed(1)}" y="${(oy+6).toFixed(1)}" font-size="16" text-anchor="middle" fill="var(--ink)">O</text>`;
  });

  /* central atom */
  const fs = d.sym.length > 1 ? 22 : 26;
  s += `<circle cx="${cxL}" cy="${cyL}" r="${rE}" fill="var(--tc)" stroke="var(--ink)" stroke-width="2"/><text class="lE" x="${cxL}" y="${cyL + fs*0.34}" font-size="${fs}" text-anchor="middle" fill="#fff">${d.sym}</text>`;

  /* lone pairs */
  let dots = '';
  if (d.lp === 1){
    dots = `<circle cx="${cxL-11}" cy="${cyL-42}" r="4.5" fill="var(--tc)"/><circle cx="${cxL+11}" cy="${cyL-42}" r="4.5" fill="var(--tc)"/><text class="lA" x="${cxL}" y="${cyL-58}" font-size="9" letter-spacing="2" fill="var(--ink-soft)" text-anchor="middle">1 LONE PAIR</text>`;
  } else if (d.lp === 2){
    dots = `<circle cx="${cxL-46}" cy="${cyL-28}" r="4.5" fill="var(--tc)"/><circle cx="${cxL-32}" cy="${cyL-40}" r="4.5" fill="var(--tc)"/><circle cx="${cxL+32}" cy="${cyL-40}" r="4.5" fill="var(--tc)"/><circle cx="${cxL+46}" cy="${cyL-28}" r="4.5" fill="var(--tc)"/><text class="lA" x="${cxL}" y="${cyL-58}" font-size="9" letter-spacing="2" fill="var(--ink-soft)" text-anchor="middle">2 LONE PAIRS</text>`;
  }
  if (dots) s += `<g class="lewis-dots">${dots}</g>`;

  svg.innerHTML = s;
}

/* ============================================================
   7. SELECT — panel + 3D + lewis sab sync
   ============================================================ */
function select(i){
  current = i;
  const d = OXD[i];

  const c = cssVar(d.vk);
  if (colTgt && c) colTgt.set(c);

  ['#stage3d','#datacard','#lewiscard'].forEach(sel => {
    const p = $(sel);
    if (p) p.style.setProperty('--tc', `var(${d.vk})`);
  });

  $('#selChip').textContent = d.f;
  $('#mName').innerHTML = `${d.name} <em>· ${d.f}</em>`;
  $('#mShape').textContent = d.tag;
  $('#dTag').textContent = d.f;
  $('#dName').textContent = d.name;
  $('#dHyb').textContent = d.hyb;
  $('#dShape').textContent = d.shape;
  $('#dGeo').textContent = d.geo;
  $('#dBO').textContent = d.bo;
  $('#dBL').innerHTML = `<span class="hl">${d.bl}</span> Å`;
  $('#dBA').innerHTML = d.baHtml;
  $('#dMass').textContent = d.mass;
  $('#dOx').textContent = d.ox;
  $('#dState').textContent = d.state;
  const stag = $('#stateTag');
  if (d.poly){ stag.style.display = 'inline-block'; stag.textContent = '⚠ EXTENDED SOLID'; }
  else stag.style.display = 'none';
  $('#dNote').innerHTML = d.note;
  $('#dFact').innerHTML = d.fact;
  $('#lSym2').textContent = '· ' + d.f;
  $('#lSub').textContent = d.lsub;
  renderLewis(d);

  $$('.pick').forEach((p, idx) => p.classList.toggle('active', idx === i));

  /* toggles sync */
  const tlp = $('#tglLP');
  if (d.lp === 0){ tlp.disabled = true; tlp.classList.remove('on'); document.body.classList.add('lp-off'); }
  else { tlp.disabled = false; tlp.classList.toggle('on', lpOn); document.body.classList.toggle('lp-off', !lpOn); }
  const tan = $('#tglANG');
  tan.classList.toggle('on', angOn); document.body.classList.toggle('ang-off', !angOn);
  $('#tglLEN').classList.toggle('on', lenOn);
  $('#tglSPIN').classList.toggle('on', spinOn);

  if (threeReady) buildMolecule(d);

  ['#drows','#dnote','#lewisWrap'].forEach(sel => {
    const el = $(sel); if (!el) return;
    el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
  });

  showToast(`${d.f} LOADED — ${d.shape.toUpperCase()} · ${d.ba}°`);
}

/* ============================================================
   8. PICKS + TOGGLES + BOOT
   ============================================================ */
const picksEl = $('#picks');
OXD.forEach((d, i) => {
  const b = document.createElement('button');
  b.className = 'pick';
  b.style.setProperty('--tc', `var(${d.vk})`);
  b.style.setProperty('--tilt', (i % 2 ? 1.4 : -1.4) + 'deg');
  b.dataset.i = i;
  b.innerHTML =
    `<span class="p-no">OXIDE 0${i+1}</span>` +
    `<span class="p-sym">${d.f}</span>` +
    `<span class="p-name">${d.name.toUpperCase()}</span>` +
    `<span class="p-angle">${d.pickAng}</span>` +
    `<span class="p-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>`;
  b.addEventListener('click', () => select(i));
  picksEl.appendChild(b);
});
const pickIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.style.setProperty('--d', (e.target.dataset.i * .08) + 's');
    e.target.classList.add('in');
    pickIO.unobserve(e.target);
  }
}), { threshold: .15 });
 $$('.pick').forEach(p => pickIO.observe(p));

 $('#tglLP').addEventListener('click', () => {
  if ($('#tglLP').disabled) return;
  lpOn = !lpOn;
  $('#tglLP').classList.toggle('on', lpOn);
  document.body.classList.toggle('lp-off', !lpOn);
  if (lpGroup && current > -1) lpGroup.visible = lpOn && OXD[current].lp > 0;
});
 $('#tglANG').addEventListener('click', () => {
  angOn = !angOn;
  $('#tglANG').classList.toggle('on', angOn);
  document.body.classList.toggle('ang-off', !angOn);
  if (angGroup) angGroup.visible = angOn;
});
 $('#tglLEN').addEventListener('click', () => {
  lenOn = !lenOn;
  $('#tglLEN').classList.toggle('on', lenOn);
  if (lenGroup) lenGroup.visible = lenOn;
});
 $('#tglSPIN').addEventListener('click', () => {
  spinOn = !spinOn;
  $('#tglSPIN').classList.toggle('on', spinOn);
});

 $('#toTop').addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
 $('#backBtn').addEventListener('click', () => location.href = 'group16.html');
$('#toTop').addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));

/* background anim loop */
let bgLast = performance.now();
(function bgLoop(now){
  requestAnimationFrame(bgLoop);
  const dt = Math.min(.05, ((now || performance.now()) - bgLast)/1000) * 60; bgLast = now || performance.now();
  drawBG(Math.max(.5, dt));
})(bgLast);

/* boot */
initThree();
select(0);
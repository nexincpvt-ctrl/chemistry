/* ============================================================
   NEXINC — HALIDES LAB · TRUE-ANGLE EDITION

   ★ CORE RULE (user demand):
   Data panel me jo angle list hai, 3D me EXACT wahi render ho.
   - BENT  : bonds ±(angle/2) pe → beech ka angle = listed angle
   - SEESAW: A(ax–ax) & E(eq–eq) se geometry banti hai; ax–eq
             angle geometry se CALCULATE hoke wahi value list hoti hai
   - OCT   : 90° / 180° exact arcs
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RAD = Math.PI/180;
const v3  = (x,y,z) => new THREE.Vector3(x,y,z);

/* round: 103 → "103", 87.8 → "87.8" (data & 3D same string) */
const fmtA = v => { const r = Math.round(v*10)/10;
  return Math.abs(r-Math.round(r)) < .05 ? String(Math.round(r)) : r.toFixed(1); };

/* ax–eq angle: C₂v see-saw me A aur E se determine hota hai */
function seesawAE(A,E){
  const d=(180-A)/2*RAD, g=E/2*RAD;
  return Math.acos(Math.min(1,Math.max(-1,Math.sin(d)*Math.cos(g))))/RAD;
}

/* ---------- 0. DATA — 9 halides ---------- */
const HAL = [
  /* ---- EX₂ · DIHALIDES ---- */
  { f:'SCl₂', sym:'S',  term:'Cl', fam:'AX2', famLabel:'EX₂', vk:'--blue',
    name:'Sulfur dichloride', hyb:'sp³', shape:'Bent', geoName:'Tetrahedral', bo:'1',
    blTxt:'<span class="hl">2.02</span> Å', bl:2.02, half:51.5, rE:.72, rT:.52,
    mass:'102.97', state:'LIQUID', bp:'59°C', bpTag:'',
    note:'<b>S central</b>, 2 lone pairs, 2 S–Cl single bonds; bent',
    fact:'<b>Mustard gas</b> synthesis — SCl₂ + 2 C₂H₄ → (ClCH₂CH₂)₂S' },
  { f:'SeCl₂', sym:'Se', term:'Cl', fam:'AX2', famLabel:'EX₂', vk:'--blue',
    name:'Selenium dichloride', hyb:'sp³', shape:'Bent', geoName:'Tetrahedral', bo:'1',
    blTxt:'<span class="hl">2.16</span> Å', bl:2.16, half:50.5, rE:.78, rT:.52,
    mass:'149.87', state:'LIQUID', bp:'~130°C', bpTag:'',
    note:'<b>Se central</b>, 2 lone pairs, 2 Se–Cl single bonds; bent',
    fact:'+2 state ki stability <b>S &gt; Se &gt; Te</b> — Se ka dihalide abhi bhi stable' },
  { f:'TeCl₂', sym:'Te', term:'Cl', fam:'AX2', famLabel:'EX₂', vk:'--blue',
    name:'Tellurium dichloride', hyb:'sp³', shape:'Bent', geoName:'Tetrahedral', bo:'1',
    blTxt:'<span class="hl">2.35</span> Å', bl:2.35, half:49.5, rE:.84, rT:.52,
    mass:'198.50', state:'SOLID', bp:'UNSTABLE', bpTag:'⚠ DISPROP.',
    note:'<b>Te central</b>, 2 lone pairs, 2 Te–Cl single bonds; bent',
    fact:'<b>Unstable</b> — 2 TeCl₂ → Te + TeCl₄ (disproportionation)' },

  /* ---- EX₄ · TETRAFLUORIDES ---- */
  { f:'SF₄', sym:'S',  term:'F', fam:'AX4E', famLabel:'EX₄', vk:'--amber',
    name:'Sulfur tetrafluoride', hyb:'sp³d', shape:'See-saw', geoName:'Tri. bipyramidal', bo:'1',
    blTxt:'<span class="hl">1.55</span> Å (eq) · <span class="hl">1.65</span> Å (ax)',
    A:173, E:102, Lax:1.65, Leq:1.55, rE:.72, rT:.42,
    mass:'108.07', state:'GAS', bp:'−38°C', bpTag:'',
    note:'<b>S central</b>, 4 S–F single bonds, 1 equatorial lone pair; see-saw',
    fact:'<b>Best selective fluorinating agent</b> — C=O → CF₂ (JEE favourite)' },
  { f:'SeF₄', sym:'Se', term:'F', fam:'AX4E', famLabel:'EX₄', vk:'--amber',
    name:'Selenium tetrafluoride', hyb:'sp³d', shape:'See-saw', geoName:'Tri. bipyramidal', bo:'1',
    blTxt:'<span class="hl">1.68</span> Å (eq) · <span class="hl">1.78</span> Å (ax)',
    A:170, E:102, Lax:1.78, Leq:1.68, rE:.78, rT:.42,
    mass:'154.97', state:'LIQUID', bp:'101°C', bpTag:'',
    note:'<b>Se central</b>, 4 Se–F single bonds, 1 equatorial lone pair; see-saw',
    fact:'<b>Liquid @ RT</b> (bp 101°C) · SF₄ jaisa fluorinating agent, thoda kam use' },
  { f:'TeF₄', sym:'Te', term:'F', fam:'AX4E', famLabel:'EX₄', vk:'--amber',
    name:'Tellurium tetrafluoride', hyb:'sp³d', shape:'See-saw', geoName:'Tri. bipyramidal', bo:'1',
    blTxt:'<span class="hl">1.85</span> Å (eq) · <span class="hl">1.97</span> Å (ax)',
    A:166, E:100, Lax:1.97, Leq:1.85, rE:.84, rT:.42,
    mass:'203.60', state:'SOLID', bp:'SUBLIMES', bpTag:'⚠ POLYMERIC',
    note:'<b>Te central</b>, 4 Te–F single bonds, 1 equatorial lone pair; see-saw',
    fact:'Polymeric solid (F-bridges) · tetrafluorides me <b>strongest fluorinating agent</b>' },

  /* ---- EX₆ · HEXAFLUORIDES ---- */
  { f:'SF₆', sym:'S',  term:'F', fam:'AX6', famLabel:'EX₆', vk:'--green',
    name:'Sulfur hexafluoride', hyb:'sp³d²', shape:'Octahedral', geoName:'Octahedral', bo:'1',
    blTxt:'<span class="hl">1.56</span> Å', bl:1.56, rE:.74, rT:.42,
    mass:'146.07', state:'GAS', bp:'−64°C (sub)', bpTag:'⚠ INERT',
    note:'<b>S central</b>, 6 S–F single bonds, no lone pair; octahedral',
    fact:'<b>Bahut inert</b> — high-voltage electrical insulator · greenhouse potential ~23,500× CO₂' },
  { f:'SeF₆', sym:'Se', term:'F', fam:'AX6', famLabel:'EX₆', vk:'--green',
    name:'Selenium hexafluoride', hyb:'sp³d²', shape:'Octahedral', geoName:'Octahedral', bo:'1',
    blTxt:'<span class="hl">1.68</span> Å', bl:1.68, rE:.78, rT:.42,
    mass:'192.97', state:'GAS', bp:'−35°C', bpTag:'',
    note:'<b>Se central</b>, 6 Se–F single bonds, no lone pair; octahedral',
    fact:'SF₆ jitna inert nahi · <b>slow hydrolysis</b> · gaseous dielectric' },
  { f:'TeF₆', sym:'Te', term:'F', fam:'AX6', famLabel:'EX₆', vk:'--green',
    name:'Tellurium hexafluoride', hyb:'sp³d²', shape:'Octahedral', geoName:'Octahedral', bo:'1',
    blTxt:'<span class="hl">1.85</span> Å', bl:1.85, rE:.84, rT:.42,
    mass:'241.60', state:'GAS', bp:'−39°C', bpTag:'⚠ REACTIVE',
    note:'<b>Te central</b>, 6 Te–F single bonds, no lone pair; octahedral',
    fact:'<b>Most reactive hexafluoride</b> — TeF₆ + 6 H₂O → H₆TeO₆ + 6 HF' },
];

/* angles derive — ek hi source of truth: geometry */
HAL.forEach(m=>{
  if(m.fam==='AX2'){
    m.angChip = '∠'+fmtA(m.half*2)+'°';
    m.angData = `<span class="hl">${fmtA(m.half*2)}</span>°`;
  }else if(m.fam==='AX4E'){
    m.ae = seesawAE(m.A, m.E);
    m.angChip = `∠${fmtA(m.ae)}°·${m.E}°·${m.A}°`;
    m.angData = `<span class="hl">${fmtA(m.ae)}</span>° · <span class="hl">${m.E}</span>° · <span class="hl">${m.A}</span>°<span class="asub">AX–EQ · EQ–EQ · AX–AX</span>`;
  }else{
    m.angChip = '∠90° · 180°';
    m.angData = '<span class="hl">90</span>° · <span class="hl">180</span>°<span class="asub">ADJACENT · TRANS</span>';
  }
});

let current = 0;

function cssVar(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

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
    if (colTgt && HAL[current]){
      const c = cssVar(HAL[current].vk);
      if (c) colTgt.set(c);
    }
    if (shadowMesh){
      shadowMesh.material.map.dispose();
      shadowMesh.material.map = makeShadowTex();
    }
    symMeta.forEach(mt => { if(mt.sp) mt.sp.userData.key=''; });
    updateGeometry();              /* labels theme ke saath refresh */
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
(function bgLoop(t){ requestAnimationFrame(bgLoop);
  const now=t||performance.now(), dt=Math.min(.05,(now-(lastT||now))/1000); lastT=now;
  drawBG(dt*60); })();

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
   5. 3D ENGINE — 3 GEOMETRY BUILDERS
   ============================================================ */
const vpBox = $('#viewport'), glCanvas = $('#gl');
const HAS3D = !!window.THREE;

let renderer=null, scene, camera, molGroup=null, lpGroup=null, angGroup=null, lenGroup=null, shadowMesh=null;
let eMat=null, bondMat=null, termMat=null, lpMats=[], arcs=[], lenLabels=[], symMeta=[];
let threeReady=false, dragging3d=false, popS=1, curFam=null;

const orbit = { theta:-.6, phi:1.2, radius:10.2 };
const tgt   = { theta:-.6, phi:1.2, radius:10.2 };

const colCur    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const colTgt    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const camTarget = HAS3D ? new THREE.Vector3(0,0,0) : null;
const _q        = HAS3D ? new THREE.Quaternion() : null;
const _up       = HAS3D ? new THREE.Vector3(0,1,0) : null;

let geo = {}, geoTgt = {};

const TERM_COL = { F:'#BCE3A6', Cl:'#66C86E' };

function colHex(){ return colTgt ? '#'+colTgt.getHexString() : '#4A6FA5'; }
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
function setSpriteText(sp, txt, opt){
  opt = opt || {};
  const key = (opt.plain?'p':'c')+'|'+themeCur+'|'+txt+'|'+(opt.color||'')+'|'+(opt.fs||40);
  if (sp.userData.key === key) return;
  sp.userData.key = key;
  const tmp = makeLabel(txt, opt);
  if (sp.material.map) sp.material.map.dispose();
  sp.material.map = tmp.material.map;
  sp.scale.copy(tmp.scale);
  sp.material.needsUpdate = true;
  tmp.material.dispose();
}
function labelColors(){
  return { bg:cssVar('--card'), border:cssVar('--ink'), color:colHex() };
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
  try{ renderer = new THREE.WebGLRenderer({ canvas:glCanvas, alpha:true, antialias:true }); }
  catch(e){ $('#vpFallback').style.display='grid'; return; }
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
    new THREE.PlaneGeometry(5.4, 5.4),
    new THREE.MeshBasicMaterial({ map:makeShadowTex(), transparent:true, depthWrite:false })
  );
  shadowMesh.rotation.x = -Math.PI/2;
  shadowMesh.position.y = -2.55;
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

function disposeDeep(g){
  g.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material){
      (Array.isArray(o.material)?o.material:[o.material]).forEach(mt => {
        if (mt.map) mt.map.dispose();
        mt.dispose();
      });
    }
  });
}

/* bond directions — data-driven, exact */
function curDirs(){
  const m = HAL[current];
  if (m.fam === 'AX2'){
    const h = geo.half * RAD;
    return [ {d:v3(-Math.sin(h),-Math.cos(h),0), L:geo.L, k:'eq'},
             {d:v3( Math.sin(h),-Math.cos(h),0), L:geo.L, k:'eq'} ];
  }
  if (m.fam === 'AX4E'){
    const d = (180-geo.A)/2 * RAD, g = geo.E/2 * RAD;
    return [ {d:v3( Math.sin(g), Math.cos(g), 0), L:geo.Leq, k:'eq'},
             {d:v3(-Math.sin(g), Math.cos(g), 0), L:geo.Leq, k:'eq'},
             {d:v3(0, Math.sin(d),  Math.cos(d)), L:geo.Lax, k:'ax'},
             {d:v3(0, Math.sin(d), -Math.cos(d)), L:geo.Lax, k:'ax'} ];
  }
  return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
    .map(v => ({d:v3(v[0],v[1],v[2]), L:geo.L, k:'eq'}));
}

function addArc(R, dirFn, txtFn, off){
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(48*3), 3));
  const line = new THREE.Line(g, new THREE.LineDashedMaterial({ color:colHex(), dashSize:.07, gapSize:.05 }));
  const label = makeLabel('…', labelColors());
  angGroup.add(line, label);
  arcs.push({ line, label, R, dirFn, txtFn, off: off != null ? off : .5 });
}
function slerpDir(a, b, t){
  let d = THREE.MathUtils.clamp(a.dot(b), -1, 1);
  const O = Math.acos(d);
  if (O < 1e-4) return a.clone();
  const s = Math.sin(O);
  return a.clone().multiplyScalar(Math.sin((1-t)*O)/s)
          .add(b.clone().multiplyScalar(Math.sin(t*O)/s)).normalize();
}

function buildMolecule(m){
  if (molGroup){ scene.remove(molGroup); disposeDeep(molGroup); }
  molGroup = new THREE.Group(); scene.add(molGroup);
  lpGroup = new THREE.Group(); angGroup = new THREE.Group(); lenGroup = new THREE.Group();
  molGroup.add(lpGroup, angGroup, lenGroup);
  arcs = []; lenLabels = []; symMeta = []; lpMats = [];

  const c = colHex();

  /* central atom */
  eMat = new THREE.MeshStandardMaterial({ color:c, roughness:.28, metalness:.12, emissive:c, emissiveIntensity:.14 });
  const eMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), eMat);
  molGroup.add(eMesh); molGroup.userData.eMesh = eMesh;

  /* terminals + bonds */
  termMat = new THREE.MeshStandardMaterial({ color:new THREE.Color(TERM_COL[m.term]), roughness:.32, metalness:.05 });
  bondMat = new THREE.MeshStandardMaterial({ color:c, roughness:.4, metalness:.2 });

  /* geo targets — family ke hisaab se */
  if (m.fam === 'AX2')       geoTgt = { half:m.half, L:m.bl, rE:m.rE };
  else if (m.fam === 'AX4E') geoTgt = { A:m.A, E:m.E, Lax:m.Lax, Leq:m.Leq, rE:m.rE };
  else                       geoTgt = { L:m.bl, rE:m.rE };
  geo = { ...geoTgt };

  const dirs0 = curDirs();
  molGroup.userData.nT = dirs0.length;

  /* center symbol */
  const symE = makeLabel(m.sym, { plain:true, fs:60, color:'#FFFFFF', scale:.006 });
  molGroup.add(symE);
  symMeta.push({ sp:symE, txt:m.sym, fs:60, color:'#FFFFFF', scale:.006 });

  dirs0.forEach((b, i) => {
    const atom = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 48), termMat);
    atom.scale.setScalar(m.rT); molGroup.add(atom);
    molGroup.userData['a'+i] = atom;

    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, 1, 24), bondMat);
    molGroup.add(cyl); molGroup.userData['b'+i] = cyl;

    const sym = makeLabel(m.term, { plain:true, fs:42, color:cssVar('--ink')||'#1E2420', scale:.0055 });
    molGroup.add(sym);
    symMeta.push({ sp:sym, txt:m.term, fs:42, color:cssVar('--ink')||'#1E2420', scale:.0055 });
  });

  /* lone pairs */
  if (m.fam === 'AX2'){
    lpMats = [];
    ['lp1','lp2'].forEach(n => {
      const lmat = new THREE.MeshStandardMaterial({ color:c, transparent:true, opacity:.18, roughness:.2, metalness:0, emissive:c, emissiveIntensity:.25, depthWrite:false });
      lpMats.push(lmat);
      const lobe = new THREE.Mesh(new THREE.SphereGeometry(.32, 32, 32), lmat);
      lobe.scale.set(.75, 1.4, .75);
      const holder = new THREE.Group(); holder.name = n; holder.add(lobe);
      const eg = new THREE.Group();
      const dmat = new THREE.MeshBasicMaterial({ color:c });
      [-.08,.08].forEach(off => {
        const d = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 16), dmat);
        d.position.set(off, .05, 0); eg.add(d);
      });
      lobe.add(eg);
      lpGroup.add(holder);
    });
  } else if (m.fam === 'AX4E'){
    lpMats = [];
    const lmat = new THREE.MeshStandardMaterial({ color:c, transparent:true, opacity:.18, roughness:.2, metalness:0, emissive:c, emissiveIntensity:.25, depthWrite:false });
    lpMats.push(lmat);
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(.34, 32, 32), lmat);
    lobe.scale.set(.8, 1.55, .8);
    const holder = new THREE.Group(); holder.name = 'lp1'; holder.add(lobe);
    const eg = new THREE.Group();
    const dmat = new THREE.MeshBasicMaterial({ color:c });
    [-.08,.08].forEach(off => {
      const d = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 16), dmat);
      d.position.set(off, .06, 0); eg.add(d);
    });
    lobe.add(eg);
    lpGroup.add(holder);
  }

  /* ---- ANGLE ARCS — family ke hisaab se, values = data ---- */
  if (m.fam === 'AX2'){
    /* arc −half → +half ⇒ visible angle = 2×half = LISTED */
    addArc(1.15,
      t => { const a = (-geo.half + 2*geo.half*t) * RAD;
             return v3(Math.sin(a), -Math.cos(a), 0); },
      () => fmtA(geo.half*2) + '°', .5);
  }
  else if (m.fam === 'AX4E'){
    /* ax–ax arc: ±axial bonds ke beech, top ke upar se = A */
    addArc(1.2,
      t => { const d = (180-geo.A)/2;
             const th = (-(90-d) + (180-2*d)*t) * RAD;
             return v3(0, Math.cos(th), Math.sin(th)); },
      () => fmtA(geo.A) + '°', .55);
    /* eq–eq arc: dono equatorial = E */
    addArc(1.0,
      t => { const g = geo.E/2;
             const th = (-g + 2*g*t) * RAD;
             return v3(Math.sin(th), Math.cos(th), 0); },
      () => fmtA(geo.E) + '°', .45);
    /* ax–eq arc: slerp, label geometry se compute = wahi listed */
    addArc(1.05,
      t => { const d = (180-geo.A)/2 * RAD, g = geo.E/2 * RAD;
             return slerpDir(v3(0, Math.sin(d), Math.cos(d)), v3(Math.sin(g), Math.cos(g), 0), t); },
      () => fmtA(seesawAE(geo.A, geo.E)) + '°', .4);
  }
  else{
    /* 90° adjacent (+Y → +X) */
    addArc(.85,
      t => { const th = (90*t) * RAD; return v3(Math.sin(th), Math.cos(th), 0); },
      () => '90°', .45);
    /* 180° trans (+Y → −Y, −X side se) */
    addArc(1.25,
      t => { const th = (180*t) * RAD; return v3(-Math.sin(th), Math.cos(th), 0); },
      () => '180°', .78);
  }

  /* ---- bond length labels ---- */
  lenLabels = [];
  const nLab = m.fam === 'AX6' ? 3 : dirs0.length;
  for (let i = 0; i < nLab; i++){
    const sp = makeLabel('…', labelColors());
    lenGroup.add(sp);
    const idx = i, k = dirs0[Math.min(i, dirs0.length-1)].k;
    lenLabels.push({
      sp,
      txtFn: () => {
        const mm = HAL[current];
        return (mm.fam === 'AX4E' ? (k === 'ax' ? mm.Lax : mm.Leq) : mm.bl) + ' Å';
      },
      posFn: list => {
        const b = list[Math.min(idx, list.length-1)];
        const p = b.d.clone().multiplyScalar(b.L * .62);
        p.x += idx % 2 ? -.48 : .48;
        p.z += .55;
        return p;
      }
    });
  }
  lenGroup.visible = lenPref;

  updateGeometry();
}

function updateGeometry(){
  if (!molGroup || !threeReady || !_q) return;
  const m = HAL[current];
  if (!m) return;

  const list = curDirs();
  molGroup.userData.eMesh.scale.setScalar(geo.rE);

  list.forEach((b, i) => {
    const pos = b.d.clone().multiplyScalar(b.L);
    const atom = molGroup.userData['a'+i];
    if (atom) atom.position.copy(pos);
    const cyl = molGroup.userData['b'+i];
    if (cyl){
      cyl.scale.set(1, b.L, 1);
      cyl.position.copy(b.d.clone().multiplyScalar(b.L * .5));
      _q.setFromUnitVectors(_up, b.d);
      cyl.quaternion.copy(_q);
    }
    const sm = symMeta[i+1];
    if (sm && sm.sp) sm.sp.position.copy(pos);
  });
  if (symMeta[0] && symMeta[0].sp) symMeta[0].sp.position.set(0, 0, 0);

  /* lone pairs */
  if (m.fam === 'AX2'){
    const halfRad = geo.half * RAD;
    const lpA = Math.acos(Math.min(.95, Math.max(.25, .334 / Math.cos(halfRad))));
    [['lp1',1],['lp2',-1]].forEach(([n, sg]) => {
      const h = lpGroup.getObjectByName(n);
      if (!h) return;
      const dir = v3(0, Math.cos(lpA), sg * Math.sin(lpA));
      h.position.copy(dir.clone().multiplyScalar(geo.rE + .42));
      _q.setFromUnitVectors(_up, dir);
      h.quaternion.copy(_q);
    });
  } else if (m.fam === 'AX4E'){
    const h = lpGroup.getObjectByName('lp1');
    if (h){
      h.position.set(0, -(geo.rE + .5), 0);
      _q.setFromUnitVectors(_up, v3(0, -1, 0));
      h.quaternion.copy(_q);
    }
  }

  /* arcs — fill + label (label text = DATA VALUE, cached) */
  arcs.forEach(a => {
    const pos = a.line.geometry.attributes.position;
    for (let i = 0; i < 48; i++){
      const dir = a.dirFn(i / 47);
      pos.setXYZ(i, dir.x * a.R, dir.y * a.R, dir.z * a.R);
    }
    pos.needsUpdate = true;
    a.line.geometry.computeBoundingSphere();
    a.line.computeLineDistances();
    a.line.material.color.copy(colCur);
    a.label.position.copy(a.dirFn(.5).multiplyScalar(a.R + a.off));
    setSpriteText(a.label, a.txtFn(), labelColors());
  });

  lenLabels.forEach(l => {
    l.sp.position.copy(l.posFn(list));
    setSpriteText(l.sp, l.txtFn(), labelColors());
  });
}

function bindOrbitControls(){
  const el = renderer.domElement;
  let px = 0, py = 0;
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
    tgt.radius = Math.max(5.5, Math.min(15, tgt.radius * (1 + e.deltaY * .001)));
  }, {passive:false});
}
 $('#zin').addEventListener('click',  () => tgt.radius = Math.max(5.5, tgt.radius - .9));
 $('#zout').addEventListener('click', () => tgt.radius = Math.min(15, tgt.radius + .9));
 $('#zreset').addEventListener('click', () => {
  tgt.theta = -.6; tgt.phi = 1.2; tgt.radius = 10.2;
  showToast('VIEW RESET');
});

let lastFrame = performance.now();
const _sph = HAS3D ? new THREE.Spherical() : null;
function threeLoop(now){
  requestAnimationFrame(threeLoop);
  const dt = Math.min(.05, (now - lastFrame)/1000); lastFrame = now;

  colCur.lerp(colTgt, Math.min(1, dt*5));
  if (eMat){
    eMat.color.copy(colCur); eMat.emissive.copy(colCur);
    bondMat.color.copy(colCur);
    lpMats.forEach(mm => { mm.color.copy(colCur); mm.emissive.copy(colCur); });
    if (window._rim) _rim.color.copy(colCur);
    arcs.forEach(a => a.line.material.color.copy(colCur));
  }

  /* geo tween — label live count karta hai */
  let need = false;
  Object.keys(geoTgt).forEach(k => {
    const d = geoTgt[k] - geo[k];
    if (Math.abs(d) > 1e-3){ geo[k] += d * Math.min(1, dt*4.5); need = true; }
  });
  if (need) updateGeometry();

  if (popS < .999 && molGroup){
    popS += (1 - popS) * Math.min(1, dt*5);
    molGroup.scale.setScalar(popS);
  }

  if (spinPref && !dragging3d) tgt.theta += dt * .28;

  const k = Math.min(1, dt*9);
  orbit.theta  += (tgt.theta  - orbit.theta)  * k;
  orbit.phi    += (tgt.phi    - orbit.phi)    * k;
  orbit.radius += (tgt.radius - orbit.radius) * k;
  _sph.set(orbit.radius, orbit.phi, orbit.theta);
  camera.position.setFromSpherical(_sph).add(camTarget);
  camera.lookAt(camTarget);
  renderer.render(scene, camera);
}

/* ============================================================
   6. LEWIS — family ke hisaab se rebuild
   ============================================================ */
function buildLewis(m){
  const tc = `var(${m.vk})`, E = m.sym, T = m.term;
  const dot = (x,y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${tc}"/>`;
  let s = '', allDots = '', cap = '';

  if (m.fam === 'AX2'){
    s = `<line x1="182" y1="118" x2="116" y2="190" stroke="var(--ink)" stroke-width="3"/>
         <line x1="218" y1="118" x2="284" y2="190" stroke="var(--ink)" stroke-width="3"/>
         <circle cx="106" cy="198" r="23" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
         <text class="lH" x="106" y="205" font-size="18" text-anchor="middle" fill="var(--ink)">${T}</text>
         <circle cx="294" cy="198" r="23" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
         <text class="lH" x="294" y="205" font-size="18" text-anchor="middle" fill="var(--ink)">${T}</text>
         <circle cx="200" cy="108" r="32" fill="${tc}" stroke="var(--ink)" stroke-width="2"/>
         <text class="lE" x="200" y="117" font-size="25" text-anchor="middle" fill="#fff">${E}</text>`;
    allDots = dot(174,72)+dot(190,64)+dot(210,64)+dot(226,72);
    const a1 = Math.atan2(90,-94), a2 = Math.atan2(90,94);
    let arc = '';
    for (let i = 0; i <= 32; i++){
      const a = a1 + (a2 - a1) * i/32;
      arc += (i?'L':'M') + (200+Math.cos(a)*66).toFixed(1) + ' ' + (108+Math.sin(a)*66).toFixed(1) + ' ';
    }
    s += `<g class="lewis-ang"><path d="${arc}" fill="none" stroke="${tc}" stroke-width="2" stroke-dasharray="4 4"/>
          <text class="lA" x="200" y="192" font-size="15" fill="${tc}" text-anchor="middle">${fmtA(m.half*2)}°</text></g>
          <text class="lA" x="200" y="44" font-size="9" letter-spacing="2" fill="var(--ink-soft)" text-anchor="middle">2 LONE PAIRS</text>`;
    cap = `∠${T}–${E}–${T} = ${fmtA(m.half*2)}° — 3D arc = same`;
    $('#lSub').textContent = '2 BOND PAIRS · 2 LONE PAIRS';
  }
  else if (m.fam === 'AX4E'){
    const T4 = [[200,52],[200,204],[104,182],[296,182]];
    T4.forEach(([x,y]) => {
      const dx = x-200, dy = y-128, d = Math.hypot(dx,dy);
      s += `<line x1="${(200+dx/d*30).toFixed(1)}" y1="${(128+dy/d*30).toFixed(1)}" x2="${(x-dx/d*17).toFixed(1)}" y2="${(y-dy/d*17).toFixed(1)}" stroke="var(--ink)" stroke-width="3"/>
            <circle cx="${x}" cy="${y}" r="17" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
            <text class="lH" x="${x}" y="${y+5}" font-size="13" text-anchor="middle" fill="var(--ink)">${T}</text>`;
      const od = Math.atan2(dy,dx);
      for (let k2 = 0; k2 < 3; k2++){
        const base = od + k2*(2*Math.PI/3);
        [-.2,.2].forEach(off => {
          const a = base + off;
          allDots += dot(x+Math.cos(a)*25, y+Math.sin(a)*25);
        });
      }
    });
    s += `<circle cx="200" cy="128" r="30" fill="${tc}" stroke="var(--ink)" stroke-width="2"/>
          <text class="lE" x="200" y="137" font-size="23" text-anchor="middle" fill="#fff">${E}</text>
          <text class="lA" x="122" y="106" font-size="8.5" letter-spacing="1.5" fill="var(--ink-soft)" text-anchor="middle">1 LP (EQ.)</text>`;
    allDots += dot(150,122) + dot(150,138);
    cap = `ax–ax ${m.A}° · eq–eq ${m.E}° · ax–eq ${fmtA(m.ae)}° — 3D arcs = same`;
    $('#lSub').textContent = '4 BOND PAIRS · 1 LONE PAIR';
  }
  else{
    const T6 = [[200,50],[200,206],[102,128],[298,128],[268,74],[132,182]];
    T6.forEach(([x,y]) => {
      const dx = x-200, dy = y-128, d = Math.hypot(dx,dy);
      s += `<line x1="${(200+dx/d*30).toFixed(1)}" y1="${(128+dy/d*30).toFixed(1)}" x2="${(x-dx/d*17).toFixed(1)}" y2="${(y-dy/d*17).toFixed(1)}" stroke="var(--ink)" stroke-width="3"/>
            <circle cx="${x}" cy="${y}" r="17" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
            <text class="lH" x="${x}" y="${y+5}" font-size="13" text-anchor="middle" fill="var(--ink)">${T}</text>`;
      const od = Math.atan2(dy,dx);
      for (let k2 = 0; k2 < 3; k2++){
        const base = od + k2*(2*Math.PI/3);
        [-.2,.2].forEach(off => {
          const a = base + off;
          allDots += dot(x+Math.cos(a)*25, y+Math.sin(a)*25);
        });
      }
    });
    s += `<circle cx="200" cy="128" r="30" fill="${tc}" stroke="var(--ink)" stroke-width="2"/>
          <text class="lE" x="200" y="137" font-size="23" text-anchor="middle" fill="#fff">${E}</text>`;
    cap = `${T}–${E}–${T}: 90° (adjacent) · 180° (trans) — 3D arcs = same`;
    $('#lSub').textContent = '6 BOND PAIRS · NO LONE PAIR';
  }

  $('#lewisSvg').innerHTML = s + `<g class="lewis-dots">${allDots}</g>`;
  $('#lCap').textContent = cap;
  $('#lSym2').textContent = '· ' + m.f;
}

/* ============================================================
   7. PICKS + SELECT
   ============================================================ */
const FAMS = [
  { k:'AX2',  t:'EX₂ · DIHALIDES — sp³ · BENT · 2 LP',      c:'--blue'  },
  { k:'AX4E', t:'EX₄ · TETRAFLUORIDES — sp³d · SEE-SAW · 1 LP', c:'--amber' },
  { k:'AX6',  t:'EX₆ · HEXAFLUORIDES — sp³d² · OCTAHEDRAL · 0 LP', c:'--green' },
];
(function buildPicks(){
  const zone = $('#picksZone');
  let html = '';
  FAMS.forEach(fm => {
    const parts = fm.t.split('—');
    html += `<p class="fam-kick mono" style="--tc:var(${fm.c})"><b>${parts[0]}</b> — ${parts[1]}</p><div class="picks">`;
    HAL.forEach((m, i) => {
      if (m.fam !== fm.k) return;
      html += `<button class="pick" data-i="${i}" style="--tc:var(${m.vk});--tilt:${((i%3)-1)*1.2}deg;--d:${(i%3)*.08}s">
        <span class="p-no mono">${String(i+1).padStart(2,'0')} · ${m.famLabel}</span>
        <span class="p-sym">${m.f}</span>
        <span class="p-name mono">${m.name.toUpperCase()}</span>
        <span class="p-angle mono">${m.angChip}</span>
        <span class="p-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
      </button>`;
    });
    html += '</div>';
  });
  zone.innerHTML = html;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$('.pick').forEach(p => p.classList.add('in'));
  }));
  zone.addEventListener('click', e => {
    const b = e.target.closest('.pick');
    if (b) select(+b.dataset.i);
  });
})();

let lpPref = true, angPref = true, lenPref = false, spinPref = true;

function applyToggles(){
  if (!threeReady) return;
  const m = HAL[current];
  lpGroup.visible  = lpPref  && m.fam !== 'AX6';
  angGroup.visible = angPref;
  lenGroup.visible = lenPref;
}
function select(i, first){
  current = i;
  const m = HAL[i];

  $$('.pick').forEach(p => p.classList.toggle('active', +p.dataset.i === i));

  $('#stage3d').style.setProperty('--tc', `var(${m.vk})`);
  $('#datacard').style.setProperty('--tc', `var(${m.vk})`);
  $('#lewiscard').style.setProperty('--tc', `var(${m.vk})`);

  $('#mName').innerHTML = `${m.name} <em>· ${m.f}</em>`;
  $('#mShape').textContent = `${m.hyb} · ${m.shape.toUpperCase()} · ${m.geoName.toUpperCase()} E.GEOMETRY`;
  $('#selChip').textContent = m.f;
  $('#dTag').textContent = m.f;
  $('#dName').textContent = m.name;
  $('#dHyb').textContent = m.hyb;
  $('#dShape').textContent = m.shape;
  $('#dGeo').textContent = m.geoName;
  $('#dBO').textContent = m.bo;
  $('#dBL').innerHTML = m.blTxt;
  $('#dBA').innerHTML = m.angData;
  $('#dMass').textContent = m.mass;
  $('#dState').textContent = m.state;
  $('#dBP').textContent = m.bp;
  const tag = $('#bpTag');
  if (m.bpTag){ tag.style.display = ''; tag.textContent = m.bpTag; }
  else tag.style.display = 'none';
  $('#dNote').innerHTML = m.note;
  $('#dFact').innerHTML = m.fact;

  buildLewis(m);

  ['#drows','#dchips'].forEach(sel => {
    const el = $(sel);
    el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
  });

  const c = cssVar(m.vk);
  if (colTgt && c) colTgt.set(c);

  if (threeReady){
    if (first || m.fam !== curFam){
      curFam = m.fam;
      buildMolecule(m);
      popS = .8;
    } else {
      if (m.fam === 'AX2')       Object.assign(geoTgt, { half:m.half, L:m.bl, rE:m.rE });
      else if (m.fam === 'AX4E') Object.assign(geoTgt, { A:m.A, E:m.E, Lax:m.Lax, Leq:m.Leq, rE:m.rE });
      else                       Object.assign(geoTgt, { L:m.bl, rE:m.rE });
    }
    const tLP = $('#tglLP');
    tLP.disabled = (m.fam === 'AX6');
    if (tLP.disabled) tLP.classList.remove('on');
    else tLP.classList.toggle('on', lpPref);
    applyToggles();
    updateGeometry();
  }
  if (!first) showToast(m.f + ' LOADED — ANGLES = DATA');
}

/* ---------- toggles ---------- */
 $('#tglLP').addEventListener('click', () => {
  lpPref = !lpPref;
  $('#tglLP').classList.toggle('on', lpPref);
  document.body.classList.toggle('lp-off', !lpPref);
  applyToggles();
});
 $('#tglANG').addEventListener('click', () => {
  angPref = !angPref;
  $('#tglANG').classList.toggle('on', angPref);
  document.body.classList.toggle('ang-off', !angPref);
  applyToggles();
});
 $('#tglLEN').addEventListener('click', () => {
  lenPref = !lenPref;
  $('#tglLEN').classList.toggle('on', lenPref);
  applyToggles();
});
 $('#tglSPIN').addEventListener('click', () => {
  spinPref = !spinPref;
  $('#tglSPIN').classList.toggle('on', spinPref);
});

/* ---------- misc buttons ---------- */
 $('#backBtn').addEventListener('click', () => location.href = 'group16.html');
 $('#toTop').addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
 $('#userBtn').addEventListener('click', () => showToast('USER · COMING SOON'));

/* ---------- INIT ---------- */
initThree();
select(0, true);

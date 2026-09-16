/* ============================================================
   NEXINC — CHALCOGEN HQ · v9 · TRUE-SHELL BOHR ATOM

   ★ MAIN RULE (user demand — hydrides/oxides jaisa hi):
   Har shell me jitne electrons DATA ke hisaab se hain
   (2·6 / 2·8·6 / 2·8·18·6 / 2·8·18·18·6 / 2·8·18·32·18·6 /
    2·8·18·32·32·18·6), 3D me UTNE HI spheres render hote
   hain — koi extra, koi kam nahi. Valence shell (last,
   6 e⁻ = ns² np⁴) accent color me glow karta hai.
   Lv (Z=116) sab values PREDICTED → clearly † tagged.
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0. DATA — chhah chalcogens (shell counts EXACT) ---------- */
const ELS = [
  { sym:'O', name:'Oxygen', vk:'--teal', z:'8', mass:'15.999 u', shells:[2,6],
    cfg:'[He] 2s² 2p⁴', per:'2 · p-block', en:'3.44', state:'GAS', rad:'66 pm',
    ox:'−2 (−1, +2)', metal:'NON-METAL',
    chip:'Z=8 · GAS',
    tag:'Z=8 · [He] 2s² 2p⁴ · ANOMALOUS',
    stTag:'',
    note:'<b>Anomalous behaviour</b> — chhota size + high EN + <b>no d-orbital</b> → max covalency 2 · strongest <b>H-bonding</b> (isliye H₂O ka BP 100°C!)',
    fact:'Earth crust ka <b>~46%</b> · O₂ <b>diamagnetic</b> hai (MO theory) — liquid O₂ magnet me khichta hai' },
  { sym:'S', name:'Sulfur', vk:'--gold', z:'16', mass:'32.06 u', shells:[2,8,6],
    cfg:'[Ne] 3s² 3p⁴', per:'3 · p-block', en:'2.58', state:'SOLID', rad:'104 pm',
    ox:'−2 · +2 · +4 · +6', metal:'NON-METAL',
    chip:'Z=16 · SOLID',
    tag:'Z=16 · [Ne] 3s² 3p⁴ · CROWN S₈',
    stTag:'',
    note:'Sabse common allotrope = <b>S₈ puckered crown ring</b> · d-orbitals available → +4, +6 bhi stable · vulcanisation of rubber',
    fact:'<b>H₂SO₄ = "king of chemicals"</b> · fertilizer, matches, fireworks · brimstone ke naam se purana jaana' },
  { sym:'Se', name:'Selenium', vk:'--verm', z:'34', mass:'78.971 u', shells:[2,8,18,6],
    cfg:'[Ar] 3d¹⁰ 4s² 4p⁴', per:'4 · p-block', en:'2.55', state:'SOLID', rad:'117 pm',
    ox:'−2 · +4 · +6', metal:'METALLOID',
    chip:'Z=34 · SOLID',
    tag:'Z=34 · [Ar] 3d¹⁰ 4s² 4p⁴',
    stTag:'',
    note:'<b>Photoconductor</b> — andhere me insulator, roshni me conductor · isi property pe <b>photocopiers/Xerox</b> bane',
    fact:'Red / grey / black allotropes · <b>essential trace element</b> — antioxidant enzymes (glutathione peroxidase) me' },
  { sym:'Te', name:'Tellurium', vk:'--amber', z:'52', mass:'127.60 u', shells:[2,8,18,18,6],
    cfg:'[Kr] 4d¹⁰ 5s² 5p⁴', per:'5 · p-block', en:'2.1', state:'SOLID', rad:'137 pm',
    ox:'−2 · +4 · +6', metal:'METALLOID',
    chip:'Z=52 · SOLID',
    tag:'Z=52 · [Kr] 4d¹⁰ 5s² 5p⁴',
    stTag:'',
    note:'<b>Silvery-white metalloid</b> · +4 most stable ox state · TeO₂ crystals = acousto-optic devices (BENCH 02 yaad hai!)',
    fact:'Metabolise hone par <b>garlic breath</b> deta hai · rare element · CdTe solar cells me use' },
  { sym:'Po', name:'Polonium', vk:'--green', z:'84', mass:'(209) u', shells:[2,8,18,32,18,6],
    cfg:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', per:'6 · p-block', en:'2.0', state:'SOLID', rad:'146 pm',
    ox:'+2 · +4', metal:'METAL',
    chip:'Z=84 · ☢ RADIOACTIVE',
    tag:'Z=84 · ☢ α-EMITTER · INERT PAIR',
    stTag:'☢ RADIOACTIVE',
    note:'<b>Radioactive α-emitter</b> — Marie Curie, 1898 · <b>Poland</b> ke naam pe · <b>inert pair effect</b> → +2 stable · pehla METAL of the group',
    fact:'Extremely toxic · <b>1 g Po ~140 W heat</b> release karta hai · purane satellite heaters me use hua' },
  { sym:'Lv', name:'Livermorium', vk:'--purple', z:'116', mass:'(293) u†', shells:[2,8,18,32,32,18,6],
    cfg:'[Og] 5f¹⁴ 6d¹⁰ 7s² 7p⁴ †', per:'7 · p-block', en:'— (pred.)†', state:'SYNTHETIC', rad:'— (pred.)†',
    ox:'+2 · +4 †', metal:'PREDICTED',
    chip:'Z=116 · SYNTHETIC',
    tag:'Z=116 · † PREDICTED VALUES',
    stTag:'SYNTHETIC',
    note:'<b>Synthetic superheavy</b> — 2000, Dubna (Russia) · <b>Livermore lab</b> ke naam pe · half-life <b>milliseconds</b> me · † = predicted',
    fact:'Chemistry abhi almost unknown · predict: <b>+2 most stable</b> (strong inert pair) · Lv ke atoms count me bahut kam bane hain' },
];

let current = -1;

/* toggle states */
let ringsOn = true, valOnly = false, orbOn = true, spinOn = true;

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
      const c = cssVar(ELS[current].vk);
      if (c) colTgt.set(c);
    }
    if (shadowMesh){
      shadowMesh.material.map.dispose();
      shadowMesh.material.map = makeShadowTex();
    }
    refreshAtomTheme();
  }, 550);
});

/* ---------- 2. CUSTOM CURSOR ---------- */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const dot = $('.cur-dot'), ring = $('.cur-ring');
let mx = innerWidth/2, my = innerHeight/2;
if (fine && !reduced){
  document.body.classList.add('cursor-on');
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('big', !!e.target.closest('a,button,.pick,.tgl,.drow,.dchip,.trendcard,.hubcard'));
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
let W, H, nodes = [], pulses = [];
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
   5. REAL 3D — BOHR ATOM · TRUE SHELL COUNTS
   ============================================================ */
const vpBox    = $('#viewport');
const glCanvas = $('#gl');
const HAS3D = !!window.THREE;

let renderer=null, scene, camera, atomGroup=null, shadowMesh=null;
let nucMat=null, nucSym=null, eMatN=null, eMatV=null, ringMatN=null, ringMatV=null;
let shellHolders=[], eGroups=[], shellLabels=[];
let dragging3d = false, threeReady = false, popT = 1;
let curFit = 9;

const orbit = { theta:-.62, phi:1.25, radius:9 };
const tgt   = { theta:-.62, phi:1.25, radius:9 };

/* crash-guards */
const colCur    = HAS3D ? new THREE.Color('#0E7C86') : null;
const colTgt    = HAS3D ? new THREE.Color('#0E7C86') : null;
const camTarget = HAS3D ? new THREE.Vector3(0,0,0) : null;

function colHex(){ return colTgt ? '#'+colTgt.getHexString() : '#0E7C86'; }

function rr(g,x,y,w,h,r){ g.beginPath();
  g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }

function makeLabel(text, opt){
  opt = opt || {};
  const fs = opt.fs || 40, pad = opt.pad != null ? opt.pad : 14;
  const meas = document.createElement('canvas').getContext('2d');
  meas.font = '700 '+fs+'px "JetBrains Mono", monospace';
  const tw = Math.ceil(meas.measureText(text).width);
  const w = tw + pad*2, h = fs + pad*1.2;
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
  const s = opt.scale || .0075;
  sp.scale.set(w*s, h*s, 1);
  sp.renderOrder = 10;
  return sp;
}

function makeShadowTex(){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64,64,4,64,64,62);
  const dark = themeCur === 'dark' ? '0,0,0' : '30,36,32';
  grd.addColorStop(0, 'rgba('+dark+',.25)');
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

  scene.add(new THREE.HemisphereLight(0xfff6e6, 0x3a352a, .95));
  const key  = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(3.5,5,4.5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xfff2dd, .35); fill.position.set(-4,1,-3); scene.add(fill);
  const rim  = new THREE.PointLight(0x0E7C86, .55, 40); rim.position.set(-4,-2.5,3); scene.add(rim);
  window._rim = rim;

  shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshBasicMaterial({ map:makeShadowTex(), transparent:true, depthWrite:false })
  );
  shadowMesh.rotation.x = -Math.PI/2;
  shadowMesh.position.y = -5.4;
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

function disposeAtom(){
  if (!atomGroup) return;
  scene.remove(atomGroup);
  atomGroup.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material){
      if (o.material.map) o.material.map.dispose();
      o.material.dispose();
    }
  });
  atomGroup = null; shellHolders = []; eGroups = []; shellLabels = [];
}

/* shared materials — theme/element ke saath recolor hote hain */
function sharedMats(accent, ink, soft){
  if (eMatN){ eMatN.dispose(); eMatV.dispose(); ringMatN.dispose(); ringMatV.dispose(); nucMat.dispose(); }
  eMatN   = new THREE.MeshStandardMaterial({ color:ink,  roughness:.45, metalness:.05, emissive:ink,  emissiveIntensity:.05 });
  eMatV   = new THREE.MeshStandardMaterial({ color:accent, roughness:.3, metalness:.1, emissive:accent, emissiveIntensity:.4 });
  ringMatN= new THREE.LineBasicMaterial({ color:soft, transparent:true, opacity:.55 });
  ringMatV= new THREE.LineBasicMaterial({ color:accent, transparent:true, opacity:.95 });
  nucMat  = new THREE.MeshStandardMaterial({ color:accent, roughness:.28, metalness:.15, emissive:accent, emissiveIntensity:.22 });
}

function ringPoints(r){
  const pts = [];
  for (let i=0;i<128;i++){
    const a = i/128 * Math.PI*2;
    pts.push(new THREE.Vector3(Math.cos(a)*r, Math.sin(a)*r, 0));
  }
  return pts;
}

function buildAtom(d){
  disposeAtom();
  sharedMats(colHex(), cssVar('--ink') || '#1E2420', cssVar('--ink-soft') || '#5A625B');

  atomGroup = new THREE.Group(); scene.add(atomGroup);

  /* ---- NUCLEUS ---- */
  const nuc = new THREE.Mesh(new THREE.SphereGeometry(.52, 48, 48), nucMat);
  atomGroup.add(nuc);
  nucSym = makeLabel(d.sym, { plain:true, fs:d.sym.length>1?44:56, color:'#ffffff', scale:.0082 });
  nucSym.position.set(0,0,0);
  atomGroup.add(nucSym);

  /* ---- SHELLS — electron counts EXACT d.shells se ---- */
  const n = d.shells.length;
  d.shells.forEach((cnt, i) => {
    const r = 1.15 + i * .62;
    const isVal = (i === n - 1);          /* last shell = valence (6 e⁻) */

    const holder = new THREE.Group();
    /* har shell ka apna fixed tilt — 3D depth ke liye */
    holder.rotation.x = (i * .55) - .7;
    holder.rotation.y = i * .8;
    holder.rotation.z = (i * .3) - .2;
    atomGroup.add(holder);
    shellHolders.push(holder);

    /* ring (XY plane) */
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(ringPoints(r)),
      isVal ? ringMatV : ringMatN
    );
    holder.add(ring);

    /* electrons — EXACTLY cnt spheres */
    const eg = new THREE.Group();
    const er = isVal ? .105 : .085;
    for (let k=0;k<cnt;k++){
      const a = k/cnt * Math.PI*2;
      const e = new THREE.Mesh(new THREE.SphereGeometry(er, 20, 20), isVal ? eMatV : eMatN);
      e.position.set(Math.cos(a)*r, Math.sin(a)*r, 0);
      eg.add(e);
    }
    eg.userData.spd = (i%2===0 ? 1 : -1) * (0.85 - i*0.085);
    holder.add(eg);
    eGroups.push(eg);

    /* shell count label — ring edge pe chhota number */
    const lab = makeLabel(String(cnt), {
      plain:true, fs:30, scale:.0052,
      color: isVal ? colHex() : (cssVar('--ink-soft') || '#5A625B')
    });
    lab.position.set(r + .3, 0, 0);
    holder.add(lab);
    shellLabels.push(lab);
  });

  /* toggle states apply */
  eGroups.forEach((eg, i) => {
    const isVal = i === eGroups.length - 1;
    eg.visible = valOnly ? isVal : true;
  });
  shellHolders.forEach(h => h.children.forEach(c => {
    if (c.type === 'LineLoop') c.visible = ringsOn;
  }));
  shellLabels.forEach(l => l.visible = ringsOn);

  /* camera fit — jitni shells, utna zoom-out */
  const maxR = 1.15 + (n-1)*.62;
  curFit = Math.min(14.5, maxR * 2.35 + 2.6);
  tgt.radius = curFit;

  popT = 0;
}

/* theme switch: colors + labels refresh */
function refreshAtomTheme(){
  if (!threeReady || current < 0 || !atomGroup) return;
  const d = ELS[current];
  sharedMats(colHex(), cssVar('--ink') || '#1E2420', cssVar('--ink-soft') || '#5A625B');
  shellLabels.forEach((lab, i) => {
    const isVal = i === shellLabels.length - 1;
    lab.material.map.dispose();
    lab.material = new THREE.SpriteMaterial({
      map: makeLabel(String(d.shells[i]), {
        plain:true, fs:30, scale:.0052,
        color: isVal ? colHex() : (cssVar('--ink-soft') || '#5A625B')
      }).material.map,
      transparent:true, depthTest:false });
    lab.renderOrder = 10;
  });
  nucSym.material.map.dispose();
  nucSym.material = new THREE.SpriteMaterial({
    map: makeLabel(d.sym, { plain:true, fs:d.sym.length>1?44:56, color:'#ffffff', scale:.0082 }).material.map,
    transparent:true, depthTest:false });
  nucSym.renderOrder = 10;
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
    tgt.phi    = Math.max(.3, Math.min(2.7, tgt.phi - (e.clientY - py) * .0042));
    px = e.clientX; py = e.clientY;
  });
  const end = () => dragging3d = false;
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('wheel', e => {
    e.preventDefault();
    tgt.radius = Math.max(curFit*.55, Math.min(curFit*1.75, tgt.radius * (1 + e.deltaY * .001)));
  }, {passive:false});
}
 $('#zin').addEventListener('click',  () => tgt.radius = Math.max(curFit*.55, tgt.radius - curFit*.1));
 $('#zout').addEventListener('click', () => tgt.radius = Math.min(curFit*1.75, tgt.radius + curFit*.1));
 $('#zreset').addEventListener('click', () => {
  tgt.theta = -.62; tgt.phi = 1.25; tgt.radius = curFit;
  showToast('VIEW RESET');
});

let lastFrame = performance.now();
function threeLoop(now){
  requestAnimationFrame(threeLoop);
  const dt = Math.min(.05, (now - lastFrame)/1000); lastFrame = now;

  colCur.lerp(colTgt, Math.min(1, dt*5));
  if (nucMat){
    nucMat.color.copy(colCur); nucMat.emissive.copy(colCur);
    eMatV.color.copy(colCur);  eMatV.emissive.copy(colCur);
    ringMatV.color.copy(colCur);
    if (window._rim) _rim.color.copy(colCur);
  }

  if (popT < 1 && atomGroup){
    popT = Math.min(1, popT + dt*2.2);
    const e = 1 - Math.pow(1 - popT, 3);
    atomGroup.scale.setScalar(.6 + .4*e);
  }

  /* e⁻ orbit — har shell apni axis pe ghumti hai */
  if (orbOn && atomGroup){
    eGroups.forEach(eg => { eg.rotation.z += eg.userData.spd * dt; });
  }
  if (spinOn && !dragging3d && atomGroup) atomGroup.rotation.y += dt*.3;

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
   6. SELECT — panels + atom sync
   ============================================================ */
function select(i){
  current = i;
  const d = ELS[i];

  const c = cssVar(d.vk);
  if (colTgt && c) colTgt.set(c);

  ['#stage3d','#datacard'].forEach(sel => {
    const p = $(sel);
    if (p) p.style.setProperty('--tc', `var(${d.vk})`);
  });

  $('#selChip').textContent = d.sym;
  $('#mName').innerHTML = `${d.name} <em>· ${d.sym}</em>`;
  $('#mShape').textContent = d.tag;
  $('#dTag').textContent = d.sym;
  $('#dName').textContent = d.name;
  $('#dZ').textContent = d.z;
  $('#dMass').textContent = d.mass;
  $('#dPer').textContent = d.per;
  $('#dCfg').textContent = d.cfg;
  /* shells — last (valence 6) highlighted */
  $('#dShell').innerHTML = d.shells.map((s, k) =>
    k === d.shells.length - 1 ? `<span class="hl">${s}</span>` : s
  ).join(' · ');
  $('#dEN').textContent = d.en;
  $('#dState').textContent = d.state;
  $('#dRad').textContent = d.rad;
  $('#dMetal').textContent = d.metal;
  const stTag = $('#stTag');
  if (d.stTag){ stTag.style.display = 'inline-block'; stTag.textContent = d.stTag; }
  else stTag.style.display = 'none';
  $('#dNote').innerHTML = d.note;
  $('#dFact').innerHTML = d.fact;

  $$('.pick').forEach((p, idx) => p.classList.toggle('active', idx === i));

  /* toggles sync */
  $('#tglRINGS').classList.toggle('on', ringsOn);
  $('#tglVAL').classList.toggle('on', valOnly);
  $('#tglORB').classList.toggle('on', orbOn);
  $('#tglSPIN').classList.toggle('on', spinOn);

  if (threeReady) buildAtom(d);

  ['#drows','#dnote'].forEach(sel => {
    const el = $(sel); if (!el) return;
    el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
  });

  showToast(`${d.sym} · Z=${d.z} — SHELLS: ${d.shells.join('·')}`);
}

/* ============================================================
   7. PICKS + TRENDS + TOGGLES + BOOT
   ============================================================ */
const picksEl = $('#picks');
ELS.forEach((d, i) => {
  const b = document.createElement('button');
  b.className = 'pick';
  b.style.setProperty('--tc', `var(${d.vk})`);
  b.style.setProperty('--tilt', (i % 2 ? 1.4 : -1.4) + 'deg');
  b.dataset.i = i;
  b.innerHTML =
    `<span class="p-no">ELEMENT 0${i+1}</span>` +
    `<span class="p-sym">${d.sym}</span>` +
    `<span class="p-name">${d.name.toUpperCase()}</span>` +
    `<span class="p-angle">${d.chip}</span>` +
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

/* trends */
const TRENDS = [
  { t:'ATOMIC RADIUS', dir:'up',   v:'66 → 146 pm',       n:'O se Po — har step pe ek nayi shell, size badhta jata hai' },
  { t:'IONISATION ENTHALPY', dir:'down', v:'1314 → 812 kJ/mol', n:'size ↑ → nucleus ka hold kam → IE1 girti jati hai' },
  { t:'ELECTRONEGATIVITY', dir:'down', v:'3.44 → 2.0',   n:'O sabse EN · Po tak aate-aate metal jaisi behaviour' },
  { t:'METALLIC CHARACTER', dir:'up', v:'NON-METAL → METAL', n:'O, S non-metal · Se, Te metalloid · Po radioactive metal' },
  { t:'MELTING POINT', dir:'up', v:'−218°C → 450°C',    n:'molecular mass ↑ → van der Waals ↑ · (Po me halka dip)' },
  { t:'OXIDISING POWER', dir:'down', v:'O₂ strongest',  n:'O₂ sabse strong oxidiser · niche jaate reducing character ↑' },
];
const trendGrid = $('#trendGrid');
TRENDS.forEach((t, i) => {
  const card = document.createElement('div');
  card.className = 'trendcard';
  card.style.setProperty('--d', (i * .07) + 's');
  card.innerHTML =
    `<span class="tt ${t.dir}"><i data-lucide="${t.dir === 'up' ? 'trending-up' : 'trending-down'}"></i>${t.t}</span>` +
    `<span class="tv">${t.v}</span>` +
    `<span class="tn">${t.n}</span>`;
  trendGrid.appendChild(card);
});
const trendIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add('in'); trendIO.unobserve(e.target); }
}), { threshold: .2 });
 $$('.trendcard').forEach(c => trendIO.observe(c));

/* hub soon cards */
 $$('.hubcard.soon').forEach(b => b.addEventListener('click', () =>
  showToast(`${b.dataset.soon} — YE BENCH ABHI BANNA BAAKI HAI`)));

/* toggles */
 $('#tglRINGS').addEventListener('click', () => {
  ringsOn = !ringsOn;
  $('#tglRINGS').classList.toggle('on', ringsOn);
  shellHolders.forEach(h => h.children.forEach(c => {
    if (c.type === 'LineLoop') c.visible = ringsOn;
  }));
  shellLabels.forEach(l => l.visible = ringsOn);
});
 $('#tglVAL').addEventListener('click', () => {
  valOnly = !valOnly;
  $('#tglVAL').classList.toggle('on', valOnly);
  eGroups.forEach((eg, i) => {
    eg.visible = valOnly ? (i === eGroups.length - 1) : true;
  });
  showToast(valOnly ? 'SIRF VALENCE SHELL (6 e⁻)' : 'SAARI SHELLS VISIBLE');
});
 $('#tglORB').addEventListener('click', () => {
  orbOn = !orbOn;
  $('#tglORB').classList.toggle('on', orbOn);
});
 $('#tglSPIN').addEventListener('click', () => {
  spinOn = !spinOn;
  $('#tglSPIN').classList.toggle('on', spinOn);
});

 $('#toTop').addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
 $('#hubBtn').addEventListener('click', () => $('#hub').scrollIntoView({ behavior:'smooth' }));

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
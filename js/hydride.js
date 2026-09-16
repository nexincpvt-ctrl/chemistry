/* ============================================================
   NEXINC — HYDRIDES LAB · v7 · TRUE-ANGLE FIX

   ★ MAIN FIX:
   Bonds -half aur +half pe hain → beech ka angle = 2 × half
   Isliye half = ang / 2 (pehle pura ang daal raha the →
   3D me angle DOUBLE dikh raha tha, H₂S ~176° ban raha tha!)

   ★ BONUS: tween ke dauran arc label LIVE count karta hai
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0. DATA — chaaron hydrides ---------- */
const HYD = [
  { f:'H₂O',  sym:'O',  name:'Water',              vk:'--blue',
    hyb:'sp³', shape:'Bent', geo:'Tetrahedral', bo:'1',
    bl:'0.958', ba:'104.5', ang:104.5, rE:.46,
    mass:'18.02', state:'LIQUID', bp:'100°C', bpAno:true,
    note:'<b>O central</b>, 2 lone pairs, 2 O–H single bonds; bent',
    fact:'<b>BP anomaly</b> — H-bonding ki den · expected ~−80°C, actual +100°C · universal solvent' },
  { f:'H₂S',  sym:'S',  name:'Hydrogen sulfide',   vk:'--green',
    hyb:'sp³', shape:'Bent', geo:'Tetrahedral', bo:'1',
    bl:'1.336', ba:'92.1', ang:92.1, rE:.58,
    mass:'34.08', state:'GAS', bp:'−60°C', bpAno:false,
    note:'<b>S central</b>, 2 lone pairs, 2 S–H single bonds; bent',
    fact:'Rotten-egg smell · <b>Pb(acetate) paper black</b> · FeS + dil.H₂SO₄ se banta hai' },
  { f:'H₂Se', sym:'Se', name:'Hydrogen selenide',  vk:'--teal',
    hyb:'sp³', shape:'Bent', geo:'Tetrahedral', bo:'1',
    bl:'1.460', ba:'91', ang:91, rE:.63,
    mass:'80.98', state:'GAS', bp:'−41°C', bpAno:false,
    note:'<b>Se central</b>, 2 lone pairs, 2 Se–H single bonds; bent',
    fact:'Highly toxic · garlic jaisi smell · acidity order: <b>H₂Te &gt; H₂Se &gt; H₂S &gt; H₂O</b>' },
  { f:'H₂Te', sym:'Te', name:'Hydrogen telluride', vk:'--amber',
    hyb:'sp³', shape:'Bent', geo:'Tetrahedral', bo:'1',
    bl:'1.700', ba:'90', ang:90, rE:.68,
    mass:'129.6', state:'GAS', bp:'−2°C', bpAno:false,
    note:'<b>Te central</b>, 2 lone pairs, 2 Te–H single bonds; bent',
    fact:'<b>Least stable</b> hydride · strongest acid + strongest reducer of the group' },
];
const H_R = .30, BOND_R = .12, SCALE = 1.5;

let current = -1;

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
      const c = cssVar(HYD[current].vk);
      if (c) colTgt.set(c);
    }
    if (shadowMesh){
      shadowMesh.material.map.dispose();
      shadowMesh.material.map = makeShadowTex();
    }
    lastArcTxt = '';               /* label rebuild force */
    buildLabels();
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
let eMat=null, bondMat=null, lpMats=[], arcLine=null, arcLabel=null, lenLabels=[], symSprites=[];
let spinOn = true, dragging3d = false;
let threeReady = false;
let lastArcTxt = '';

const orbit = { theta:-.55, phi:1.22, radius:7.6 };
const tgt   = { theta:-.55, phi:1.22, radius:7.6 };

/* crash-guards */
const colCur    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const colTgt    = HAS3D ? new THREE.Color('#4A6FA5') : null;
const camTarget = HAS3D ? new THREE.Vector3(0,-.1,0) : null;
const _q        = HAS3D ? new THREE.Quaternion() : null;
const _up       = HAS3D ? new THREE.Vector3(0,1,0) : null;

/* ★ half = ANGLE KA ADHA (bonds ±half pe → beech = full angle) */
const geo    = { half:104.5/2, L:.958*SCALE, rE:.46 };
const geoTgt = { half:104.5/2, L:.958*SCALE, rE:.46 };

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
    new THREE.PlaneGeometry(4.6, 4.6),
    new THREE.MeshBasicMaterial({ map:makeShadowTex(), transparent:true, depthWrite:false })
  );
  shadowMesh.rotation.x = -Math.PI/2;
  shadowMesh.position.y = -2.6;
  scene.add(shadowMesh);

  buildMolecule();
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

function buildMolecule(){
  molGroup = new THREE.Group(); scene.add(molGroup);
  lpGroup  = new THREE.Group();
  angGroup = new THREE.Group();
  lenGroup = new THREE.Group();
  molGroup.add(lpGroup, angGroup, lenGroup);

  const c = colHex();

  eMat = new THREE.MeshStandardMaterial({ color:c, roughness:.28, metalness:.12, emissive:c, emissiveIntensity:.14 });
  const eMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), eMat);
  molGroup.add(eMesh); molGroup.userData.eMesh = eMesh;

  const hMat = new THREE.MeshStandardMaterial({ color:0xF2ECDC, roughness:.35, metalness:.05 });
  ['h1','h2'].forEach(n => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(H_R, 48, 48), hMat);
    molGroup.add(m); molGroup.userData[n] = m;
  });

  bondMat = new THREE.MeshStandardMaterial({ color:c, roughness:.4, metalness:.2 });
  ['b1','b2'].forEach(n => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(BOND_R, BOND_R, 1, 24), bondMat);
    molGroup.add(m); molGroup.userData[n] = m;
  });

  /* lone pairs — bond-plane ke perpendicular (front/back ±Z) */
  lpMats = [];
  ['lp1','lp2'].forEach(n => {
    const lmat = new THREE.MeshStandardMaterial({
      color:c, transparent:true, opacity:.18, roughness:.2, metalness:0,
      emissive:c, emissiveIntensity:.25, depthWrite:false });
    lpMats.push(lmat);
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(.30, 32, 32), lmat);
    lobe.scale.set(.75, 1.4, .75);
    const holder = new THREE.Group(); holder.name = n;
    holder.add(lobe);
    const eg = new THREE.Group();
    const dmat = new THREE.MeshBasicMaterial({ color:c });
    [-.08,.08].forEach(off => {
      const d = new THREE.Mesh(new THREE.SphereGeometry(.055, 16, 16), dmat);
      d.position.set(off, .05, 0); eg.add(d);
    });
    lobe.add(eg);
    holder.userData.eg = eg;
    lpGroup.add(holder);
  });

  const arcGeo = new THREE.BufferGeometry();
  arcGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(40*3), 3));
  arcLine = new THREE.Line(arcGeo, new THREE.LineDashedMaterial({ color:c, dashSize:.07, gapSize:.05 }));
  angGroup.add(arcLine);
  arcLabel = makeLabel('104.5°', labelColors());
  angGroup.add(arcLabel);

  lenLabels = [];
  ['l1','l2'].forEach(() => {
    const s = makeLabel('0.958 Å', labelColors());
    s.visible = false;
    lenGroup.add(s); lenLabels.push(s);
  });
  lenGroup.visible = false;

  symSprites = [];
  const eSym = makeLabel(HYD[0].sym, { plain:true, fs:64, color:'#ffffff', scale:.0062 });
  molGroup.add(eSym); symSprites.push(eSym);
  ['s1','s2'].forEach(() => {
    const s = makeLabel('H', { plain:true, fs:54, color:cssVar('--ink') || '#1E2420', scale:.0062 });
    molGroup.add(s); symSprites.push(s);
  });

  updateGeometry();
}
function buildLabels(){
  if (!threeReady || !molGroup) return;
  const d = HYD[current] || HYD[0];
  const LC = labelColors();
  lastArcTxt = d.ba + '°';
  arcLabel.material.map.dispose();
  arcLabel.material = new THREE.SpriteMaterial({ map:makeLabel(d.ba+'°', LC).material.map, transparent:true, depthTest:false });
  arcLabel.renderOrder = 10;
  lenLabels.forEach(s => {
    s.material.map.dispose();
    s.material = new THREE.SpriteMaterial({ map:makeLabel(d.bl+' Å', LC).material.map, transparent:true, depthTest:false });
    s.renderOrder = 10;
  });
  symSprites[0].material.map.dispose();
  symSprites[0].material = new THREE.SpriteMaterial({ map:makeLabel(d.sym, { plain:true, fs:64, color:'#ffffff', scale:.0062 }).material.map, transparent:true, depthTest:false });
  symSprites[0].renderOrder = 10;
  symSprites.forEach((s, idx) => { if (idx > 0){
    s.material.map.dispose();
    s.material = new THREE.SpriteMaterial({ map:makeLabel('H', { plain:true, fs:54, color:cssVar('--ink') || '#1E2420', scale:.0062 }).material.map, transparent:true, depthTest:false });
    s.renderOrder = 10;
  }});
}

/* live angle counter — tween ke dauran label update */
function syncArcLabel(){
  const val = (geo.half * 2).toFixed(1) + '°';
  if (val === lastArcTxt) return;
  lastArcTxt = val;
  arcLabel.material.map.dispose();
  arcLabel.material = new THREE.SpriteMaterial({ map:makeLabel(val, labelColors()).material.map, transparent:true, depthTest:false });
  arcLabel.renderOrder = 10;
}

const _v = HAS3D ? new THREE.Vector3() : null;
function bondDir(sign, halfDeg){
  const a = halfDeg * Math.PI/180;
  return new THREE.Vector3(sign * Math.sin(a), -Math.cos(a), 0);
}

function updateGeometry(){
  if (!molGroup || !_q) return;
  const L = geo.L, rE = geo.rE;

  molGroup.userData.eMesh.scale.setScalar(rE);
  const dR = bondDir(-1, geo.half).multiplyScalar(L);
  const dL = bondDir( 1, geo.half).multiplyScalar(L);
  molGroup.userData.h1.position.copy(dR);
  molGroup.userData.h2.position.copy(dL);

  /* bonds: E-center → H-center (normalized dir × L/2) */
  [ ['b1',dR], ['b2',dL] ].forEach(([name, dir]) => {
    const cyl  = molGroup.userData[name];
    const dirN = dir.clone().normalize();
    cyl.scale.set(1, L, 1);
    cyl.position.copy(dirN.clone().multiplyScalar(L * .5));
    _q.setFromUnitVectors(_up, dirN);
    cyl.quaternion.copy(_q);
  });

  /* lone pairs — har bond se ~109.5° (tetrahedral) */
  const halfRad = geo.half * Math.PI/180;
  const lpA = Math.acos(Math.min(.95, Math.max(.25, .334 / Math.cos(halfRad))));
  [ ['lp1', 1], ['lp2', -1] ].forEach(([name, sg]) => {
    const holder = lpGroup.getObjectByName(name);
    const dir = new THREE.Vector3(0, Math.cos(lpA), sg * Math.sin(lpA));
    holder.position.copy(dir.clone().multiplyScalar(rE + .38));
    _q.setFromUnitVectors(_up, dir);
    holder.quaternion.copy(_q);
  });

  /* angle arc — -half se +half tak = EXACT full angle */
  const R = Math.min(.95, L*.55);
  const pos = arcLine.geometry.attributes.position;
  for (let i=0;i<40;i++){
    const t = -geo.half + (2*geo.half)*(i/39);
    pos.setXYZ(i, Math.sin(t*Math.PI/180)*R, -Math.cos(t*Math.PI/180)*R, 0);
  }
  pos.needsUpdate = true;
  arcLine.geometry.computeBoundingSphere();
  arcLine.computeLineDistances();
  arcLabel.position.set(0, -(R + .55), 0);

  lenLabels[0].position.copy(dR.clone().multiplyScalar(.55)).add(new THREE.Vector3(.42,0,.5));
  lenLabels[1].position.copy(dL.clone().multiplyScalar(.55)).add(new THREE.Vector3(-.42,0,.5));
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
    tgt.radius = Math.max(4.2, Math.min(11.5, tgt.radius * (1 + e.deltaY * .001)));
  }, {passive:false});
}
 $('#zin').addEventListener('click',  () => tgt.radius = Math.max(4.2,  tgt.radius - .9));
 $('#zout').addEventListener('click', () => tgt.radius = Math.min(11.5, tgt.radius + .9));
 $('#zreset').addEventListener('click', () => {
  tgt.theta = -.55; tgt.phi = 1.22; tgt.radius = 7.6;
  showToast('VIEW RESET');
});

let lastFrame = performance.now();
function threeLoop(now){
  requestAnimationFrame(threeLoop);
  const dt = Math.min(.05, (now - lastFrame)/1000); lastFrame = now;

  colCur.lerp(colTgt, Math.min(1, dt*5));
  if (eMat){
    eMat.color.copy(colCur); eMat.emissive.copy(colCur);
    bondMat.color.copy(colCur);
    lpMats.forEach(m => { m.color.copy(colCur); m.emissive.copy(colCur); });
    if (window._rim) _rim.color.copy(colCur);
    arcLine.material.color.copy(colCur);
  }

  let need = false;
  ['half','L','rE'].forEach(k => {
    const d = geoTgt[k] - geo[k];
    if (Math.abs(d) > .0004){ geo[k] += d * Math.min(1, dt*4.5); need = true; }
  });
  if (need){
    updateGeometry();
    syncArcLabel();          /* ★ live angle count during tween */
  }

  /* select pop */
  if (molGroup && Math.abs(molGroup.scale.x - 1) > .002){
    const s = molGroup.scale.x + (1 - molGroup.scale.x) * Math.min(1, dt*5);
    molGroup.scale.setScalar(s);
  }

  /* idle breathing + shadow sync */
  if (!reduced && molGroup){
    const fl = Math.sin(now * .0012) * .09;
    molGroup.position.y = fl;
    if (shadowMesh){
      shadowMesh.material.opacity = .85 - fl * 1.2;
      const ss = 1 - fl * .06;
      shadowMesh.scale.set(ss, ss, 1);
    }
  }

  if (lpGroup) lpGroup.children.forEach(h => { if (h.userData.eg) h.userData.eg.rotation.z += dt*2.2; });

  /* atom letters camera-facing */
  if (symSprites.length === 3 && camera){
    const camN = camera.position.clone().normalize();
    symSprites[0].position.copy(camN).multiplyScalar(geo.rE + .08);
    const sR = bondDir(-1, geo.half).multiplyScalar(geo.L);
    const sL = bondDir( 1, geo.half).multiplyScalar(geo.L);
    symSprites[1].position.copy(sR).addScaledVector(camN, H_R + .08);
    symSprites[2].position.copy(sL).addScaledVector(camN, H_R + .08);
  }

  if (spinOn && !dragging3d && !reduced) tgt.theta += dt * .25;
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
   6. SELECTOR BUILD
   ============================================================ */
const picksEl = $('#picks');
HYD.forEach((d, i) => {
  const b = document.createElement('button');
  b.className = 'pick';
  b.style.setProperty('--tc', 'var(' + d.vk + ')');
  b.style.setProperty('--tilt', (i%2 ? 1 : -1) * .9 + 'deg');
  b.style.setProperty('--d', (.08*i + .1) + 's');
  b.innerHTML =
    '<span class="p-no mono">HY·0' + (i+1) + '</span>' +
    '<span class="p-check"><i data-lucide="check"></i></span>' +
    '<div class="p-sym">' + d.f + '</div>' +
    '<div class="p-name mono">' + d.name.toUpperCase() + '</div>' +
    '<span class="p-angle">' + d.ba + '° · ' + d.bl + ' Å</span>';
  b.addEventListener('click', () => selectHydride(i, true));
  b.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){ e.preventDefault(); b.click(); } });
  picksEl.appendChild(b);
});
lucide.createIcons();

/* ============================================================
   7. SELECT + LOAD
   ============================================================ */
function selectHydride(i, scroll){
  if (i === current){ if (scroll) $('#viewer').scrollIntoView({behavior:'smooth'}); return; }
  current = i;
  const d = HYD[i];

  $$('.pick').forEach((p,k) => p.classList.toggle('active', k===i));

  $('#stage3d').style.setProperty('--tc', 'var('+d.vk+')');
  $('#datacard').style.setProperty('--tc', 'var('+d.vk+')');
  $('.lewiscard').style.setProperty('--tc', 'var('+d.vk+')');

  /* ★★★ MAIN FIX: half = ANGLE / 2
     bonds ±half pe hain → 3D me beech ka angle EXACT d.ba */
  geoTgt.half = d.ang / 2;
  geoTgt.L    = parseFloat(d.bl) * SCALE;
  geoTgt.rE   = d.rE;
  const cvCol = cssVar(d.vk);
  if (cvCol && colTgt) colTgt.set(cvCol);
  if (threeReady && molGroup) molGroup.scale.setScalar(1.13);

  if (threeReady){
    const LC = labelColors();
    lastArcTxt = d.ba + '°';
    arcLabel.material.map.dispose();
    arcLabel.material = new THREE.SpriteMaterial({ map:makeLabel(d.ba+'°', LC).material.map, transparent:true, depthTest:false });
    arcLabel.renderOrder = 10;
    lenLabels.forEach(s => {
      s.material.map.dispose();
      s.material = new THREE.SpriteMaterial({ map:makeLabel(d.bl+' Å', LC).material.map, transparent:true, depthTest:false });
      s.renderOrder = 10;
    });
    symSprites[0].material.map.dispose();
    symSprites[0].material = new THREE.SpriteMaterial({ map:makeLabel(d.sym, { plain:true, fs:64, color:'#ffffff', scale:.0062 }).material.map, transparent:true, depthTest:false });
    symSprites[0].renderOrder = 10;
  }

  $('#selChip').textContent = d.f;
  $('#mName').innerHTML = d.name + ' <em>· ' + d.f + '</em>';
  $('#mShape').textContent = 'sp³ · BENT · TETRAHEDRAL E.GEOMETRY';
  $('#dTag').textContent = d.f;
  $('#dName').textContent = d.name;
  $('#dHyb').textContent = d.hyb;
  $('#dShape').textContent = d.shape;
  $('#dGeo').textContent = d.geo;
  $('#dBO').textContent = d.bo;
  $('#dBL').innerHTML = '<span class="hl">'+d.bl+'</span> Å';
  $('#dBA').innerHTML = '<span class="hl">'+d.ba+'</span>°';
  $('#dNote').innerHTML = d.note;

  $('#dMass').textContent = d.mass;
  $('#dState').textContent = d.state;
  $('#dBP').textContent = d.bp;
  $('#dBP').classList.toggle('ano', !!d.bpAno);
  $('#bpTag').style.display = d.bpAno ? 'inline-block' : 'none';
  $('#dFact').innerHTML = d.fact;

  $('#lE').textContent = d.sym;
  $('#lSym2').textContent = '· ' + d.f;
  $('#lArcVal').textContent = d.ba + '°';
  const lc={x:200,y:104,r:56}, la=(d.ang/2)*Math.PI/180;
  const lx1=lc.x+lc.r*Math.sin(la), ly1=lc.y+lc.r*Math.cos(la);
  const lx2=lc.x-lc.r*Math.sin(la), ly2=lc.y+lc.r*Math.cos(la);
  $('#lArc').setAttribute('d','M '+lx1.toFixed(1)+' '+ly1.toFixed(1)+' A '+lc.r+' '+lc.r+' 0 0 1 '+lx2.toFixed(1)+' '+ly2.toFixed(1));

  ['#drows','#dchips','#dNote','#dFact','#mName','#mShape'].forEach(sel => {
    const el=$(sel); if(!el) return;
    el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
  });

  showToast(d.f + ' LOADED · ∠ ' + d.ba + '° · ' + d.bl + ' Å · ' + d.name.toUpperCase());
  if (scroll) $('#viewer').scrollIntoView({behavior:'smooth'});
}
selectHydride(0, false);

/* ============================================================
   8. TOGGLES (guarded)
   ============================================================ */
 $('#tglLP').addEventListener('click', function(){
  this.classList.toggle('on');
  const on = this.classList.contains('on');
  if (lpGroup) lpGroup.visible = on;
  document.body.classList.toggle('lp-off', !on);
  showToast('LONE PAIRS · ' + (on?'ON':'OFF'));
});
 $('#tglANG').addEventListener('click', function(){
  this.classList.toggle('on');
  const on = this.classList.contains('on');
  if (angGroup) angGroup.visible = on;
  document.body.classList.toggle('ang-off', !on);
  showToast('BOND ANGLE · ' + (on?'ON':'OFF'));
});
 $('#tglLEN').addEventListener('click', function(){
  this.classList.toggle('on');
  if (lenGroup) lenGroup.visible = this.classList.contains('on');
  showToast('BOND LENGTH · ' + (lenGroup && lenGroup.visible ? 'ON':'OFF'));
});
 $('#tglSPIN').addEventListener('click', function(){
  this.classList.toggle('on');
  spinOn = this.classList.contains('on');
  showToast('AUTO SPIN · ' + (spinOn?'ON':'OFF'));
});

/* ============================================================
   9. entrances
   ============================================================ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.addEventListener('animationend', function h(){
      e.target.classList.add('done'); e.target.removeEventListener('animationend', h);
    }, {once:true});
    io.unobserve(e.target);
  }
}), {threshold:.15});
 $$('.pick').forEach(p => io.observe(p));

/* ---------- 10. misc ---------- */
 $('#userBtn').addEventListener('click', () => showToast('USER PROFILE — JALD AA RAHA HAI'));
 $('#backBtn').addEventListener('click', () => location.href = 'group16.html');
 $('#toTop').addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

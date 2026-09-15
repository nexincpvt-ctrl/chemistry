/* ============================================================
   NEXINC — LANDING ONLY
   ============================================================ */
if (window.lucide) lucide.createIcons();

const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. custom cursor ---------- */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const dot = $('.cur-dot'), ring = $('.cur-ring');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
if (fine){
  document.body.classList.add('cursor-on');
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.opacity = 1; ring.style.opacity = 1; });
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('big', !!e.target.closest('a,button,.tile,.tm-chip,.tm-mini'));
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });
}

/* ---------- 2. background: molecule network ---------- */
const cv = $('#bg'), cx = cv.getContext('2d');
const ACCS = ['#2E7D52','#C94F2E','#0E7C86','#A06B12'];
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
    nodes.push({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      r: 1.4 + Math.random()*1.4,
      a: .15 + Math.random()*.2,
      acc: Math.random() < .09 ? ACCS[(Math.random()*4)|0] : null,
      pt: 2 + Math.random()*8
    });
  }
}
function drawBG(dt){
  cx.clearRect(0, 0, W, H);
  const LINK = 118;
  for (let i = 0; i < nodes.length; i++){
    const a = nodes[i];
    for (let j = i+1; j < nodes.length; j++){
      const b = nodes[j];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < LINK){
        cx.strokeStyle = 'rgba(30,36,32,' + (.09*(1-d/LINK)).toFixed(3) + ')';
        cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
  }
  for (const n of nodes){
    if (fine){
      const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy);
      if (d < 130 && d > 1){ const f = (130-d)/130*.5; n.vx += dx/d*f; n.vy += dy/d*f; }
    }
    n.vx *= .992; n.vy *= .992;
    const sp = Math.hypot(n.vx, n.vy);
    if (sp > .7){ n.vx *= .7/sp; n.vy *= .7/sp; }
    n.x += n.vx * dt; n.y += n.vy * dt;
    if (n.x < -20) n.x = W+20; if (n.x > W+20) n.x = -20;
    if (n.y < -20) n.y = H+20; if (n.y > H+20) n.y = -20;
    n.pt -= dt;
    if (n.pt < 0){ pulses.push({x:n.x, y:n.y, r:0, c:n.acc || '#1E2420'}); n.pt = 6 + Math.random()*9; }
    cx.fillStyle = n.acc ? n.acc : 'rgba(30,36,32,' + n.a + ')';
    cx.beginPath(); cx.arc(n.x, n.y, n.r, 0, 7); cx.fill();
  }
  for (let i = pulses.length-1; i >= 0; i--){
    const p = pulses[i]; p.r += 1.1 * dt;
    const al = .26 * (1 - p.r/64);
    if (al <= 0){ pulses.splice(i,1); continue; }
    cx.strokeStyle = p.c; cx.globalAlpha = al; cx.lineWidth = 1.2;
    cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.stroke(); cx.globalAlpha = 1;
  }
}
sizeCanvas(); initNodes();
addEventListener('resize', () => { sizeCanvas(); initNodes(); });
(function loop(t){
  const dt = Math.min(2.5, (t - lastT) / 16.7 || 1); lastT = t;
  if (!reduced) drawBG(dt);
  if (fine){
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  }
  requestAnimationFrame(loop);
})(0);

/* ---------- 3. tiles: entrance ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.addEventListener('animationend', function h(){ e.target.classList.add('done'); e.target.removeEventListener('animationend', h); }, {once:true});
    io.unobserve(e.target);
  }
}), {threshold:.18});
 $$('.tile').forEach(t => io.observe(t));

/* ---------- 4. click → "coming soon" toast ---------- */
const NAMES = {bio:'CH·01 — BIOMOLECULES', ald:'CH·02 — ALDEHYDES', g16:'CH·03 — GROUP 16', fb:'CH·04 — THE F-BLOCK'};
const toast = $('#toast'), toastMsg = $('#toastMsg');
let toastTimer = null;
function showToast(msg){
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
 $$('.tile').forEach(t => {
  t.addEventListener('click', () => {
    t.classList.add('pressing');
    setTimeout(() => t.classList.remove('pressing'), 320);
    showToast(NAMES[t.dataset.ch] + ' — JALD AA RAHA HAI');
  });
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); t.click(); }
  });
});
 $('#navCh')?.addEventListener('click', () => $('#bench').scrollIntoView({behavior:'smooth'}));
 $('#toTop')?.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));
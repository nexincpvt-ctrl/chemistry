/* ============================================================
   NEXINC — GROUP 16 · v2
   ============================================================ */
if (window.lucide) lucide.createIcons();
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0. THEME ---------- */
const themeBtn = $('#themeBtn');
let themeCur = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
themeBtn.addEventListener('click', () => {
  document.documentElement.classList.add('theming');
  themeCur = themeCur === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = themeCur;
  try{ localStorage.setItem('nexinc-theme', themeCur); }catch(e){}
  setTimeout(() => document.documentElement.classList.remove('theming'), 550);
});

/* ---------- 1. custom cursor ---------- */
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const dot = $('.cur-dot'), ring = $('.cur-ring');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
if (fine){
  document.body.classList.add('cursor-on');
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('big', !!e.target.closest('a,button,.tile,.el,.trend,.acard,.al-row,.fchip'));
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });
}

/* ---------- 2. background network ---------- */
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
    nodes.push({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      r: 1.4 + Math.random()*1.4,
      a: .15 + Math.random()*.2,
      acc: Math.random() < .1 ? (Math.random()*4)|0 : -1,
      pt: 2 + Math.random()*8
    });
  }
}
function drawBG(dt){
  const T = THEMES[themeCur];
  cx.clearRect(0, 0, W, H);
  const LINK = 118;
  for (let i = 0; i < nodes.length; i++){
    const a = nodes[i];
    for (let j = i+1; j < nodes.length; j++){
      const b = nodes[j];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < LINK){
        cx.strokeStyle = 'rgba(' + T.dot + ',' + (.09*(1-d/LINK)).toFixed(3) + ')';
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
    if (n.pt < 0){
      pulses.push({x:n.x, y:n.y, r:0, c: n.acc >= 0 ? T.acc[n.acc] : 'rgb(' + T.dot + ')'});
      n.pt = 6 + Math.random()*9;
    }
    cx.fillStyle = n.acc >= 0 ? T.acc[n.acc] : 'rgba(' + T.dot + ',' + n.a + ')';
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

/* ---------- 3. master loop ---------- */
(function loop(t){
  const dt = Math.min(2.5, (t - lastT) / 16.7 || 1); lastT = t;
  if (!reduced) drawBG(dt);
  if (fine){
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
  }
  requestAnimationFrame(loop);
})(0);

/* ---------- 4. scroll progress ---------- */
const prog = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  prog.style.width = (p * 100) + '%';
}, {passive:true});

/* ---------- 5. count-up helper ---------- */
function countUp(el){
  const target = +el.dataset.count, dur = 1000, t0 = performance.now();
  (function step(t){
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- 6. tile entrance + chips stagger ---------- */
const ioT = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.addEventListener('animationend', function h(){
      e.target.classList.add('done');
      /* chips ek-ek karke pop — hover se nahi, scroll reveal se */
      e.target.querySelectorAll('.fchip').forEach((c,i) =>
        setTimeout(() => c.classList.add('vis'), 120 + i*70));
      e.target.removeEventListener('animationend', h);
    }, {once:true});
    ioT.unobserve(e.target);
  }
}), {threshold:.12});
 $$('.tile').forEach(t => ioT.observe(t));

/* ---------- 7. element strip entrance + atomic number count-up ---------- */
const ioE = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    countUp(e.target.querySelector('.el-no'));
    e.target.addEventListener('animationend', function h(){
      e.target.classList.add('done'); e.target.removeEventListener('animationend', h);
    }, {once:true});
    ioE.unobserve(e.target);
  }
}), {threshold:.4});
 $$('.el').forEach(el => ioE.observe(el));

/* ---------- 8. stats band ---------- */
const ioS = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    ioS.unobserve(e.target);
  }
}), {threshold:.4});
 $$('.stat').forEach(s => ioS.observe(s));

/* ---------- 9. trend cards — bars grow ---------- */
const ioR = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('grow');
    ioR.unobserve(e.target);
  }
}), {threshold:.35});
 $$('.trend').forEach(t => ioR.observe(t));

/* ---------- 10. allotrope cards + rows stagger ---------- */
const ioA = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){
    e.target.classList.add('in');
    e.target.querySelectorAll('.al-row').forEach((r,i) =>
      setTimeout(() => r.classList.add('vis'), 250 + i*90));
    ioA.unobserve(e.target);
  }
}), {threshold:.25});
 $$('.acard').forEach(a => ioA.observe(a));

/* ---------- 11. 3D tilt on bench cards (hover = sirf effect) ---------- */
if (fine && !reduced){
  $$('.tile').forEach(tile => {
    tile.addEventListener('mousemove', e => {
      if (!tile.classList.contains('done')) return;
      const r = tile.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      tile.style.transform = 'translateY(-10px) rotateX(' + (-y*7) + 'deg) rotateY(' + (x*7) + 'deg)';
    });
    tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
  });
}

/* ---------- 12. clicks + toast ---------- */
const toastEl = $('#toast');
let toastTimer = null;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2100);
}
 $$('.tile').forEach(t => {
    t.addEventListener('click', () => {
    t.classList.add('pressing');
    setTimeout(() => {
      t.classList.remove('pressing');
      if (t.dataset.goto) location.href = t.dataset.goto;
    }, 320);
    if (!t.dataset.goto) showToast((t.dataset.name || 'YEH SECTION') + ' - DETAIL PAGE JALD');
  });
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); t.click(); }
  });
});
 $$('.el').forEach(el => {
  el.addEventListener('click', () => showToast(el.dataset.fact || 'ELEMENT'));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter'){ e.preventDefault(); el.click(); }
  });
});
 $('#userBtn').addEventListener('click', () => showToast('USER PROFILE — JALD AA RAHA HAI'));
 $('#backBtn').addEventListener('click', () => {
  if (history.length > 1) history.back();
  else location.href = 'dashboard.html';
});
 $('#toTop').addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));



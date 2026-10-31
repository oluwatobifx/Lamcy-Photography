// =============================================================
//  Lamcy Photography & Videography: page behaviour
//  The book, the photo viewer and the booking panel.
// =============================================================
import { CONTACT, CURRENCY, PHOTOS, CHAPTERS, PAGES, SERVICES } from './data.js?v=3';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => CURRENCY + Math.round(n).toLocaleString('en-NG');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FLIP_MS = reduced ? 10 : 1050;

const ICONS = {
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  cake: '<path d="M4 21h16M5 21v-7h14v7M5 17c2 1.5 4 1.5 7 0s5-1.5 7 0M12 14V9M12 6.5c-.9-1-.9-2 0-3 .9 1 .9 2 0 3Z"/>',
  baby: '<circle cx="12" cy="9" r="5"/><path d="M10 9h.01M14 9h.01M10.5 11.5c1 .7 2 .7 3 0M8 21c.5-3 2-4.5 4-4.5s3.5 1.5 4 4.5"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  flower: '<circle cx="12" cy="9" r="2.5"/><path d="M12 6.5c0-2 1-3.5 2.5-3.5S17 5 15 7.5M14.5 9c2 0 3.5 1 3.5 2.5S16 14 13.5 12M12 11.5c0 2-1 3.5-2.5 3.5S7 13 9 10.5M9.5 9C7.5 9 6 8 6 6.5S8 4 10.5 6M12 13v8M12 18c-2-2-4-2-5-1"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3M4 20h16"/>',
};
const svg = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const ZOOM_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';

// Image URL helpers (Unsplash images resize on the fly; local files are used as-is)
const isRemote = (src) => /^https:\/\/images\.unsplash\.com\//.test(src);
const sized = (src, w, q = 72) => (isRemote(src) ? `${src}?auto=format&fit=max&w=${w}&q=${q}` : src);
// Pick a photo width for the space it fills: sharp on retina screens (capped at 2x) without wasting data
const STEPS = [320, 480, 640, 800, 1000, 1200, 1600, 2000, 2600, 3200, 3840];
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const snapUp = (w) => STEPS.find((s) => s >= w) || STEPS[STEPS.length - 1];
const conn = navigator.connection || {};
const slowNet = !!conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || '');

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
document.querySelectorAll('[data-city]').forEach((el) => { el.textContent = CONTACT.city; });
const waBase = `https://wa.me/${CONTACT.whatsapp}`;
$('#wa-link').href = `${waBase}?text=${encodeURIComponent('Hello Lamcy, I would like to make an enquiry.')}`;

// =============================================================
//  THE BOOK
// =============================================================
const bookEl = $('#book');
const section = $('#gallery');
const controls = $('#book-controls');
const pageLabel = $('#page-label');
const prevBtn = $('#prev');
const nextBtn = $('#next');

// All photos in reading order, for the viewer
const ORDER = [];
PAGES.forEach((p) => p.photos.forEach((k) => { if (!ORDER.includes(k)) ORDER.push(k); }));

// Faces in reading order
const chapterNo = Object.fromEntries(CHAPTERS.map((c, i) => [c.id, i + 1]));
const chapterOf = [];
let cur = null;
PAGES.forEach((p, i) => { if (p.chapter) cur = p.chapter; chapterOf[i] = cur; });
const FACES = [{ kind: 'cover' }, { kind: 'inside' }, ...PAGES.map((p, i) => ({ kind: 'page', page: p, n: i + 1 })), { kind: 'back' }];
const chapterStart = {};
PAGES.forEach((p, i) => { if (p.chapter) chapterStart[p.chapter] = i + 1; });

let mode = null; // 'spread' | 'single'
let leaves = [];
let flipped = 0; // number of leaves turned
let faceToLeaf = []; // face index -> { leaf, side }

function faceHTML(f) {
  if (f.kind === 'cover') {
    return `<div class="hinge"></div><img class="cover-art" src="/img/logo-cover.webp" fetchpriority="high" alt="Lamcy Photography and Videography. Capture, Create, Inspire." width="1024" height="682" style="mix-blend-mode:lighten" /><span class="cover-open">Open the book</span>`;
  }
  if (f.kind === 'back') {
    return `<img src="/img/mark.webp" alt="" width="249" height="96" style="mix-blend-mode:lighten" /><p>Thank you for turning the pages. Let us capture your story next.</p><button class="btn btn-gold" type="button" data-open-booking>Book a session</button>`;
  }
  if (f.kind === 'inside') {
    const toc = CHAPTERS.map((c) => `<li><button type="button" data-goto="${chapterStart[c.id]}"><span>${esc(c.title)}</span><span>p. ${chapterStart[c.id]}</span></button></li>`).join('');
    return `<div class="welcome"><p class="kicker">Welcome to</p><h2>Lamcy Photography &amp; Videography</h2><p>Weddings, portraits, celebrations and events, captured in 4K. Turn the pages, tap any photo to see it up close.</p><ul class="toc">${toc}</ul></div>`;
  }
  if (f.kind === 'blank') return '';
  const p = f.page;
  const ch = CHAPTERS.find((c) => c.id === chapterOf[f.n - 1]);
  const head = p.chapter
    ? `<div class="pg-head"><span class="pg-title">${esc(ch.title)}</span><span class="pg-chapter">Chapter ${chapterNo[ch.id]}</span></div>`
    : `<div class="pg-head"><span class="pg-chapter">${esc(ch.title)}</span></div>`;
  const share = p.layout === 'pair' ? 0.46 : 0.9; // how much of the page width one photo fills
  const photos = p.photos.map((k) => {
    const ph = PHOTOS[k];
    return `<button class="ph" type="button" data-photo="${k}" aria-label="View photo: ${esc(ph.alt)}"><img data-src="${esc(ph.src)}" data-share="${share}" alt="${esc(ph.alt)}" decoding="async" /><span class="zoom">${ZOOM_SVG}</span></button>`;
  }).join('');
  const quote = p.layout === 'feature' ? `<div><p class="quote">${esc(p.quote)}</p>${p.cta ? '<div class="pg-cta"><button class="btn btn-gold" type="button" data-open-booking>Book a session</button></div>' : ''}</div>` : '';
  return `${head}<div class="pg-photos ${p.layout}">${photos}${quote}</div><div class="pg-foot"><span class="pg-cap">${esc(p.caption || '')}</span><span class="pg-num">${f.n}</span></div>`;
}

function faceClass(f) {
  if (f.kind === 'cover') return 'cover';
  if (f.kind === 'back') return 'cover back-cover';
  if (f.kind === 'inside') return 'endpaper';
  return 'paper';
}

function sizeBook() {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const spread = vw >= 860;
  const ratio = 1.38;
  const room = vh - (spread ? 230 : 200);
  let pw = spread ? Math.min(470, (vw - 120) / 2, room / ratio) : Math.min(440, vw - 36, room / ratio);
  pw = Math.max(spread ? 300 : 250, Math.floor(pw));
  bookEl.style.setProperty('--pw', pw + 'px');
  bookEl.style.setProperty('--ph', Math.round(pw * ratio) + 'px');
  return spread ? 'spread' : 'single';
}

function build(newMode) {
  // remember which face is showing so we land on the same place
  const showing = currentFaceIndex();
  mode = newMode;
  bookEl.classList.toggle('single', mode === 'single');
  const faces = FACES.slice();
  if (mode === 'spread' && faces.length % 2) faces.splice(faces.length - 1, 0, { kind: 'blank' });
  bookEl.innerHTML = '<div class="board board-right" aria-hidden="true"></div>';
  leaves = [];
  faceToLeaf = [];
  const pairs = mode === 'spread' ? faces.length / 2 : faces.length;
  for (let i = 0; i < pairs; i++) {
    const front = mode === 'spread' ? faces[i * 2] : faces[i];
    const back = mode === 'spread' ? faces[i * 2 + 1] : null;
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.dataset.i = i;
    leaf.innerHTML = `<div class="face front ${faceClass(front)}">${faceHTML(front)}</div>` + (back ? `<div class="face back ${faceClass(back)}">${faceHTML(back)}</div>` : '<div class="face back" aria-hidden="true"></div>');
    bookEl.appendChild(leaf);
    leaves.push(leaf);
    faceToLeaf.push({ leaf: i, side: 'front' });
    if (back) faceToLeaf.push({ leaf: i, side: 'back' });
  }
  bookEl._faces = mode === 'spread' ? faces : faces;
  // restore position without animation
  const target = showing == null ? 0 : flipsForFace(showing);
  flipped = 0;
  leaves.forEach((l) => { l.style.transition = 'none'; });
  setFlipped(target, true);
  bookEl.offsetWidth; // apply instantly
  leaves.forEach((l) => { l.style.transition = ''; });
  $$('img', bookEl).forEach((img) => img.addEventListener('load', () => img.classList.add('loaded'), { once: true }));
  update();
}

function maxFlips() { return mode === 'spread' ? leaves.length : leaves.length - 1; }

function flipsForFace(faceIdx) {
  // faceIdx is an index into FACES (0 = cover)
  if (mode === 'single') return Math.min(faceIdx, leaves.length - 1);
  return Math.ceil(faceIdx / 2);
}

function currentFaceIndex() {
  if (!mode) return null;
  if (mode === 'single') return flipped;
  return Math.max(0, flipped * 2 - 1);
}

function zFor(i, isFlipped) { return isFlipped ? i + 1 : leaves.length - i; }

function setFlipped(n, instant = false) {
  n = Math.max(0, Math.min(maxFlips(), n));
  const before = flipped;
  flipped = n;
  leaves.forEach((leaf, i) => {
    const should = i < n;
    const changed = leaf.classList.contains('flipped') !== should;
    if (!changed) { if (!leaf._turning) leaf.style.zIndex = zFor(i, should); return; }
    if (instant) {
      leaf.classList.toggle('flipped', should);
      leaf.style.zIndex = zFor(i, should);
      return;
    }
    // the leaf being turned goes on top while it moves
    const order = should ? i - before : before - 1 - i;
    leaf._turning = true;
    leaf.style.visibility = '';
    leaf.style.zIndex = leaves.length + 10 + Math.max(0, order);
    leaf.classList.add('turning');
    leaf.style.transitionDelay = `${Math.max(0, order) * 140}ms`;
    requestAnimationFrame(() => leaf.classList.toggle('flipped', should));
    clearTimeout(leaf._t);
    leaf._t = setTimeout(() => {
      leaf._turning = false;
      leaf.classList.remove('turning');
      leaf.style.transitionDelay = '';
      leaf.style.zIndex = zFor(i, leaf.classList.contains('flipped'));
      hideBuried();
    }, FLIP_MS + Math.max(0, order) * 140 + 30);
  });
  update();
}

function update() {
  const max = maxFlips();
  const state = flipped === 0 ? 'closed' : (mode === 'spread' && flipped === max ? 'end' : 'open');
  bookEl.dataset.state = state;
  section.classList.toggle('is-open', flipped > 0);
  controls.hidden = flipped === 0;
  prevBtn.disabled = flipped === 0;
  nextBtn.disabled = flipped >= max;
  pageLabel.textContent = labelFor();
  hideBuried();
  loadNear();
}

function labelFor() {
  const faces = bookEl._faces || FACES;
  const name = (f) => (!f ? '' : f.kind === 'page' ? f.n : f.kind === 'inside' ? 'Contents' : f.kind === 'back' ? 'Back cover' : f.kind === 'cover' ? 'Cover' : '');
  if (mode === 'single') {
    const f = faces[flipped];
    return f.kind === 'page' ? `Page ${f.n} of ${PAGES.length}` : name(f);
  }
  if (flipped === 0) return 'Cover';
  if (flipped === maxFlips()) return 'Back cover';
  const L = faces[flipped * 2 - 1];
  const R = faces[flipped * 2];
  if (L.kind === 'inside') return `Contents · Page ${R.n}`;
  if (R && R.kind === 'page' && L.kind === 'page') return `Pages ${L.n}–${R.n} of ${PAGES.length}`;
  return [name(L), name(R)].filter(Boolean).join(' · ');
}

// Load photos only where they are needed, so the page opens fast on any connection:
// nothing until the cover has loaded, then the pages on show first and the next pages in the background.
let pageReady = document.readyState === 'complete';
if (!pageReady) window.addEventListener('load', () => { pageReady = true; idle(() => loadNear()); }, { once: true });
function idle(fn, ms = 400) { return ('requestIdleCallback' in window) ? requestIdleCallback(fn, { timeout: ms * 4 }) : setTimeout(fn, ms); }

function photoUrl(img) {
  const pw = parseFloat(getComputedStyle(bookEl).getPropertyValue('--pw')) || 420;
  const w = snapUp(pw * parseFloat(img.dataset.share || 0.9) * DPR);
  return sized(img.dataset.src, w);
}
function loadLeaves(from, to, priority) {
  for (let i = Math.max(0, from); i <= Math.min(leaves.length - 1, to); i++) {
    $$('img[data-src]', leaves[i]).forEach((img) => {
      if ('fetchPriority' in img) img.fetchPriority = priority;
      img.src = photoUrl(img);
      img.removeAttribute('data-src');
    });
  }
}
let aheadTimer = 0;
function loadNear() {
  if (!pageReady || !leaves.length) return;
  if (flipped === 0) { idle(() => loadLeaves(0, 1, 'low'), 1200); return; } // closed: quietly get the first pages ready
  loadLeaves(flipped - 1, flipped + 1, 'high');
  if (aheadTimer) clearTimeout(aheadTimer);
  aheadTimer = setTimeout(() => idle(() => loadLeaves(flipped - 2, flipped + 3, 'low')), 700);
}

// Leaves buried under the top pages are not drawn, so turning pages stays smooth on slower phones
function hideBuried() {
  leaves.forEach((leaf, i) => {
    if (leaf._turning) { leaf.style.visibility = ''; return; }
    leaf.style.visibility = (i < flipped - 2 || i > flipped + 1) ? 'hidden' : '';
  });
}

function next() { if (flipped < maxFlips()) setFlipped(flipped + 1); }
function prev() { if (flipped > 0) setFlipped(flipped - 1); }
function gotoPage(n) { // n = page number (1-based)
  const faceIdx = n + 1; // cover=0, inside=1, page1=2
  let target = flipsForFace(faceIdx);
  if (mode === 'spread' && faceIdx % 2 === 1) target = (faceIdx + 1) / 2; // odd faces sit on the left
  setFlipped(target);
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
$('#close-book').addEventListener('click', () => setFlipped(0));

bookEl.addEventListener('click', (e) => {
  const t = e.target;
  if (t.closest('[data-open-booking]')) return; // handled globally
  const goto = t.closest('[data-goto]');
  if (goto) { gotoPage(Number(goto.dataset.goto)); return; }
  const ph = t.closest('[data-photo]');
  if (ph) { openViewer(ph.dataset.photo, ph.querySelector('img')); return; }
  const face = t.closest('.face');
  if (!face) return;
  const leaf = face.closest('.leaf');
  const i = Number(leaf.dataset.i);
  if (face.classList.contains('back')) prev();
  else if (i === flipped) next();
});

// keyboard: arrows turn pages when nothing else is open
document.addEventListener('keydown', (e) => {
  if (document.body.classList.contains('panel-open') || !$('#lightbox').hidden) return;
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
  const r = section.getBoundingClientRect();
  if (r.bottom < 120 || r.top > innerHeight - 120) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
});

// swipe to turn
let sx = null, sy = null;
$('#stage').addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
$('#stage').addEventListener('touchend', (e) => {
  if (sx == null) return;
  const dx = e.changedTouches[0].clientX - sx;
  const dy = e.changedTouches[0].clientY - sy;
  sx = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) { if (dx < 0) next(); else prev(); }
}, { passive: true });

function layout() {
  const m = sizeBook();
  if (m !== mode) build(m);
}
let rT;
addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layout, 120); });
layout();

// =============================================================
//  PHOTO VIEWER
// =============================================================
const lb = $('#lightbox');
const lbImg = $('#lb-img');
const lbCap = $('#lb-cap');
let lbKey = null;
let lbOrigin = null;
let lbReturn = null;

function captionFor(k) {
  const ph = PHOTOS[k];
  return `<b>${esc(ph.alt)}</b>Photo by <a href="${esc(ph.credit)}" target="_blank" rel="noopener">${esc(ph.by)}</a> on Unsplash · ${ORDER.indexOf(k) + 1} of ${ORDER.length}`;
}

function loadHiRes(k) {
  const src = PHOTOS[k].src;
  if (!isRemote(src)) return;
  if (slowNet) return; // keep the sharp page-size photo on very slow connections or data saver
  const longest = Math.max(screen.width || 0, screen.height || 0, innerWidth, innerHeight);
  const want = sized(src, snapUp(Math.min(3840, longest * DPR)), 82); // up to 4K, matched to the screen
  const hi = new Image();
  hi.decoding = 'async';
  hi.onload = () => { if (lbKey === k) lbImg.src = want; };
  hi.src = want;
}

async function openViewer(k, fromImg) {
  lbKey = k;
  lbReturn = document.activeElement;
  lbOrigin = fromImg;
  const start = fromImg && fromImg.currentSrc ? fromImg.currentSrc : sized(PHOTOS[k].src, snapUp(Math.min(innerWidth, 1000) * DPR));
  lbImg.style.transition = 'none';
  lbImg.style.transform = '';
  lbImg.alt = PHOTOS[k].alt;
  lbImg.src = start;
  lbCap.innerHTML = captionFor(k);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  try { await lbImg.decode(); } catch (e) { /* still show it */ }
  if (fromImg && !reduced) {
    const a = fromImg.getBoundingClientRect();
    const b = lbImg.getBoundingClientRect();
    if (b.width && a.width) {
      const s = Math.max(a.width / b.width, a.height / b.height);
      lbImg.style.transform = `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${s})`;
      lbImg.offsetWidth;
    }
  }
  lbImg.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
  lbImg.style.transform = '';
  requestAnimationFrame(() => lb.classList.add('show'));
  $('#lb-close').focus({ preventScroll: true });
  loadHiRes(k);
}

function closeViewer() {
  if (lb.hidden) return;
  lb.classList.remove('show');
  const done = () => {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.style.overflow = document.body.classList.contains('panel-open') ? 'hidden' : '';
    lbKey = null;
    if (lbReturn) lbReturn.focus({ preventScroll: true });
  };
  if (lbOrigin && !reduced && lbOrigin.isConnected) {
    const a = lbOrigin.getBoundingClientRect();
    const b = lbImg.getBoundingClientRect();
    if (a.width && b.width) {
      const s = Math.max(a.width / b.width, a.height / b.height);
      lbImg.style.transform = `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${s})`;
      setTimeout(done, 380);
      return;
    }
  }
  done();
}

function stepViewer(d) {
  if (!lbKey) return;
  const k = ORDER[(ORDER.indexOf(lbKey) + d + ORDER.length) % ORDER.length];
  lbKey = k;
  lbOrigin = $(`[data-photo="${k}"] img`, bookEl);
  lbImg.style.transition = 'opacity .2s';
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.style.transform = '';
    lbImg.src = sized(PHOTOS[k].src, snapUp(Math.min(innerWidth, 1000) * DPR));
    lbImg.alt = PHOTOS[k].alt;
    lbCap.innerHTML = captionFor(k);
    lbImg.onload = () => { lbImg.style.opacity = '1'; lbImg.onload = null; };
    loadHiRes(k);
  }, 180);
}

$('#lb-close').addEventListener('click', closeViewer);
$('#lb-prev').addEventListener('click', () => stepViewer(-1));
$('#lb-next').addEventListener('click', () => stepViewer(1));
lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-fig')) closeViewer(); });
document.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeViewer();
  if (e.key === 'ArrowRight') stepViewer(1);
  if (e.key === 'ArrowLeft') stepViewer(-1);
  if (e.key === 'Tab') { // keep focus inside the viewer
    const f = [$('#lb-close'), $('#lb-prev'), $('#lb-next')];
    const i = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  }
});
let lx = null;
lb.addEventListener('touchstart', (e) => { lx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (lx == null) return;
  const dx = e.changedTouches[0].clientX - lx;
  lx = null;
  if (Math.abs(dx) > 50) stepViewer(dx < 0 ? 1 : -1);
}, { passive: true });

// =============================================================
//  SERVICES GRID
// =============================================================
function fromPrice(s) {
  const first = s.fields.find((f) => f.type === 'choice');
  return first ? Math.min(...first.options.map((o) => o.price)) : 0;
}
$('#svc-grid').innerHTML = SERVICES.map((s) => `
  <button class="svc" type="button" data-open-booking="${s.id}">
    <span class="svc-ico">${svg(s.icon)}</span>
    <h3>${esc(s.name)}</h3>
    <p>${esc(s.blurb)}</p>
    <span class="svc-foot"><span>From <b>${money(fromPrice(s))}</b></span><span>Book →</span></span>
  </button>`).join('');

// =============================================================
//  BOOKING PANEL
// =============================================================
const panel = $('#booking');
const scrim = $('#scrim');
const form = $('#booking-form');
const select = $('#svc-select');
const fieldsEl = $('#svc-fields');
const errorEl = $('#form-error');
let panelReturn = null;
const values = {}; // per-service answers, kept while the page is open

select.innerHTML = SERVICES.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
const today = new Date();
const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
form.date.min = iso(today);

function svcById(id) { return SERVICES.find((s) => s.id === id) || SERVICES[0]; }

function defaults(s) {
  const v = {};
  s.fields.forEach((f) => {
    if (f.type === 'choice') v[f.id] = 0;
    if (f.type === 'number') v[f.id] = f.value ?? f.min;
    if (f.type === 'addons') v[f.id] = [];
  });
  return v;
}

function renderService(id) {
  const s = svcById(id);
  if (!values[s.id]) values[s.id] = defaults(s);
  const v = values[s.id];
  select.value = s.id;
  $('#svc-blurb').textContent = s.blurb;
  $('#date-label').textContent = s.dateLabel || 'Date';
  $('#time-field').hidden = !!s.noTime;
  $('#loc-field').hidden = !!s.noLocation;
  fieldsEl.innerHTML = s.fields.map((f) => {
    if (f.type === 'choice') {
      return `<fieldset class="group"><legend>${esc(f.label)}</legend><div class="opts">${f.options.map((o, i) => `
        <label class="opt"><input type="radio" name="${f.id}" value="${i}" ${v[f.id] === i ? 'checked' : ''} /><span class="mark"></span><span class="opt-txt">${esc(o.label)}</span><span class="opt-price">${o.price ? money(o.price) : 'Included'}</span></label>`).join('')}</div></fieldset>`;
    }
    if (f.type === 'number') {
      return `<fieldset class="group"><legend>${esc(f.label)}</legend><div class="stepper">
        <span class="stepper-info"><b data-num-label="${f.id}"></b><small>${esc(f.note || '')}${f.unitPrice ? ` · ${money(f.unitPrice)} per extra ${esc(f.unit)}` : ''}</small></span>
        <span class="stepper-ctl"><button type="button" data-step="${f.id}" data-d="-1" aria-label="Fewer ${esc(f.unit)}s">−</button><input type="number" inputmode="numeric" name="${f.id}" min="${f.min}" max="${f.max}" step="${f.step || 1}" value="${v[f.id]}" aria-label="${esc(f.label)}" /><button type="button" data-step="${f.id}" data-d="1" aria-label="More ${esc(f.unit)}s">+</button></span>
      </div></fieldset>`;
    }
    if (f.type === 'addons') {
      return `<fieldset class="group"><legend>${esc(f.label)} <small style="letter-spacing:0;text-transform:none;color:var(--muted);font-weight:500">(optional)</small></legend><div class="opts">${f.options.map((o, i) => `
        <label class="opt"><input type="checkbox" name="${f.id}" value="${i}" ${v[f.id].includes(i) ? 'checked' : ''} /><span class="mark"></span><span class="opt-txt">${esc(o.label)}</span><span class="opt-price">+${money(o.price)}</span></label>`).join('')}</div></fieldset>`;
    }
    return '';
  }).join('');
  refresh();
}

function plural(n, unit) { return `${n.toLocaleString('en-NG')} ${unit}${n === 1 ? '' : 's'}`; }

function quote(s, v) {
  const lines = [];
  s.fields.forEach((f) => {
    if (f.type === 'choice') {
      const o = f.options[v[f.id]];
      lines.push({ label: `${f.label}: ${o.label}`, amount: o.price });
    }
    if (f.type === 'number') {
      const extra = Math.max(0, v[f.id] - (f.included || 0));
      lines.push({ label: `${f.label}: ${plural(v[f.id], f.unit)}${extra && f.unitPrice ? ` (${extra} extra)` : ''}`, amount: extra * (f.unitPrice || 0) });
    }
    if (f.type === 'addons') {
      v[f.id].forEach((i) => lines.push({ label: f.options[i].label, amount: f.options[i].price }));
    }
  });
  return { lines, total: lines.reduce((t, l) => t + l.amount, 0) };
}

function refresh() {
  const s = svcById(select.value);
  const v = values[s.id];
  s.fields.filter((f) => f.type === 'number').forEach((f) => {
    const lab = $(`[data-num-label="${f.id}"]`, fieldsEl);
    if (lab) lab.textContent = plural(v[f.id], f.unit);
    $$(`[data-step="${f.id}"]`, fieldsEl).forEach((b) => { b.disabled = b.dataset.d < 0 ? v[f.id] <= f.min : v[f.id] >= f.max; });
  });
  const q = quote(s, v);
  $('#summary').innerHTML = q.lines.map((l) => `<div><span>${esc(l.label)}</span><span>${l.amount ? money(l.amount) : 'Included'}</span></div>`).join('');
  $('#total').textContent = money(q.total);
  $('#deposit').textContent = `50% deposit to secure your date: ${money(q.total / 2)}`;
}

select.addEventListener('change', () => renderService(select.value));

fieldsEl.addEventListener('change', (e) => {
  const s = svcById(select.value);
  const v = values[s.id];
  const t = e.target;
  const f = s.fields.find((x) => x.id === t.name);
  if (!f) return;
  if (f.type === 'choice') v[f.id] = Number(t.value);
  if (f.type === 'addons') v[f.id] = $$(`input[name="${f.id}"]:checked`, fieldsEl).map((i) => Number(i.value));
  if (f.type === 'number') {
    let n = Math.round(Number(t.value) || f.min);
    n = Math.max(f.min, Math.min(f.max, n));
    v[f.id] = n;
    t.value = n;
  }
  refresh();
});
fieldsEl.addEventListener('input', (e) => {
  if (e.target.type !== 'number') return;
  const s = svcById(select.value);
  const f = s.fields.find((x) => x.id === e.target.name);
  const n = Number(e.target.value);
  if (f && Number.isFinite(n) && n >= f.min && n <= f.max) { values[s.id][f.id] = Math.round(n); refresh(); }
});
fieldsEl.addEventListener('click', (e) => {
  const b = e.target.closest('[data-step]');
  if (!b) return;
  const s = svcById(select.value);
  const f = s.fields.find((x) => x.id === b.dataset.step);
  const v = values[s.id];
  v[f.id] = Math.max(f.min, Math.min(f.max, v[f.id] + Number(b.dataset.d) * (f.step || 1)));
  $(`input[name="${f.id}"]`, fieldsEl).value = v[f.id];
  refresh();
});

// validation: check a field when the person leaves it, clear the error as soon as it is fixed
function fieldError(name) {
  const el = form.elements[name];
  if (!el || el.closest('[hidden]')) return '';
  const val = el.value.trim();
  if (name === 'name' && val.length < 2) return 'Please enter your name.';
  if (name === 'phone' && val.replace(/\D/g, '').length < 7) return 'Please enter a phone number we can reach you on.';
  if (name === 'date') {
    if (!val) return `Please choose the ${($('#date-label').textContent || 'date').toLowerCase()}.`;
    if (val < iso(new Date())) return 'Please choose a date from today onwards.';
  }
  return '';
}
function mark(name) {
  const msg = fieldError(name);
  form.elements[name].closest('.field').classList.toggle('invalid', !!msg);
  return msg;
}
['name', 'phone', 'date'].forEach((n) => {
  form.elements[n].addEventListener('blur', () => mark(n));
  form.elements[n].addEventListener('input', () => {
    if (form.elements[n].closest('.field').classList.contains('invalid')) mark(n);
    if (!errorEl.hidden && !['name', 'phone', 'date'].some(fieldError)) errorEl.hidden = true;
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errs = ['name', 'phone', 'date'].map(mark).filter(Boolean);
  if (errs.length) {
    errorEl.textContent = errs[0];
    errorEl.hidden = false;
    form.querySelector('.field.invalid input')?.focus();
    return;
  }
  errorEl.hidden = true;
  const s = svcById(select.value);
  const q = quote(s, values[s.id]);
  const d = Object.fromEntries(new FormData(form));
  const when = new Date(d.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  const msg = [
    `Hello Lamcy! I'd like to book: *${s.name}*`,
    '',
    ...q.lines.map((l) => `• ${l.label}${l.amount ? ` (${money(l.amount)})` : ''}`),
    '',
    `*Estimated total: ${money(q.total)}*`,
    `50% deposit: ${money(q.total / 2)}`,
    '',
    `Name: ${d.name.trim()}`,
    `Phone: ${d.phone.trim()}`,
    `${s.dateLabel || 'Date'}: ${when}${d.time && !s.noTime ? ` at ${d.time}` : ''}`,
    ...(d.location && !s.noLocation ? [`Location: ${d.location.trim()}`] : []),
    ...(d.notes ? [`Notes: ${d.notes.trim()}`] : []),
  ].join('\n');
  window.open(`${waBase}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// open / close
function openPanel(serviceId) {
  panelReturn = document.activeElement;
  renderService(serviceId || select.value || SERVICES[0].id);
  scrim.hidden = false;
  panel.hidden = false;
  document.body.classList.add('panel-open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => { scrim.classList.add('show'); panel.classList.add('show'); });
  setTimeout(() => select.focus({ preventScroll: true }), 60);
}
function closePanel() {
  if (panel.hidden) return;
  scrim.classList.remove('show');
  panel.classList.remove('show');
  document.body.classList.remove('panel-open');
  document.body.style.overflow = '';
  setTimeout(() => { panel.hidden = true; scrim.hidden = true; }, 380);
  if (panelReturn && panelReturn.isConnected) panelReturn.focus({ preventScroll: true });
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-open-booking]');
  if (!b) return;
  e.preventDefault();
  openPanel(b.dataset.openBooking || undefined);
});
$('#panel-close').addEventListener('click', closePanel);
scrim.addEventListener('click', closePanel);
document.addEventListener('keydown', (e) => {
  if (panel.hidden) return;
  if (e.key === 'Escape') { closePanel(); return; }
  if (e.key !== 'Tab') return;
  const items = $$('button, [href], input, select, textarea', panel).filter((el) => !el.disabled && el.offsetParent !== null && !el.closest('[hidden]'));
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------------- Theme: system → light → dark ---------------- */
(function themeSwitch() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const root = document.documentElement;
  const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  const order = ['system', 'light', 'dark'];
  const names = { system: 'System', light: 'Light', dark: 'Dark' };
  const meta = document.querySelector('meta[name="theme-color"]');
  let pref = root.getAttribute('data-theme-pref') || 'system';

  function apply() {
    const dark = pref === 'dark' || (pref === 'system' && !(mq && mq.matches));
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-theme-pref', pref);
    if (meta) meta.setAttribute('content', dark ? '#050505' : '#f7f2e8');
    const next = order[(order.indexOf(pref) + 1) % order.length];
    btn.setAttribute('aria-label', `Theme: ${names[pref]}. Switch to ${names[next].toLowerCase()}`);
    btn.title = `Theme: ${names[pref]}`;
    btn.querySelector('.theme-txt').textContent = names[pref];
  }

  btn.addEventListener('click', () => {
    pref = order[(order.indexOf(pref) + 1) % order.length];
    try { localStorage.setItem('lamcy-theme', pref); } catch (e) { /* storage unavailable */ }
    apply();
  });
  if (mq) {
    const onChange = () => { if (pref === 'system') apply(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }
  apply();
})();

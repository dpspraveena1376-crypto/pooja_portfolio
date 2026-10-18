import { Component, createRef } from 'react';
import Header from './sections/Header.jsx';
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Experience from './sections/Experience.jsx';
import Projects from './sections/Projects.jsx';
import Resume from './sections/Resume.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

// Width / height of the hero portrait (public/assets/portrait-home.webp). The buttons ring around it,
// so update this if the portrait is swapped for one with a different shape.
const FACE_RATIO = 920 / 900;
// Loader: window (ms) within which the frame bricks set off, each at a random moment; how long each
// brick's flight takes; and its easing (a soft ease-out that glides in with only a hint of settle).
const INTRO_SPREAD = 1000, INTRO_MOVE = 1000, INTRO_EASE = 'cubic-bezier(.22,1.08,.36,1)';

// Page logic ported from the Claude Design component (Portfolio v4). renderVals() derives every
// responsive measurement and interaction state; the section components are pure views of it.
export default class Portfolio extends Component {
  state = { w: typeof window !== 'undefined' ? window.innerWidth : 1280, h: typeof window !== 'undefined' ? window.innerHeight : 800, scrolled: false, dock: false, active: 'home', menuOpen: false, filter: 'All', stop: 0, faceHover: false, intro: 'pending' };
  headerRef = createRef(); frameRef = createRef(); exRoadRef = createRef(); exPathRef = createRef(); exFaceRef = createRef(); exRailRef = createRef(); exRailFaceRef = createRef(); menuRef = createRef(); menuWrapRef = createRef();

  componentDidMount() {
    this.onResize = () => { this.f2 = null; const nw = window.innerWidth, nh = window.innerHeight; this.setState(nw !== this.state.w || Math.abs(nh - this.state.h) > 120 ? { w: nw, h: nh, heroK: 1 } : { w: nw, h: nh }); setTimeout(() => this.update(), 60); setTimeout(() => this.update(), 320); };
    this.onScroll = () => { if (this.raf) return; this.raf = requestAnimationFrame(() => { this.raf = null; this.update(); }); };
    this.onKey = e => { if (e.key === 'Escape' && this.state.menuOpen) { this.setState({ menuOpen: false }); const b = this.menuWrapRef.current && this.menuWrapRef.current.querySelector('button'); b && b.focus(); } };
    this.onDown = e => { if (this.state.menuOpen && this.menuWrapRef.current && !this.menuWrapRef.current.contains(e.target)) this.setState({ menuOpen: false }); };
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('keydown', this.onKey);
    document.addEventListener('mousedown', this.onDown);
    this.startIntro();
    // Re-measure as fonts, images and the page scrollbar settle.
    [60, 400, 1200].forEach(t => setTimeout(() => this.update(), t));
    window.addEventListener('load', this.onScroll);
    if (window.ResizeObserver && this.frameRef.current) {
      this.ro = new ResizeObserver(([e]) => { const r = e.contentRect; const fw = Math.round(r.width), fh = Math.round(r.height); if (Math.abs(fw - (this.state.fw || 0)) > 4 || Math.abs(fh - (this.state.fh || 0)) > 4) this.setState({ fw, fh }); this.update(); });
      this.ro.observe(this.frameRef.current);
    }
  }
  componentDidUpdate(_, prev) {
    this.positionFace();
    // The hero just rescaled, so the frame changed height: re-measure so the bricks follow it.
    if (prev.heroK !== this.state.heroK) requestAnimationFrame(() => this.update());
  }
  // Loader: the real frame bricks start scattered over the page, then fly into their slots one after
  // another before the hero fades in. Plays once per full page load; skipped for reduced motion. The
  // safety timer reveals the page even if images are slow or fail.
  startIntro() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { this.setState({ intro: 'done' }); return; }
    // Bricks set off at random moments within INTRO_SPREAD ms, each gliding for INTRO_MOVE ms.
    this.introT1 = setTimeout(() => this.setState({ intro: 'build' }, () => {
      this.introT2 = setTimeout(() => this.setState({ intro: 'done' }), INTRO_SPREAD + INTRO_MOVE + 80);
    }), 450);
    this.introT3 = setTimeout(() => { if (this.state.intro !== 'done') this.setState({ intro: 'done' }); }, 4500);
  }
  componentWillUnmount() {
    clearTimeout(this.introT1); clearTimeout(this.introT2); clearTimeout(this.introT3);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('load', this.onScroll);
    document.removeEventListener('keydown', this.onKey);
    document.removeEventListener('mousedown', this.onDown);
  }
  positionFace() {
    const vh = window.innerHeight;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const box = this.exRoadRef.current, path = this.exPathRef.current;
    if (box && path) {
      const r = box.getBoundingClientRect();
      const p = reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.9 - r.top) / Math.max(1, r.height * 0.85)));
      path.style.strokeDashoffset = String(1 - Math.max(0.001, p));
    }
    const rail = this.exRailRef.current, fill = this.exRailFaceRef.current;
    if (rail && fill) {
      const r = rail.getBoundingClientRect();
      const p = reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.7 - r.top) / Math.max(1, r.height)));
      fill.style.clipPath = 'inset(0 0 ' + ((1 - p) * 100).toFixed(2) + '% 0)';
    }
  }
  skUnflash() { clearTimeout(this.skFT); this.skFT = setTimeout(() => this.setState({ skFlash: [] }), 900); }
  skCommit(order, ids, msg) { this.setState({ skOrder: order, skFlash: ids, skLive: msg }, () => this.skUnflash()); }
  skDown(e, id) {
    if (e.button > 0) return;
    const order = this.state.skOrder || [0, 1, 2, 3, 4, 5];
    const info = { id, startY: e.clientY, startSlot: order.indexOf(id), moved: false, dy: 0 };
    const mv = ev => { const dy = ev.clientY - info.startY; if (!info.moved && Math.abs(dy) > 6) info.moved = true; if (info.moved) { ev.preventDefault && ev.preventDefault(); info.dy = Math.max(-info.startSlot * this.skH - 20, Math.min((5 - info.startSlot) * this.skH + 20, dy)); this.setState({ skDrag: { ...info } }); } };
    const up = () => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (info.moved) {
        this.skSuppress = true; setTimeout(() => { this.skSuppress = false; }, 50);
        const t = Math.max(0, Math.min(5, Math.round(info.startSlot + info.dy / this.skH)));
        const o = order.filter(x => x !== id); o.splice(t, 0, id);
        this.setState({ skDrag: null, skSel: null }); this.skCommit(o, [id], 'Moved to position ' + (t + 1) + '.');
      } else this.setState({ skDrag: null });
    };
    window.addEventListener('pointermove', mv, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }
  skClick(id) {
    if (this.skSuppress) return;
    const sel = this.state.skSel, order = (this.state.skOrder || [0, 1, 2, 3, 4, 5]).slice();
    if (sel == null) { this.setState({ skSel: id, skLive: 'Selected. Pick another block to swap with.' }); return; }
    if (sel === id) { this.setState({ skSel: null, skLive: 'Selection cleared.' }); return; }
    const a = order.indexOf(sel), b = order.indexOf(id); order[a] = id; order[b] = sel;
    this.setState({ skSel: null }); this.skCommit(order, [sel, id], 'Swapped positions ' + (a + 1) + ' and ' + (b + 1) + '.');
  }
  skKey(e, id) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') { if (e.key === 'Escape') this.setState({ skSel: null }); return; }
    e.preventDefault();
    const order = (this.state.skOrder || [0, 1, 2, 3, 4, 5]).slice(), i = order.indexOf(id), j = e.key === 'ArrowUp' ? i - 1 : i + 1;
    if (j < 0 || j > 5) return;
    order.splice(i, 1); order.splice(j, 0, id); this.skCommit(order, [id], 'Moved to position ' + (j + 1) + '.');
    const el = e.currentTarget; setTimeout(() => el && el.focus(), 0);
  }
  brT(W) { return Math.max(30, Math.min(88, Math.round(W * 0.064))); }
  brSlots(W, H, t) {
    const nT = Math.max(1, Math.round((W - 2 * t) / (2 * t))), nS = Math.max(1, Math.round((H - 2 * t) / (2 * t)));
    const hw = (W - 2 * t) / nT, vh = (H - 2 * t) / nS, S = [];
    S.push({ x: 0, y: 0, w: t, h: t, sh: 'c', run: -1 });
    for (let i = 0; i < nT; i++) S.push({ x: t + i * hw, y: 0, w: hw, h: t, sh: 'h', run: 0, edge: 'top' });
    S.push({ x: W - t, y: 0, w: t, h: t, sh: 'c', run: -1 });
    for (let i = 0; i < nS; i++) S.push({ x: W - t, y: t + i * vh, w: t, h: vh, sh: 'v', run: 1, edge: 'right' });
    S.push({ x: W - t, y: H - t, w: t, h: t, sh: 'c', run: -1 });
    for (let i = nT - 1; i >= 0; i--) S.push({ x: t + i * hw, y: H - t, w: hw, h: t, sh: 'h', run: 2, edge: 'bottom' });
    S.push({ x: 0, y: H - t, w: t, h: t, sh: 'c', run: -1 });
    for (let i = nS - 1; i >= 0; i--) S.push({ x: 0, y: t + i * vh, w: t, h: vh, sh: 'v', run: 3, edge: 'left' });
    return S;
  }
  brMove(order, from, to, S) {
    const o = order.slice(); if (from === to) return o;
    if (S[from].run >= 0 && S[from].run === S[to].run) { const idx = []; S.forEach((q, i) => { if (q.run === S[from].run) idx.push(i); }); const ids = idx.map(i => o[i]); const a = idx.indexOf(from), b = idx.indexOf(to); const [m] = ids.splice(a, 1); ids.splice(b, 0, m); idx.forEach((si, k) => { o[si] = ids[k]; }); return o; }
    const tmp = o[from]; o[from] = o[to]; o[to] = tmp; return o;
  }
  brState(N) {
    const seq = ['green', 'blue', 'yellow', 'red', 'cream', 'pink', 'orange', 'mint', 'lav'];
    const defOrder = Array.from({ length: N }, (_, i) => i), defColor = defOrder.map(i => seq[i % seq.length]);
    const ok = this.state.brN === N;
    return { order: ok ? this.state.brOrder : defOrder, color: ok ? this.state.brColor : defColor, defOrder, defColor };
  }
  brVals(W, H, t) {
    const S = this.brSlots(W, H, t), N = S.length; this.brS = S; this.brNum = N;
    const st = this.brState(N), dr = this.state.brDrag, pick = this.state.brPick, fx = this.state.brFx;
    let order = st.order, target = -1;
    if (dr && dr.moved) { target = dr.target; order = this.brMove(st.order, dr.fromSlot, target, S); }
    const slotOf = id => order.indexOf(id), focusSlot = this.state.brFocus == null ? 0 : Math.min(N - 1, this.state.brFocus);
    const pal = { red: 'Red', blue: 'Blue', yellow: 'Yellow', green: 'Green', pink: 'Pink', orange: 'Orange', lav: 'Purple', white: 'White', mint: 'Teal', cream: 'Cream' };
    // Loader geometry: a scattered start point inside the frame for each brick, and a random start
    // time so the frame fills in all over at once rather than in order.
    const intro = this.state.intro;
    const rnd = (id, k) => { const v = Math.sin(id * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    const introStyle = (id, q, sl) => {
      if (intro === 'done') return null;
      if (intro === 'build') return { tf: 'none', trans: `transform ${INTRO_MOVE}ms ${INTRO_EASE} ${Math.round(rnd(id, 4) * INTRO_SPREAD)}ms` };
      const sx = W * (0.18 + 0.64 * rnd(id, 1)), sy = H * (0.22 + 0.56 * rnd(id, 2));
      return { tf: `translate(${Math.round(sx - q.x - q.w / 2)}px, ${Math.round(sy - q.y - q.h / 2)}px) rotate(${Math.round(rnd(id, 3) * 90 - 45)}deg) scale(0.86)`, trans: 'none' };
    };
    const brBricks = Array.from({ length: N }, (_, id) => {
      const sl = slotOf(id), q = S[sl], dragging = dr && dr.moved && dr.id === id, picked = pick && pick.id === id;
      const g = dragging ? S[dr.fromSlot] : q, x = dragging ? dr.px - dr.ox : q.x, y = dragging ? dr.py - dr.oy : q.y;
      const io = introStyle(id, q, sl);
      return { id: String(id), src: 'assets/bricks/' + (dragging ? S[dr.fromSlot].sh : q.sh) + '-' + st.color[id] + '.png',
        left: x + 'px', top: y + 'px', w: g.w + 'px', h: g.h + 'px', z: dragging ? 30 : picked ? 25 : 1,
        tf: io ? io.tf : dragging ? 'scale(1.08) rotate(-3deg)' : picked ? 'translateY(-4px) scale(1.04)' : 'none', hoverTf: dragging ? 'scale(1.08) rotate(-3deg)' : 'translateY(-3px) rotate(-2deg)',
        filter: dragging ? 'drop-shadow(0 16px 18px rgba(36,33,46,0.32))' : picked ? 'drop-shadow(0 10px 12px rgba(36,33,46,0.28))' : 'drop-shadow(0 3px 4px rgba(36,33,46,0.16))',
        outline: picked ? '2.5px dashed #24212E' : 'none',
        trans: io ? io.trans : dragging ? 'transform 0.15s ease, filter 0.15s ease' : 'left 0.45s cubic-bezier(.34,1.45,.64,1), top 0.45s cubic-bezier(.34,1.45,.64,1), width 0.45s ease, height 0.45s ease, transform 0.25s cubic-bezier(.34,1.56,.64,1), filter 0.2s ease',
        cursor: dragging ? 'grabbing' : 'grab', touch: q.sh === 'h' ? 'pan-y' : 'none', tab: sl === focusSlot ? '0' : '-1', pressed: picked ? 'true' : 'false',
        aria: pal[st.color[id]] + ' LEGO brick ' + (sl + 1) + ' of ' + N + '. Enter changes colour, Space picks it up, arrows move.',
        down: e => this.brDown(e, id), click: () => this.brClick(id), key: e => this.brKey(e, id), focus: () => { if (this.state.brFocus !== sl) this.setState({ brFocus: sl }); } };
    });
    const tq = target >= 0 ? S[target] : null;
    const changed = st.order.some((v, i) => v !== i) || st.color.some((c, i) => c !== st.defColor[i]);
    return { brBricks, brDrop: tq ? { left: tq.x + 'px', top: tq.y + 'px', w: tq.w + 'px', h: tq.h + 'px', disp: 'block' } : { left: '0', top: '0', w: '0', h: '0', disp: 'none' },
      brParts: fx ? fx.parts.map(p => ({ x: fx.x + 'px', y: fx.y + 'px', c: p.c, tf: fx.on ? 'translate(' + p.dx + 'px,' + p.dy + 'px) rotate(' + p.r + 'deg)' : 'none', op: fx.on ? 0 : 1 })) : [],
      brMsgShow: !!(fx && fx.msg), brMsg: fx ? { x: fx.mx + 'px', y: fx.my + 'px', tf: fx.mtf, text: fx.msg, op: fx.fade ? 0 : 1 } : { x: '0', y: '0', tf: 'none', text: '', op: 0 },
      // Corner note telling visitors the frame is a toy; it bows out once they have moved or recoloured a brick.
      brHint: { left: (t + 14) + 'px', top: (t + 12) + 'px', op: intro !== 'done' || changed || (dr && dr.moved) ? 0 : 1 },
      // Hero content and header stay hidden until the loader has built the frame.
      introOp: intro === 'done' ? 1 : 0,
      // While the loader runs, let the browser move the bricks on the GPU for smooth frames.
      introWill: intro === 'done' ? 'auto' : 'transform',
      brChanged: changed, brResetL: (t + 14) + 'px', brResetB: (t + 14) + 'px', brLive: this.state.brLive || '',
      brReset: () => { this.setState({ brN: N, brOrder: st.defOrder, brColor: st.defColor, brPick: null, brLive: 'Frame reset.' }); } };
  }
  brCommit(order, color, msg) { this.setState({ brN: this.brNum, brOrder: order, brColor: color, brLive: msg || '' }); }
  brDown(e, id) {
    if (e.button > 0) return;
    const fr = this.frameRef.current; if (!fr) return;
    const S = this.brS, st = this.brState(S.length), from = st.order.indexOf(id), q = S[from];
    const R = fr.getBoundingClientRect();
    const info = { id, fromSlot: from, sx: e.clientX, sy: e.clientY, ox: e.clientX - R.left - q.x, oy: e.clientY - R.top - q.y, moved: false };
    const mv = ev => {
      const dx = ev.clientX - info.sx, dy = ev.clientY - info.sy;
      if (!info.moved && Math.hypot(dx, dy) > 7) info.moved = true;
      if (!info.moved) return;
      const R2 = fr.getBoundingClientRect(), px = ev.clientX - R2.left, py = ev.clientY - R2.top;
      let best = from, bd = 1e12; S.forEach((s2, i) => { const d = (s2.x + s2.w / 2 - px) ** 2 + (s2.y + s2.h / 2 - py) ** 2; if (d < bd) { bd = d; best = i; } });
      this.setState({ brDrag: { id, fromSlot: from, target: best, px, py, ox: info.ox, oy: info.oy, moved: true } });
    };
    const up = ev => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      const d = this.state.brDrag;
      if (info.moved && d && ev.type === 'pointerup') { this.brSuppress = true; setTimeout(() => { this.brSuppress = false; }, 60); this.setState({ brDrag: null }); this.brCommit(this.brMove(st.order, from, d.target, S), st.color, 'Brick moved to position ' + (d.target + 1) + '.'); }
      else this.setState({ brDrag: null });
    };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }
  brClick(id) {
    if (this.brSuppress) return;
    const S = this.brS, N = S.length, st = this.brState(N), P = ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'lav', 'white'];
    const color = st.color.slice(); color[id] = P[(P.indexOf(color[id]) + 1) % P.length];
    this.brCommit(st.order, color, 'Colour changed.');
    const special = [3, Math.floor(N / 2) - 1, N - 4];
    if (special.includes(id)) this.brSurprise(id, S[st.order.indexOf(id)], special.indexOf(id));
  }
  brSurprise(id, q, k) {
    const W = this.state.fw || 1000, H = this.state.fh || 700, cx = q.x + q.w / 2, cy = q.y + q.h / 2, t = this.brT(W);
    const cols = ['#E5261F', '#1F4FFF', '#FFC414', '#6CC62A', '#FF5FA8', '#FF6A10', '#8A6DFF'];
    const inward = [cx < W / 2 ? 1 : -1, cy < H / 2 ? 1 : -1];
    const parts = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; const r = 40 + (i % 3) * 18; return { c: cols[i % cols.length], dx: Math.round(Math.cos(a) * r), dy: Math.round(Math.sin(a) * r), r: (i * 47) % 360 }; });
    const onTB = q.sh === 'h' || (q.sh === 'c'), mx = onTB ? cx : cx + inward[0] * (t + 12), my = onTB ? cy + inward[1] * (t * 0.5 + 26) : cy;
    const msg = ['Built with curiosity!', 'Nice move!', 'Snap! You found one.'][k % 3];
    clearTimeout(this.brFT1); clearTimeout(this.brFT2); clearTimeout(this.brFT3);
    this.setState({ brFx: { x: cx, y: cy, parts, on: false, msg, mx, my, mtf: onTB ? 'translate(-50%, -50%)' : 'translate(' + (inward[0] > 0 ? '0' : '-100%') + ', -50%)', fade: false } });
    this.brFT1 = setTimeout(() => this.setState(s => s.brFx ? { brFx: { ...s.brFx, on: true } } : null), 30);
    this.brFT2 = setTimeout(() => this.setState(s => s.brFx ? { brFx: { ...s.brFx, fade: true } } : null), 1500);
    this.brFT3 = setTimeout(() => this.setState({ brFx: null }), 1900);
  }
  brKey(e, id) {
    const S = this.brS, N = S.length, st = this.brState(N), sl = st.order.indexOf(id), pick = this.state.brPick;
    const k = e.key, fwd = k === 'ArrowRight' || k === 'ArrowDown', back = k === 'ArrowLeft' || k === 'ArrowUp';
    const focusSlot = i => setTimeout(() => { const o = this.brState(N).order; const el = document.querySelector('[data-br="' + o[i] + '"]'); el && el.focus(); }, 0);
    if (pick) {
      if (fwd || back) { e.preventDefault(); const to = (sl + (fwd ? 1 : -1) + N) % N; this.brCommit(this.brMove(st.order, sl, to, S), st.color, 'Position ' + (to + 1) + '.'); this.setState({ brFocus: to }); focusSlot(to); }
      else if (k === ' ' || k === 'Enter') { e.preventDefault(); this.setState({ brPick: null, brLive: 'Brick placed at position ' + (sl + 1) + '.' }); }
      else if (k === 'Escape') { e.preventDefault(); const o = pick.order; this.setState({ brPick: null, brOrder: o, brLive: 'Move cancelled.' }); const i = o.indexOf(id); this.setState({ brFocus: i }); focusSlot(i); }
      return;
    }
    if (fwd || back) { e.preventDefault(); const to = (sl + (fwd ? 1 : -1) + N) % N; this.setState({ brFocus: to }); focusSlot(to); }
    else if (k === ' ') { e.preventDefault(); this.setState({ brN: N, brOrder: st.order, brColor: st.color, brPick: { id, order: st.order }, brLive: 'Picked up. Use arrow keys to move, Space to drop, Escape to cancel.' }); }
  }
  ctVals(w) {
    const LI = 'https://www.linkedin.com/in/pooja-sai-praveena-134200286', BE = 'https://www.behance.net/poojaspraveen', ML = 'dpspraveena.1376@gmail.com';
    const st = this.state, mh = st.mailHov, gp = st.gpHov;
    const small = w < 900, cols = 18, rows = 12;
    const cell = small ? Math.max(14, Math.floor(Math.min(w - 100, 560) / cols)) : 30;
    this.gmCell = cell; this.gmCols = cols; this.gmRows = rows;
    const COL = { lav: '#8A6DFF', blue: '#1F4FFF', yellow: '#FFC414', mint: '#13A882', pink: '#FF5FA8', orange: '#FF6A10', white: '#F6F3EC' };
    const names = { lav: 'purple', blue: 'blue', yellow: 'yellow', mint: 'teal', pink: 'pink', orange: 'orange', white: 'white' };
    const SH = { s: [2, 1], t: [1, 2], c: [2, 2], h: [4, 2], v: [2, 4] };
    const bricks = st.gmBricks || [], sel = st.gmSel, dr = st.gmDrag;
    const gmBricks = bricks.map(k => { const [bw] = SH[k.sh]; const on = sel === k.id, moving = dr && dr.kind === 'move' && dr.id === k.id && dr.moved, lift = k.z * 5;
      return { id: String(k.id), src: 'assets/bricks/' + k.sh + '-' + k.c + '.png', left: (k.x * cell - lift * 0.4) + 'px', top: (k.y * cell - lift) + 'px', w: (bw * cell) + 'px', z: k.z * 100 + k.y * 2 + (on ? 1 : 0),
        outline: on ? '2.5px dashed #24212E' : 'none', tf: moving ? 'scale(0.96)' : st.gmPop === k.id ? 'scale(1.06)' : 'none', filter: moving ? 'opacity(0.35)' : 'drop-shadow(0 ' + (3 + k.z * 2) + 'px ' + (4 + k.z * 2) + 'px rgba(36,33,46,0.2))',
        trans: 'left 0.25s cubic-bezier(.34,1.45,.64,1), top 0.25s cubic-bezier(.34,1.45,.64,1), transform 0.2s cubic-bezier(.34,1.56,.64,1)', pressed: on ? 'true' : 'false',
        aria: names[k.c] + ' ' + SH[k.sh][0] + ' by ' + SH[k.sh][1] + ' brick at column ' + (k.x + 1) + ', row ' + (k.y + 1) + (k.z ? ', stacked level ' + (k.z + 1) : ''),
        down: e => this.gmDown(e, { kind: 'move', id: k.id }), key: e => this.gmKey(e, k.id), focus: () => { if (this.state.gmSel !== k.id) this.setState({ gmSel: k.id }); } }; });
    const sb = bricks.find(k => k.id === sel);
    const pv = dr && dr.moved && dr.snap ? dr.snap : null;
    const tray = [];
    ['s', 'c', 'h', 't', 'v'].forEach(sh => ['lav', 'blue', 'yellow', 'mint', 'pink', 'orange', 'white'].forEach(c => { if ((sh === 't' || sh === 'v') && !['blue', 'pink', 'yellow'].includes(c)) return; tray.push({ sh, c }); }));
    const trayScale = small ? 16 : 18;
    const gmTray = tray.map(t => ({ src: 'assets/bricks/' + t.sh + '-' + t.c + '.png', w: (SH[t.sh][0] * trayScale) + 'px', aria: 'Add a ' + names[t.c] + ' ' + SH[t.sh][0] + ' by ' + SH[t.sh][1] + ' brick', down: e => this.gmDown(e, { kind: 'new', sh: t.sh, c: t.c }), add: () => this.gmAddFree(t.sh, t.c) }));
    const fx = st.gmFx, shapes = ['polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)', 'inset(0 round 2px)', 'circle(50%)'];
    return {
      ctDefault: !st.gmOpen, ctGame: !!st.gmOpen, ctFade: st.ctFadeOut ? 0 : 1, ctMaxW: st.gmOpen ? '1080px' : '820px',
      envTf: st.envHov ? 'translateY(-5px) rotate(-5deg)' : 'rotate(-3deg)', envOn: () => this.setState({ envHov: true }), envOff: () => this.setState({ envHov: false }),
      mailOn: () => this.setState({ mailHov: true }), mailOff: () => this.setState({ mailHov: false }),
      mailTf: mh ? 'translate(-2px,-3px)' : 'none', mailShadow: mh ? '7px 8px 0 #24212E' : '5px 5px 0 #24212E', mailLabel: st.copied === 'ok' ? 'Copied!' : ML,
      copyNote: st.copied === 'fail' ? 'Couldn’t copy automatically. Select the address and copy it,' : '',
      copyMail: () => { const done = ok => { this.setState({ copied: ok ? 'ok' : 'fail' }); clearTimeout(this.cpT); this.cpT = setTimeout(() => this.setState({ copied: null }), ok ? 1600 : 5000); };
        const fb = () => { try { const t = document.createElement('textarea'); t.value = ML; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); done(ok); } catch (e) { done(false); } };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ML).then(() => done(true), fb); else fb(); },
      socials: [{ label: 'LinkedIn', glyph: 'in', href: LI, bg: '#CFE6FF' }, { label: 'Behance', glyph: 'Bē', href: BE, bg: '#FFD3E6' }].map((x, i) => { const on = st.socHov === i; return { ...x, on: () => this.setState({ socHov: i }), tf: on ? 'translateY(-3px)' : 'none', shadow: on ? '5px 6px 0 #24212E' : '3px 3px 0 #24212E', arr: on ? 'translate(3px,-3px)' : 'none', icoTf: on ? 'rotate(-8deg)' : 'none' }; }),
      socOff: () => this.setState({ socHov: null }),
      gpOn: () => this.setState({ gpHov: true }), gpOff: () => this.setState({ gpHov: false }),
      gpTf: gp ? 'translateY(-3px)' : 'none', gpShadow: gp ? '5px 6px 0 #FFDD6E' : '0 0 0 transparent', gpArr: gp ? 'translateX(4px)' : 'none',
      gpB1: gp ? 'translateY(-4px) rotate(-8deg)' : 'rotate(-4deg)', gpB2: gp ? 'translateY(-6px) rotate(6deg)' : 'rotate(3deg)', gpB3: gp ? 'translateY(-3px) rotate(-5deg)' : 'rotate(-2deg)',
      gmOpen: () => { this.setState({ ctFadeOut: true }); setTimeout(() => this.setState({ gmOpen: true, ctFadeOut: false, gmFinished: false }), 220); },
      gmClose: () => this.setState({ gmOpen: false, gmSel: null, gmFinished: false, gmConfirm: false }),
      gmCanvasRef: this.gmCanvasRef || (this.gmCanvasRef = createRef()),
      gmCW: (cols * cell) + 'px', gmCH: (rows * cell) + 'px', gmCell: cell + 'px', gmDotPos: (cell / 2 - 0) + 'px ' + (cell / 2) + 'px', gmDir: small ? 'column' : 'row', gmTrayW: small ? '100%' : 'auto',
      gmBricks, gmEmpty: bricks.length === 0, gmHasSel: !!sb,
      gmTool: sb ? { left: Math.max(0, Math.min(cols * cell - 150, sb.x * cell)) + 'px', top: (sb.y * cell - sb.z * 5 - 46 < 0 ? (sb.y + SH[sb.sh][1]) * cell + 8 : sb.y * cell - sb.z * 5 - 46) + 'px' } : { left: '0', top: '0' },
      gmSelColor: sb ? COL[sb.c] : '#FFF',
      gmPrev: pv ? { left: (pv.x * cell) + 'px', top: (pv.y * cell - pv.z * 5) + 'px', w: (SH[pv.sh][0] * cell) + 'px', h: (SH[pv.sh][1] * cell) + 'px', disp: 'block' } : { left: '0', top: '0', w: '0', h: '0', disp: 'none' },
      gmGhostShow: !!(dr && dr.moved), gmGhost: dr && dr.moved ? { src: 'assets/bricks/' + dr.sh + '-' + dr.c + '.png', left: (dr.cx - SH[dr.sh][0] * cell / 2) + 'px', top: (dr.cy - SH[dr.sh][1] * cell / 2) + 'px', w: (SH[dr.sh][0] * cell) + 'px' } : { src: '', left: '0', top: '0', w: '0' },
      gmTray, gmStop: e => e.stopPropagation(),
      gmCanvasDown: e => { if (e.target === e.currentTarget) this.setState({ gmSel: null }); },
      gmRotL: () => this.gmRotate(), gmRotR: () => this.gmRotate(), gmColor: () => this.gmRecolor(), gmRemove: () => this.gmDelete(),
      gmUndo: () => { const h = (this.state.gmHist || []).slice(); if (!h.length) return; const prev = h.pop(); this.setState({ gmBricks: prev, gmHist: h, gmSel: null }); }, gmUndoOp: (st.gmHist || []).length ? 1 : 0.45,
      gmAskClear: () => this.setState({ gmConfirm: true }), gmCancelClear: () => this.setState({ gmConfirm: false }), gmConfirm: !!st.gmConfirm,
      gmClear: () => { this.gmPush(); this.setState({ gmBricks: [], gmSel: null, gmConfirm: false }); },
      gmReset: () => this.setState({ gmBricks: [], gmHist: [], gmSel: null, gmConfirm: false, gmFinished: false }),
      gmStarters: [['Heart', '#FFE3EF', 'heart'], ['House', '#FFF3C4', 'house'], ['Smiley', '#DDF6EE', 'smiley'], ['Free build', '#FFFFFF', 'free']].map(([label, bg, k]) => ({ label, bg, pick: () => this.gmStarter(k) })),
      gmSurprise: () => this.gmRandom(),
      gmDone: () => { const cols2 = ['#8A6DFF', '#FFC414', '#13A882', '#FF5FA8', '#2F5BFF', '#FF6A10']; const parts = Array.from({ length: 16 }, (_, i) => { const a2 = (i / 16) * Math.PI * 2; const r = 80 + (i % 4) * 25; return { c: cols2[i % 6], s: i % 3, dx: Math.round(Math.cos(a2) * r * 1.5), dy: Math.round(Math.sin(a2) * r), r: (i * 53) % 360 }; });
        clearTimeout(this.gfT1); clearTimeout(this.gfT2); this.setState({ gmFinished: true, gmSel: null, gmFx: { parts, on: false } }); this.gfT1 = setTimeout(() => this.setState(s => s.gmFx ? { gmFx: { ...s.gmFx, on: true } } : null), 30); this.gfT2 = setTimeout(() => this.setState({ gmFx: null }), 1000); },
      gmFinished: !!st.gmFinished, gmKeep: () => this.setState({ gmFinished: false }),
      // 3D view of the current build: raw grid bricks (shape, colour, cell position, stack level).
      gm3dOpen: !!st.gm3dOpen, gm3dShow: () => this.setState({ gm3dOpen: true, gmSel: null }), gm3dClose: () => this.setState({ gm3dOpen: false }),
      gm3d: { bricks: bricks.map(b => ({ sh: b.sh, c: b.c, x: b.x, y: b.y, z: b.z })), cols, rows, colors: COL },
      gmParts: fx ? fx.parts.map(p => ({ c: p.c, clip: shapes[p.s], tf: fx.on ? 'translate(' + p.dx + 'px,' + p.dy + 'px) rotate(' + p.r + 'deg)' : 'none', op: fx.on ? 0 : 1 })) : []
    };
  }
  gmSH() { return { s: [2, 1], t: [1, 2], c: [2, 2], h: [4, 2], v: [2, 4] }; }
  gmPush() { const h = (this.state.gmHist || []).slice(-40); h.push((this.state.gmBricks || []).map(b => ({ ...b }))); this.setState({ gmHist: h }); }
  gmLevel(list, sh, x, y, ignore) { const [w, h] = this.gmSH()[sh]; let z = 0; list.forEach(b => { if (b.id === ignore) return; const [bw, bh] = this.gmSH()[b.sh]; if (x < b.x + bw && x + w > b.x && y < b.y + bh && y + h > b.y) z = Math.max(z, b.z + 1); }); return Math.min(z, 6); }
  gmClamp(sh, x, y) { const [w, h] = this.gmSH()[sh]; return [Math.max(0, Math.min(this.gmCols - w, x)), Math.max(0, Math.min(this.gmRows - h, y))]; }
  gmSnapAt(cx, cy, sh, ignore) {
    const cv = this.gmCanvasRef && this.gmCanvasRef.current; if (!cv) return null; const R = cv.getBoundingClientRect();
    if (cx < R.left - 10 || cx > R.right + 10 || cy < R.top - 10 || cy > R.bottom + 10) return null;
    const [w, h] = this.gmSH()[sh], cell = this.gmCell; let [x, y] = this.gmClamp(sh, Math.round((cx - R.left) / cell - w / 2), Math.round((cy - R.top) / cell - h / 2));
    return { x, y, sh, z: this.gmLevel(this.state.gmBricks || [], sh, x, y, ignore) };
  }
  gmDown(e, info) {
    if (e.button > 0) return; e.stopPropagation();
    const list = this.state.gmBricks || [], b = info.kind === 'move' ? list.find(q => q.id === info.id) : null;
    const d = { ...info, sh: b ? b.sh : info.sh, c: b ? b.c : info.c, sx: e.clientX, sy: e.clientY, cx: e.clientX, cy: e.clientY, moved: false, snap: null };
    if (b) this.setState({ gmSel: b.id });
    const mv = ev => { if (!d.moved && Math.hypot(ev.clientX - d.sx, ev.clientY - d.sy) > 6) d.moved = true; if (!d.moved) return; ev.preventDefault && ev.preventDefault(); d.cx = ev.clientX; d.cy = ev.clientY; d.snap = this.gmSnapAt(d.cx, d.cy, d.sh, d.id); this.setState({ gmDrag: { ...d } }); };
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (d.moved) { this.gmTrayClickBlock = true; setTimeout(() => { this.gmTrayClickBlock = false; }, 60); }
      if (d.moved && d.snap) { this.gmPush(); const L = (this.state.gmBricks || []).slice(); let id;
        if (d.kind === 'move') { id = d.id; const i = L.findIndex(q => q.id === id); L[i] = { ...L[i], x: d.snap.x, y: d.snap.y, z: d.snap.z }; }
        else { id = (this.gmNext = (this.gmNext || 1000) + 1); L.push({ id, sh: d.sh, c: d.c, x: d.snap.x, y: d.snap.y, z: d.snap.z }); }
        this.setState({ gmBricks: L, gmDrag: null, gmSel: id, gmPop: id, gmFinished: false }); clearTimeout(this.gpT); this.gpT = setTimeout(() => this.setState({ gmPop: null }), 220);
      } else this.setState({ gmDrag: null }); };
    window.addEventListener('pointermove', mv, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }
  gmAddFree(sh, c) {
    if (this.gmTrayClickBlock) return; const L = (this.state.gmBricks || []).slice(), [w, h] = this.gmSH()[sh];
    let spot = null; for (let y = 0; y <= this.gmRows - h && !spot; y++) for (let x = 0; x <= this.gmCols - w && !spot; x++) if (this.gmLevel(L, sh, x, y) === 0) spot = [x, y];
    if (!spot) spot = [0, 0]; this.gmPush(); const id = (this.gmNext = (this.gmNext || 1000) + 1);
    L.push({ id, sh, c, x: spot[0], y: spot[1], z: this.gmLevel(L, sh, spot[0], spot[1]) }); this.setState({ gmBricks: L, gmSel: id, gmPop: id }); clearTimeout(this.gpT); this.gpT = setTimeout(() => this.setState({ gmPop: null }), 220);
  }
  gmUpdate(id, fn) { this.gmPush(); const L = (this.state.gmBricks || []).map(b => b.id === id ? fn(b) : b); this.setState({ gmBricks: L }); }
  gmRotate() { const id = this.state.gmSel; if (id == null) return; const R = { s: 't', t: 's', h: 'v', v: 'h', c: 'c' }; this.gmUpdate(id, b => { const sh = R[b.sh]; const [x, y] = this.gmClamp(sh, b.x, b.y); return { ...b, sh, x, y, z: this.gmLevel(this.state.gmBricks || [], sh, x, y, b.id) }; }); }
  gmRecolor() { const id = this.state.gmSel; if (id == null) return; const P = ['lav', 'blue', 'yellow', 'mint', 'pink', 'orange', 'white']; this.gmUpdate(id, b => ({ ...b, c: P[(P.indexOf(b.c) + 1) % P.length] })); }
  gmDelete() { const id = this.state.gmSel; if (id == null) return; this.gmPush(); this.setState({ gmBricks: (this.state.gmBricks || []).filter(b => b.id !== id), gmSel: null }); }
  gmKey(e, id) {
    const k = e.key, mv = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
    if (mv) { e.preventDefault(); this.setState({ gmSel: id }); this.gmUpdate(id, b => { const [x, y] = this.gmClamp(b.sh, b.x + mv[0], b.y + mv[1]); return { ...b, x, y, z: this.gmLevel(this.state.gmBricks || [], b.sh, x, y, b.id) }; }); return; }
    if (k === 'r' || k === 'R') { e.preventDefault(); this.setState({ gmSel: id }, () => this.gmRotate()); }
    else if (k === 'c' || k === 'C') { e.preventDefault(); this.setState({ gmSel: id }, () => this.gmRecolor()); }
    else if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); this.setState({ gmSel: id }, () => this.gmDelete()); }
    else if (k === 'Escape') this.setState({ gmSel: null });
  }
  gmBuild(spec) { const L = []; spec.forEach(([sh, c, x, y]) => { const [cx, cy] = this.gmClamp(sh, x, y); const id = (this.gmNext = (this.gmNext || 1000) + 1); L.push({ id, sh, c, x: cx, y: cy, z: this.gmLevel(L, sh, cx, cy) }); }); return L; }
  gmStarter(k) {
    const S = {
      heart: [['c', 'pink', 4, 2], ['c', 'pink', 10, 2], ['h', 'pink', 2, 4], ['h', 'pink', 6, 4], ['h', 'pink', 10, 4], ['h', 'pink', 4, 6], ['h', 'pink', 8, 6], ['h', 'pink', 6, 8], ['c', 'pink', 7, 10]],
      house: [['s', 'orange', 8, 1], ['h', 'orange', 6, 2], ['h', 'orange', 8, 2], ['h', 'orange', 4, 3], ['h', 'orange', 10, 3], ['h', 'yellow', 4, 5], ['h', 'yellow', 10, 5], ['c', 'blue', 8, 5], ['v', 'yellow', 4, 7], ['c', 'white', 6, 7], ['h', 'lav', 8, 7], ['v', 'yellow', 12, 7], ['c', 'white', 6, 9], ['h', 'lav', 8, 9]],
      smiley: [['h', 'yellow', 6, 1], ['h', 'yellow', 4, 3], ['h', 'yellow', 10, 3], ['c', 'yellow', 8, 3], ['v', 'yellow', 3, 5], ['v', 'yellow', 13, 5], ['c', 'blue', 6, 5], ['c', 'blue', 10, 5], ['h', 'yellow', 5, 7], ['h', 'yellow', 9, 7], ['s', 'pink', 6, 9], ['h', 'pink', 7, 9], ['s', 'pink', 10, 9], ['h', 'yellow', 6, 10]],
      free: []
    };
    this.gmPush(); this.setState({ gmBricks: this.gmBuild(S[k] || []), gmSel: null, gmFinished: false });
  }
  gmRandom() {
    const P = ['lav', 'blue', 'yellow', 'mint', 'pink', 'orange', 'white'], shs = ['s', 'c', 'h', 'h', 'v', 't', 'c'], spec = []; const n = 9 + Math.floor(Math.random() * 6);
    for (let i = 0; i < n; i++) { const sh = shs[Math.floor(Math.random() * shs.length)]; const [w, h] = this.gmSH()[sh]; spec.push([sh, P[Math.floor(Math.random() * P.length)], Math.floor(Math.random() * (this.gmCols - w + 1)), Math.floor(Math.random() * (this.gmRows - h + 1))]); }
    this.gmPush(); this.setState({ gmBricks: this.gmBuild(spec), gmSel: null, gmFinished: false });
  }
  update() {
    const y = window.scrollY, vh = window.innerHeight, next = {};
    const hdr = this.headerRef.current, fr = this.frameRef.current;
    if (hdr && fr) {
      const r = fr.getBoundingClientRect(), Tx = this.brT(r.width), T = Tx, top = r.top + T + 8;
      const inF = top > 0;
      if (inF) { hdr.style.top = top + 'px'; hdr.style.left = (r.left + Tx + 10) + 'px'; hdr.style.right = (window.innerWidth - r.right + Tx + 10) + 'px'; }
      else { hdr.style.top = '0px'; hdr.style.left = '0px'; hdr.style.right = '0px'; }
      if (inF !== !!this.state.hdrIn) next.hdrIn = inF;
      // Keep the frame's measured size in step on resize even if the ResizeObserver is late.
      const fwN = Math.round(r.width), fhN = Math.round(r.height);
      if (Math.abs(fwN - (this.state.fw || 0)) > 4 || Math.abs(fhN - (this.state.fh || 0)) > 4) { next.fw = fwN; next.fh = fhN; }
      // If the hero is taller than the screen, scale its contents down so the frame (and its bottom
      // row of bricks) still ends at the screen edge. heroK resets to 1 on resize, then settles here.
      const k = this.state.heroK || 1, pads = 2 * Tx + 92;
      if (r.height > vh + 1 && k > 0.62) next.heroK = Math.max(0.62, Math.min(1, ((vh - pads) * k) / (r.height - pads)));
    }
    const scrolled = y > 12; if (scrolled !== this.state.scrolled) next.scrolled = scrolled;
    const hero = document.getElementById('home');
    const dock = this.state.w >= 900 && hero && y > hero.offsetHeight * 0.7; if (dock !== this.state.dock) next.dock = dock;
    let active = 'home';
    ['about', 'skills', 'experience', 'projects', 'resume', 'contact'].forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= vh * 0.45) active = id; });
    if (active !== this.state.active) next.active = active;
    this.positionFace();
    if (Object.keys(next).length) this.setState(next);
  }

  renderVals() {
    const C = { cobalt: '#2F5BFF', pink: '#FF8FC0', tang: '#FF9447', butter: '#FFDD6E', mint: '#7FDCC2', lav: '#BBA8FF', sky: '#9FD0FF' };
    const B = n => 'assets/lego/' + n + '.png';
    const { menuOpen, scrolled } = this.state;
    const w = this.state.w || (typeof window !== 'undefined' ? window.innerWidth : 0) || 1280, h = this.state.h || (typeof window !== 'undefined' ? window.innerHeight : 0) || 800;
    const mode = w >= 1180 ? 'wide' : w >= 900 ? 'mid' : 'small';

    const navDef = [['about', 'About', C.lav, 'b22-lav'], ['skills', 'Skills', C.butter, 'b22-yellow'], ['experience', 'Work Experience', C.mint, 'b23-mint'], ['projects', 'Projects', C.pink, 'b24-pink'], ['resume', 'Resume', C.tang, 'b12-orange'], ['contact', 'Contact', C.sky, 'b24-cobalt']];
    const navItems = navDef.map(([id, label, color, brick]) => {
      const on = this.state.active === id;
      return { href: '#' + id, label, color, brick: B(brick), current: on ? 'true' : undefined, dockBg: on ? color : 'transparent', menuBg: on ? '#FFF6D9' : 'transparent' };
    });

    const T = mode === 'wide' ? 64 : mode === 'mid' ? 52 : 30;
    // The brick frame is the edge of the screen: full viewport width and height at every aspect ratio.
    // The portrait shrinks on short windows so the whole hero (and the bottom row of bricks) stays in view.
    const frameMinH = h;
    // Width the frame can actually use (excludes the page scrollbar) until the ResizeObserver reports it.
    const pageW = (typeof document !== 'undefined' && document.documentElement.clientWidth) || w;
    const faceRoom = h - 2 * this.brT(this.state.fw || pageW) - 240;
    const faceH0 = mode === 'wide' ? Math.min(400, Math.max(200, faceRoom)) : mode === 'mid' ? Math.min(340, Math.max(200, faceRoom)) : Math.min(260, w * 0.62);
    const pillW = mode === 'wide' ? 280 : 262, pillGapX = mode === 'wide' ? 34 : 22;
    const fwE = this.state.fw || pageW, frHE = this.state.fh || h;
    const arE = fwE / Math.max(1, frHE), txE = this.brT(fwE);
    const availW = fwE - 2 * (txE + 16) - 24;
    const faceFit = (availW - 2 * (pillW + pillGapX + 18 + 10)) / FACE_RATIO;
    const ringOK = mode !== 'small' && faceFit >= 230;
    const sideBySide = !ringOK && w > h && h < 620 && w >= 600;
    const heroK = this.state.heroK || 1;
    const faceH = ringOK ? Math.min(faceH0, faceFit) : sideBySide ? 170 : Math.min(faceH0, 300);
    const faceHalfW = faceH * FACE_RATIO / 2;
    const dx = faceHalfW + pillGapX, dy = Math.max(faceH * 0.33, 78);
    const fw = this.state.fw || pageW, frH = this.state.fh || frameMinH || 900;
    const ar = fw / Math.max(1, frH);
    const fv = ar > 1.42 ? ['wide', 0.066, 0.108] : ar > 0.95 ? ['mid', 0.086, 0.108] : ['tall', 0.17, 0.085];
    const Tx = this.brT(fw), Ty = Tx;
    this.T = Ty; this.Tx = Tx;
    const seq = ['red', 'blue', 'yellow', 'green'];
    let ci = 0; const nextC = () => seq[(ci++) % seq.length];
    const nTop = Math.max(1, Math.round((fw - 2 * T) / (2 * T))), nSide = Math.max(1, Math.round((frH - 2 * T) / (2 * T)));
    const F = (p, c) => 'assets/frame/' + p + '-' + c + '.png';
    const topBricks = [{ src: F('c', nextC()), flex: `0 0 ${T}px` }].concat(Array.from({ length: nTop }, () => ({ src: F('h', nextC()), flex: '1 1 0' }))).concat([{ src: F('c', nextC()), flex: `0 0 ${T}px` }]);
    const rightBricks = Array.from({ length: nSide }, () => ({ src: F('v', nextC()), flex: '1 1 0' }));
    const bottomBricks = [{ src: F('c', nextC()), flex: `0 0 ${T}px` }].concat(Array.from({ length: nTop }, () => ({ src: F('h', nextC()), flex: '1 1 0' }))).concat([{ src: F('c', nextC()), flex: `0 0 ${T}px` }]).reverse();
    const leftBricks = Array.from({ length: nSide }, () => ({ src: F('v', nextC()), flex: '1 1 0' })).reverse();
    const LEGO = [['#EEE9FF', '#8A6DFF', 'b22-lav', '#D6CCFF'], ['#FFF3C4', '#E5A800', 'b22-yellow', '#FFE38A'], ['#DDF6EE', '#13A882', 'b23-mint', '#AEE9D6'], ['#FFE3EF', '#F0569C', 'b24-pink', '#FFC4DC'], ['#FFE9D9', '#F26A12', 'b12-orange', '#FFCCA8'], ['#E3EAFF', '#2F5BFF', 'b24-cobalt', '#C3D1FF']];
    const hv = this.state.heroHov;
    const pillRadii = ['36px 30px 34px 28px / 30px 36px 28px 34px', '30px 36px 28px 34px / 34px 28px 36px 30px', '34px 28px 36px 30px / 28px 34px 30px 36px', '28px 34px 30px 36px / 36px 30px 34px 28px', '36px 28px 30px 34px / 30px 34px 36px 28px', '30px 34px 36px 28px / 34px 30px 28px 36px'];
    const pillRots = [-2.5, 1.5, -1, 2, -1.5, 1.2];
    const pillYs = [-dy, 0, dy];
    const pillDoodles = [
      { dDisp: 'block', dPath: 'M3 12 L9 15 M7 3 L11 11 M17 1 L15 9', dVB: '0 0 20 18', dW: '22', dH: '20', dL: '-20px', dT: '-18px', dFill: 'none' },
      { dDisp: 'none' },
      { dDisp: 'block', dPath: 'M2 8 C 8 0, 14 0, 18 8 S 30 16, 38 6', dVB: '0 0 40 14', dW: '42', dH: '14', dL: '28px', dT: 'calc(100% + 8px)', dFill: 'none' },
      { dDisp: 'block', dPath: 'M10 0 C11 6 14 9 20 10 C14 11 11 14 10 20 C9 14 6 11 0 10 C6 9 9 6 10 0Z', dVB: '0 0 20 20', dW: '16', dH: '16', dL: 'calc(100% - 4px)', dT: '-14px', dFill: '#FFDD6E' },
      { dDisp: 'none' },
      { dDisp: 'block', dPath: 'M2 4 C 8 14, 14 -2, 20 8 S 30 12, 34 2', dVB: '0 0 36 14', dW: '36', dH: '14', dL: 'calc(100% - 26px)', dT: 'calc(100% + 6px)', dFill: 'none' }
    ];
    const heroButtons = navDef.map(([id, label], i) => {
      const L = LEGO[i], left = i < 3, on = hv === i, out = i % 3 === 1 ? 18 : 0;
      return {
        href: '#' + id, label, bg: L[0], edge: L[1], brick: B(L[2]), shadowC: L[3], radius: pillRadii[i],
        left: left ? `calc(50% - ${Math.round(dx + out)}px)` : `calc(50% + ${Math.round(dx + out)}px)`, top: `calc(50% + ${Math.round(pillYs[i % 3])}px)`,
        tf: `translate(${left ? '-100%' : '0'}, -50%) rotate(${pillRots[i]}deg)`,
        shadow: on ? `6px 10px 0 ${L[3]}, 0 14px 24px rgba(36,33,46,0.10)` : `4px 6px 0 ${L[3]}, 0 6px 14px rgba(36,33,46,0.06)`,
        lift: on ? 'translateY(-5px)' : 'none', brickTf: on ? 'rotate(-16deg) scale(1.1)' : 'rotate(0deg)',
        on: () => this.setState({ heroHov: i }), ...pillDoodles[i]
      };
    });
    const propsWide = [
      { src: B('stack'), left: '3%', right: 'auto', top: 'auto', bottom: '5%', w: 'clamp(150px, 14vw, 230px)', rot: '-4deg' },
      { src: B('b24-cobalt'), left: '5%', right: 'auto', top: '16%', bottom: 'auto', w: 'clamp(110px, 10vw, 160px)', rot: '-18deg' },
      { src: B('b22-yellow'), left: 'auto', right: '6%', top: '15%', bottom: 'auto', w: 'clamp(80px, 7vw, 115px)', rot: '14deg' },
      { src: 'assets/art/pencils.png', left: 'auto', right: '-50px', top: 'auto', bottom: '7%', w: 'clamp(220px, 20vw, 320px)', rot: '-10deg' },
      { src: B('b12-orange'), left: 'auto', right: '18%', top: 'auto', bottom: '3%', w: 'clamp(60px, 5vw, 84px)', rot: '22deg' }
    ];
    const propsSmall = [
      { src: B('b24-cobalt'), left: '-24px', right: 'auto', top: '90px', bottom: 'auto', w: '96px', rot: '-18deg' },
      { src: B('b22-yellow'), left: 'auto', right: '-14px', top: '110px', bottom: 'auto', w: '70px', rot: '14deg' }
    ];

    const aboutCells = [
      { title: 'Who am I?', body: "I’m Pooja Sai Praveena, a 4th-year B.Tech student with 2+ years of design experience. I love creating new things and am always happiest when I’m busy doing something creative.", color: C.lav, rot: '-1.2deg', brick: B('b22-lav'), brot: '12deg', icon: 'M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z', hasChips: false, chips: [] },
      { title: 'What do I do?', body: "With 2+ years of design experience, I create intuitive web and mobile experiences for SaaS and AI products. Skilled in UI/UX, prototyping, responsive design, branding, and logo design. Google UX Design certified, with basic knowledge of HTML, CSS, and GSAP.", color: C.mint, rot: '0.8deg', brick: B('b23-mint'), brot: '-10deg', icon: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4', hasChips: false, chips: [] },
      { title: 'A little peek into my personality', body: 'Some of the things I\u2019ve explored, learned, and enjoyed along the way.', color: C.pink, rot: '-0.6deg', brick: B('b24-pink'), brot: '8deg', icon: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4', hasChips: true,
        chips: [['Painting', C.butter, '-2deg'], ['Shotokan Karate', C.mint, '1.5deg'], ['Kuchipudi', C.lav, '-1deg'], ['Bhagavad Gita', C.tang, '2deg'], ['Building creative ideas', C.sky, '-1.5deg']].map(([label, bg, rot]) => ({ label, bg, rot })) }
    ];

    const skDefs = [
      { title: 'Design Tools', face: '#8A6DFF', topC: '#A995FF', sideC: '#6A4FD6', ink: '#FFFFFF', tint: '#EEE9FF', edge: '#8A6DFF', items: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Canva'] },
      { title: 'UI Design', face: '#FFC414', topC: '#FFD75A', sideC: '#D69F00', ink: '#24212E', tint: '#FFF3C4', edge: '#E5A800', items: ['UI Design', 'Responsive Design', 'Visual Hierarchy', 'Typography', 'Layout Design', 'Component Design'] },
      { title: 'UX Design', face: '#13A882', topC: '#3FC7A2', sideC: '#0B8263', ink: '#FFFFFF', tint: '#DDF6EE', edge: '#13A882', items: ['UX Design', 'User Research', 'User Flows', 'Wireframing', 'Prototyping', 'Interaction Design', 'Design Thinking'] },
      { title: 'Visual Design', face: '#FF5FA8', topC: '#FF8DC2', sideC: '#D93F86', ink: '#24212E', tint: '#FFE3EF', edge: '#F0569C', items: ['Branding', 'Logo Design', 'Graphic Design', 'Social Media Creatives', 'Motion Design Basics', 'Illustration'] },
      { title: 'Front-end', face: '#1F4FFF', topC: '#5A7DFF', sideC: '#1336C4', ink: '#FFFFFF', tint: '#E3EAFF', edge: '#2F5BFF', items: ['HTML', 'CSS', 'GSAP'] },
      { title: 'Content', face: '#FF6A10', topC: '#FF9147', sideC: '#D24F00', ink: '#24212E', tint: '#FFE9D9', edge: '#F26A12', items: ['Technical Writing', 'Blog Writing', 'Website Content', 'Social Media Content'] }
    ];
    const skSide = w >= 760, skH = skSide ? 112 : 70, skBWn = skSide ? (w >= 1100 ? 230 : 200) : Math.min(260, w - 90);
    this.skH = skH;
    const order = this.state.skOrder || [0, 1, 2, 3, 4, 5], dr = this.state.skDrag, sel = this.state.skSel, fl = this.state.skFlash || [], hov = this.state.skHov;
    let slots = order.slice();
    if (dr && dr.moved) { const t = Math.max(0, Math.min(5, Math.round(dr.startSlot + dr.dy / skH))); slots = order.filter(x => x !== dr.id); slots.splice(t, 0, dr.id); }
    const slotOf = id => slots.indexOf(id);
    const skBlocks = skDefs.map((d, id) => {
      const sl = slotOf(id), dragging = dr && dr.moved && dr.id === id, hi = sel === id || fl.includes(id);
      const topPx = dragging ? dr.startSlot * skH + dr.dy : sl * skH;
      return { id: String(id), title: d.title, face: d.face, topC: d.topC, sideC: d.sideC, ink: d.ink, n: String(order.indexOf(id) + 1).padStart(2, '0'),
        top: topPx + 'px', z: dragging ? 50 : 20 - sl, trans: dragging ? 'none' : 'top 0.38s cubic-bezier(.3,1.25,.5,1)', cursor: dragging ? 'grabbing' : 'grab',
        lift: dragging ? 'translateX(-10px) rotate(-2deg)' : hov === id ? 'translateX(-5px) rotate(-1deg)' : 'none',
        ring: hi ? '0 0 0 3px #FFFFFF, 0 0 0 5px #24212E' : '0 0 0 0 transparent',
        pressed: sel === id ? 'true' : 'false', aria: d.title + ', block ' + (order.indexOf(id) + 1) + ' of 6. Arrow keys move it, Enter selects it to swap.',
        down: e => this.skDown(e, id), click: () => this.skClick(id), key: e => this.skKey(e, id), enter: () => this.setState({ skHov: id }) };
    });
    const mkCard = (d, id, sl) => { const hi = sel === id || fl.includes(id) || hov === id; return { title: d.title, items: d.items, tint: d.tint, edge: d.edge, n: String(sl + 1).padStart(2, '0'), top: (sl * skH + 6) + 'px', h: (skH - 12) + 'px', trans: 'top 0.38s cubic-bezier(.3,1.25,.5,1), box-shadow 0.2s ease', shadow: hi ? '4px 5px 0 ' + d.edge : '0 0 0 transparent' }; };
    const skCards = skDefs.map((d, id) => mkCard(d, id, slotOf(id)));
    const skCardsFlow = order.map(id => mkCard(skDefs[id], id, order.indexOf(id)));
    const skillGroups = [];

    const jobsBase = [
      { company: 'Bhimavaram Digitals', role: 'Creative & Graphic Designer', period: 'Oct 2024 – Apr 2025', mode: 'On-site', bg: C.butter, href: 'https://bhimavaramdigitals.com/', linkLabel: 'bhimavaramdigitals.com', points: ['Designed the Bhimavaram Digitals logo, plus graphic assets for tournaments and events.', 'Created promotional videos and digital content for local businesses and retail shops.', 'Developed and optimised websites with better usability, structure and interaction patterns.'] },
      { company: 'FreJun', role: 'Content & Design Associate', period: 'Apr 2025 – Feb 2026', mode: 'Remote', bg: C.pink, href: 'https://frejun.com/blog/', linkLabel: 'FreJun blog', points: ['Designed UI screens in Figma for product and marketing needs.', 'Planned and designed creative assets for PyCon 2026 event branding and promotion.', 'Created and optimised 1000+ SEO-focused articles and managed WordPress pages.'] },
      { company: 'KaliGan AI', role: 'Associate Designer', period: 'Jun 2026 – Present', mode: 'Remote', bg: C.mint, current: true, href: 'https://www.kaliganai.com/', linkLabel: 'kaliganai.com', points: ['Designed the entire Kaligan AI website: internal and external pages and complete user flows.', 'Designed product experiences for AI Employees, Chat, Voice, Knowledge Base, Integrations and Marketplace.', 'Designed the Kaligan AI logo and visual identity for consistent product branding.'] }
    ];
    const exDesc = ['Designed the Bhimavaram Digitals logo and graphics for tournaments and events, created promotional videos for local businesses, and improved website usability and structure.', 'Designed UI screens in Figma for product and marketing, planned creative assets for PyCon 2026, and created 1000+ SEO-focused articles while managing WordPress pages.', 'Designed the entire Kaligan AI website and user flows, product experiences for AI Employees, Chat, Voice, Knowledge Base, Integrations and Marketplace, plus the logo and identity.'];
    const exMeta = [
      { logo: 'assets/logos/bhimavaram-logo.png', logoPad: '0', brick: 'assets/lego/b24-cobalt.png', rot: '-1.2deg', brot: '12deg', logoH: '52px', logoHm: '48px', tint: '#E3EAFF', line: 'rgba(47,91,255,0.35)', accent: '#9FB4FF', note: 'first step', noteColor: '#2F5BFF' },
      { logo: 'assets/logos/frejun-logo.png', logoPad: '0 12px', brick: 'assets/lego/b24-pink.png', rot: '0.8deg', brot: '-10deg', logoH: '28px', logoHm: '26px', tint: '#FFE3EF', line: 'rgba(255,95,168,0.4)', accent: '#FF8FC0', note: 'building more', noteColor: '#C2185B' },
      { logo: 'assets/logos/kaligan-wordmark.png', logoPad: '0', logoH: '52px', logoHm: '48px', brick: 'assets/lego/b23-mint.png', rot: '-0.6deg', brot: '8deg', tint: '#DDF6EE', line: 'rgba(31,199,154,0.45)', accent: '#7FDCC2', note: 'growing further', noteColor: '#0A7A5C' }
    ];
    const exList = jobsBase.map((j, i) => ({ company: j.company, role: j.role, period: j.period, mode: j.mode, desc: exDesc[i], ...exMeta[i] }));
    const exPadX = Math.min(48, Math.max(16, w * 0.04)); const exScale = Math.min(1, (w - 2 * exPadX) / 1200);

    const projects = [
      { id: 'truspace', title: 'TruSpace', cat: 'UX/UI', tag: 'UX/UI Case Study', status: 'In progress', desc: 'A rental app case study covering wireframes, responsive interfaces and modern interactions.', role: 'UX/UI designer', tools: 'Figma', href: 'https://www.behance.net/gallery/256470875/TruSpace-A-Rental-App-UXUI-Case-Study' },
      { id: 'splitxpence', title: 'SplitXpence', cat: 'UX/UI', tag: 'UX/UI Case Study', desc: 'An intuitive shared-expense management app, designed so splitting the bill stays friendly.', role: 'UX/UI designer', tools: 'Figma', href: 'https://www.behance.net/gallery/248483507/SplitXpence-Expense-Splitting-App-UX-Case-Study' },
      { id: 'kaligan', title: 'KaliGanAI', cat: 'UX/UI', tag: 'Product + Identity', desc: 'The full Kaligan AI website and product experiences (AI Employees, Chat, Voice, Knowledge Base, Integrations, Marketplace), plus the logo and visual identity.', role: 'Associate Designer', tools: 'Figma', href: 'https://www.kaliganai.com/' },
      { id: 'nimbus', title: 'Nimbus Notes', cat: 'UX/UI', tag: 'Responsive Design', desc: 'A landing page designed for mobile, tablet and web views, built on its own design system.', role: 'UI designer', tools: 'Figma', href: 'https://www.behance.net/gallery/237792575/Nimbus-Notes-Responsive-Design' },
      { id: 'madebyyou', title: 'MadeByYou', cat: 'UX/UI', tag: 'Product', status: 'In progress', desc: 'A mobile app to order personalized, handmade art directly from an artist.', role: 'UX/UI designer', tools: 'Figma' },
      { id: 'web', title: 'Client websites', cat: 'UX/UI', tag: 'Web Design & Dev', desc: 'Two client portfolio sites and the website for a car care center.', role: 'Designer & developer', tools: 'HTML, CSS',
        links: [
          { label: 'Sai Bharadwaj', kind: 'client portfolio', href: 'https://sai-bharadwaj.vercel.app/' },
          { label: 'AMR Wealth', kind: 'client portfolio', href: 'https://amr-wealth.vercel.app/' },
          { label: 'Pitts Stop Auto', kind: 'car care center website', href: 'https://pittsstopauto.com' }
        ] },
      { id: 'brands', title: 'Annapurna Home Stay', cat: 'Visual', tag: 'Branding', desc: 'Logo and brand identity design for Annapurna Home Stay.', role: 'Brand & graphic designer', tools: 'Illustrator, Canva', href: 'https://www.behance.net/gallery/256950325/Annapurna-Home-Stay-Logo-Brand-Identity-Design' },
      // Hidden for now; uncomment to bring the card back.
      // { id: 'sports', title: 'Sports & event creatives', cat: 'Visual', tag: 'Social & events', desc: "Social media creatives and event assets for BVRM Open Tennis, AITA Tennis and FreJun's PyCon campaigns, plus live streams and match highlights.", role: 'Visual designer', tools: 'Illustrator, Canva', href: 'https://www.behance.net/poojaspraveen' }
    ];
    const filters = ['All', 'UX/UI', 'Visual'].map(c => {
      const on = this.state.filter === c;
      return { label: c, pressed: on ? 'true' : 'false', count: c === 'All' ? projects.length : projects.filter(p => p.cat === c).length, bg: on ? '#24212E' : 'transparent', color: on ? '#FFFFFF' : '#24212E', shadow: on ? '3px 3px 0 #24212E' : '0 0 0 transparent', pick: () => { if (this.state.filter === c) return; this.setState({ filter: c, projFade: true }); setTimeout(() => this.setState({ projFade: false }), 60); } };
    });
    const pm = w >= 1000 ? 'wide' : w >= 640 ? 'mid' : 'small';
    const shortD = { truspace: 'Rental app case study with responsive interfaces and modern interactions', splitxpence: 'An intuitive app for managing shared expenses', kaligan: 'Website, product experiences and identity for an AI employee platform', nimbus: 'Landing page for mobile, tablet and web, built on its own design system', madebyyou: 'A mobile app to order personalized, handmade art directly from an artist.', web: 'Two client portfolios and a website for a car care center', brands: 'Logo and brand identity design for Annapurna Home Stay', sports: 'Creatives for BVRM Open Tennis, AITA Tennis and PyCon campaigns' };
    const folderPal = [['#A99BF5', '#8F7FE8'], ['#FFD45E', '#F2BE3A'], ['#8FDDB8', '#6FCB9F'], ['#FFA6C9', '#F78BB5'], ['#A3D2FF', '#84BDF5']];
    const tabLs = pm === 'small' ? ['14px', '30px', '14px', '24px'] : ['90px', '230px', '50px', '160px', '20px', '120px'];
    const textLs = pm === 'small' ? ['30px', '44px', '30px', '40px'] : ['120px', '260px', '80px', '190px', '50px', '150px'];
    const band = pm === 'small' ? 176 : pm === 'mid' ? 156 : 150;
    const filtered = projects.filter(p => this.state.filter === 'All' || p.cat === this.state.filter);
    const nF = filtered.length;
    const shownProjects = filtered.map((p, i) => {
      const pal = folderPal[projects.indexOf(p) % 5], last = i === nF - 1;
      // Cards that list several live links need a taller visible band on narrow screens, where the chips wrap.
      const linkRoom = p.links ? (pm === 'small' ? 110 : pm === 'mid' ? 56 : 0) : 0;
      const bodyH = (last ? (pm === 'small' ? 230 : 300) : 220) + linkRoom;
      const k = pm === 'small' ? 0.25 : pm === 'mid' ? 0.6 : 1;
      const tabL = tabLs[i % tabLs.length];
      return {
        ...p, n: String(i + 1).padStart(2, '0'), short: shortD[p.id] || p.desc, front: pal[0], back: pal[1], status: p.status || '', href: p.href || '', hasLink: !!p.href, noLink: !p.href, links: p.links || [], hasLinks: !!p.links,
        // On tablets the chip row would run into the description, so it drops below it, left-aligned.
        ...(p.links && pm === 'mid' ? { badgeL: parseInt(textLs[i % textLs.length]) + 32 + 'px', badgeR: '24px', badgeT: '128px', textR: '24px' } : {}), linkAria: 'Open ' + p.title + ' (opens in a new tab)',
        tabL, textL: textLs[i % textLs.length], filL: parseInt(tabL) >= 22 ? 'block' : 'none', bodyH: bodyH + 'px', bodyR: (parseInt(tabL) < 22 ? '0 ' : '26px ') + '26px 26px 26px', last,
        mt: i === 0 ? '0px' : -(270 - band) + 'px', ml: (i % 2 ? 0 : 14 * k) + 'px', mr: (i % 2 ? 14 * k : 0) + 'px', z: i + 1, rot: ([-0.6, 0.5, -0.3, 0.6, -0.5, 0.3][i % 6] * k).toFixed(2) + 'deg',
        brickDisp: i === 1 && pm !== 'small' ? 'block' : 'none', clipDisp: i === 3 && pm !== 'small' ? 'block' : 'none',
        burstDisp: (i === 0 || i === 4) && pm !== 'small' ? 'block' : 'none', burstR: '40px', burstT: '92px',
        loopDisp: i === 2 && pm !== 'small' ? 'block' : 'none', loopR: '260px'
      };
    });

    const fh = this.state.faceHover;
    return {
      headerBg: this.state.hdrIn ? 'transparent' : 'rgba(255, 248, 238, 0.92)', headerLine: this.state.hdrIn ? 'transparent' : 'rgba(36,33,46,0.12)', headerBlur: this.state.hdrIn ? 'none' : 'blur(8px)',
      menuOpen, menuExpanded: menuOpen ? 'true' : 'false', menuLabel: menuOpen ? 'Close menu' : 'Open menu', menuBtnBg: menuOpen ? C.butter : '#FFFFFF',
      bar1: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none', bar2: menuOpen ? 0 : 1, bar3: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
      toggleMenu: () => this.setState(s => ({ menuOpen: !s.menuOpen }), () => { if (this.state.menuOpen && this.menuRef.current) { const a = this.menuRef.current.querySelector('a'); a && a.focus(); } }),
      closeMenu: () => this.setState({ menuOpen: false }),
      menuRef: this.menuRef, menuWrapRef: this.menuWrapRef,
      navItems, dockVisible: this.state.dock && !menuOpen,
      frameRef: this.frameRef, T: T + 'px', frameMinH: mode === 'small' ? '100svh' : frameMinH + 'px',
      topBricks, bottomBricks, leftBricks, rightBricks, ...this.brVals(fw, frH, Tx),
      frameSrc: 'assets/frame3d/' + fv[0] + '-sq.png',
      innerPad: `${Ty + 66}px ${Tx + 16}px ${Ty + 26}px`,
      introGap: Math.round((mode === 'small' ? 24 : 26) * heroK) + 'px', heroK,
      introFlow: sideBySide ? 'row wrap' : 'column', gridW: sideBySide ? '420px' : '100%', textBasis: sideBySide ? '100%' : 'auto',
      headerRef: this.headerRef, headerH: this.state.hdrIn ? '60px' : '68px',
      headerPad: this.state.hdrIn ? '0 6px' : '0 clamp(16px, 3vw, 36px)',
      propOpacity: mode === 'small' ? 0 : 1,
      stageW: sideBySide ? Math.round(faceH * FACE_RATIO + 24) + 'px' : !ringOK ? '100%' : Math.round(2 * (dx + pillW + 18)) + 'px', stageH: Math.round(faceH + (mode === 'small' ? 10 : 40)) + 'px',
      faceH: Math.round(faceH) + 'px', faceTf: fh ? 'rotate(3deg) scale(1.03)' : 'rotate(-2deg)',
      faceOn: () => this.setState({ faceHover: true }), faceOff: () => this.setState({ faceHover: false }),
      blobSize: Math.round(faceH * 1.3) + 'px',
      heroRing: ringOK, heroGrid: !ringOK, heroButtons, heroOff: () => this.setState({ heroHov: -1 }),
      pillGap: mode === 'wide' ? '12px' : '9px', pillMinW: mode === 'wide' ? '176px' : '150px', pillFont: mode === 'wide' ? '18px' : '16px', pillDot: mode === 'wide' ? '46px' : '38px', pillBrick: mode === 'wide' ? '36px' : '29px',
      aboutCells, skillGroups,
      skBlocks, skCards, skCardsFlow, skSideCards: skSide, skListCards: !skSide, skStuds: [0, 1, 2, 3].map(i => ({ left: Math.round(skBWn * (i + 0.5) / 4 - 13 + 8) + 'px' })),
      skCols: w >= 1100 ? 'minmax(0, 300px) minmax(0, 1fr)' : 'minmax(0, 1fr)', skGap: skSide ? '0px' : '0px', skBW: skBWn + 'px', skBH: skH + 'px', skTowerH: (6 * skH + 18) + 'px', skBaseTop: (6 * skH) + 'px', skCardsH: (6 * skH) + 'px',
      skTitleSize: skSide ? '20px' : '18px', skLeave: () => this.setState({ skHov: null }), skLive: this.state.skLive || '',
      skReset: () => this.setState({ skOrder: [0, 1, 2, 3, 4, 5], skSel: null, skFlash: [0, 1, 2, 3, 4, 5], skLive: 'Tower reset to the original order.' }, () => this.skUnflash()),
      skResetOp: (order.join() === '0,1,2,3,4,5') ? 0.6 : 1,
      exRoadRef: this.exRoadRef, exPathRef: this.exPathRef, exRailRef: this.exRailRef, exRailFaceRef: this.exRailFaceRef,
      exWide: exScale >= 0.8, exNarrow: exScale < 0.8, exScale: exScale.toFixed(4), exOuterW: Math.round(1200 * exScale) + 'px', exOuterH: Math.round(640 * exScale) + 'px', exList,
      ex0: exList[0], ex1: exList[1], ex2: exList[2],
      filters, shownProjects, projEmpty: shownProjects.length === 0,
      tabW: pm === 'small' ? '72%' : '52%', textR: pm === 'small' ? '18px' : '230px', titleSize: pm === 'small' ? '24px' : '30px', descSize: pm === 'small' ? '15px' : '16.5px',
      badgeR: pm === 'small' ? 'auto' : '60px', badgeL: pm === 'small' ? '62px' : 'auto', badgeT: pm === 'small' ? '120px' : '96px',
      stackPad: pm === 'small' ? '0px' : '8px', noteDisp: pm === 'wide' ? 'flex' : 'none', headBurst: pm === 'small' ? 'none' : 'block', threadDisp: pm === 'small' ? 'none' : 'block',
      projOpacity: this.state.projFade ? 0 : 1, projShift: this.state.projFade ? '10px' : '0px',
      resumeNotes: [{ text: '2 years of industry experience', bg: C.butter }, { text: 'Google UX Design certified', bg: C.mint }, { text: 'B.Tech CSD · CGPA 8.71', bg: C.lav }, { text: 'karate gold medallist (yes, really)', bg: C.pink }],
      ...this.ctVals(w)
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <div style={{ minHeight: '100vh', overflowX: 'clip' }}>
        <Header v={v} />
        <main>
          <Home v={v} />
          <About v={v} />
          <Skills v={v} />
          <Experience v={v} />
          <Projects v={v} />
          <Resume v={v} />
          <Contact v={v} />
        </main>
        <Footer v={v} />
      </div>
    );
  }
}

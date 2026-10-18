import { useEffect, useRef, useState } from 'react';

// 3D view of a LEGO studio creation. Pure CSS 3D: the build plate is a plane, every brick is a box of
// five faces (top with studs, four sides) placed at its grid position and stacked by its level.
// Shown in place of the studio canvas; drag across it (or use the buttons / arrow keys) to orbit the build.

const SH = { s: [2, 1], t: [1, 2], c: [2, 2], h: [4, 2], v: [2, 4] };
const shade = (hex, f) => {
  const n = parseInt(hex.slice(1), 16);
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(c => Math.round(c * f).toString(16).padStart(2, '0')).join('');
};
const lift = (hex, f) => {
  const n = parseInt(hex.slice(1), 16);
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(c => Math.round(c + (255 - c) * f).toString(16).padStart(2, '0')).join('');
};
const studs = (base, u) =>
  `radial-gradient(circle at 50% 46%, ${lift(base, 0.28)} 0 ${u * 0.2}px, ${base} ${u * 0.27}px, ${shade(base, 0.7)} ${u * 0.29}px, transparent ${u * 0.31}px) 0 0 / ${u}px ${u}px, ${base}`;

function Box({ b, u, h, colors }) {
  const [w, d] = SH[b.sh], base = colors[b.c] || '#8A6DFF', W = w * u, D = d * u;
  const face = { position: 'absolute', backfaceVisibility: 'visible', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' };
  return (
    <div style={{ position: 'absolute', left: b.x * u, top: b.y * u, width: W, height: D, transformStyle: 'preserve-3d', transform: `translateZ(${b.z * h}px)` }}>
      {/* top, with studs */}
      <div style={{ ...face, left: 0, top: 0, width: W, height: D, background: studs(base, u), transform: `translateZ(${h}px)` }} />
      {/* sides: hinged on each edge and swung up to stand on the plate */}
      <div style={{ ...face, left: 0, top: 0, width: W, height: h, background: shade(base, 0.86), transformOrigin: 'top', transform: 'rotateX(90deg)' }} />
      <div style={{ ...face, left: 0, top: D, width: W, height: h, background: shade(base, 0.78), transformOrigin: 'top', transform: 'rotateX(90deg)' }} />
      <div style={{ ...face, left: 0, top: 0, width: h, height: D, background: shade(base, 0.66), transformOrigin: 'left', transform: 'rotateY(-90deg)' }} />
      <div style={{ ...face, left: W, top: 0, width: h, height: D, background: shade(base, 0.72), transformOrigin: 'left', transform: 'rotateY(-90deg)' }} />
    </div>
  );
}

export default function Lego3D({ bricks, cols, rows, colors, onClose }) {
  const [view, setView] = useState({ yaw: -30, pitch: 58 });
  const [size, setSize] = useState(560);
  const stageRef = useRef(null), drag = useRef(null);

  useEffect(() => {
    stageRef.current && stageRef.current.focus({ preventScroll: true });
    const fit = () => stageRef.current && setSize(stageRef.current.clientWidth);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  // Keys only act while the 3D stage has focus, so the rest of the page scrolls normally.
  const key = e => {
    const turn = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[e.key];
    if (e.key === 'Escape') onClose();
    else if (turn) { e.preventDefault(); setView(v => ({ yaw: v.yaw + turn[0], pitch: Math.max(20, Math.min(80, v.pitch + turn[1])) })); }
  };

  // Stud size so the whole plate fits the stage with room to orbit.
  const u = Math.max(10, Math.min(30, Math.floor((size * 0.78) / Math.max(cols, rows)))), h = u * 1.2;
  const down = e => { drag.current = { x: e.clientX, y: e.clientY, v: view }; e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId); };
  const move = e => {
    const d = drag.current; if (!d) return;
    setView({ yaw: d.v.yaw + (e.clientX - d.x) * 0.5, pitch: Math.max(20, Math.min(80, d.v.pitch - (e.clientY - d.y) * 0.35)) });
  };
  const up = () => { drag.current = null; };
  const btn = { padding: '7px 14px', borderRadius: '999px', border: '1.5px solid #24212E', background: '#FFFFFF', fontFamily: "'Fredoka', sans-serif", fontWeight: '500', fontSize: '14px', color: '#24212E', cursor: 'pointer', whiteSpace: 'nowrap' };

  return (
    <div
      role="region"
      aria-label="3D view of your LEGO build"
      style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}
    >
        <p style={{ fontFamily: "'Caveat', cursive", fontWeight: '700', fontSize: '21px', color: '#4A4556' }}>
          Drag across your build to spin it around, or use the arrow keys.
        </p>
        <div
          ref={stageRef}
          tabIndex={0}
          aria-label="3D build. Arrow keys rotate and tilt; Escape goes back to building."
          onKeyDown={key}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          style={{ position: 'relative', height: 'clamp(320px, 52vh, 480px)', borderRadius: '18px', overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 40%, #FFFFFF, #F3ECDD)', border: '1.5px solid rgba(36,33,46,0.15)', cursor: 'grab', touchAction: 'none', perspective: '1100px', perspectiveOrigin: '50% 35%', userSelect: 'none' }}
        >
          {bricks.length ? null : (
            <p style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Caveat', cursive", fontWeight: '700', fontSize: '24px', color: '#4A4556', zIndex: 2 }}>
              Add a few bricks, then come back for the 3D view!
            </p>
          )}
          <div style={{ position: 'absolute', left: '50%', top: '54%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: `rotateX(${view.pitch}deg) rotateZ(${view.yaw}deg)` }}>
            {/* Build plate, centred on the orbit point */}
            <div style={{ position: 'absolute', left: (-cols * u) / 2, top: (-rows * u) / 2, width: cols * u, height: rows * u, transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '6px', background: studs('#A8E0C8', u), boxShadow: '0 0 0 3px #7FC9A9, 0 24px 40px rgba(36,33,46,0.18)' }} />
              {bricks.map((b, i) => <Box key={i} b={b} u={u} h={h} colors={colors} />)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button type="button" className="ix-8" style={btn} onClick={() => setView(v => ({ ...v, yaw: v.yaw - 45 }))}>↺ Rotate left</button>
          <button type="button" className="ix-8" style={btn} onClick={() => setView(v => ({ ...v, yaw: v.yaw + 45 }))}>Rotate right ↻</button>
          <button type="button" className="ix-8" style={btn} onClick={() => setView({ yaw: 0, pitch: 0.1 })}>Top view</button>
          <button type="button" className="ix-8" style={btn} onClick={() => setView({ yaw: -30, pitch: 58 })}>Reset view</button>
          <button type="button" className="ix-8" style={{ ...btn, background: '#BBA8FF' }} onClick={onClose}>Back to building</button>
        </div>
    </div>
  );
}

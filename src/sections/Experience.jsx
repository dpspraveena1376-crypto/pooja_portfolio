// Work experience as a LEGO staircase: one chunky step per job, rising left to right, each with its card
// standing on top. On phones the same card-on-step pieces stack vertically, steps growing down the page.

const JOBS = [
  {
    company: 'Bhimavaram Digitals',
    role: 'Creative & Graphic Designer',
    mode: 'On-site',
    period: 'October 2024 – April 2025',
    logo: 'assets/logos/bhimavaram-logo.png',
    logoH: '40px',
    points: [
      'Designed the Bhimavaram Digitals logo and graphic assets for tournaments and events.',
      'Created promotional videos and digital content for local businesses.',
      'Improved website usability, structure, and interaction patterns.',
    ],
    lego: { base: '#F05A28', light: '#FF8D60', dark: '#C23F14', side: '#A3330E' },
    rise: 80,
    riseSm: 56,
  },
  {
    company: 'FreJun',
    role: 'Content & Design Associate',
    mode: 'Remote',
    period: 'April 2025 – February 2026',
    logo: 'assets/logos/frejun-logo.png',
    logoH: '26px',
    logoPad: '0 10px',
    points: [
      'Designed UI screens using Figma for product and marketing needs.',
      'Planned and designed creative assets for PyCon 2026, supporting event branding and promotional execution.',
      'Created and optimized 1,000+ SEO-focused articles and managed WordPress pages.',
    ],
    lego: { base: '#2F6BFF', light: '#709AFF', dark: '#1D49CC', side: '#173B9E' },
    rise: 160,
    riseSm: 96,
  },
  {
    company: 'KaliGan AI',
    role: 'Associate Designer',
    mode: 'Remote',
    period: 'June 2026 – Present',
    logo: 'assets/logos/kaligan-wordmark.png',
    logoH: '40px',
    points: [
      'Designed the KaliGan AI website, including internal and external pages and complete user flows.',
      'Designed product experiences for AI Employees, Chat, Voice, Knowledge Base, Integrations, and Marketplace.',
      'Designed the KaliGan AI logo and visual identity for consistent product branding.',
    ],
    lego: { base: '#FFC414', light: '#FFE17D', dark: '#D69F00', side: '#B08300' },
    rise: 240,
    riseSm: 136,
  },
];

// ---------- One LEGO step, drawn in oblique 3D: front face with brick seams, studded top, right side ----------
const STEP_W = 400, DEPTH = 34, LIFT = 22, BRICK_H = 40;
// `side` draws the visible right face; `fit` keeps that face inside the box (used on phones).
function LegoStep({ job, side: showSide, rise, fit }) {
  const { base, light, dark, side } = job.lego, H = rise || job.rise, last = showSide;
  const top = LIFT; // y of the front face's top edge
  // Studs: two rows on the top face, back row first so the front row overlaps it.
  const studs = [];
  for (let r = 1; r >= 0; r--) {
    for (let c = 0; c < 10; c++) {
      const t = (r + 0.5) / 2, cx = 20 + c * 40 + t * DEPTH, cy = top - t * LIFT;
      studs.push(
        <g key={r + '-' + c}>
          <path d={`M${cx - 11},${cy - 7} L${cx - 11},${cy} A11,5.2 0 0 0 ${cx + 11},${cy} L${cx + 11},${cy - 7} Z`} fill={dark} />
          <ellipse cx={cx} cy={cy - 7} rx="11" ry="5.2" fill={light} />
          <ellipse cx={cx - 3} cy={cy - 8.4} rx="4" ry="1.6" fill="#FFFFFF" opacity="0.45" />
        </g>
      );
    }
  }
  // Brick seams on the front: one course per BRICK_H, joints staggered course to course.
  const seams = [];
  for (let k = 1; k * BRICK_H < H; k++) seams.push(<line key={'h' + k} x1="0" x2={STEP_W} y1={top + k * BRICK_H} y2={top + k * BRICK_H} />);
  for (let k = 0; k * BRICK_H < H; k++) {
    const y0 = top + k * BRICK_H, y1 = Math.min(top + H, y0 + BRICK_H), off = k % 2 ? 60 : 140;
    for (let x = off; x < STEP_W; x += 160) seams.push(<line key={'v' + k + '-' + x} x1={x} x2={x} y1={y0} y2={y1} />);
  }
  return (
    <svg
      viewBox={`0 0 ${STEP_W + (last ? DEPTH : 0)} ${H + LIFT}`}
      aria-hidden="true"
      style={{ display: 'block', width: last && !fit ? `${((STEP_W + DEPTH) / STEP_W) * 100}%` : '100%', height: 'auto', overflow: 'visible' }}
    >
      {/* Top face, then the visible right side (the tallest step on desktop, every step on phones). */}
      <polygon points={`0,${top} ${DEPTH},0 ${STEP_W + DEPTH},0 ${STEP_W},${top}`} fill={light} />
      {last ? <polygon points={`${STEP_W},${top} ${STEP_W + DEPTH},0 ${STEP_W + DEPTH},${H} ${STEP_W},${top + H}`} fill={side} /> : null}
      <rect x="0" y={top} width={STEP_W} height={H} fill={base} />
      <rect x="0" y={top} width={STEP_W} height="5" fill={light} opacity="0.7" />
      <rect x="0" y={top + H - 8} width={STEP_W} height="8" fill={dark} opacity="0.55" />
      <g stroke={dark} strokeWidth="1.6" strokeOpacity="0.55">{seams}</g>
      {studs}
    </svg>
  );
}

// Card content shared by the staircase and the phone timeline.
function JobCard({ job, compact }) {
  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: compact ? '10px' : '12px',
        padding: compact ? '20px 18px 18px' : 'clamp(18px, 2vw, 24px) clamp(16px, 1.8vw, 22px)',
        background: '#FFFDF8',
        border: '2px solid #24212E',
        borderRadius: '22px',
        boxShadow: `6px 6px 0 ${job.lego.base}`,
        textAlign: 'left',
      }}
    >
      <div
        style={{
          alignSelf: 'flex-start',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          padding: job.logoPad || '0',
          background: '#FFFFFF',
          border: '1px solid rgba(36,33,46,0.12)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <img src={job.logo} alt={`${job.company} logo`} style={{ height: job.logoH, width: 'auto', display: 'block' }} />
      </div>
      <div>
        <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '600', fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: '1.1', color: '#24212E' }}>
          {job.company}
        </h3>
        <p style={{ marginTop: '4px', fontFamily: "'Nunito', sans-serif", fontWeight: '700', fontSize: '14.5px', color: '#3A3546' }}>
          {job.role} · {job.mode}
        </p>
        <p style={{ marginTop: '3px', fontFamily: "'Nunito', sans-serif", fontWeight: '700', fontSize: '12.5px', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#5A5566' }}>
          {job.period}
        </p>
      </div>
      <ul className="exp-points" style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {job.points.map((p, i) => (
          <li key={i} style={{ position: 'relative', paddingLeft: '18px', fontFamily: "'Nunito', sans-serif", fontSize: '14.5px', lineHeight: '1.5', color: '#3A3546' }}>
            <span
              aria-hidden="true"
              style={{ position: 'absolute', left: '0', top: '0.5em', width: '9px', height: '9px', borderRadius: '50%', background: job.lego.base, boxShadow: `inset 0 -1.5px 0 ${job.lego.dark}` }}
            />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience({ v }) {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        borderTop: '2px solid #24212E',
        padding: 'clamp(72px, 9vw, 120px) clamp(16px, 4vw, 48px)',
        backgroundColor: '#FFF8EE',
      }}
    >
      {/* Side-by-side staircase on wider screens, stacked steps on phones. */}
      <style>{`
        .exp-stairs { display: grid; }
        .exp-timeline { display: none; }
        @media (max-width: 760px) {
          .exp-stairs { display: none; }
          .exp-timeline { display: flex; }
        }
        @media (max-width: 1023px) {
          .exp-stairs .exp-points li { font-size: 13.5px !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 44px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px', maxWidth: '560px' }}>
          <span
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              border: '2px solid #24212E',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: '600',
              fontSize: '15px',
              whiteSpace: 'nowrap',
              backgroundColor: '#7FDCC2',
            }}
          >
            03 · Work experience
          </span>
        </div>

        {/* Desktop / tablet: three columns, each a card, a connector and its step, bottom-aligned so the
            taller steps lift their cards higher. */}
        <div
          className="exp-stairs"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            alignItems: 'end',
            paddingRight: 'clamp(10px, 2.6vw, 30px)',
            filter: 'drop-shadow(0 18px 18px rgba(36,33,46,0.12))',
          }}
        >
          {JOBS.map((job, i) => (
            <div key={job.company} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch', zIndex: i + 1 }}>
              <div style={{ padding: '0 clamp(8px, 1.4vw, 18px)' }}>
                <JobCard job={job} />
              </div>
              {/* Connector: a thin line in the step's colour ending on a round 1x1 stud. */}
              <div aria-hidden="true" style={{ position: 'relative', height: 'clamp(26px, 3vw, 40px)', display: 'flex', justifyContent: 'center' }}>
                <span style={{ width: '3px', height: '100%', background: job.lego.base, borderRadius: '2px' }} />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    width: '16px',
                    height: '10px',
                    borderRadius: '50%',
                    background: job.lego.light,
                    boxShadow: `0 3px 0 ${job.lego.dark}`,
                  }}
                />
              </div>
              <LegoStep job={job} side={i === JOBS.length - 1} />
            </div>
          ))}
        </div>

        {/* Phones and small screens: the same card-on-step pieces, stacked, with a road map running down the
            left. Steps grow taller down the page, so the climb reads top to bottom like desktop's left to right. */}
        <div className="exp-timeline" style={{ position: 'relative', flexDirection: 'column', gap: '34px', paddingLeft: '46px', paddingRight: '10px' }}>
          {/* The road: a dark rail with the three step colours inside and a dashed centre line. */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '10px',
              top: '14px',
              bottom: '14px',
              width: '17px',
              padding: '2px',
              borderRadius: '9px',
              background: '#24212E',
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                height: '100%',
                borderRadius: '7px',
                background: `linear-gradient(180deg, ${JOBS[0].lego.base}, ${JOBS[1].lego.base} 50%, ${JOBS[2].lego.base})`,
              }}
            >
              <span style={{ position: 'absolute', left: '50%', top: '6px', bottom: '6px', borderLeft: '1.6px dashed rgba(255,255,255,0.9)', transform: 'translateX(-50%)' }} />
            </span>
          </span>
          {JOBS.map(job => (
            <div key={job.company} style={{ position: 'relative', display: 'flex', flexDirection: 'column', filter: 'drop-shadow(0 12px 12px rgba(36,33,46,0.12))' }}>
              {/* Stop on the road, in this job's colour, level with the top of its card. */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-40.5px',
                  top: '24px',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2px solid #24212E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: '2',
                }}
              >
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: job.lego.base }} />
              </span>
              <div style={{ padding: '0 6px' }}>
                <JobCard job={job} compact />
              </div>
              <div aria-hidden="true" style={{ position: 'relative', height: '24px', display: 'flex', justifyContent: 'center' }}>
                <span style={{ width: '3px', height: '100%', background: job.lego.base, borderRadius: '2px' }} />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    width: '16px',
                    height: '10px',
                    borderRadius: '50%',
                    background: job.lego.light,
                    boxShadow: `0 3px 0 ${job.lego.dark}`,
                  }}
                />
              </div>
              <LegoStep job={job} side fit rise={job.riseSm} />
            </div>
          ))}
        </div>
      </div>
      {/* Two loose bricks resting on the Experience / Projects seam (free-placed in the design). */}
      <img className="seam-brick seam-brick--a" src="assets/lego/b24-red.png" alt="" aria-hidden="true" />
      <img className="seam-brick seam-brick--b" src="assets/lego/b24-red.png" alt="" aria-hidden="true" />
    </section>
  );
}

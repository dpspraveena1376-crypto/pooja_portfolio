export default function About({ v }) {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 4vw, 48px)',
        borderTop: '2px solid #24212E',
        backgroundColor: '#FFF8EE',
      }}
    >
      <img
        src="assets/lego/b24-cobalt.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '15px',
          top: '17px',
          width: '125px',
          height: '96px',
          transform: 'rotate(-14deg)',
          zIndex: '2',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '22px',
        }}
      >
        <span
          style={{
            padding: '7px 16px',
            borderRadius: '999px',
            background: '#BBA8FF',
            border: '2px solid #24212E',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: '600',
            fontSize: '15px',
          }}
        >
          01 · About
        </span>
        <div
          style={{
            marginTop: '36px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '26px',
            textAlign: 'left',
          }}
        >
          {v.aboutCells.map((a, i0) => (
            <article
              className="ix-7"
              key={i0}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                padding: '30px 26px 28px',
                background: '#FFFFFF',
                border: '2px solid #24212E',
                borderRadius: '26px',
                boxShadow: `6px 6px 0 ${a.color ?? ''}`,
                transform: `rotate(${a.rot ?? ''})`,
                transition: 'transform 0.25s cubic-bezier(.3,1.6,.5,1)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '19px',
                  border: `2px dashed ${a.color ?? ''}`,
                  pointerEvents: 'none',
                  left: '7px',
                  top: '10px',
                }}
              />
              <img
                src={a.brick}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '18px',
                  top: '-26px',
                  width: '74px',
                  height: 'auto',
                  transform: `rotate(${a.brot ?? ''})`,
                }}
              />
              <svg
                aria-hidden="true"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                style={{ overflow: 'visible' }}
              >
                <path
                  d={a.icon}
                  stroke={a.color}
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={a.color}
                />
                <path
                  d={a.icon}
                  stroke="#24212E"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={a.color}
                />
              </svg>
              <h3
                style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '400', fontSize: '28px', lineHeight: '1.05' }}
              >
                {a.title}
              </h3>
              <p style={{ fontSize: '16.5px', lineHeight: '1.6', color: '#3A3546' }}>{a.body}</p>
              {a.hasChips ? (
                <ul
                  style={{
                    listStyle: 'none',
                    margin: '2px 0 0',
                    padding: '0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {a.chips.map((c, i1) => (
                    <li
                      key={i1}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: c.bg,
                        border: '2px solid #24212E',
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '200',
                        fontSize: '15px',
                        transform: `rotate(${c.rot ?? ''})`,
                      }}
                    >
                      {c.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

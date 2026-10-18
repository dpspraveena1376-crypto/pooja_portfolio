export default function Projects({ v }) {
  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        background: '#FFF8EE',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 4vw, 48px) clamp(60px, 7vw, 90px)',
        borderTop: '2px solid #24212E',
        overflow: 'hidden',
      }}
    >
      <img
        src="assets/lego/b24-cobalt.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-23px',
          top: '12px',
          width: 'clamp(120px, 12vw, 170px)',
          height: 'auto',
          transform: 'rotate(10deg)',
          zIndex: '2',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '28px',
            marginBottom: 'clamp(36px, 5vw, 64px)',
          }}
        >
          <span
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              background: '#FFDD6E',
              border: '2px solid #24212E',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: '600',
              fontSize: '15px',
            }}
          >
            04 · Projects
          </span>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              paddingLeft: 'clamp(0px, 3vw, 40px)',
            }}
          >
            <div role="group" aria-label="Filter projects" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {v.filters.map((f, i0) => (
                <button
                  className="ix-9 ix-a"
                  key={i0}
                  type="button"
                  aria-pressed={f.pressed}
                  onClick={f.pick}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '999px',
                    border: '1.5px solid #24212E',
                    background: f.bg,
                    color: f.color,
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '500',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, background 0.15s ease',
                  }}
                >
                  {f.label} <span style={{ fontSize: '13px', opacity: '0.7' }}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{
              display: v.noteDisp,
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingRight: '40px',
              fontFamily: "'Caveat', cursive",
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '1.05',
              color: '#24212E',
              transform: 'rotate(-10deg)',
            }}
          />
        </div>
        <div
          style={{
            opacity: v.projOpacity,
            transform: `translateY(${v.projShift ?? ''})`,
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <ol style={{ listStyle: 'none', margin: '0', padding: `0 ${v.stackPad ?? ''}` }}>
            {v.shownProjects.map((p, i0) => (
              <li
                className="ix-b"
                key={i0}
                style={{
                  position: 'relative',
                  isolation: 'isolate',
                  margin: `${p.mt ?? ''} ${p.mr ?? ''} 0 ${p.ml ?? ''}`,
                  zIndex: p.z,
                  transform: `rotate(${p.rot ?? ''})`,
                  transition: 'transform 0.3s cubic-bezier(.3,1.3,.5,1)',
                }}
              >
                {p.hasLink ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={p.linkAria}
                    style={{
                      position: 'relative',
                      display: 'block',
                      paddingTop: '50px',
                      textDecoration: 'none',
                      color: '#24212E',
                      borderRadius: '24px',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-8px',
                        right: '10px',
                        top: '48px',
                        bottom: '-6px',
                        backgroundColor: p.back,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: '26px',
                        transform: 'rotate(-0.8deg)',
                        zIndex: '-1',
                      }}
                    />
                    <div
                      style={{
                        position: 'relative',
                        height: p.bodyH,
                        backgroundColor: p.front,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: p.bodyR,
                        boxShadow: '0 -10px 22px rgba(36,33,46,0.10)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: p.tabL,
                        width: v.tabW,
                        height: '50px',
                        backgroundColor: p.front,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: '24px 24px 0 0',
                        boxShadow: '0 -8px 16px rgba(36,33,46,0.07)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          left: '-22px',
                          bottom: '0',
                          width: '22px',
                          height: '22px',
                          background: `radial-gradient(circle at 0 0, transparent 21.5px, ${p.front ?? ''} 22px)`,
                          display: p.filL,
                        }}
                      />{' '}
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          right: '-22px',
                          bottom: '0',
                          width: '22px',
                          height: '22px',
                          background: `radial-gradient(circle at 100% 0, transparent 21.5px, ${p.front ?? ''} 22px)`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: p.textL,
                        right: v.textR,
                        top: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#24212E',
                          }}
                        >
                          {p.n}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: '500',
                            fontSize: v.titleSize,
                            lineHeight: '1.1',
                            color: '#24212E',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {p.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          paddingLeft: '32px',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '600',
                          fontSize: v.descSize,
                          lineHeight: '1.4',
                          color: '#3A3546',
                          maxWidth: '34em',
                          textWrap: 'pretty',
                          position: 'relative',
                        }}
                      >
                        {p.short}
                      </p>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: v.badgeR,
                        left: v.badgeL,
                        top: v.badgeT,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          padding: '5px 14px',
                          borderRadius: '999px',
                          border: '1.5px dashed #24212E',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '700',
                          fontSize: '14px',
                          color: '#24212E',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.tag}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: '#24212E',
                          color: '#FFFFFF',
                          fontSize: '16px',
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    {p.last ? (
                      <>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 420 300"
                          style={{
                            position: 'absolute',
                            width: 'min(32%, 330px)',
                            height: 'auto',
                            pointerEvents: 'none',
                            zIndex: '-0',
                            left: '672px',
                            top: '117px',
                          }}
                        >
                          <path
                            d="M210 10 L250 170 L410 190 L280 260 L300 300 L120 300 L140 260 L10 190 L170 170 Z"
                            fill="#FFF8EE"
                            stroke="#24212E"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          aria-hidden="true"
                          width="190"
                          height="150"
                          viewBox="0 0 190 150"
                          fill="none"
                          style={{
                            position: 'absolute',
                            left: '-14px',
                            top: '90px',
                            pointerEvents: 'none',
                            display: v.threadDisp,
                          }}
                        >
                          <path
                            d="M6 10c40 10 60 40 40 70-16 24-46 14-38-6 8-22 60-18 90 6 22 18 30 44 70 60"
                            stroke="#E5261F"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6 10c40 10 60 40 40 70-16 24-46 14-38-6 8-22 60-18 90 6 22 18 30 44 70 60"
                            stroke="#FFFFFF"
                            strokeWidth="5"
                            strokeDasharray="6 8"
                            strokeLinecap="butt"
                          />
                        </svg>
                      </>
                    ) : null}
                  </a>
                ) : null}
                {p.noLink ? (
                  <div style={{ position: 'relative', paddingTop: '50px' }}>
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-8px',
                        right: '10px',
                        top: '48px',
                        bottom: '-6px',
                        backgroundColor: p.back,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: '26px',
                        transform: 'rotate(-0.8deg)',
                        zIndex: '-1',
                      }}
                    />
                    <div
                      style={{
                        position: 'relative',
                        height: p.bodyH,
                        backgroundColor: p.front,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: p.bodyR,
                        boxShadow: '0 -10px 22px rgba(36,33,46,0.10)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: p.tabL,
                        width: v.tabW,
                        height: '50px',
                        backgroundColor: p.front,
                        backgroundImage: 'var(--paper-noise)',
                        borderRadius: '24px 24px 0 0',
                        boxShadow: '0 -8px 16px rgba(36,33,46,0.07)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          left: '-22px',
                          bottom: '0',
                          width: '22px',
                          height: '22px',
                          background: `radial-gradient(circle at 0 0, transparent 21.5px, ${p.front ?? ''} 22px)`,
                          display: p.filL,
                        }}
                      />{' '}
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          right: '-22px',
                          bottom: '0',
                          width: '22px',
                          height: '22px',
                          background: `radial-gradient(circle at 100% 0, transparent 21.5px, ${p.front ?? ''} 22px)`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: p.textL,
                        right: p.textR ?? v.textR,
                        top: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#24212E',
                          }}
                        >
                          {p.n}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: '500',
                            fontSize: v.titleSize,
                            lineHeight: '1.1',
                            color: '#24212E',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {p.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          paddingLeft: '32px',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '600',
                          fontSize: v.descSize,
                          lineHeight: '1.4',
                          color: '#3A3546',
                          maxWidth: '34em',
                          textWrap: 'pretty',
                        }}
                      >
                        {p.short}
                      </p>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        right: p.badgeR ?? v.badgeR,
                        left: p.badgeL ?? v.badgeL,
                        top: p.badgeT ?? v.badgeT,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          padding: '5px 14px',
                          borderRadius: '999px',
                          border: '1.5px dashed #24212E',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '700',
                          fontSize: '14px',
                          color: '#24212E',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.tag}
                      </span>
                      {p.status ? (
                        <span
                          style={{
                            padding: '5px 12px',
                            borderRadius: '999px',
                            background: '#FFFFFF',
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: '700',
                            fontSize: '13px',
                            color: '#24212E',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.status}
                        </span>
                      ) : null}
                      {p.hasLinks ? (
                        p.links.map((l) => (
                          <a
                            className="proj-link"
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener"
                            aria-label={`Open ${l.label}, ${l.kind} (opens in a new tab)`}
                          >
                            {l.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))
                      ) : (
                        <span
                          style={{
                            fontFamily: "'Caveat', cursive",
                            fontWeight: '700',
                            fontSize: '21px',
                            color: '#24212E',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          coming soon!
                        </span>
                      )}
                    </div>
                    <img
                      src="assets/lego/b24-red.png"
                      alt=""
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        right: '-10px',
                        top: '70px',
                        width: '96px',
                        height: 'auto',
                        transform: 'rotate(14deg)',
                        display: p.brickDisp,
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 6px 8px rgba(36,33,46,0.25))',
                      }}
                    />{' '}
                    <svg
                      aria-hidden="true"
                      width="26"
                      height="78"
                      viewBox="0 0 26 78"
                      fill="none"
                      style={{
                        position: 'absolute',
                        right: '30px',
                        top: '46px',
                        display: p.clipDisp,
                        transform: 'rotate(-12deg)',
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 2px 2px rgba(36,33,46,0.3))',
                      }}
                    >
                      <path
                        d="M8 60V14a5 5 0 0 1 10 0v48a9 9 0 0 1-18 0V22"
                        stroke="#9AA1AC"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 60V14a5 5 0 0 1 10 0v48a9 9 0 0 1-18 0V22"
                        stroke="#E6E9EE"
                        strokeWidth="1"
                        strokeLinecap="round"
                        transform="translate(0.6 -0.6)"
                      />
                    </svg>{' '}
                    <svg
                      aria-hidden="true"
                      width="64"
                      height="26"
                      viewBox="0 0 64 26"
                      fill="none"
                      stroke="#24212E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ position: 'absolute', right: p.loopR, top: '96px', display: p.loopDisp }}
                    >
                      <path d="M2 20c10 2 18-2 22-8 3-5 0-9-4-7s-2 9 6 10c8 1 14-5 16-9 2-3 6-3 6 1s-6 8-12 6" />
                    </svg>
                    {p.last ? (
                      <>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 420 300"
                          style={{
                            position: 'absolute',
                            right: '150px',
                            bottom: '-30px',
                            width: 'min(32%, 330px)',
                            height: 'auto',
                            pointerEvents: 'none',
                            zIndex: '-0',
                          }}
                        >
                          <path
                            d="M210 10 L250 170 L410 190 L280 260 L300 300 L120 300 L140 260 L10 190 L170 170 Z"
                            fill="#FFF8EE"
                            stroke="#24212E"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          aria-hidden="true"
                          width="190"
                          height="150"
                          viewBox="0 0 190 150"
                          fill="none"
                          style={{
                            position: 'absolute',
                            left: '-14px',
                            top: '90px',
                            pointerEvents: 'none',
                            display: v.threadDisp,
                          }}
                        >
                          <path
                            d="M6 10c40 10 60 40 40 70-16 24-46 14-38-6 8-22 60-18 90 6 22 18 30 44 70 60"
                            stroke="#E5261F"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6 10c40 10 60 40 40 70-16 24-46 14-38-6 8-22 60-18 90 6 22 18 30 44 70 60"
                            stroke="#FFFFFF"
                            strokeWidth="5"
                            strokeDasharray="6 8"
                            strokeLinecap="butt"
                          />
                        </svg>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {v.projEmpty ? (
            <p
              style={{
                padding: '40px 0',
                textAlign: 'center',
                fontFamily: "'Caveat', cursive",
                fontWeight: '700',
                fontSize: '26px',
                color: '#4A4556',
              }}
            >
              This drawer is empty for now.
            </p>
          ) : null}
        </div>
        <a
          className="ix-c"
          href="https://www.behance.net/poojaspraveen"
          target="_blank"
          rel="noopener"
          style={{
            marginTop: '36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'Caveat', cursive",
            fontWeight: '700',
            fontSize: '28px',
            color: '#2F5BFF',
            textDecoration: 'none',
          }}
        >
          <svg
            width="18"
            height="40"
            viewBox="0 0 18 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M9 2v34" />
            <path d="m2 29 7 8 7-8" />
          </svg>
          more work on Behance
        </a>
      </div>
    </section>
  );
}

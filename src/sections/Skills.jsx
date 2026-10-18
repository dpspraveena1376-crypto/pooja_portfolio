export default function Skills({ v }) {
  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 4vw, 48px)',
        borderTop: '2px solid #24212E',
        backgroundColor: '#FFF8EE',
        backgroundImage: 'radial-gradient(#EADFCB 1.3px, transparent 1.3px)',
        backgroundSize: '26px 26px',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: v.skCols,
          gap: 'clamp(32px, 4vw, 56px)',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
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
            02 · Skills
          </span>
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '1.05',
              color: '#2F5BFF',
              transform: 'rotate(-2deg)',
            }}
          >
            Pick a block.
            <br />
            Switch things up.
          </p>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#4A4556',
              maxWidth: '26em',
            }}
          >
            Drag a block to rebuild the tower, or tap two blocks to swap them. With a keyboard, focus a block and use
            the arrow keys.
          </p>
          <button
            className="ix-8"
            type="button"
            onClick={v.skReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1.5px solid #24212E',
              background: '#FFFFFF',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: '500',
              fontSize: '15px',
              color: '#24212E',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              opacity: v.skResetOp,
            }}
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset tower
          </button>
          <p
            aria-live="polite"
            style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
          >
            {v.skLive}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: v.skGap, minWidth: '0' }}>
          <div
            style={{ position: 'relative', flex: 'none', width: v.skBW, height: v.skTowerH, margin: '30px 16px 0 0' }}
          >
            {v.skBlocks.map((k, i0) => (
              <button
                key={i0}
                type="button"
                data-sk={k.id}
                aria-label={k.aria}
                aria-pressed={k.pressed}
                onPointerDown={k.down}
                onClick={k.click}
                onKeyDown={k.key}
                onMouseEnter={k.enter}
                onMouseLeave={v.skLeave}
                style={{
                  position: 'absolute',
                  left: '0',
                  top: k.top,
                  width: v.skBW,
                  height: v.skBH,
                  zIndex: k.z,
                  padding: '0',
                  margin: '0',
                  border: '0',
                  background: 'transparent',
                  cursor: k.cursor,
                  touchAction: 'none',
                  transition: k.trans,
                  borderRadius: '4px',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '-16px',
                    width: 'calc(100% + 16px)',
                    height: '16px',
                    background: k.topC,
                    clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)',
                  }}
                />{' '}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    right: '-16px',
                    top: '-16px',
                    width: '16px',
                    height: 'calc(100% + 16px)',
                    background: k.sideC,
                    clipPath: 'polygon(0 16px, 100% 0, 100% calc(100% - 16px), 0 100%)',
                  }}
                />
                {v.skStuds.map((st, i1) => (
                  <span
                    key={i1}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: st.left,
                      top: '-17px',
                      width: '26px',
                      height: '11px',
                      borderRadius: '50%',
                      background: k.topC,
                      boxShadow: `0 4px 0 ${k.sideC ?? ''}, inset 0 1.5px 0 rgba(255,255,255,0.55)`,
                    }}
                  />
                ))}
                <span
                  style={{
                    position: 'absolute',
                    inset: '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '0 18px',
                    background: k.face,
                    borderRadius: '3px',
                    boxShadow: `inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -4px 0 rgba(0,0,0,0.10), ${k.ring ?? ''}`,
                    color: k.ink,
                    textAlign: 'left',
                    transform: k.lift,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '600',
                      fontSize: '14px',
                      opacity: '0.85',
                    }}
                  >
                    {k.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '600',
                      fontSize: v.skTitleSize,
                      lineHeight: '1.05',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {k.title}
                  </span>
                </span>
              </button>
            ))}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-22px',
                top: v.skBaseTop,
                width: `calc(${v.skBW ?? ''} + 44px)`,
                height: '18px',
                background: '#CFC8BC',
                borderRadius: '3px',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '-12px',
                  width: 'calc(100% + 12px)',
                  height: '12px',
                  background: '#E2DCD1',
                  clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                }}
              />{' '}
              <span
                style={{
                  position: 'absolute',
                  right: '-12px',
                  top: '-12px',
                  width: '12px',
                  height: '30px',
                  background: '#B5AD9F',
                  clipPath: 'polygon(0 12px, 100% 0, 100% 18px, 0 100%)',
                }}
              />
            </div>
          </div>
          {v.skSideCards ? (
            <div style={{ position: 'relative', flex: '1', minWidth: '0', height: v.skCardsH, marginTop: '30px' }}>
              {v.skCards.map((c, i0) => (
                <div
                  key={i0}
                  style={{
                    position: 'absolute',
                    left: '30px',
                    right: '0',
                    top: c.top,
                    height: c.h,
                    padding: '10px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '7px',
                    background: c.tint,
                    border: `1.5px solid ${c.edge ?? ''}`,
                    borderRadius: '18px',
                    boxShadow: c.shadow,
                    transition: c.trans,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-30px',
                      top: '50%',
                      width: '28px',
                      borderTop: `2px dashed ${c.edge ?? ''}`,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-6px',
                      top: 'calc(50% - 5px)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: c.edge,
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '600',
                        fontSize: '13px',
                        color: '#4A4556',
                      }}
                    >
                      {c.n}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '600',
                        fontSize: '18px',
                        color: '#24212E',
                      }}
                    >
                      {c.title}
                    </h3>
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: '0',
                      padding: '0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                    }}
                  >
                    {c.items.map((t, i1) => (
                      <li
                        key={i1}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(36,33,46,0.18)',
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '700',
                          fontSize: '13px',
                          lineHeight: '1.3',
                          color: '#24212E',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {v.skListCards ? (
          <ol
            style={{
              listStyle: 'none',
              margin: '0',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {v.skCardsFlow.map((c, i0) => (
              <li
                key={i0}
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  background: c.tint,
                  border: `1.5px solid ${c.edge ?? ''}`,
                  borderRadius: '18px',
                  boxShadow: c.shadow,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '600',
                      fontSize: '13px',
                      color: '#4A4556',
                    }}
                  >
                    {c.n}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '600',
                      fontSize: '18px',
                      color: '#24212E',
                    }}
                  >
                    {c.title}
                  </h3>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: '0',
                    padding: '0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  {c.items.map((t, i1) => (
                    <li
                      key={i1}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(36,33,46,0.18)',
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: '700',
                        fontSize: '13px',
                        lineHeight: '1.3',
                        color: '#24212E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

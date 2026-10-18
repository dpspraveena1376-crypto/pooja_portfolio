export default function Home({ v }) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        backgroundColor: '#FFF8EE',
        backgroundImage: 'radial-gradient(#EADFCB 1.3px, transparent 1.3px)',
        backgroundSize: '26px 26px',
      }}
    >
      <div ref={v.frameRef} style={{ position: 'relative', minHeight: v.frameMinH }}>
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            zIndex: '3',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: v.brDrop.left,
              top: v.brDrop.top,
              width: v.brDrop.w,
              height: v.brDrop.h,
              display: v.brDrop.disp,
              border: '2.5px dashed #24212E',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.45)',
              transition: 'left 0.15s ease, top 0.15s ease, width 0.15s ease, height 0.15s ease',
            }}
          />
          {v.brBricks.map((k, i0) => (
            <button
              className="ix-4"
              key={i0}
              type="button"
              data-br={k.id}
              tabIndex={k.tab}
              aria-label={k.aria}
              aria-pressed={k.pressed}
              onPointerDown={k.down}
              onClick={k.click}
              onKeyDown={k.key}
              onFocus={k.focus}
              style={{
                position: 'absolute',
                left: k.left,
                top: k.top,
                width: k.w,
                height: k.h,
                zIndex: k.z,
                padding: '0',
                margin: '0',
                border: '0',
                background: 'transparent',
                cursor: k.cursor,
                pointerEvents: 'auto',
                touchAction: k.touch,
                transform: k.tf,
                filter: k.filter,
                outline: k.outline,
                outlineOffset: '2px',
                borderRadius: '6px',
                transition: k.trans,
                '--ix-4-0': `${k.hoverTf ?? ''}`,
              }}
            >
              <img
                src={k.src}
                alt=""
                draggable="false"
                style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
              />
            </button>
          ))}
          {v.brParts.map((q, i0) => (
            <span
              key={i0}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: q.x,
                top: q.y,
                width: '9px',
                height: '9px',
                margin: '-4px 0 0 -4px',
                borderRadius: '2px',
                background: q.c,
                zIndex: '40',
                transform: q.tf,
                opacity: q.op,
                transition: 'transform 0.85s cubic-bezier(.2,.8,.3,1), opacity 0.85s ease',
              }}
            />
          ))}
          {v.brMsgShow ? (
            <span
              role="status"
              style={{
                position: 'absolute',
                left: v.brMsg.x,
                top: v.brMsg.y,
                transform: v.brMsg.tf,
                zIndex: '41',
                padding: '6px 14px',
                borderRadius: '999px',
                background: '#FFFFFF',
                border: '1.5px solid #24212E',
                boxShadow: '3px 4px 0 #FFDD6E',
                fontFamily: "'Caveat', cursive",
                fontWeight: '700',
                fontSize: '21px',
                color: '#24212E',
                whiteSpace: 'nowrap',
                opacity: v.brMsg.op,
                transition: 'opacity 0.3s ease',
              }}
            >
              {v.brMsg.text}
            </span>
          ) : null}
          {v.brChanged ? (
            <button
              className="ix-5"
              type="button"
              onClick={v.brReset}
              style={{
                position: 'absolute',
                left: v.brResetL,
                bottom: v.brResetB,
                zIndex: '42',
                pointerEvents: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(36,33,46,0.25)',
                background: 'rgba(255,255,255,0.9)',
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: '500',
                fontSize: '13px',
                color: '#24212E',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <svg
                aria-hidden="true"
                width="13"
                height="13"
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
              Reset bricks
            </button>
          ) : null}
          <div className="brick-hint" style={{ left: v.brHint.left, top: v.brHint.top, opacity: v.brHint.op }}>
            <svg
              aria-hidden="true"
              width="40"
              height="34"
              viewBox="0 0 40 34"
              fill="none"
              stroke="#24212E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M36 30 C 31 15, 20 8, 6 6" />
              <path d="M15 3.5 L6 6 L11.5 13.5" />
            </svg>
            <p className="brick-hint__text">
              <span className="brick-hint__title">the bricks move!</span>
              <span className="brick-hint__sub">drag to rearrange · tap to recolour</span>
            </p>
          </div>
          <p
            aria-live="polite"
            style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
          >
            {v.brLive}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: '1',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: v.frameMinH,
            padding: v.innerPad,
            display: 'flex',
            flexFlow: v.introFlow,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            gap: v.introGap,
            // Fades in once the loader has built the brick frame.
            opacity: v.introOp,
            transition: 'opacity 0.55s ease',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: v.stageW,
              maxWidth: '100%',
              height: v.stageH,
              zoom: v.heroK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              style={{
                position: 'absolute',
                width: v.blobSize,
                height: v.blobSize,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <defs>
                <radialGradient id="gblob" cx="50%" cy="50%" r="50%">
                  <stop offset="0.3" stopColor="#FFD3E6" />
                  <stop offset="1" stopColor="#FFD3E6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="url(#gblob)" />
            </svg>
            <img
              src="assets/portrait-home.webp"
              alt="Pooja, smiling"
              onMouseEnter={v.faceOn}
              onMouseLeave={v.faceOff}
              style={{
                position: 'relative',
                height: v.faceH,
                width: 'auto',
                zIndex: '2',
                transform: v.faceTf,
                transition: 'transform 0.45s cubic-bezier(.3,1.6,.5,1)',
              }}
            />
            {v.heroRing ? (
              <>
                {v.heroButtons.map((b, i0) => (
                  <a
                    key={i0}
                    href={b.href}
                    onMouseEnter={b.on}
                    onMouseLeave={v.heroOff}
                    onFocus={b.on}
                    onBlur={v.heroOff}
                    style={{
                      position: 'absolute',
                      left: b.left,
                      top: b.top,
                      transform: b.tf,
                      zIndex: '4',
                      textDecoration: 'none',
                      color: '#24212E',
                      borderRadius: '999px',
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: v.pillGap,
                        minWidth: v.pillMinW,
                        padding: '6px 16px 6px 6px',
                        background: '#FFFFFF',
                        border: `1.5px solid ${b.edge ?? ''}`,
                        borderRadius: b.radius,
                        boxShadow: b.shadow,
                        transform: b.lift,
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '600',
                        fontSize: v.pillFont,
                        letterSpacing: '0.005em',
                        whiteSpace: 'nowrap',
                        transition: 'transform 0.25s cubic-bezier(.3,1.5,.5,1), box-shadow 0.25s ease',
                      }}
                    >
                      <span
                        style={{
                          width: v.pillDot,
                          height: v.pillDot,
                          flex: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: b.bg,
                        }}
                      >
                        <img
                          src={b.brick}
                          alt=""
                          style={{
                            width: v.pillBrick,
                            height: 'auto',
                            transform: b.brickTf,
                            transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1)',
                            filter: 'drop-shadow(0 2px 2px rgba(36,33,46,0.22))',
                          }}
                        />
                      </span>
                      <span style={{ flex: '1' }}>{b.label}</span>
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#24212E"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flex: 'none' }}
                      >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                      <svg
                        aria-hidden="true"
                        width={b.dW}
                        height={b.dH}
                        viewBox={b.dVB}
                        fill={b.dFill}
                        stroke={b.edge}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        style={{
                          position: 'absolute',
                          left: b.dL,
                          top: b.dT,
                          display: b.dDisp,
                          pointerEvents: 'none',
                          overflow: 'visible',
                        }}
                      >
                        <path d={b.dPath} />
                      </svg>
                    </span>
                  </a>
                ))}
              </>
            ) : null}
          </div>
          {v.heroGrid ? (
            <div
              style={{
                width: v.gridW,
                maxWidth: '420px',
                zoom: v.heroK,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '10px',
              }}
            >
              {v.heroButtons.map((b, i0) => (
                <a
                  className="ix-6"
                  key={i0}
                  href={b.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minHeight: '50px',
                    padding: '5px 12px 5px 5px',
                    borderRadius: b.radius,
                    background: '#FFFFFF',
                    border: `1.5px solid ${b.edge ?? ''}`,
                    boxShadow: `3px 4px 0 ${b.shadowC ?? ''}`,
                    textDecoration: 'none',
                    color: '#24212E',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '600',
                    fontSize: '15px',
                    lineHeight: '1.1',
                  }}
                >
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      flex: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: b.bg,
                    }}
                  >
                    <img src={b.brick} alt="" style={{ width: '26px', height: 'auto' }} />
                  </span>
                  <span style={{ flex: '1' }}>{b.label}</span>
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#24212E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flex: 'none' }}
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '8px',
              maxWidth: '100%',
              flexBasis: v.textBasis,
              zoom: v.heroK,
            }}
          >
            <h1
              style={{
                fontFamily: "'Baloo 2', 'Fredoka', sans-serif",
                fontWeight: '700',
                fontSize: 'clamp(28px, 3.4vw, 46px)',
                lineHeight: '1.1',
                letterSpacing: '-0.01em',
                color: '#24212E',
              }}
            >
              <span className="sr-only">Pooja Sai Praveena — UI/UX, Visual &amp; Product Designer</span>
            </h1>
            <p
              className="hero-intro"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: '600',
                fontSize: 'clamp(16px, 1.45vw, 20px)',
                lineHeight: '1.4',
                color: '#4A4556',
                position: 'relative',
                width: '496px',
                maxWidth: '100%',
              }}
            >
              {"Hey, I'm Pooja, a "}
              <span
                style={{
                  color: 'rgb(36, 33, 46)',
                  fontWeight: '800',
                  boxShadow: 'rgb(255, 227, 138) 0px -0.35em 0px inset',
                }}
              >
                UI/UX
              </span>
              {', '}
              <span
                style={{
                  color: 'rgb(36, 33, 46)',
                  fontWeight: '800',
                  boxShadow: 'rgb(255, 201, 198) 0px -0.35em 0px inset',
                }}
              >
                Visual
              </span>
              {' & '}
              <span
                style={{
                  color: 'rgb(36, 33, 46)',
                  fontWeight: '800',
                  boxShadow: 'rgb(191, 230, 203) 0px -0.35em 0px inset',
                }}
              >
                Product
              </span>
              {' Designer.'}
            </p>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: '600',
                fontSize: 'clamp(16px, 1.45vw, 20px)',
                lineHeight: '1.4',
                color: '#4A4556',
                position: 'relative',
              }}
            >
              <div>
                <div>
                  <p>Always keeping myself busy with something new.</p>
                  <p />
                </div>
              </div>
              <div>
                <div />
              </div>
            </div>
            <p />
          </div>
        </div>
      </div>
    </section>
  );
}

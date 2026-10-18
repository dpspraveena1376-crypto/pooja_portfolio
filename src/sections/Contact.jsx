import Lego3D from './Lego3D.jsx';

export default function Contact({ v }) {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 4vw, 48px)',
        borderTop: '2px solid #24212E',
        overflow: 'hidden',
        backgroundColor: '#FFF8EE',
      }}
    >
      {v.gmGhostShow ? (
        <img
          src={v.gmGhost.src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: v.gmGhost.left,
            top: v.gmGhost.top,
            width: v.gmGhost.w,
            height: 'auto',
            zIndex: '999',
            pointerEvents: 'none',
            transform: 'scale(1.08) rotate(-3deg)',
            filter: 'drop-shadow(0 16px 16px rgba(36,33,46,0.3))',
          }}
        />
      ) : null}
      <div
        style={{
          position: 'relative',
          maxWidth: v.ctMaxW,
          margin: '0 auto',
          padding: 'clamp(32px, 5vw, 60px) clamp(18px, 4vw, 56px)',
          background: '#FFFFFF',
          border: '2px solid #24212E',
          borderRadius: '32px',
          boxShadow: '8px 8px 0 #BBA8FF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px',
          transition: 'max-width 0.35s ease',
        }}
      >
        {v.ctGame ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h2
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '700',
                    fontSize: 'clamp(26px, 3.4vw, 36px)',
                    lineHeight: '1.05',
                  }}
                >
                  Your little LEGO studio
                </h2>
                <p style={{ fontSize: '15px', color: '#4A4556' }}>
                  Pick a brick, move it around, and build whatever you imagine.
                </p>
              </div>
              <button
                className="ix-8"
                type="button"
                onClick={v.gmClose}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  background: '#FFFFFF',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                ← Back to Contact
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontWeight: '700', fontSize: '20px', color: '#4A4556' }}>
                Starters:
              </span>
              {v.gmStarters.map((st, i0) => (
                <button
                  className="gm-chip"
                  key={i0}
                  type="button"
                  onClick={st.pick}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    border: '1.5px dashed #24212E',
                    background: st.bg,
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '500',
                    fontSize: '13.5px',
                    color: '#24212E',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {st.label}
                </button>
              ))}
              <span style={{ flex: '1' }} />
              <button
                className="ix-8"
                type="button"
                onClick={v.gmSurprise}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: '#FFF3C4',
                }}
              >
                Surprise me
              </button>
              <button
                className="ix-8"
                type="button"
                onClick={v.gm3dOpen ? v.gm3dClose : v.gm3dShow}
                aria-pressed={v.gm3dOpen}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: '#BBA8FF',
                }}
              >
                {v.gm3dOpen ? 'Back to building' : '3D view'}
              </button>
              <button
                className="ix-8"
                type="button"
                onClick={v.gmUndo}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  background: '#FFFFFF',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  opacity: v.gmUndoOp,
                }}
              >
                Undo
              </button>
              <button
                className="ix-8"
                type="button"
                onClick={v.gmAskClear}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  background: '#FFFFFF',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
              <button
                className="ix-8"
                type="button"
                onClick={v.gmReset}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid #24212E',
                  background: '#FFFFFF',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#24212E',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            </div>
            {v.gmConfirm ? (
              <div
                role="alertdialog"
                aria-label="Clear the canvas?"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  background: '#FFE3EF',
                  border: '1.5px solid #F0569C',
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '14px' }}>Clear every brick from the canvas?</span>
                <button
                  className="ix-8"
                  type="button"
                  onClick={v.gmClear}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '999px',
                    border: '1.5px solid #24212E',
                    background: '#FFFFFF',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#24212E',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  Yes, clear
                </button>
                <button
                  className="ix-8"
                  type="button"
                  onClick={v.gmCancelClear}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '999px',
                    border: '1.5px solid #24212E',
                    background: '#FFFFFF',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#24212E',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  Keep building
                </button>
              </div>
            ) : null}
            {v.gm3dOpen ? (
              <Lego3D bricks={v.gm3d.bricks} cols={v.gm3d.cols} rows={v.gm3d.rows} colors={v.gm3d.colors} onClose={v.gm3dClose} />
            ) : null}
            <div style={{ display: v.gm3dOpen ? 'none' : 'flex', flexDirection: v.gmDir, gap: '16px', alignItems: 'flex-start' }}>
              <div
                ref={v.gmCanvasRef}
                role="application"
                aria-label="LEGO building canvas. Select a brick, then use arrow keys to move, R to rotate, C to change colour, Delete to remove."
                onPointerDown={v.gmCanvasDown}
                style={{
                  position: 'relative',
                  flex: 'none',
                  width: v.gmCW,
                  height: v.gmCH,
                  borderRadius: '18px',
                  border: '1.5px solid rgba(36,33,46,0.25)',
                  backgroundColor: '#FFFDF8',
                  backgroundImage: 'radial-gradient(circle, rgba(36,33,46,0.10) 2.2px, transparent 2.6px)',
                  backgroundSize: `${v.gmCell ?? ''} ${v.gmCell ?? ''}`,
                  backgroundPosition: v.gmDotPos,
                  touchAction: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: v.gmPrev.left,
                    top: v.gmPrev.top,
                    width: v.gmPrev.w,
                    height: v.gmPrev.h,
                    display: v.gmPrev.disp,
                    border: '2px dashed #24212E',
                    borderRadius: '6px',
                    background: 'rgba(255,221,110,0.25)',
                    pointerEvents: 'none',
                    zIndex: '900',
                  }}
                />
                {v.gmBricks.map((k, i0) => (
                  <button
                    key={i0}
                    type="button"
                    data-gm={k.id}
                    aria-label={k.aria}
                    aria-pressed={k.pressed}
                    onPointerDown={k.down}
                    onKeyDown={k.key}
                    onFocus={k.focus}
                    style={{
                      position: 'absolute',
                      left: k.left,
                      top: k.top,
                      width: k.w,
                      zIndex: k.z,
                      padding: '0',
                      border: '0',
                      background: 'transparent',
                      cursor: 'grab',
                      touchAction: 'none',
                      outline: k.outline,
                      outlineOffset: '2px',
                      borderRadius: '4px',
                      transform: k.tf,
                      filter: k.filter,
                      transition: k.trans,
                    }}
                  >
                    <img
                      src={k.src}
                      alt=""
                      draggable="false"
                      style={{ display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
                    />
                  </button>
                ))}
                {v.gmHasSel ? (
                  <div
                    role="toolbar"
                    aria-label="Selected brick tools"
                    onPointerDown={v.gmStop}
                    style={{
                      position: 'absolute',
                      left: v.gmTool.left,
                      top: v.gmTool.top,
                      zIndex: '950',
                      display: 'flex',
                      gap: '2px',
                      padding: '3px',
                      borderRadius: '12px',
                      background: '#FFFFFF',
                      border: '1.5px solid #24212E',
                      boxShadow: '3px 4px 0 #BBA8FF',
                    }}
                  >
                    <button
                      className="ix-8"
                      type="button"
                      onClick={v.gmRotL}
                      aria-label="Rotate left"
                      title="Rotate left"
                      style={{
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        border: '0',
                        background: 'transparent',
                        color: '#24212E',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                    <button
                      className="ix-8"
                      type="button"
                      onClick={v.gmRotR}
                      aria-label="Rotate right"
                      title="Rotate right"
                      style={{
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        border: '0',
                        background: 'transparent',
                        color: '#24212E',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    </button>
                    <button
                      className="ix-8"
                      type="button"
                      onClick={v.gmColor}
                      aria-label="Change colour"
                      title="Change colour"
                      style={{
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        border: '0',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: '1.5px solid #24212E',
                          background: v.gmSelColor,
                        }}
                      />
                    </button>
                    <button
                      className="ix-8"
                      type="button"
                      onClick={v.gmRemove}
                      aria-label="Remove brick"
                      title="Remove brick"
                      style={{
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        border: '0',
                        background: 'transparent',
                        color: '#24212E',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ) : null}
                {v.gmParts.map((q, i0) => (
                  <span
                    key={i0}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '45%',
                      width: '10px',
                      height: '10px',
                      margin: '-5px 0 0 -5px',
                      background: q.c,
                      clipPath: q.clip,
                      transform: q.tf,
                      opacity: q.op,
                      transition: 'transform 0.9s cubic-bezier(.2,.8,.3,1), opacity 0.9s ease',
                      pointerEvents: 'none',
                      zIndex: '980',
                    }}
                  />
                ))}
                {v.gmEmpty ? (
                  <p
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Caveat', cursive",
                      fontWeight: '700',
                      fontSize: '26px',
                      color: 'rgba(36,33,46,0.35)',
                      pointerEvents: 'none',
                      textAlign: 'center',
                      padding: '20px',
                    }}
                  >
                    Drag a brick here to start
                  </p>
                ) : null}
              </div>
              <div
                aria-label="Brick tray"
                style={{
                  flex: '1',
                  minWidth: '0',
                  width: v.gmTrayW,
                  padding: '14px',
                  borderRadius: '18px',
                  background: '#FFF6D9',
                  border: '1.5px dashed #E5A800',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '600', fontSize: '15px' }}>
                  Brick tray
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
                  {v.gmTray.map((t, i0) => (
                    <button
                      className="gm-tray-btn ix-g"
                      key={i0}
                      type="button"
                      onPointerDown={t.down}
                      onClick={t.add}
                      aria-label={t.aria}
                      style={{
                        padding: '4px',
                        border: '0',
                        background: 'transparent',
                        borderRadius: '8px',
                        cursor: 'grab',
                        touchAction: 'none',
                      }}
                    >
                      <img
                        src={t.src}
                        alt=""
                        draggable="false"
                        style={{
                          display: 'block',
                          width: t.w,
                          height: 'auto',
                          pointerEvents: 'none',
                          filter: 'drop-shadow(0 3px 3px rgba(36,33,46,0.18))',
                        }}
                      />
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: '12.5px', color: '#4A4556', lineHeight: '1.4' }}>
                  Drag onto the canvas, or tap a brick to drop it in. Drop on another brick to stack.
                </span>
              </div>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '4px' }}
            >
              <button
                className="ix-h ix-i"
                type="button"
                onClick={v.gmDone}
                style={{
                  padding: '14px 26px',
                  borderRadius: '18px',
                  background: '#FFDD6E',
                  border: '2px solid #24212E',
                  boxShadow: '4px 4px 0 #24212E',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#24212E',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Done building!
              </button>
              {v.gmFinished ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: '20px',
                    background: '#EEE9FF',
                    border: '1.5px solid #8A6DFF',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '700',
                      fontSize: '22px',
                      textAlign: 'center',
                    }}
                  >
                    {"Nice build! Now let's create something together."}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                      gap: '14px',
                      maxWidth: '100%',
                    }}
                  >
                    <button
                      className="ix-f"
                      type="button"
                      onClick={v.copyMail}
                      onMouseEnter={v.mailOn}
                      onMouseLeave={v.mailOff}
                      aria-label="Copy email address dpspraveena.1376@gmail.com"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        maxWidth: '100%',
                        padding: '14px 22px',
                        borderRadius: '999px',
                        background: '#2F5BFF',
                        color: '#FFFFFF',
                        border: '2px solid #24212E',
                        boxShadow: v.mailShadow,
                        transform: v.mailTf,
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: '600',
                        fontSize: 'clamp(15px, 2vw, 19px)',
                        wordBreak: 'break-all',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span>{v.mailLabel}</span>
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                    {v.socials.map((s, i0) => (
                      <a
                        className="ix-j"
                        key={i0}
                        href={s.href}
                        target="_blank"
                        rel="noopener"
                        onMouseEnter={s.on}
                        onMouseLeave={v.socOff}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 20px',
                          borderRadius: '999px',
                          background: s.bg,
                          color: '#24212E',
                          border: '2px solid #24212E',
                          boxShadow: s.shadow,
                          transform: s.tf,
                          textDecoration: 'none',
                          fontFamily: "'Fredoka', sans-serif",
                          fontWeight: '600',
                          fontSize: '17px',
                          whiteSpace: 'nowrap',
                          transition: 'transform 0.2s cubic-bezier(.3,1.5,.5,1), box-shadow 0.2s ease',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '7px',
                            background: '#24212E',
                            color: '#FFFFFF',
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: '800',
                            fontSize: '13px',
                            letterSpacing: '-0.02em',
                            transform: s.icoTf,
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          {s.glyph}
                        </span>
                        {s.label}
                        <svg
                          aria-hidden="true"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ transition: 'transform 0.2s ease', transform: s.arr }}
                        >
                          <path d="M7 17 17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <p
                    role="status"
                    style={{
                      minHeight: '20px',
                      fontSize: '14px',
                      color: '#4A4556',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{v.copyNote}</span>
                    <a href="mailto:dpspraveena.1376@gmail.com" style={{ color: '#1C3FCC', fontWeight: '700' }}>
                      or open your email app
                    </a>
                  </p>
                  <button
                    className="ix-8"
                    type="button"
                    onClick={v.gmKeep}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '999px',
                      border: '1.5px solid #24212E',
                      background: '#FFFFFF',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#24212E',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                  >
                    Back to building
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* The contact block steps aside while the LEGO studio is open; "Back to Contact" brings it back. */}
        {v.ctDefault ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
              opacity: v.ctFade,
              transition: 'opacity 0.3s ease',
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
              06 · Contact
            </span>
            <h2
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: '700',
                fontSize: 'clamp(38px, 5vw, 64px)',
                lineHeight: '1.02',
                textWrap: 'balance',
                maxWidth: '11em',
              }}
            >
              Your next designer might be right here.
            </h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#3A3546', maxWidth: '30em', textWrap: 'pretty' }}>
              Minimal or maximal, subtle or colorful, sleek or playful. I love exploring every style.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: '14px',
                maxWidth: '100%',
              }}
            >
              <button
                className="ix-f"
                type="button"
                onClick={v.copyMail}
                onMouseEnter={v.mailOn}
                onMouseLeave={v.mailOff}
                aria-label="Copy email address dpspraveena.1376@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  maxWidth: '100%',
                  padding: '14px 22px',
                  borderRadius: '999px',
                  background: '#2F5BFF',
                  color: '#FFFFFF',
                  border: '2px solid #24212E',
                  boxShadow: v.mailShadow,
                  transform: v.mailTf,
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '600',
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  wordBreak: 'break-all',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{v.mailLabel}</span>
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
              {v.socials.map((s, i0) => (
                <a
                  className="ix-j"
                  key={i0}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  onMouseEnter={s.on}
                  onMouseLeave={v.socOff}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 20px',
                    borderRadius: '999px',
                    background: s.bg,
                    color: '#24212E',
                    border: '2px solid #24212E',
                    boxShadow: s.shadow,
                    transform: s.tf,
                    textDecoration: 'none',
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: '600',
                    fontSize: '17px',
                    whiteSpace: 'nowrap',
                    transition: 'transform 0.2s cubic-bezier(.3,1.5,.5,1), box-shadow 0.2s ease',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '7px',
                      background: '#24212E',
                      color: '#FFFFFF',
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: '800',
                      fontSize: '13px',
                      letterSpacing: '-0.02em',
                      transform: s.icoTf,
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    {s.glyph}
                  </span>
                  {s.label}
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'transform 0.2s ease', transform: s.arr }}
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
            <p
              role="status"
              style={{
                minHeight: '20px',
                fontSize: '14px',
                color: '#4A4556',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span>{v.copyNote}</span>
            </p>
            <button
              className="playful"
              type="button"
              onClick={v.gmOpen}
              onMouseEnter={v.gpOn}
              onMouseLeave={v.gpOff}
              aria-label="Feeling playful? Open the LEGO building game"
              style={{
                width: '100%',
                maxWidth: '680px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '16px 18px 16px 22px',
                borderRadius: '22px',
                border: '2px dashed #E5A800',
                background: '#FFF6D9',
                boxShadow: v.gpShadow,
                transform: v.gpTf,
                cursor: 'pointer',
                textAlign: 'left',
                color: '#24212E',
                transition: 'transform 0.25s cubic-bezier(.3,1.4,.5,1), box-shadow 0.25s ease',
              }}
            >
              <span aria-hidden="true" style={{ position: 'relative', flex: 'none', width: '92px', height: '56px' }}>
                <img
                  src="assets/bricks/c-lav.png"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '10px',
                    width: '40px',
                    transform: v.gpB1,
                    transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1)',
                  }}
                />{' '}
                <img
                  src="assets/bricks/c-pink.png"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: '26px',
                    top: '0',
                    width: '40px',
                    transform: v.gpB2,
                    transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1) 0.05s',
                  }}
                />{' '}
                <img
                  src="assets/bricks/c-yellow.png"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: '52px',
                    top: '14px',
                    width: '40px',
                    transform: v.gpB3,
                    transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1) 0.1s',
                  }}
                />
              </span>
              <svg
                className="playful__icon"
                aria-hidden="true"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#24212E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none' }}
              >
                <path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
                <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
              </svg>
              <span
                className="playful__text"
                style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '2px' }}
              >
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: '700', fontSize: '21px' }}>
                  Feeling playful?
                </span>
                <span
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: '600', fontSize: '15px', color: '#4A4556' }}
                >
                  Build something with LEGO blocks!
                </span>
              </span>
              <span
                className="playful__go"
                aria-hidden="true"
                style={{
                  flex: 'none',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: '#FFDD6E',
                  border: '2px solid #24212E',
                  boxShadow: '3px 3px 0 #24212E',
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#24212E"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: v.gpArr, transition: 'transform 0.2s ease' }}
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// On narrow phones the menu button sits inside the brick frame, so a dropdown anchored to its
// right edge would run off the left of the screen. Nudge it back into view when that happens.
function keepOnScreen(el) {
  if (!el) return;
  el.style.right = '0px';
  const overflow = 12 - el.getBoundingClientRect().left;
  if (overflow > 0) el.style.right = -overflow + 'px';
}

export default function Header({ v }) {
  return (
    <header
      ref={v.headerRef}
      style={{
        position: 'fixed',
        zIndex: '60',
        height: v.headerH,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: v.headerPad,
        background: v.headerBg,
        borderBottom: `1.5px solid ${v.headerLine ?? ''}`,
        backdropFilter: v.headerBlur,
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}
    >
      <span />
      <a
        className="ix-0"
        href="#home"
        aria-label="Pooja — back to top"
        style={{
          justifySelf: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: '#24212E',
          transition: 'transform 0.2s ease',
        }}
      />
      <div ref={v.menuWrapRef} style={{ justifySelf: 'end', position: 'relative' }}>
        <button
          className="ix-1 ix-2"
          type="button"
          onClick={v.toggleMenu}
          aria-label={v.menuLabel}
          aria-expanded={v.menuExpanded}
          aria-controls="site-menu"
          style={{
            width: '46px',
            height: '46px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            borderRadius: '14px',
            border: '1px solid rgba(36,33,46,0.16)',
            background: v.menuBtnBg,
            boxShadow: '0 4px 14px rgba(36,33,46,0.08)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              background: '#24212E',
              transition: 'transform 0.2s ease',
              transform: v.bar1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              background: '#24212E',
              transition: 'opacity 0.2s ease',
              opacity: v.bar2,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '2px',
              borderRadius: '2px',
              background: '#24212E',
              transition: 'transform 0.2s ease',
              transform: v.bar3,
            }}
          />
        </button>
        {v.menuOpen ? (
          <nav
            id="site-menu"
            aria-label="Site menu"
            ref={(el) => {
              v.menuRef.current = el;
              keepOnScreen(el);
            }}
            style={{
              position: 'absolute',
              top: '62px',
              right: '0',
              width: 'min(300px, calc(100vw - 32px))',
              padding: '12px',
              background: '#FFFFFF',
              border: '2px solid #24212E',
              borderRadius: '22px',
              boxShadow: '6px 6px 0 #FF8FC0',
            }}
          >
            <div
              style={{
                padding: '6px 10px 10px',
                fontFamily: "'Caveat', cursive",
                fontWeight: '700',
                fontSize: '22px',
                color: '#2F5BFF',
              }}
            >
              where to next?
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {v.navItems.map((n, i0) => (
                <li key={i0}>
                  <a
                    className="ix-3"
                    href={n.href}
                    onClick={v.closeMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      color: '#24212E',
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: '600',
                      fontSize: '20px',
                      background: n.menuBg,
                    }}
                  >
                    <img src={n.brick} alt="" style={{ width: '34px', height: 'auto' }} />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

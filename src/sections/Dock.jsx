export default function Dock({ v }) {
  return (
    <>
      {v.dockVisible ? (
        <nav
          aria-label="Section navigation"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: '18px',
            transform: 'translateX(-50%)',
            zIndex: '55',
            display: 'flex',
            gap: '4px',
            padding: '6px',
            background: '#FFFFFF',
            border: '2px solid #24212E',
            borderRadius: '999px',
            boxShadow: '4px 4px 0 #24212E',
          }}
        >
          {v.navItems.map((n, i0) => (
            <a
              className="ix-3"
              key={i0}
              href={n.href}
              aria-current={n.current}
              style={{
                padding: '8px 15px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: '600',
                fontSize: '15px',
                color: '#24212E',
                whiteSpace: 'nowrap',
                background: n.dockBg,
                transition: 'background 0.2s ease',
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
      ) : null}
    </>
  );
}

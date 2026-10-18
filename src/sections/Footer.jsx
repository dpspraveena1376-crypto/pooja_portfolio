export default function Footer({ v }) {
  return (
    <footer
      style={{ background: '#FFF8EE', borderTop: '2px solid #24212E', padding: '56px clamp(16px, 4vw, 48px) 96px' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="assets/lego/stack.png" alt="" aria-hidden="true" style={{ width: '74px', height: 'auto' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: "'Bagel Fat One', 'Fredoka', sans-serif", fontSize: '40px', lineHeight: '1' }}>
                pooja<span style={{ color: '#2F5BFF' }}>.</span>
              </span>
              <span style={{ fontFamily: "'Caveat', cursive", fontWeight: '700', fontSize: '22px', color: '#2F5BFF' }}>
                thanks for scrolling all the way down!
              </span>
            </div>
          </div>
          <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {v.navItems.map((n, i0) => (
              <a
                className="ix-k"
                key={i0}
                href={n.href}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '2px solid #24212E',
                  textDecoration: 'none',
                  color: '#24212E',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '500',
                  fontSize: '15px',
                  '--ix-k-0': `${n.color ?? ''}`,
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '2px dashed rgba(36,33,46,0.25)',
            fontSize: '14px',
            color: '#5A5566',
          }}
        >
          <span>© 2026 Pooja Sai Praveena D</span>
        </div>
      </div>
    </footer>
  );
}

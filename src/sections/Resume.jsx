export default function Resume({ v }) {
  return (
    <section
      id="resume"
      style={{
        position: 'relative',
        scrollMarginTop: '72px',
        padding: 'clamp(80px, 10vw, 130px) clamp(16px, 4vw, 48px)',
        borderTop: '2px solid #24212E',
        backgroundColor: '#FFF8EE',
      }}
    >
      <img
        src="assets/lego/b22-lav.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(-20px, 4vw, 80px)',
          top: '-44px',
          width: 'clamp(90px, 9vw, 130px)',
          height: 'auto',
          transform: 'rotate(-12deg)',
          zIndex: '2',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <span
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              background: '#FF9447',
              border: '2px solid #24212E',
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: '600',
              fontSize: '15px',
            }}
          >
            05 · Resume
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(28px, 4vw, 56px)',
            padding: 'clamp(28px, 5vw, 60px)',
            background: '#FFF6D9',
            border: '2px solid #24212E',
            borderRadius: '30px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '12px',
              borderRadius: '22px',
              border: '2.5px dashed #FF8FC0',
              pointerEvents: 'none',
            }}
          />
          <a
            className="ix-d"
            href="assets/Pooja-Sai-Praveena-Resume.pdf?v=3"
            target="_blank"
            rel="noopener"
            aria-label="Open Pooja's resume (PDF) in a new tab"
            style={{
              position: 'relative',
              flex: '0 1 460px',
              minWidth: '0',
              display: 'block',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.3s cubic-bezier(.3,1.6,.5,1)',
            }}
          >
            <img
              src="assets/resume-page.webp"
              alt="Pooja Sai Praveena's one-page resume"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                background: '#FFFFFF',
                borderRadius: '4px',
                boxShadow:
                  '0 1px 2px rgba(36,33,46,0.2), 0 12px 24px rgba(36,33,46,0.14), 0 30px 50px rgba(36,33,46,0.12)',
              }}
            />{' '}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-10px',
                left: '-28px',
                width: '110px',
                height: '30px',
                background: 'rgba(127, 220, 194, 0.82)',
                borderLeft: '2px dashed rgba(36,33,46,0.2)',
                borderRight: '2px dashed rgba(36,33,46,0.2)',
                transform: 'rotate(-38deg)',
              }}
            />
          </a>
          <div
            style={{
              position: 'relative',
              flex: '1 1 320px',
              minWidth: '0',
              maxWidth: '440px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ fontSize: '18px', lineHeight: '1.6', color: '#3A3546' }}>
              <p>Here’s a little about my journey, the work I’ve done, and what I’ve learned along the way.</p>
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '6px' }}>
              <a
                className="ix-e ix-f"
                href="assets/Pooja-Sai-Praveena-Resume.pdf?v=3"
                download="Pooja Sai Praveena Doddipatla.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  background: '#2F5BFF',
                  color: '#FFFFFF',
                  border: '2px solid #24212E',
                  boxShadow: '4px 4px 0 #24212E',
                  textDecoration: 'none',
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: '600',
                  fontSize: '18px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
                Download resume
              </a>
            </div>
            {/* A small pile of LEGO bricks where the pencils used to be. */}
            <div
              aria-hidden="true"
              style={{ position: 'relative', alignSelf: 'flex-end', width: '230px', height: '110px', marginTop: '4px', pointerEvents: 'none' }}
            >
              <img
                src="assets/lego/b24-red.png"
                alt=""
                style={{ position: 'absolute', left: '0', bottom: '0', width: '118px', height: 'auto', transform: 'rotate(-8deg)', filter: 'drop-shadow(0 8px 8px rgba(36,33,46,0.22))' }}
              />
              <img
                src="assets/lego/b22-yellow.png"
                alt=""
                style={{ position: 'absolute', left: '96px', bottom: '30px', width: '82px', height: 'auto', transform: 'rotate(10deg)', filter: 'drop-shadow(0 8px 8px rgba(36,33,46,0.22))' }}
              />
              <img
                src="assets/lego/b24-cobalt.png"
                alt=""
                style={{ position: 'absolute', right: '0', bottom: '2px', width: '86px', height: 'auto', transform: 'rotate(-14deg)', filter: 'drop-shadow(0 8px 8px rgba(36,33,46,0.22))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

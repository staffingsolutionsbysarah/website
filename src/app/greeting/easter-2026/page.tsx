'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function EasterGreeting() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F0E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: 'var(--font-poppins), Arial, sans-serif',
      }}
    >
      {/* Instruction label */}
      <p
        style={{
          fontSize: '12px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8A8070',
          marginBottom: '32px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {open ? 'Tap to close' : 'Tap to open'}
      </p>

      {/* Envelope wrapper */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label={open ? 'Close envelope' : 'Open envelope'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open); }}
      >
        {/* Card — sits behind envelope, revealed when open */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            padding: '40px 36px 36px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
            transform: open ? 'translateY(-24px)' : 'translateY(0px)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            zIndex: 1,
          }}
        >
          {/* Small crest on card */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Image
              src="/brand/sarah-crest-thin-charcoal.png"
              alt="Sarah Fell crest"
              width={36}
              height={62}
              style={{ display: 'inline-block', opacity: 0.55 }}
            />
          </div>

          <p
            style={{
              margin: '0 0 20px',
              fontSize: '15px',
              lineHeight: '1.75',
              color: '#2C3434',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            Wishing you and your team a wonderful Easter weekend.
          </p>
          <p
            style={{
              margin: '0 0 20px',
              fontSize: '15px',
              lineHeight: '1.75',
              color: '#2C3434',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            A simple thank you for your trust, your partnership, and the work ahead this spring.
          </p>
          <p
            style={{
              margin: '0 0 28px',
              fontSize: '15px',
              lineHeight: '1.75',
              color: '#2C3434',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            Wishing you a restful long weekend and a strong season ahead.
          </p>

          <div style={{ borderTop: '1px solid #E8E3D7', paddingTop: '20px' }}>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 600,
                color: '#2C3434',
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
            >
              Sarah Fell
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: '12px',
                color: '#7A7060',
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              Staffing Solutions by Sarah Fell, Inc.
            </p>
          </div>
        </div>

        {/* Envelope body */}
        <div
          style={{
            position: open ? 'relative' : 'relative',
            width: '100%',
            marginTop: open ? '-20px' : '0',
            zIndex: 2,
            transition: 'margin-top 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* SVG Envelope */}
          <svg
            viewBox="0 0 480 320"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', display: 'block', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.13))' }}
          >
            {/* Envelope body */}
            <rect x="0" y="40" width="480" height="280" rx="6" fill="#EDE8DD" />

            {/* Bottom left triangle */}
            <polygon points="0,40 240,200 0,320" fill="#E0DAC8" />
            {/* Bottom right triangle */}
            <polygon points="480,40 240,200 480,320" fill="#D8D2BF" />
            {/* Bottom flap */}
            <polygon points="0,320 240,185 480,320" fill="#E8E3D5" />

            {/* Top flap — animates open */}
            <g
              style={{
                transformOrigin: '240px 40px',
                transform: open ? 'rotateX(-160deg)' : 'rotateX(0deg)',
                transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <polygon points="0,40 480,40 240,195" fill="#DDD7C4" />
            </g>
          </svg>

          {/* Seal — centred on envelope flap fold line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: open ? '30px' : '60%',
              transform: 'translate(-50%, -50%)',
              transition: 'top 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
              opacity: open ? 0 : 1,
              zIndex: 10,
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#2C3434',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
            }}
          >
            <Image
              src="/brand/sarah-crest-thin-charcoal.png"
              alt="Sarah Fell"
              width={32}
              height={55}
              style={{
                filter: 'invert(1)',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p
        style={{
          marginTop: '40px',
          fontSize: '11px',
          color: '#B0A898',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.06em',
        }}
      >
        Staffing Solutions by Sarah Fell, Inc. · Easter 2026
      </p>
    </div>
  );
}

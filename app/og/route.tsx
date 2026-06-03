import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'The Standard Japan'
  const category = searchParams.get('category') || ''

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1a0a00 0%, #0a0a0a 60%, #000a1a 100%)',
          }}
        />
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#c8a96e',
          }}
        />
        {/* Logo area */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              color: '#c8a96e',
              fontSize: '13px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            THE STANDARD JAPAN
          </span>
          {category && (
            <>
              <span style={{ color: '#555', fontSize: '13px' }}>·</span>
              <span
                style={{
                  color: '#888',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'sans-serif',
                }}
              >
                {category}
              </span>
            </>
          )}
        </div>
        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              color: '#f5f0e8',
              fontSize: title.length > 60 ? '42px' : '54px',
              lineHeight: 1.15,
              margin: 0,
              fontWeight: 700,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ width: '32px', height: '1px', background: '#c8a96e' }} />
            <span
              style={{
                color: '#888',
                fontSize: '13px',
                letterSpacing: '0.15em',
                fontFamily: 'sans-serif',
              }}
            >
              thestandardjapan.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

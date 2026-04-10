"use client";

export default function TechOrbit() {
  return (
    <>
      <style>{`
        .scene {
          width: 100%;
          min-height: 580px;
          background: linear-gradient(135deg, #dde8f8 0%, #e8eef8 50%, #d8e4f5 100%);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wrap {
          position: relative;
          width: 520px;
          height: 520px;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .ro { width: 470px; height: 470px; border: 1.5px solid rgba(200,160,100,.45); }
        .ri { width: 320px; height: 320px; border: 1.5px solid rgba(100,150,220,.35); }
        .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 126px;
          height: 126px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 38%, #fff8ee, #fdebd0);
          border: 2px solid rgba(230,160,60,.45);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
          box-shadow: 0 4px 32px rgba(230,160,60,.18), 0 0 0 8px rgba(230,160,60,.07);
        }
        .c-bolt { font-size: 28px; line-height: 1; margin-bottom: 4px; }
        .c-t1 { font-size: 11px; font-weight: 800; color: #1a1a2e; letter-spacing: .3px; text-align: center; line-height: 1.25; }
        .track { position: absolute; top: 50%; left: 50%; transform-origin: 0 0; }
        .to { animation: cw 22s linear infinite; }
        .ti { animation: ccw 15s linear infinite; }
        @keyframes cw  { to { transform: rotate(360deg);  } }
        @keyframes ccw { to { transform: rotate(-360deg); } }
        .icon-wrap {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: default;
        }
        .to .icon-wrap { animation: ccw-u 22s linear infinite; }
        .ti .icon-wrap { animation: cw-u  15s linear infinite; }
        @keyframes ccw-u { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes cw-u  { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate( 360deg); } }
        .ibox {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(0,0,0,.18);
          transition: transform .2s;
        }
        .icon-wrap:hover .ibox { transform: scale(1.12); }
        .ilabel { font-size: 10px; font-weight: 700; color: #1a1a2e; letter-spacing: .2px; text-align: center; white-space: nowrap; }
        .c-react { background: linear-gradient(145deg, #1a1a2e, #1a2a3e); }
        .c-next  { background: linear-gradient(145deg, #111,    #333);    }
        .c-ts    { background: linear-gradient(145deg, #2563a8, #1a4a8a); }
        .c-tw    { background: linear-gradient(145deg, #0ea5e9, #0369a1); }
        .c-js    { background: linear-gradient(145deg, #f0c419, #c9a000); }
        .c-rn    { background: linear-gradient(145deg, #1a1a2e, #23d5f5); }
        .c-node  { background: linear-gradient(145deg, #3c7a3c, #1a4d1a); }
        .c-mongo { background: linear-gradient(145deg, #3c7a3c, #1b5e20); }
        .c-pg    { background: linear-gradient(145deg, #336791, #1a3d5e); }
        .c-git   { background: linear-gradient(145deg, #e84d31, #b52b00); }
        .c-turbo { background: linear-gradient(145deg, #e60073, #9e0050); }
        svg.si { width: 32px; height: 32px; }
      `}</style>

      <div className="scene">
        <div className="wrap">
          <div className="ring ro" />
          <div className="ring ri" />

          {/* Center */}
          <div className="center">
            <div className="c-bolt">⚡</div>
            <div className="c-t1">Full Stack<br />Developer</div>
          </div>

          {/* OUTER RING — 235px — Frontend (6 items) */}
          <div className="track to">

            {/* React.js — 0° */}
            <div className="icon-wrap" style={{ left: 235, top: 0 }}>
              <div className="ibox c-react">
                <svg className="si" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="2.4" fill="#61dafb" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
                </svg>
              </div>
              <div className="ilabel">React.js</div>
            </div>

            {/* Next.js — 60° */}
            <div className="icon-wrap" style={{ left: 117, top: -204 }}>
              <div className="ibox c-next">
                <svg className="si" viewBox="0 0 24 24" fill="white">
                  <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z" />
                </svg>
              </div>
              <div className="ilabel">Next.js</div>
            </div>

            {/* TypeScript — 120° */}
            <div className="icon-wrap" style={{ left: -117, top: -204 }}>
              <div className="ibox c-ts">
                <svg className="si" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6" />
                  <text x="4" y="17" fontSize="9.5" fontWeight="800" fill="white" fontFamily="Arial,sans-serif">TS</text>
                </svg>
              </div>
              <div className="ilabel">TypeScript</div>
            </div>

            {/* Tailwind — 180° */}
            <div className="icon-wrap" style={{ left: -235, top: 0 }}>
              <div className="ibox c-tw">
                <svg className="si" viewBox="0 0 24 24" fill="white">
                  <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.716 1.209C13.313 10.48 14.388 11.6 16.5 11.6c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.716-1.209C15.187 7.12 14.112 6 12 6zM7.5 11.6C5.1 11.6 3.6 12.8 3 15.2c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.716 1.209C8.813 16.08 9.888 17.2 12 17.2c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.716-1.209C10.687 12.72 9.612 11.6 7.5 11.6z" />
                </svg>
              </div>
              <div className="ilabel">Tailwind CSS</div>
            </div>

            {/* JavaScript — 240° */}
            <div className="icon-wrap" style={{ left: -117, top: 204 }}>
              <div className="ibox c-js">
                <svg className="si" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e" />
                  <text x="4.5" y="17" fontSize="9.5" fontWeight="800" fill="#1a1a1a" fontFamily="Arial,sans-serif">JS</text>
                </svg>
              </div>
              <div className="ilabel">JavaScript</div>
            </div>

            {/* React Native — 300° */}
            <div className="icon-wrap" style={{ left: 117, top: 204 }}>
              <div className="ibox c-rn">
                <svg className="si" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="2.2" fill="#61dafb" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.4" stroke="#61dafb" strokeWidth="1.1" fill="none" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.4" stroke="#61dafb" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.4" stroke="#61dafb" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)" />
                </svg>
              </div>
              <div className="ilabel">React Native</div>
            </div>
          </div>

          {/* INNER RING — 160px — Backend + Tools (5 items) */}
          <div className="track ti">

            {/* Node.js — 0° */}
            <div className="icon-wrap" style={{ left: 160, top: 0 }}>
              <div className="ibox c-node">
                <svg className="si" viewBox="0 0 24 24">
                  <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2zm0 2.1l6.66 3.85v7.7L12 19.35l-6.66-3.85V7.8L12 3.95z" fill="#4caf50" />
                  <text x="8.5" y="15" fontSize="6" fontWeight="800" fill="white" fontFamily="Arial,sans-serif">JS</text>
                </svg>
              </div>
              <div className="ilabel">Node.js</div>
            </div>

            {/* MongoDB — 72° */}
            <div className="icon-wrap" style={{ left: 49, top: -152 }}>
              <div className="ibox c-mongo">
                <svg className="si" viewBox="0 0 24 24">
                  <path d="M12 2C9.2 2 7 5.5 7 9.5c0 3.2 1.3 5.8 3.5 7L11 20h2l.5-3.5C15.7 15.3 17 12.7 17 9.5 17 5.5 14.8 2 12 2z" fill="#4db33d" />
                  <path d="M12 2c.3 0 .7.1.9.3-.5 1.5-1 4-1 6.2-.9-2.3-1.4-4.8-.9-6.2.2-.2.6-.3 1-.3z" fill="#6cac48" />
                </svg>
              </div>
              <div className="ilabel">MongoDB</div>
            </div>

            {/* PostgreSQL — 144° */}
            <div className="icon-wrap" style={{ left: -129, top: -94 }}>
              <div className="ibox c-pg">
                <svg className="si" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="6"  rx="7" ry="2.8" fill="#336791" stroke="#4a90d9" strokeWidth=".8" />
                  <rect x="5" y="6"  width="14" height="5" fill="#2d5f87" />
                  <ellipse cx="12" cy="11" rx="7" ry="2.8" fill="#2d5f87" stroke="#4a90d9" strokeWidth=".8" />
                  <rect x="5" y="11" width="14" height="4" fill="#264f72" />
                  <ellipse cx="12" cy="15" rx="7" ry="2.8" fill="#1e3f5a" stroke="#4a90d9" strokeWidth=".8" />
                </svg>
              </div>
              <div className="ilabel">PostgreSQL</div>
            </div>

            {/* Git / GitHub — 216° */}
            <div className="icon-wrap" style={{ left: -129, top: 94 }}>
              <div className="ibox c-git">
                <svg className="si" viewBox="0 0 24 24" fill="white">
                  <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6-2.597L13.24 8.219v6.25a1.838 1.838 0 0 1 .483 3.349 1.837 1.837 0 0 1-2.295-2.295 1.838 1.838 0 0 1 1.011-.507V8.1a1.838 1.838 0 0 1-1-.509L8.704 4.854.452 13.107a1.55 1.55 0 0 0 0 2.188l10.48 10.478a1.55 1.55 0 0 0 2.187 0l10.427-10.427a1.55 1.55 0 0 0 0-2.415z" />
                </svg>
              </div>
              <div className="ilabel">Git / GitHub</div>
            </div>

            {/* Turborepo — 288° */}
            <div className="icon-wrap" style={{ left: 49, top: 152 }}>
              <div className="ibox c-turbo">
                <svg className="si" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#e60073" opacity=".9" />
                  <path d="M8 8h8l-2 4h-4z" fill="white" />
                  <path d="M10 12l-2 4h8l-2-4z" fill="rgba(255,255,255,.6)" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <div className="ilabel">Turborepo</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

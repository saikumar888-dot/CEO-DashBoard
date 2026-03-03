import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
/* ─────────────────────────────────────────────
   RevenueRadar — LOGIN PAGE
   Aesthetic: Ultra-luxury dark editorial
   Fonts: Cormorant Garamond + DM Sans + DM Mono
   Mirrors the exact visual language of HomePage
────────────────────────────────────────────── */

export default function Login() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState(null)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)

  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const lerpRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 500)
    const t3 = setTimeout(() => setPhase(3), 850)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', onMove)
    const loop = () => {
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.04
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.04
      setMouseX(lerpRef.current.x)
      setMouseY(lerpRef.current.y)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    navigate('/dashboard')
  }

  const v = (p) => phase >= p
  const px = (mouseX - 0.5) * 22
  const py = (mouseY - 0.5) * 12

  return (
    <>
      <div className="lp">
        {/* Backgrounds */}
        <div className="lp-bg-radial"/><div className="lp-bg-grid"/><div className="lp-bg-vignette"/>

        {/* ── LEFT PANEL ── */}
        <div className="lp-left">
          <div className="lp-left-glow"/>
          <div className="lp-lines">
            <div className="lp-line" style={{top:'28%'}}/>
            <div className="lp-line" style={{top:'62%'}}/>
            <div className="lp-line-v" style={{left:'35%'}}/>
          </div>
          <div className="lp-orb lp-orb-1"/><div className="lp-orb lp-orb-2"/>

          {/* Brand */}
          <div className={`lp-brand ${v(1)?'in':''}`} onClick={()=>navigate('/')}>
            <div className="lp-brand-mark">A</div>
            <div className="lp-brand-name">RevenueRadar</div>
          </div>

          {/* Center copy */}
          <div className="lp-center">
            <h2 className={`lp-tagline ${v(2)?'in':''}`}>
              Your empire<br/>awaits <span className="lp-tagline-em">your<br/>command.</span>
            </h2>
            <p className={`lp-desc ${v(2)?'in':''}`}>
              Thousands of executives trust RevenueRadar to surface what matters — before it matters.
              Sign in to resume your command center.
            </p>

            <div className={`lp-stats ${v(3)?'in':''}`}>
              {[
                { lbl: 'Organizations', val: '3,200+', delta: '↑ 18% this quarter' },
                { lbl: 'Decisions Powered', val: '1.4M', delta: '↑ Daily' },
                { lbl: 'Platform Uptime',  val: '99.99%', delta: 'Enterprise SLA' },
              ].map((s,i) => (
                <div className="lp-stat" key={i}>
                  <div>
                    <div className="lp-stat-lbl">{s.lbl}</div>
                    <div className="lp-stat-val">{s.val}</div>
                  </div>
                  <div className="lp-stat-delta">{s.delta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className={`lp-testimonial ${v(3)?'in':''}`}>
            <div className="lp-quote">
              "RevenueRadar eliminated three weekly reporting meetings. Our board now has answers before they form questions."
            </div>
            <div className="lp-quoter">
              <div className="lp-quoter-av">SR</div>
              <div>
                <div className="lp-quoter-name">Sarah Renault</div>
                <div className="lp-quoter-role">CEO · Meridian Capital Group</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL – FORM ── */}
        <div className="lp-right">
          <div
            className={`lp-card ${v(2)?'in':''}`}
            style={{
              transform: v(2)
                ? `perspective(900px) rotateY(${px * 0.03}deg) rotateX(${py * 0.02}deg) translateY(0px)`
                : 'translateY(28px)',
              transition: 'opacity 0.9s ease 0.2s, box-shadow 0.3s, transform 0.9s ease 0.2s'
            }}
          >
            {/* Card header */}
            <div className="lp-card-top">
              <div className="lp-card-eyebrow">
                <div className="lp-card-pill">Executive Access</div>
                <div className="lp-card-live">
                  <div className="lp-card-dot"/>
                  <span className="lp-card-live-lbl">Secure Session</span>
                </div>
              </div>
              <h1 className="lp-card-h">
                Welcome <strong>back.</strong>
              </h1>
              <p className="lp-card-sub">Sign in to your dashboard and resume where you left off.</p>
            </div>

            {/* SSO */}
            <div className="lp-sso">
              <button className="sso-btn">
                <svg className="sso-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M19.6 10.23c0-.68-.06-1.36-.18-2.02H10v3.83h5.39c-.23 1.23-.94 2.27-2 2.97v2.47h3.24c1.9-1.75 2.97-4.33 2.97-7.25z" fill="#4285F4"/>
                  <path d="M10 20c2.7 0 4.97-.9 6.63-2.42l-3.24-2.47c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H1.07v2.55C2.72 17.74 6.11 20 10 20z" fill="#34A853"/>
                  <path d="M4.41 11.95A5.97 5.97 0 0 1 4.09 10c0-.68.12-1.34.32-1.95V5.5H1.07A10 10 0 0 0 0 10c0 1.61.38 3.14 1.07 4.5l3.34-2.55z" fill="#FBBC05"/>
                  <path d="M10 3.98c1.47 0 2.79.5 3.83 1.5L16.69 2.4C14.96.9 12.7 0 10 0 6.11 0 2.72 2.26 1.07 5.5l3.34 2.55C5.2 5.7 7.4 3.98 10 3.98z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="sso-btn">
                <svg className="sso-icon" viewBox="0 0 20 20" fill="none">
                  <rect width="20" height="20" rx="4" fill="#0078D4"/>
                  <path d="M9.5 3.5H4a.5.5 0 0 0-.5.5v5.5H9.5V3.5zM9.5 10.5H3.5V16a.5.5 0 0 0 .5.5h5.5v-6zM10.5 3.5V9.5H16.5V4a.5.5 0 0 0-.5-.5h-5.5zM10.5 10.5v6H16a.5.5 0 0 0 .5-.5v-5.5h-6z" fill="#fff"/>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="lp-div">
              <div className="lp-div-line"/>
              <div className="lp-div-lbl">or continue with email</div>
              <div className="lp-div-line"/>
            </div>

            {/* Form */}
            <form className="lp-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="lp-field">
                <label className="lp-label">Work Email</label>
                <div className="lp-input-wrap">
                  <div className={`lp-input-icon ${focusedField==='email'?'active':''}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    className={`lp-input ${error?'has-error':''}`}
                    type="email"
                    placeholder="richard@meridian.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={()=>setFocusedField('email')}
                    onBlur={()=>setFocusedField(null)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lp-field">
                <label className="lp-label">
                  Password
                  <span className="lp-label-link">Forgot password?</span>
                </label>
                <div className="lp-input-wrap">
                  <div className={`lp-input-icon ${focusedField==='password'?'active':''}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    className={`lp-input ${error?'has-error':''}`}
                    type={showPass?'text':'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={()=>setFocusedField('password')}
                    onBlur={()=>setFocusedField(null)}
                    autoComplete="current-password"
                    style={{paddingRight: '38px'}}
                  />
                  <div className="lp-input-right" onClick={()=>setShowPass(!showPass)}>
                    {showPass ? (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/>
                        <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
                        <line x1="2" y1="2" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/>
                        <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    )}
                  </div>
                </div>
                {/* Password strength indicator (decorative) */}
                {password.length > 0 && (
                  <div className="lp-strength">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`str-seg ${password.length >= i*3 ? 'lit' : ''}`}/>
                    ))}
                  </div>
                )}
              </div>

              {/* Remember me */}
              <div className="lp-row">
                <div className="lp-check" onClick={()=>setRemember(!remember)}>
                  <div className={`lp-checkbox ${remember?'checked':''}`}>
                    {remember && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2 2 3-3" stroke="#BFA054" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="lp-check-lbl">Keep me signed in</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="lp-error">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#E88888" strokeWidth="1.2"/>
                    <path d="M6.5 4v3M6.5 9h.01" stroke="#E88888" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button className="lp-submit" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="lp-spinner"/>
                    Authenticating…
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Access Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="lp-footer">
              <div className="lp-register">
                Don't have an Account ? {' '}
                <span className="lp-reg-link" onClick={()=>navigate('/Register')}>
                   Register
                </span>
              </div>
              <div className="lp-secure">
                <div className="lp-secure-dot"/>
                256-bit SSL · SOC 2 Type II · GDPR Compliant
              </div>
              <div className="lp-legal">
                <span>Privacy Policy</span>
                <span className="lp-legal-dot">·</span>
                <span>Terms of Service</span>
                <span className="lp-legal-dot">·</span>
                <span>Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CITY SCENE (subtle, bottom) ── */}
        <div className={`lp-scene ${v(1)?'in':''}`}>
          <svg viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg"
            style={{position:'absolute',bottom:0,left:0,width:'100%',height:'100%'}}>
            <defs>
              <linearGradient id="sb1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827"/><stop offset="100%" stopColor="#060810"/>
              </linearGradient>
              <linearGradient id="sroad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E1420"/><stop offset="100%" stopColor="#060810"/>
              </linearGradient>
            </defs>
            {[[0,42,72],[50,28,58],[90,55,98],[160,26,62],[200,40,84],[255,35,76],
              [298,60,110],[375,30,64],[415,50,90],[480,38,78],[535,56,102],[605,34,68],
              [652,45,86],[712,64,118],[800,38,78],[855,52,96],[918,40,82],[978,60,112],
              [1058,32,66],[1108,50,90],[1172,55,104],[1248,40,78],[1305,30,60],[1370,45,82]
            ].map(([x,w,h],i)=>(
              <rect key={i} x={x} y={160-h} width={w} height={h} fill="url(#sb1)" opacity={0.5+Math.random()*0.3}/>
            ))}
            {Array.from({length:60},(_,i)=>{
              const wx=8+(i*97)%1424, wy=8+(i*53)%135
              return <rect key={'sw'+i} x={wx} y={wy} width={3} height={4.5}
                fill={i%7===0?'#BFA054':i%4===0?'#9BB8D0':'#E0E8F0'}
                opacity={0.04+(i%5)*0.04} rx="0.3"/>
            })}
            <rect x="0" y="148" width="1440" height="12" fill="url(#sroad)"/>
            <line x1="0" y1="149" x2="1440" y2="149" stroke="rgba(191,160,84,0.15)" strokeWidth="0.5"/>
            {Array.from({length:18},(_,i)=>(
              <rect key={'sd'+i} x={i*80+14} y="154" width="50" height="1.2" rx="0.6" fill="rgba(255,255,255,0.04)"/>
            ))}
          </svg>
        </div>
      </div>
    </>
  )
}
import React, { useEffect, useState, useRef } from 'react'

/* ─────────────────────────────────────────────
   RevenueRadar — LOGIN PAGE
   Aesthetic: Ultra-luxury dark editorial
   Fonts: Cormorant Garamond + DM Sans + DM Mono
   Mirrors the exact visual language of HomePage
────────────────────────────────────────────── */

export default function Login() {
  const navigate = (path) => { window.location.href = path }

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
    // navigate('/dashboard')
  }

  const v = (p) => phase >= p
  const px = (mouseX - 0.5) * 22
  const py = (mouseY - 0.5) * 12

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #060810; overflow-x: hidden; }

        :root {
          --gold: #BFA054;
          --gold-hi: #E2C47A;
          --gold-lo: #7A6030;
          --bg: #060810;
          --surface: #0C1018;
          --surface2: #111620;
          --border: rgba(191,160,84,0.12);
          --border-hi: rgba(191,160,84,0.3);
          --border-focus: rgba(191,160,84,0.55);
          --text: #E8E4DC;
          --muted: #6B7385;
          --muted2: #3E4455;
          --green: #3DBA7E;
          --red: #E05252;
          --blue: #5B8BF5;
        }

        .lp {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
          color: var(--text);
        }

        /* ── BACKGROUNDS ── */
        .lp-bg-radial {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 65% 70% at 20% 30%, rgba(191,160,84,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 75%, rgba(91,139,245,0.04) 0%, transparent 55%);
        }
        .lp-bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(191,160,84,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,160,84,0.018) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
        }
        .lp-bg-vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 40%, rgba(6,8,16,0.8) 100%);
        }

        /* ── LEFT PANEL – BRAND ── */
        .lp-left {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: clamp(32px, 5vw, 64px);
          border-right: 1px solid var(--border);
          background: rgba(8,10,18,0.5);
          overflow: hidden;
        }

        .lp-left-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(191,160,84,0.06), transparent 60%),
            radial-gradient(ellipse 60% 60% at 0% 100%, rgba(191,160,84,0.04), transparent 55%);
        }

        /* Decorative lines */
        .lp-lines {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .lp-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(191,160,84,0.12), transparent);
          height: 1px; width: 100%;
        }
        .lp-line-v {
          position: absolute;
          background: linear-gradient(180deg, transparent, rgba(191,160,84,0.08), transparent);
          width: 1px; height: 100%;
        }

        /* Orb decoration */
        .lp-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          filter: blur(60px);
        }
        .lp-orb-1 {
          width: 320px; height: 320px;
          bottom: -80px; left: -80px;
          background: radial-gradient(circle, rgba(191,160,84,0.07), transparent 70%);
          animation: orbFloat 8s ease-in-out infinite;
        }
        .lp-orb-2 {
          width: 180px; height: 180px;
          top: 10%; right: -40px;
          background: radial-gradient(circle, rgba(91,139,245,0.05), transparent 70%);
          animation: orbFloat 11s ease-in-out infinite 3s;
        }
        @keyframes orbFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }

        .lp-brand {
          display: flex; align-items: center; gap: 12px; position: relative; z-index: 2;
          cursor: pointer;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .lp-brand.in { opacity: 1; transform: translateY(0); }
        .lp-brand-mark {
          width: 36px; height: 36px;
          border: 1.5px solid var(--gold); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--gold);
          background: rgba(191,160,84,0.08);
          box-shadow: 0 0 20px rgba(191,160,84,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .lp-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; letter-spacing: 0.12em; color: var(--gold);
        }

        .lp-center { position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }

        .lp-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 3.2vw, 52px);
          font-weight: 300; line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-bottom: 20px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
        }
        .lp-tagline.in { opacity: 1; transform: translateX(0); }
        .lp-tagline-em {
          font-style: italic; font-weight: 600;
          background: linear-gradient(135deg, var(--gold-hi) 0%, var(--gold) 50%, var(--gold-lo) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .lp-desc {
          font-size: clamp(12px, 1vw, 14px); font-weight: 300; line-height: 1.85;
          color: var(--muted); max-width: 360px;
          opacity: 0; transform: translateX(-18px);
          transition: opacity 0.8s ease 0.22s, transform 0.8s ease 0.22s;
          margin-bottom: 44px;
        }
        .lp-desc.in { opacity: 1; transform: translateX(0); }

        /* Left stats */
        .lp-stats {
          display: flex; flex-direction: column; gap: 1px;
          border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s;
        }
        .lp-stats.in { opacity: 1; transform: translateY(0); }
        .lp-stat {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 18px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .lp-stat:last-child { border-bottom: none; }
        .lp-stat::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background: linear-gradient(180deg, var(--gold), transparent);
          opacity: 0.5;
        }
        .lp-stat-lbl { font-size: 10px; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; }
        .lp-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600; color: var(--text); line-height: 1;
        }
        .lp-stat-delta { font-size: 9px; color: var(--green); margin-top: 1px; text-align: right; }

        /* Testimonial */
        .lp-testimonial {
          position: relative; z-index: 2;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease 0.48s, transform 0.8s ease 0.48s;
        }
        .lp-testimonial.in { opacity: 1; transform: translateY(0); }
        .lp-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(13px, 1.1vw, 15px); font-style: italic;
          font-weight: 300; line-height: 1.7; color: var(--muted);
          border-left: 2px solid rgba(191,160,84,0.25);
          padding-left: 16px; margin-bottom: 14px;
        }
        .lp-quoter { display: flex; align-items: center; gap: 10px; }
        .lp-quoter-av {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-lo));
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600; color: #06080E;
          border: 1.5px solid rgba(191,160,84,0.3);
        }
        .lp-quoter-name { font-size: 11px; font-weight: 500; color: var(--text); letter-spacing: 0.04em; }
        .lp-quoter-role { font-size: 9px; color: var(--muted); letter-spacing: 0.08em; margin-top: 1px; }

        /* ── RIGHT PANEL – FORM ── */
        .lp-right {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(24px, 5vw, 64px);
        }

        .lp-card {
          width: 100%; max-width: 420px;
          background: rgba(12,16,24,0.75);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(28px, 4vw, 44px);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 0 0 1px rgba(191,160,84,0.04),
            0 32px 80px rgba(0,0,0,0.65),
            0 8px 32px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(191,160,84,0.06);
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
          will-change: transform;
        }
        .lp-card.in { opacity: 1; transform: translateY(0); }

        .lp-card-top { margin-bottom: 30px; }

        .lp-card-eyebrow {
          display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .lp-card-pill {
          padding: 3px 10px; border-radius: 100px;
          background: rgba(191,160,84,0.1); border: 1px solid rgba(191,160,84,0.2);
          font-size: 9px; font-weight: 500; letter-spacing: 0.18em;
          color: var(--gold); text-transform: uppercase;
        }
        .lp-card-live { display: flex; align-items: center; gap: 5px; }
        .lp-card-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 0 0 rgba(61,186,126,0.4);
          animation: lp2 2s ease-in-out infinite;
        }
        @keyframes lp2 {
          0% { box-shadow: 0 0 0 0 rgba(61,186,126,0.4); }
          70% { box-shadow: 0 0 0 6px rgba(61,186,126,0); }
          100% { box-shadow: 0 0 0 0 rgba(61,186,126,0); }
        }
        .lp-card-live-lbl { font-size: 9px; color: var(--muted); letter-spacing: 0.08em; }

        .lp-card-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 2.6vw, 34px);
          font-weight: 300; line-height: 1.12; color: var(--text);
          margin-bottom: 8px;
        }
        .lp-card-h strong {
          font-weight: 600; font-style: italic; color: var(--gold-hi);
        }
        .lp-card-sub {
          font-size: 12px; font-weight: 300; color: var(--muted); line-height: 1.6;
        }

        /* Divider */
        .lp-div {
          display: flex; align-items: center; gap: 12px; margin: 22px 0;
        }
        .lp-div-line { flex: 1; height: 1px; background: var(--border); }
        .lp-div-lbl { font-size: 9px; color: var(--muted2); letter-spacing: 0.18em; text-transform: uppercase; }

        /* SSO buttons */
        .lp-sso { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
        .sso-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 9px 14px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--border);
          border-radius: 8px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400;
          color: var(--muted); letter-spacing: 0.04em;
          transition: all 0.2s ease;
        }
        .sso-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(191,160,84,0.2); color: var(--text);
        }
        .sso-icon { width: 15px; height: 15px; flex-shrink: 0; }

        /* Form */
        .lp-form { display: flex; flex-direction: column; gap: 14px; }

        .lp-field { display: flex; flex-direction: column; gap: 6px; }
        .lp-label {
          font-size: 10px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
          display: flex; justify-content: space-between; align-items: center;
        }
        .lp-label-link {
          font-size: 9px; font-weight: 400; letter-spacing: 0.06em;
          color: var(--gold); cursor: pointer; text-transform: none;
          transition: color 0.2s;
        }
        .lp-label-link:hover { color: var(--gold-hi); }

        .lp-input-wrap { position: relative; }
        .lp-input-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: var(--muted2); pointer-events: none; transition: color 0.2s;
          display: flex; align-items: center;
        }
        .lp-input-icon.active { color: var(--gold); opacity: 0.7; }

        .lp-input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300;
          color: var(--text);
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          letter-spacing: 0.02em;
        }
        .lp-input::placeholder { color: var(--muted2); font-weight: 300; }
        .lp-input:focus {
          border-color: var(--border-focus);
          background: rgba(191,160,84,0.03);
          box-shadow: 0 0 0 3px rgba(191,160,84,0.06), 0 1px 8px rgba(0,0,0,0.3);
        }
        .lp-input.has-error { border-color: rgba(224,82,82,0.45); }

        .lp-input-right {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          cursor: pointer; color: var(--muted2); display: flex; align-items: center;
          transition: color 0.2s;
        }
        .lp-input-right:hover { color: var(--muted); }

        /* Strength bar */
        .lp-strength { display: flex; gap: 3px; margin-top: 6px; }
        .str-seg {
          flex: 1; height: 2px; border-radius: 1px;
          background: var(--muted2); transition: background 0.3s;
        }
        .str-seg.lit { background: var(--gold); }

        /* Remember / checkbox */
        .lp-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
        .lp-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .lp-checkbox {
          width: 14px; height: 14px;
          border: 1.5px solid var(--border-hi); border-radius: 3px;
          background: rgba(191,160,84,0.04);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
        }
        .lp-checkbox.checked {
          background: rgba(191,160,84,0.15); border-color: var(--gold);
        }
        .lp-check-lbl { font-size: 11px; color: var(--muted); font-weight: 300; }

        /* Error */
        .lp-error {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 12px;
          background: rgba(224,82,82,0.08); border: 1px solid rgba(224,82,82,0.2);
          border-radius: 7px;
          font-size: 11px; color: #E88888;
          animation: errShake 0.35s ease;
        }
        @keyframes errShake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 60%{transform:translateX(5px)}
        }

        /* Submit button */
        .lp-submit {
          width: 100%; padding: 13px;
          border: none; border-radius: 8px;
          background: linear-gradient(135deg, #C9A84C 0%, #8B6914 100%);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.09em;
          text-transform: uppercase; color: #06080E;
          cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 6px 20px rgba(191,160,84,0.22), inset 0 1px 0 rgba(255,255,255,0.14);
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }
        .lp-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(191,160,84,0.32); }
        .lp-submit:active:not(:disabled) { transform: translateY(0); }
        .lp-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Shimmer on button */
        .lp-submit::after {
          content:'';
          position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          animation: shimmer 2.8s ease-in-out infinite;
        }
        @keyframes shimmer { 0%{left:-100%} 100%{left:200%} }

        /* Spinner */
        .lp-spinner {
          width: 14px; height: 14px; border: 1.5px solid rgba(6,8,14,0.3);
          border-top-color: #06080E; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer links */
        .lp-footer {
          margin-top: 22px;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .lp-register {
          font-size: 11px; color: var(--muted); font-weight: 300;
        }
        .lp-reg-link {
          color: var(--gold); cursor: pointer; font-weight: 500;
          transition: color 0.2s;
        }
        .lp-reg-link:hover { color: var(--gold-hi); }

        .lp-legal {
          display: flex; align-items: center; gap: 14px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; color: var(--muted2); letter-spacing: 0.06em;
        }
        .lp-legal span { cursor: pointer; transition: color 0.2s; }
        .lp-legal span:hover { color: var(--muted); }
        .lp-legal-dot { opacity: 0.3; }

        /* Secure badge */
        .lp-secure {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: rgba(61,186,126,0.06); border: 1px solid rgba(61,186,126,0.14);
          border-radius: 100px;
          font-size: 9px; color: rgba(61,186,126,0.75); letter-spacing: 0.1em;
          font-family: 'DM Mono', monospace;
        }
        .lp-secure-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--green); }

        /* ── BOTTOM SCENE ── */
        .lp-scene {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: clamp(80px, 16vh, 160px);
          z-index: 1; pointer-events: none;
          opacity: 0; transition: opacity 1.4s ease 0.3s;
        }
        .lp-scene.in { opacity: 1; }

        /* Responsive */
        @media (max-width: 900px) {
          .lp { grid-template-columns: 1fr; }
          .lp-left { display: none; }
          .lp-right { min-height: 100vh; align-items: flex-start; padding-top: 80px; }
          .lp-card { max-width: 100%; }
          .lp-scene { height: clamp(60px, 12vh, 100px); }
        }
        @media (max-width: 480px) {
          .lp-right { padding: 20px 16px 100px; }
          .lp-sso { grid-template-columns: 1fr; }
          .lp-card { padding: 24px 20px; border-radius: 12px; }
        }
      `}</style>

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
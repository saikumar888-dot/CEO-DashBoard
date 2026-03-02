import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   RevenueRadar — REGISTER PAGE
   Aesthetic: Ultra-luxury dark editorial
   Fonts: Cormorant Garamond + DM Sans + DM Mono
────────────────────────────────────────────── */

export default function Register() {
  const navigate = useNavigate()

  const [phase, setPhase] = useState(0)
  const [step, setStep] = useState(1) // 1 = personal, 2 = security
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agree, setAgree] = useState(false)

  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const lerpRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef(null)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 450)
    const t3 = setTimeout(() => setPhase(3), 800)
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
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  const pwStrength = (pw) => {
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  }
  const strength = pwStrength(password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#E05252', '#E2A84C', '#3DBA7E', '#3DBA7E'][strength]

  const handleStep1 = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Please enter your full name.')
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.')
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password) return setError('Please enter a password.')
    if (strength < 2) return setError('Password is too weak. Add uppercase, numbers, or symbols.')
    if (password !== confirm) return setError('Passwords do not match.')
    if (!agree) return setError('Please accept the Terms of Service to continue.')
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    navigate('/home');
  }

  const v = (p) => phase >= p
  const px = (mouseX - 0.5) * 18
  const py = (mouseY - 0.5) * 10

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

        .rp {
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
        .rp-bg-radial {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 70% 60% at 25% 25%, rgba(191,160,84,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 90% 80%, rgba(61,186,126,0.04) 0%, transparent 55%);
        }
        .rp-bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(191,160,84,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,160,84,0.018) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 15%, transparent 100%);
        }
        .rp-bg-vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 38%, rgba(6,8,16,0.82) 100%);
        }

        /* ── LEFT PANEL ── */
        .rp-left {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: clamp(32px, 5vw, 64px);
          border-right: 1px solid var(--border);
          background: rgba(8,10,18,0.5);
          overflow: hidden;
        }

        .rp-left-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 100% 55% at 50% 0%, rgba(191,160,84,0.055), transparent 60%),
            radial-gradient(ellipse 55% 50% at 100% 100%, rgba(61,186,126,0.03), transparent 55%);
        }

        .rp-orb {
          position: absolute; border-radius: 50%; pointer-events: none; filter: blur(55px);
        }
        .rp-orb-1 {
          width: 280px; height: 280px; bottom: -60px; right: -60px;
          background: radial-gradient(circle, rgba(61,186,126,0.06), transparent 70%);
          animation: rOrb 9s ease-in-out infinite;
        }
        .rp-orb-2 {
          width: 200px; height: 200px; top: 15%; left: -50px;
          background: radial-gradient(circle, rgba(191,160,84,0.05), transparent 70%);
          animation: rOrb 12s ease-in-out infinite 4s;
        }
        @keyframes rOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }

        .rp-brand {
          display: flex; align-items: center; gap: 12px; position: relative; z-index: 2;
          cursor: pointer;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rp-brand.in { opacity: 1; transform: translateY(0); }
        .rp-brand-mark {
          width: 36px; height: 36px; border: 1.5px solid var(--gold); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--gold);
          background: rgba(191,160,84,0.08);
          box-shadow: 0 0 20px rgba(191,160,84,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .rp-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; letter-spacing: 0.12em; color: var(--gold);
        }

        .rp-center { position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }

        .rp-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 3vw, 50px);
          font-weight: 300; line-height: 1.1; letter-spacing: -0.01em; color: var(--text);
          margin-bottom: 20px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
        }
        .rp-tagline.in { opacity: 1; transform: translateX(0); }
        .rp-tagline-em {
          font-style: italic; font-weight: 600;
          background: linear-gradient(135deg, var(--gold-hi) 0%, var(--gold) 50%, var(--gold-lo) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .rp-desc {
          font-size: clamp(12px, 1vw, 14px); font-weight: 300; line-height: 1.85;
          color: var(--muted); max-width: 360px; margin-bottom: 40px;
          opacity: 0; transform: translateX(-18px);
          transition: opacity 0.8s ease 0.22s, transform 0.8s ease 0.22s;
        }
        .rp-desc.in { opacity: 1; transform: translateX(0); }

        /* Benefits list */
        .rp-benefits {
          display: flex; flex-direction: column; gap: 12px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.8s ease 0.32s, transform 0.8s ease 0.32s;
        }
        .rp-benefits.in { opacity: 1; transform: translateY(0); }
        .rp-benefit {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 16px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 9px;
          position: relative; overflow: hidden;
        }
        .rp-benefit::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background: linear-gradient(180deg, var(--gold), transparent); opacity: 0.5;
        }
        .rp-benefit-ico {
          width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 13px;
        }
        .rp-benefit-ico-g { background: rgba(191,160,84,0.12); }
        .rp-benefit-ico-gr { background: rgba(61,186,126,0.12); }
        .rp-benefit-ico-b { background: rgba(91,139,245,0.12); }
        .rp-benefit-ttl { font-size: 12px; font-weight: 500; color: var(--text); margin-bottom: 2px; letter-spacing: 0.02em; }
        .rp-benefit-sub { font-size: 11px; color: var(--muted); font-weight: 300; line-height: 1.5; }

        /* Social proof */
        .rp-proof {
          display: flex; align-items: center; gap: 14px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.8s ease 0.48s, transform 0.8s ease 0.48s;
          position: relative; z-index: 2;
        }
        .rp-proof.in { opacity: 1; transform: translateY(0); }
        .rp-proof-avs { display: flex; }
        .rp-proof-av {
          width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid var(--bg);
          background: linear-gradient(135deg, var(--gold), var(--gold-lo));
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 600; color: #06080E;
          margin-left: -6px;
        }
        .rp-proof-av:first-child { margin-left: 0; }
        .rp-proof-txt { font-size: 11px; color: var(--muted); font-weight: 300; line-height: 1.5; }
        .rp-proof-num { color: var(--gold); font-weight: 500; }

        /* ── RIGHT PANEL ── */
        .rp-right {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(24px, 5vw, 64px);
        }

        .rp-card {
          width: 100%; max-width: 440px;
          background: rgba(12,16,24,0.78);
          border: 1px solid var(--border); border-radius: 16px;
          padding: clamp(28px, 4vw, 44px);
          backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 0 0 1px rgba(191,160,84,0.04),
            0 32px 80px rgba(0,0,0,0.65),
            0 8px 32px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(191,160,84,0.06);
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .rp-card.in { opacity: 1; transform: translateY(0); }

        /* Progress steps */
        .rp-progress { display: flex; align-items: center; gap: 0; margin-bottom: 28px; }
        .rp-step {
          display: flex; align-items: center; gap: 8px; flex: 1;
          cursor: pointer;
        }
        .rp-step-num {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600; flex-shrink: 0;
          transition: all 0.3s;
        }
        .rp-step-num-active {
          background: linear-gradient(135deg, #C9A84C, #8B6914);
          color: #06080E;
          box-shadow: 0 0 12px rgba(191,160,84,0.25);
        }
        .rp-step-num-done {
          background: rgba(61,186,126,0.15); border: 1.5px solid var(--green); color: var(--green);
        }
        .rp-step-num-idle {
          background: var(--surface2); border: 1.5px solid var(--border); color: var(--muted);
        }
        .rp-step-lbl {
          font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .rp-step-lbl-active { color: var(--gold); }
        .rp-step-lbl-done { color: var(--green); }
        .rp-step-lbl-idle { color: var(--muted2); }
        .rp-step-line {
          flex: 1; height: 1px; background: var(--border); margin: 0 8px;
          transition: background 0.4s;
        }
        .rp-step-line-done { background: rgba(61,186,126,0.3); }

        /* Card header */
        .rp-card-eyebrow {
          display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
        }
        .rp-card-pill {
          padding: 3px 10px; border-radius: 100px;
          background: rgba(191,160,84,0.1); border: 1px solid rgba(191,160,84,0.2);
          font-size: 9px; font-weight: 500; letter-spacing: 0.18em;
          color: var(--gold); text-transform: uppercase;
        }
        .rp-step-badge {
          font-family: 'DM Mono', monospace;
          font-size: 9px; color: var(--muted); letter-spacing: 0.1em;
        }

        .rp-card-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 2.4vw, 32px);
          font-weight: 300; line-height: 1.12; color: var(--text); margin-bottom: 6px;
        }
        .rp-card-h strong { font-weight: 600; font-style: italic; color: var(--gold-hi); }
        .rp-card-sub { font-size: 12px; font-weight: 300; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }

        /* Form */
        .rp-form { display: flex; flex-direction: column; gap: 14px; }

        .rp-field { display: flex; flex-direction: column; gap: 6px; }
        .rp-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .rp-label {
          font-size: 10px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
        }

        .rp-input-wrap { position: relative; }
        .rp-input-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: var(--muted2); pointer-events: none; transition: color 0.2s;
          display: flex; align-items: center;
        }
        .rp-input-icon.active { color: var(--gold); opacity: 0.7; }

        .rp-input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border); border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300; color: var(--text);
          outline: none; letter-spacing: 0.02em;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .rp-input::placeholder { color: var(--muted2); font-weight: 300; }
        .rp-input:focus {
          border-color: var(--border-focus);
          background: rgba(191,160,84,0.03);
          box-shadow: 0 0 0 3px rgba(191,160,84,0.06), 0 1px 8px rgba(0,0,0,0.3);
        }
        .rp-input.err { border-color: rgba(224,82,82,0.45); }
        .rp-input-right {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          cursor: pointer; color: var(--muted2); display: flex; align-items: center;
          transition: color 0.2s;
        }
        .rp-input-right:hover { color: var(--muted); }

        /* Strength */
        .rp-strength-row { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .rp-strength-bars { display: flex; gap: 3px; flex: 1; }
        .rp-str { flex: 1; height: 2px; border-radius: 1px; background: var(--muted2); transition: background 0.3s; }
        .rp-str.lit { background: var(--strengthColor, var(--gold)); }
        .rp-str-lbl { font-size: 9px; font-family: 'DM Mono', monospace; color: var(--muted); min-width: 30px; text-align: right; }

        /* Checkbox */
        .rp-agree { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
        .rp-checkbox {
          width: 15px; height: 15px; border: 1.5px solid var(--border-hi); border-radius: 3px;
          background: rgba(191,160,84,0.04);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px; transition: all 0.2s;
        }
        .rp-checkbox.checked { background: rgba(191,160,84,0.15); border-color: var(--gold); }
        .rp-agree-txt { font-size: 11px; color: var(--muted); font-weight: 300; line-height: 1.55; }
        .rp-link { color: var(--gold); cursor: pointer; transition: color 0.2s; }
        .rp-link:hover { color: var(--gold-hi); }

        /* Error */
        .rp-error {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 12px;
          background: rgba(224,82,82,0.08); border: 1px solid rgba(224,82,82,0.2); border-radius: 7px;
          font-size: 11px; color: #E88888;
          animation: rShake 0.35s ease;
        }
        @keyframes rShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 60%{transform:translateX(5px)} }

        /* Submit */
        .rp-submit {
          width: 100%; padding: 13px;
          border: none; border-radius: 8px;
          background: linear-gradient(135deg, #C9A84C 0%, #8B6914 100%);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
          color: #06080E; cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 6px 20px rgba(191,160,84,0.22), inset 0 1px 0 rgba(255,255,255,0.14);
          transition: transform 0.22s ease, box-shadow 0.22s ease, opacity 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }
        .rp-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(191,160,84,0.32); }
        .rp-submit:active:not(:disabled) { transform: translateY(0); }
        .rp-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .rp-submit::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          animation: rShimmer 2.8s ease-in-out infinite;
        }
        @keyframes rShimmer { 0%{left:-100%} 100%{left:200%} }

        .rp-spinner {
          width: 14px; height: 14px; border: 1.5px solid rgba(6,8,14,0.3);
          border-top-color: #06080E; border-radius: 50%;
          animation: rSpin 0.7s linear infinite;
        }
        @keyframes rSpin { to { transform: rotate(360deg); } }

        /* Back btn */
        .rp-back {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; cursor: pointer;
          font-size: 11px; color: var(--muted); padding: 0; margin-bottom: 18px;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .rp-back:hover { color: var(--text); }

        /* Footer */
        .rp-footer { margin-top: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .rp-login { font-size: 11px; color: var(--muted); font-weight: 300; }
        .rp-login-link { color: var(--gold); cursor: pointer; font-weight: 500; transition: color 0.2s; }
        .rp-login-link:hover { color: var(--gold-hi); }
        .rp-secure {
          display: flex; align-items: center; gap: 6px; padding: 5px 12px;
          background: rgba(61,186,126,0.06); border: 1px solid rgba(61,186,126,0.14); border-radius: 100px;
          font-size: 9px; color: rgba(61,186,126,0.75); letter-spacing: 0.1em;
          font-family: 'DM Mono', monospace;
        }
        .rp-secure-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--green); }

        /* Scene */
        .rp-scene {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: clamp(70px, 14vh, 130px); z-index: 1; pointer-events: none;
          opacity: 0; transition: opacity 1.4s ease 0.3s;
        }
        .rp-scene.in { opacity: 1; }

        /* Responsive */
        @media (max-width: 900px) {
          .rp { grid-template-columns: 1fr; }
          .rp-left { display: none; }
          .rp-right { min-height: 100vh; align-items: flex-start; padding-top: 72px; }
          .rp-card { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .rp-right { padding: 20px 16px 100px; }
          .rp-card { padding: 24px 20px; border-radius: 12px; }
          .rp-field-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rp">
        <div className="rp-bg-radial"/><div className="rp-bg-grid"/><div className="rp-bg-vignette"/>

        {/* ── LEFT PANEL ── */}
        <div className="rp-left">
          <div className="rp-left-glow"/>
          <div className="rp-orb rp-orb-1"/><div className="rp-orb rp-orb-2"/>

          <div className={`rp-brand ${v(1)?'in':''}`} onClick={()=>navigate('/')}>
            <div className="rp-brand-mark">A</div>
            <div className="rp-brand-name">RevenueRadar</div>
          </div>

          <div className="rp-center">
            <h2 className={`rp-tagline ${v(2)?'in':''}`}>
              Your seat at the<br/>table starts <span className="rp-tagline-em">here.</span>
            </h2>
            <p className={`rp-desc ${v(2)?'in':''}`}>
              Join 3,200+ executives using RevenueRadar to command their organizations with unprecedented clarity.
              Set up takes under 3 minutes.
            </p>

            <div className={`rp-benefits ${v(3)?'in':''}`}>
              {[
                { ico:'⚡', cls:'rp-benefit-ico-g', ttl:'Instant Onboarding', sub:'Live dashboard in under 3 minutes. Zero technical setup required.' },
                { ico:'🔒', cls:'rp-benefit-ico-b', ttl:'Enterprise Security', sub:'SOC 2 Type II certified. End-to-end encryption. 99.99% uptime SLA.' },
                { ico:'📊', cls:'rp-benefit-ico-gr', ttl:'Board-Ready Insights', sub:'Auto-generated reports that impress investors and close decisions.' },
              ].map((b,i)=>(
                <div className="rp-benefit" key={i}>
                  <div className={`rp-benefit-ico ${b.cls}`}>{b.ico}</div>
                  <div>
                    <div className="rp-benefit-ttl">{b.ttl}</div>
                    <div className="rp-benefit-sub">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rp-proof ${v(3)?'in':''}`}>
            <div className="rp-proof-avs">
              {['SR','MK','JL','AT','RC'].map((a,i)=>(
                <div key={i} className="rp-proof-av" style={{background:`linear-gradient(135deg,hsl(${42+i*18},70%,45%),hsl(${42+i*18},50%,28%))`}}>{a}</div>
              ))}
            </div>
            <div className="rp-proof-txt">
              <span className="rp-proof-num">3,200+</span> executives onboarded<br/>
              <span style={{fontSize:9}}>⭐⭐⭐⭐⭐ Rated 4.9 / 5 across 800+ reviews</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="rp-right">
          <div
            className={`rp-card ${v(2)?'in':''}`}
            style={{
              transform: v(2)
                ? `perspective(900px) rotateY(${px*0.025}deg) rotateX(${py*0.015}deg)`
                : 'translateY(28px)'
            }}
          >
            {/* Progress */}
            <div className="rp-progress">
              {[
                { n:1, lbl:'Account' },
                { n:2, lbl:'Security' },
              ].map((s,i)=>(
                <React.Fragment key={i}>
                  {i > 0 && (
                    <div className={`rp-step-line ${step > s.n-1 ? 'rp-step-line-done' : ''}`}/>
                  )}
                  <div className="rp-step" onClick={()=>{ if(s.n < step) setStep(s.n) }}>
                    <div className={`rp-step-num ${step===s.n?'rp-step-num-active':step>s.n?'rp-step-num-done':'rp-step-num-idle'}`}>
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <span className={`rp-step-lbl ${step===s.n?'rp-step-lbl-active':step>s.n?'rp-step-lbl-done':'rp-step-lbl-idle'}`}>
                      {s.lbl}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <>
                <div className="rp-card-eyebrow">
                  <div className="rp-card-pill">New Member</div>
                  <span className="rp-step-badge">Step 1 of 2</span>
                </div>
                <h1 className="rp-card-h">Create your <strong>account.</strong></h1>
                <p className="rp-card-sub">Start with your personal details. You'll set up your organization next.</p>

                <form className="rp-form" onSubmit={handleStep1} noValidate>
                  <div className="rp-field">
                    <label className="rp-label">Full Name</label>
                    <div className="rp-input-wrap">
                      <div className={`rp-input-icon ${focusedField==='name'?'active':''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="4.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M1.5 12.5C1.5 10.015 4.01 8 7 8s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <input className={`rp-input ${error?'err':''}`} type="text"
                        placeholder="Richard Caldwell"
                        value={name} onChange={e=>setName(e.target.value)}
                        onFocus={()=>setFocusedField('name')} onBlur={()=>setFocusedField(null)}
                        autoComplete="name"/>
                    </div>
                  </div>

                  <div className="rp-field">
                    <label className="rp-label">Work Email</label>
                    <div className="rp-input-wrap">
                      <div className={`rp-input-icon ${focusedField==='email'?'active':''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <input className={`rp-input ${error?'err':''}`} type="email"
                        placeholder="richard@meridian.com"
                        value={email} onChange={e=>setEmail(e.target.value)}
                        onFocus={()=>setFocusedField('email')} onBlur={()=>setFocusedField(null)}
                        autoComplete="email"/>
                    </div>
                  </div>

                  {error && (
                    <div className="rp-error">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#E88888" strokeWidth="1.2"/><path d="M6.5 4v3M6.5 9h.01" stroke="#E88888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {error}
                    </div>
                  )}

                  <button className="rp-submit" type="submit">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Continue to Security
                  </button>
                </form>
              </>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <>
                <button className="rp-back" onClick={()=>{setStep(1);setError('')}}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 6.5H2M5 2.5l-4 4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back
                </button>
                <div className="rp-card-eyebrow">
                  <div className="rp-card-pill">Secure Access</div>
                  <span className="rp-step-badge">Step 2 of 2</span>
                </div>
                <h1 className="rp-card-h">Secure your <strong>account.</strong></h1>
                <p className="rp-card-sub">Create a strong password to protect your executive dashboard.</p>

                <form className="rp-form" onSubmit={handleSubmit} noValidate>
                  <div className="rp-field">
                    <label className="rp-label">Password</label>
                    <div className="rp-input-wrap">
                      <div className={`rp-input-icon ${focusedField==='pw'?'active':''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      </div>
                      <input className={`rp-input ${error?'err':''}`}
                        type={showPass?'text':'password'}
                        placeholder="Create a strong password"
                        value={password} onChange={e=>setPassword(e.target.value)}
                        onFocus={()=>setFocusedField('pw')} onBlur={()=>setFocusedField(null)}
                        autoComplete="new-password" style={{paddingRight:38}}/>
                      <div className="rp-input-right" onClick={()=>setShowPass(!showPass)}>
                        {showPass
                          ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="2" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>
                        }
                      </div>
                    </div>
                    {password.length > 0 && (
                      <div className="rp-strength-row">
                        <div className="rp-strength-bars">
                          {[1,2,3,4].map(i=>(
                            <div key={i} className={`rp-str ${strength>=i?'lit':''}`}
                              style={strength>=i?{background:strengthColor}:{}}/>
                          ))}
                        </div>
                        <span className="rp-str-lbl" style={{color:strengthColor}}>{strengthLabel}</span>
                      </div>
                    )}
                  </div>

                  <div className="rp-field">
                    <label className="rp-label">Confirm Password</label>
                    <div className="rp-input-wrap">
                      <div className={`rp-input-icon ${focusedField==='cf'?'active':''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M5 9.5l1.5 1.5 2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <input className={`rp-input ${error&&password!==confirm?'err':''}`}
                        type={showConfirm?'text':'password'}
                        placeholder="Repeat your password"
                        value={confirm} onChange={e=>setConfirm(e.target.value)}
                        onFocus={()=>setFocusedField('cf')} onBlur={()=>setFocusedField(null)}
                        autoComplete="new-password" style={{paddingRight:38}}/>
                      <div className="rp-input-right" onClick={()=>setShowConfirm(!showConfirm)}>
                        {showConfirm
                          ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="2" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5C2 7.5 4 3 7.5 3S13 7.5 13 7.5 11 12 7.5 12 2 7.5 2 7.5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>
                        }
                      </div>
                    </div>
                    {confirm.length > 0 && password === confirm && (
                      <div style={{display:'flex',alignItems:'center',gap:5,marginTop:5,fontSize:10,color:'var(--green)'}}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="5" stroke="currentColor" strokeWidth="1.1"/><path d="M3 5.5l1.8 1.8 2.8-2.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Passwords match
                      </div>
                    )}
                  </div>

                  <div className="rp-agree" onClick={()=>setAgree(!agree)}>
                    <div className={`rp-checkbox ${agree?'checked':''}`}>
                      {agree && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#BFA054" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div className="rp-agree-txt">
                      I agree to the <span className="rp-link">Terms of Service</span> and <span className="rp-link">Privacy Policy</span>.
                      I confirm I am authorized to create an account on behalf of my organization.
                    </div>
                  </div>

                  {error && (
                    <div className="rp-error">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#E88888" strokeWidth="1.2"/><path d="M6.5 4v3M6.5 9h.01" stroke="#E88888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {error}
                    </div>
                  )}

                  <button className="rp-submit" type="submit" disabled={loading}>
                    {loading ? (
                      <><div className="rp-spinner"/>Creating Account…</>
                    ) : (
                      <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Create Account</>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="rp-footer">
              <div className="rp-login">
                Already have an account?{' '}
                <span className="rp-login-link" onClick={()=>navigate('/login')}>Sign in →</span>
              </div>
              <div className="rp-secure">
                <div className="rp-secure-dot"/>
                256-bit SSL · SOC 2 Type II · GDPR Compliant
              </div>
            </div>
          </div>
        </div>

        {/* Scene */}
        <div className={`rp-scene ${v(1)?'in':''}`}>
          <svg viewBox="0 0 1440 130" preserveAspectRatio="xMidYMax meet"
            style={{position:'absolute',bottom:0,left:0,width:'100%',height:'100%'}}>
            <defs>
              <linearGradient id="rsb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827"/><stop offset="100%" stopColor="#060810"/>
              </linearGradient>
            </defs>
            {[[0,40,58],[48,30,44],[85,52,78],[148,25,40],[186,38,62],[248,33,55],
              [285,58,88],[362,28,46],[398,48,72],[460,36,60],[520,54,84],[592,32,52],
              [630,43,68],[688,62,98],[762,36,60],[820,50,78],[884,38,64],[942,58,90],
              [1020,30,50],[1064,48,76],[1124,53,84],[1192,38,62],[1250,28,46],[1320,44,70]
            ].map(([x,w,h],i)=>(
              <rect key={i} x={x} y={130-h} width={w} height={h} fill="url(#rsb)" opacity="0.65"/>
            ))}
            {Array.from({length:48},(_,i)=>{
              const wx=8+(i*101)%1428, wy=6+(i*57)%105
              return <rect key={'rw'+i} x={wx} y={wy} width={2.8} height={4} fill={i%6===0?'#BFA054':'#E0E8F0'} opacity={0.03+(i%5)*0.04} rx="0.3"/>
            })}
            <rect x="0" y="120" width="1440" height="10" fill="#080C14"/>
            <line x1="0" y1="120.5" x2="1440" y2="120.5" stroke="rgba(191,160,84,0.12)" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
    </>
  )
}
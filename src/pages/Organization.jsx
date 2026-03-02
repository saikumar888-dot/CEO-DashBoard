import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   RevenueRadar — ORGANIZATION SETUP PAGE
   Aesthetic: Ultra-luxury dark editorial
   Fonts: Cormorant Garamond + DM Sans + DM Mono
────────────────────────────────────────────── */

const INDUSTRIES = [
  'Finance & Banking', 'Technology', 'Healthcare',
  'Real Estate', 'Legal & Compliance', 'Manufacturing',
  'Consulting', 'Media & Entertainment', 'Energy & Resources', 'Other'
]

const SIZES = [
  { v:'1-10', l:'1–10', sub:'Startup' },
  { v:'11-50', l:'11–50', sub:'Small' },
  { v:'51-200', l:'51–200', sub:'Mid-Market' },
  { v:'201-500', l:'201–500', sub:'Enterprise' },
  { v:'501+', l:'501+', sub:'Global' },
]

export default function Organization() {
  const navigate = useNavigate()

  const [phase, setPhase] = useState(0)
  const [orgName, setOrgName] = useState('')
  const [industry, setIndustry] = useState('')
  const [size, setSize] = useState('')
  const [website, setWebsite] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState(null)
  const [industryOpen, setIndustryOpen] = useState(false)

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
      setMouseX(lerpRef.current.x); setMouseY(lerpRef.current.y)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const close = () => setIndustryOpen(false)
    if (industryOpen) window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [industryOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!orgName.trim()) return setError('Organization name is required.')
    if (!industry) return setError('Please select your industry.')
    if (!size) return setError('Please select your organization size.')
    if (!role.trim()) return setError('Please enter your job title.')
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    navigate('/login')
  }

  const v = (p) => phase >= p
  const px = (mouseX - 0.5) * 14
  const py = (mouseY - 0.5) * 8

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

        .op {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          position: relative;
          overflow: hidden;
          color: var(--text);
        }

        /* BACKGROUNDS */
        .op-bg-radial {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 60% 65% at 15% 20%, rgba(191,160,84,0.065) 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 88% 85%, rgba(91,139,245,0.045) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 55% 50%, rgba(191,160,84,0.025) 0%, transparent 55%);
        }
        .op-bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(191,160,84,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,160,84,0.016) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 10%, transparent 100%);
        }
        .op-bg-vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 115% 115% at 50% 50%, transparent 35%, rgba(6,8,16,0.85) 100%);
        }

        /* LEFT PANEL */
        .op-left {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: clamp(32px, 5vw, 64px);
          border-right: 1px solid var(--border);
          background: rgba(8,10,18,0.5);
          overflow: hidden;
        }
        .op-left-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 100% 50% at 50% 0%, rgba(191,160,84,0.05), transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 100%, rgba(91,139,245,0.04), transparent 55%);
        }
        .op-orb {
          position: absolute; border-radius: 50%; pointer-events: none; filter: blur(60px);
        }
        .op-orb-1 {
          width: 260px; height: 260px; top: -40px; right: -50px;
          background: radial-gradient(circle, rgba(191,160,84,0.07), transparent 70%);
          animation: oOrb 10s ease-in-out infinite;
        }
        .op-orb-2 {
          width: 220px; height: 220px; bottom: -40px; left: -50px;
          background: radial-gradient(circle, rgba(91,139,245,0.04), transparent 70%);
          animation: oOrb 13s ease-in-out infinite 5s;
        }
        @keyframes oOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-16px) scale(1.04)} }

        .op-brand {
          display: flex; align-items: center; gap: 12px; position: relative; z-index: 2;
          cursor: pointer;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .op-brand.in { opacity: 1; transform: translateY(0); }
        .op-brand-mark {
          width: 36px; height: 36px; border: 1.5px solid var(--gold); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--gold);
          background: rgba(191,160,84,0.08);
          box-shadow: 0 0 20px rgba(191,160,84,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .op-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; letter-spacing: 0.12em; color: var(--gold);
        }

        .op-center { position: relative; z-index: 2; flex:1; display:flex; flex-direction:column; justify-content:center; padding: 40px 0; }

        .op-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 2.8vw, 48px);
          font-weight: 300; line-height: 1.1; letter-spacing: -0.01em; color: var(--text);
          margin-bottom: 18px;
          opacity: 0; transform: translateX(-22px);
          transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
        }
        .op-tagline.in { opacity: 1; transform: translateX(0); }
        .op-tagline-em {
          font-style: italic; font-weight: 600;
          background: linear-gradient(135deg, var(--gold-hi) 0%, var(--gold) 50%, var(--gold-lo) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .op-desc {
          font-size: clamp(12px, 1vw, 14px); font-weight: 300; line-height: 1.85;
          color: var(--muted); max-width: 340px; margin-bottom: 36px;
          opacity: 0; transform: translateX(-16px);
          transition: opacity 0.8s ease 0.22s, transform 0.8s ease 0.22s;
        }
        .op-desc.in { opacity: 1; transform: translateX(0); }

        /* Setup progress */
        .op-setup-steps {
          display: flex; flex-direction: column; gap: 0;
          border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.8s ease 0.32s, transform 0.8s ease 0.32s;
        }
        .op-setup-steps.in { opacity: 1; transform: translateY(0); }
        .op-setup-step {
          display: flex; align-items: center; gap: 12px; padding: 13px 16px;
          background: var(--surface); border-bottom: 1px solid var(--border);
          position: relative;
        }
        .op-setup-step:last-child { border-bottom: none; }
        .op-setup-step.done::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background: var(--green);
        }
        .op-setup-step.active::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background: var(--gold);
        }
        .op-setup-ico {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0; font-weight: 600;
        }
        .op-setup-ico-done { background: rgba(61,186,126,0.15); color: var(--green); }
        .op-setup-ico-active {
          background: rgba(191,160,84,0.15); color: var(--gold);
          box-shadow: 0 0 0 2px rgba(191,160,84,0.15);
        }
        .op-setup-ico-idle { background: var(--surface2); color: var(--muted2); border: 1px solid var(--border); }
        .op-setup-lbl { font-size: 11px; font-weight: 500; color: var(--text); letter-spacing: 0.03em; }
        .op-setup-sub { font-size: 9px; color: var(--muted); margin-top: 1px; }
        .op-setup-badge {
          margin-left: auto; font-size: 9px; padding: 2px 8px; border-radius: 100px;
          font-weight: 500; letter-spacing: 0.06em;
        }
        .op-setup-badge-done { background: rgba(61,186,126,0.12); color: var(--green); }
        .op-setup-badge-active { background: rgba(191,160,84,0.12); color: var(--gold); }
        .op-setup-badge-idle { background: var(--surface2); color: var(--muted2); }

        /* Dashboard preview snippet */
        .op-preview {
          position: relative; z-index: 2;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.8s ease 0.48s, transform 0.8s ease 0.48s;
        }
        .op-preview.in { opacity: 1; transform: translateY(0); }
        .op-preview-inner {
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
          padding: 14px 16px; position: relative; overflow: hidden;
        }
        .op-preview-inner::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .op-preview-ttl { font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
        .op-preview-kpis { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
        .op-preview-kpi {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 6px; padding: 8px 10px;
        }
        .op-preview-kv { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:600; color:var(--text); line-height:1; margin-bottom:2px; }
        .op-preview-kl { font-size:8px; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; }
        .op-preview-soon {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background: rgba(8,10,18,0.7); backdrop-filter: blur(4px); border-radius:10px;
        }
        .op-preview-pill {
          padding: 5px 14px; border-radius: 100px;
          background: rgba(191,160,84,0.12); border: 1px solid rgba(191,160,84,0.25);
          font-size: 10px; font-weight: 500; letter-spacing: 0.14em;
          color: var(--gold); text-transform: uppercase;
          display: flex; align-items: center; gap: 6px;
        }
        .op-soon-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
          animation: osPulse 1.8s ease-in-out infinite;
        }
        @keyframes osPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* RIGHT PANEL */
        .op-right {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(24px, 5vw, 64px);
          overflow-y: auto;
        }

        .op-card {
          width: 100%; max-width: 460px;
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
        .op-card.in { opacity: 1; transform: translateY(0); }

        /* Card top */
        .op-card-eyebrow { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
        .op-card-pill {
          padding: 3px 10px; border-radius: 100px;
          background: rgba(191,160,84,0.1); border: 1px solid rgba(191,160,84,0.2);
          font-size: 9px; font-weight: 500; letter-spacing: 0.18em;
          color: var(--gold); text-transform: uppercase;
        }
        .op-card-step { font-family:'DM Mono',monospace; font-size:9px; color:var(--muted); letter-spacing:0.1em; }

        .op-card-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 2.2vw, 30px);
          font-weight: 300; line-height: 1.12; color: var(--text); margin-bottom: 6px;
        }
        .op-card-h strong { font-weight:600; font-style:italic; color:var(--gold-hi); }
        .op-card-sub { font-size:12px; font-weight:300; color:var(--muted); line-height:1.6; margin-bottom:26px; }

        /* Form fields */
        .op-form { display:flex; flex-direction:column; gap:16px; }
        .op-field { display:flex; flex-direction:column; gap:6px; }
        .op-field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        .op-label {
          font-size:10px; font-weight:500; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--muted);
          display:flex; justify-content:space-between; align-items:center;
        }
        .op-opt { font-size:9px; color:var(--muted2); text-transform:none; letter-spacing:0.04em; }

        .op-input-wrap { position:relative; }
        .op-input-icon {
          position:absolute; left:13px; top:50%; transform:translateY(-50%);
          color:var(--muted2); pointer-events:none; transition:color 0.2s;
          display:flex; align-items:center;
        }
        .op-input-icon.active { color:var(--gold); opacity:0.7; }

        .op-input {
          width:100%; padding:11px 14px 11px 38px;
          background:rgba(255,255,255,0.03);
          border:1px solid var(--border); border-radius:8px;
          font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:300; color:var(--text);
          outline:none; letter-spacing:0.02em;
          transition:border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .op-input::placeholder { color:var(--muted2); font-weight:300; }
        .op-input:focus {
          border-color:var(--border-focus);
          background:rgba(191,160,84,0.03);
          box-shadow:0 0 0 3px rgba(191,160,84,0.06), 0 1px 8px rgba(0,0,0,0.3);
        }
        .op-input.err { border-color:rgba(224,82,82,0.4); }

        /* Custom dropdown */
        .op-dropdown { position:relative; }
        .op-dropdown-btn {
          width:100%; padding:11px 38px 11px 38px;
          background:rgba(255,255,255,0.03);
          border:1px solid var(--border); border-radius:8px;
          font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:300;
          color: var(--text);
          text-align:left; cursor:pointer;
          transition:border-color 0.25s, background 0.25s, box-shadow 0.25s;
          position:relative;
        }
        .op-dropdown-btn.placeholder { color:var(--muted2); }
        .op-dropdown-btn.open, .op-dropdown-btn:focus {
          border-color:var(--border-focus);
          background:rgba(191,160,84,0.03);
          box-shadow:0 0 0 3px rgba(191,160,84,0.06);
          outline:none;
        }
        .op-dropdown-btn.err { border-color:rgba(224,82,82,0.4); }
        .op-dropdown-arrow {
          position:absolute; right:13px; top:50%; transform:translateY(-50%);
          color:var(--muted2); pointer-events:none; transition:transform 0.2s;
        }
        .op-dropdown-arrow.open { transform:translateY(-50%) rotate(180deg); }
        .op-dropdown-menu {
          position:absolute; top:calc(100% + 4px); left:0; right:0;
          background:rgba(14,18,28,0.97); border:1px solid var(--border-hi);
          border-radius:9px; overflow:hidden;
          box-shadow:0 16px 40px rgba(0,0,0,0.55);
          z-index:100;
          animation: opDrop 0.18s ease;
        }
        @keyframes opDrop { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .op-dropdown-item {
          padding:9px 16px; font-size:12px; font-weight:300; color:var(--muted);
          cursor:pointer; transition:all 0.15s;
          border-bottom:1px solid rgba(191,160,84,0.05);
        }
        .op-dropdown-item:last-child { border-bottom:none; }
        .op-dropdown-item:hover { background:rgba(191,160,84,0.06); color:var(--text); }
        .op-dropdown-item.selected { color:var(--gold); background:rgba(191,160,84,0.08); }

        /* Size picker */
        .op-size-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }
        .op-size-btn {
          padding:8px 4px; border-radius:7px; cursor:pointer;
          background:rgba(255,255,255,0.02); border:1px solid var(--border);
          text-align:center; transition:all 0.2s;
        }
        .op-size-btn:hover { border-color:rgba(191,160,84,0.25); background:rgba(191,160,84,0.04); }
        .op-size-btn.active {
          background:rgba(191,160,84,0.1); border-color:var(--gold);
          box-shadow:0 0 0 2px rgba(191,160,84,0.1);
        }
        .op-size-n { font-family:'Cormorant Garamond',serif; font-size:13px; font-weight:600; color:var(--text); }
        .op-size-btn.active .op-size-n { color:var(--gold); }
        .op-size-s { font-size:8px; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; margin-top:2px; }

        /* Error */
        .op-error {
          display:flex; align-items:center; gap:7px;
          padding:9px 12px;
          background:rgba(224,82,82,0.08); border:1px solid rgba(224,82,82,0.2); border-radius:7px;
          font-size:11px; color:#E88888;
          animation:opShake 0.35s ease;
        }
        @keyframes opShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 60%{transform:translateX(5px)} }

        /* Submit */
        .op-submit {
          width:100%; padding:13px;
          border:none; border-radius:8px;
          background:linear-gradient(135deg,#C9A84C 0%,#8B6914 100%);
          font-family:'DM Sans',sans-serif;
          font-size:12px; font-weight:600; letter-spacing:0.09em; text-transform:uppercase;
          color:#06080E; cursor:pointer; position:relative; overflow:hidden;
          box-shadow:0 6px 20px rgba(191,160,84,0.22), inset 0 1px 0 rgba(255,255,255,0.14);
          transition:transform 0.22s ease, box-shadow 0.22s ease, opacity 0.2s;
          display:flex; align-items:center; justify-content:center; gap:8px;
          margin-top:4px;
        }
        .op-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(191,160,84,0.32); }
        .op-submit:active:not(:disabled) { transform:translateY(0); }
        .op-submit:disabled { opacity:0.7; cursor:not-allowed; }
        .op-submit::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent);
          animation:opShimmer 2.8s ease-in-out infinite;
        }
        @keyframes opShimmer { 0%{left:-100%} 100%{left:200%} }

        .op-spinner {
          width:14px; height:14px; border:1.5px solid rgba(6,8,14,0.3);
          border-top-color:#06080E; border-radius:50%;
          animation:opSpin 0.7s linear infinite;
        }
        @keyframes opSpin { to{transform:rotate(360deg)} }

        /* Footer */
        .op-footer { margin-top:20px; display:flex; flex-direction:column; align-items:center; gap:12px; }
        .op-secure {
          display:flex; align-items:center; gap:6px; padding:5px 12px;
          background:rgba(61,186,126,0.06); border:1px solid rgba(61,186,126,0.14); border-radius:100px;
          font-size:9px; color:rgba(61,186,126,0.75); letter-spacing:0.1em;
          font-family:'DM Mono',monospace;
        }
        .op-secure-dot { width:4px; height:4px; border-radius:50%; background:var(--green); }
        .op-skip {
          font-size:10px; color:var(--muted2); cursor:pointer; letter-spacing:0.04em;
          transition:color 0.2s;
        }
        .op-skip:hover { color:var(--muted); }

        /* Scene */
        .op-scene {
          position:fixed; bottom:0; left:0; right:0;
          height:clamp(60px,12vh,110px); z-index:1; pointer-events:none;
          opacity:0; transition:opacity 1.4s ease 0.3s;
        }
        .op-scene.in { opacity:1; }

        /* Responsive */
        @media (max-width:960px) {
          .op { grid-template-columns:1fr; }
          .op-left { display:none; }
          .op-right { min-height:100vh; align-items:flex-start; padding-top:72px; }
          .op-card { max-width:100%; }
        }
        @media (max-width:480px) {
          .op-right { padding:20px 16px 100px; }
          .op-card { padding:24px 20px; border-radius:12px; }
          .op-field-row { grid-template-columns:1fr; }
          .op-size-grid { grid-template-columns:repeat(3,1fr); }
        }
      `}</style>

      <div className="op">
        <div className="op-bg-radial"/><div className="op-bg-grid"/><div className="op-bg-vignette"/>

        {/* ── LEFT PANEL ── */}
        <div className="op-left">
          <div className="op-left-glow"/>
          <div className="op-orb op-orb-1"/><div className="op-orb op-orb-2"/>

          <div className={`op-brand ${v(1)?'in':''}`} onClick={()=>navigate('/')}>
            <div className="op-brand-mark">A</div>
            <div className="op-brand-name">RevenueRadar</div>
          </div>

          <div className="op-center">
            <h2 className={`op-tagline ${v(2)?'in':''}`}>
              Your command<br/>center is <span className="op-tagline-em">almost<br/>ready.</span>
            </h2>
            <p className={`op-desc ${v(2)?'in':''}`}>
              One final step. Tell us about your organization so we can configure your dashboard with the right benchmarks, KPIs, and industry insights.
            </p>

            {/* Setup progress list */}
            <div className={`op-setup-steps ${v(3)?'in':''}`}>
              {[
                { ico:'✓', cls:'op-setup-ico-done', step:'done', lbl:'Account Created', sub:'Personal credentials saved', badge:'Complete', bcls:'op-setup-badge-done' },
                { ico:'◎', cls:'op-setup-ico-active', step:'active', lbl:'Organization Setup', sub:'Configure your command center', badge:'In Progress', bcls:'op-setup-badge-active' },
                { ico:'○', cls:'op-setup-ico-idle', step:'idle', lbl:'Dashboard Activation', sub:'Live in under 60 seconds', badge:'Next', bcls:'op-setup-badge-idle' },
              ].map((s,i)=>(
                <div key={i} className={`op-setup-step ${s.step}`}>
                  <div className={`op-setup-ico ${s.cls}`}>{s.ico}</div>
                  <div>
                    <div className="op-setup-lbl">{s.lbl}</div>
                    <div className="op-setup-sub">{s.sub}</div>
                  </div>
                  <div className={`op-setup-badge ${s.bcls}`}>{s.badge}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className={`op-preview ${v(3)?'in':''}`}>
            <div className="op-preview-inner">
              <div className="op-preview-ttl">Your dashboard preview</div>
              <div className="op-preview-kpis">
                {[
                  {v:'$—.—M', l:'Revenue'},
                  {v:'—%', l:'Satisfaction'},
                  {v:'—,—', l:'Users'},
                ].map((k,i)=>(
                  <div key={i} className="op-preview-kpi">
                    <div className="op-preview-kv">{k.v}</div>
                    <div className="op-preview-kl">{k.l}</div>
                  </div>
                ))}
              </div>
              <div className="op-preview-soon">
                <div className="op-preview-pill">
                  <div className="op-soon-dot"/>
                  Activates after setup
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="op-right">
          <div
            className={`op-card ${v(2)?'in':''}`}
            style={{
              transform: v(2)
                ? `perspective(900px) rotateY(${px*0.02}deg) rotateX(${py*0.015}deg)`
                : 'translateY(28px)'
            }}
          >
            <div className="op-card-eyebrow">
              <div className="op-card-pill">Organization</div>
              <span className="op-card-step">Step 3 of 3</span>
            </div>
            <h1 className="op-card-h">Set up your <strong>organization.</strong></h1>
            <p className="op-card-sub">This powers your dashboard's industry benchmarks, KPI templates, and automated reporting.</p>

            <form className="op-form" onSubmit={handleSubmit} noValidate>

              {/* Organization name */}
              <div className="op-field">
                <label className="op-label">Organization Name</label>
                <div className="op-input-wrap">
                  <div className={`op-input-icon ${focusedField==='org'?'active':''}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4.5 4V3a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <rect x="5.5" y="7" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <input className={`op-input ${error&&!orgName?'err':''}`}
                    type="text" placeholder="Meridian Capital Group"
                    value={orgName} onChange={e=>setOrgName(e.target.value)}
                    onFocus={()=>setFocusedField('org')} onBlur={()=>setFocusedField(null)}
                    autoComplete="organization"/>
                </div>
              </div>

              {/* Industry + Role */}
              <div className="op-field-row">
                <div className="op-field">
                  <label className="op-label">Industry</label>
                  <div className="op-dropdown" onClick={e=>e.stopPropagation()}>
                    <div className={`op-input-icon ${industryOpen?'active':''}`} style={{zIndex:1,pointerEvents:'none'}}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="9" width="3" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                        <rect x="5.5" y="6" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                        <rect x="10" y="3" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
                      </svg>
                    </div>
                    <button type="button"
                      className={`op-dropdown-btn ${!industry?'placeholder':''} ${industryOpen?'open':''} ${error&&!industry?'err':''}`}
                      onClick={()=>setIndustryOpen(!industryOpen)}>
                      {industry || 'Select…'}
                    </button>
                    <div className={`op-dropdown-arrow ${industryOpen?'open':''}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {industryOpen && (
                      <div className="op-dropdown-menu">
                        {INDUSTRIES.map(ind=>(
                          <div key={ind}
                            className={`op-dropdown-item ${industry===ind?'selected':''}`}
                            onClick={()=>{ setIndustry(ind); setIndustryOpen(false) }}>
                            {ind}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="op-field">
                  <label className="op-label">Your Title</label>
                  <div className="op-input-wrap">
                    <div className={`op-input-icon ${focusedField==='role'?'active':''}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="4.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1.5 12.5C1.5 10.015 4.01 8 7 8s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <input className={`op-input ${error&&!role?'err':''}`}
                      type="text" placeholder="CEO / Founder"
                      value={role} onChange={e=>setRole(e.target.value)}
                      onFocus={()=>setFocusedField('role')} onBlur={()=>setFocusedField(null)}/>
                  </div>
                </div>
              </div>

              {/* Organization size */}
              <div className="op-field">
                <label className="op-label">Organization Size <span className="op-opt">employees</span></label>
                <div className="op-size-grid">
                  {SIZES.map(s=>(
                    <div key={s.v}
                      className={`op-size-btn ${size===s.v?'active':''}`}
                      onClick={()=>setSize(s.v)}>
                      <div className="op-size-n">{s.l}</div>
                      <div className="op-size-s">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Website */}
              <div className="op-field">
                <label className="op-label">Website <span className="op-opt">optional</span></label>
                <div className="op-input-wrap">
                  <div className={`op-input-icon ${focusedField==='web'?'active':''}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.1"/>
                    </svg>
                  </div>
                  <input className="op-input"
                    type="url" placeholder="https://meridian.com"
                    value={website} onChange={e=>setWebsite(e.target.value)}
                    onFocus={()=>setFocusedField('web')} onBlur={()=>setFocusedField(null)}
                    autoComplete="url"/>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="op-error">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="#E88888" strokeWidth="1.2"/><path d="M6.5 4v3M6.5 9h.01" stroke="#E88888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {error}
                </div>
              )}

              <button className="op-submit" type="submit" disabled={loading}>
                {loading ? (
                  <><div className="op-spinner"/>Forwarding To…</>
                ) : (
                  <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Sign in</>
                )}
              </button>
            </form>

            <div className="op-footer">
              <div className="op-secure">
                <div className="op-secure-dot"/>
                Your data is encrypted · Never shared · Delete anytime
              </div>
              <div className="op-skip" onClick={()=>navigate('/login')}>
                Skip for now — I'll complete this later
              </div>
            </div>
          </div>
        </div>

        {/* Scene */}
        <div className={`op-scene ${v(1)?'in':''}`}>
          <svg viewBox="0 0 1440 110" preserveAspectRatio="xMidYMax meet"
            style={{position:'absolute',bottom:0,left:0,width:'100%',height:'100%'}}>
            <defs>
              <linearGradient id="osb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827"/><stop offset="100%" stopColor="#060810"/>
              </linearGradient>
            </defs>
            {[[0,38,50],[44,28,38],[78,48,70],[140,24,36],[175,36,56],[232,32,48],
              [270,54,82],[348,26,40],[382,46,66],[442,34,54],[498,52,78],[568,30,46],
              [604,42,62],[660,60,92],[740,34,56],[796,48,74],[858,36,60],[916,56,84],
              [996,28,44],[1040,46,70],[1098,52,80],[1164,36,58],[1220,26,40],[1290,44,66]
            ].map(([x,w,h],i)=>(
              <rect key={i} x={x} y={110-h} width={w} height={h} fill="url(#osb)" opacity="0.62"/>
            ))}
            {Array.from({length:44},(_,i)=>{
              const wx=8+(i*103)%1428, wy=5+(i*59)%88
              return <rect key={'ow'+i} x={wx} y={wy} width={2.5} height={3.5}
                fill={i%6===0?'#BFA054':'#E0E8F0'} opacity={0.025+(i%5)*0.04} rx="0.3"/>
            })}
            <rect x="0" y="102" width="1440" height="8" fill="#080C14"/>
            <line x1="0" y1="102.5" x2="1440" y2="102.5" stroke="rgba(191,160,84,0.1)" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
    </>
  )
}
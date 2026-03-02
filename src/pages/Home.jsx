import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   APEX — CEO DASHBOARD LANDING
   Aesthetic: Ultra-luxury dark editorial
   Fonts: Cormorant Garamond + DM Sans + DM Mono
────────────────────────────────────────────── */

const BARS = [0.38, 0.52, 0.44, 0.61, 0.57, 0.74, 0.68, 0.82, 0.71, 0.91, 0.84, 0.97]

export default function Home() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const [count, setCount] = useState({ rev: 0, users: 0, uptime: 0 })
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const lerpRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 2400)
    const t3 = setTimeout(() => setPhase(3), 3100)
    const t4 = setTimeout(() => setPhase(4), 3900)
    return () => [t1,t2,t3,t4].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight } }
    window.addEventListener('mousemove', onMove)
    const loop = () => {
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.05
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.05
      setMouseX(lerpRef.current.x); setMouseY(lerpRef.current.y)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    if (phase < 4) return
    let frame = 0
    const total = 80
    const tick = () => {
      frame++
      const p = Math.min(frame/total, 1)
      const e = 1 - Math.pow(1-p, 3)
      setCount({ rev: +(4.2*e).toFixed(1), users: Math.round(2847*e), uptime: +(99.9*e).toFixed(1) })
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [phase])

  const px = (mouseX - 0.5) * 40
  const py = (mouseY - 0.5) * 20
  const v = (p) => phase >= p

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060810; overflow-x: hidden; }

        :root {
          --gold: #BFA054;
          --gold-hi: #E2C47A;
          --gold-lo: #7A6030;
          --bg: #060810;
          --surface: #0C1018;
          --surface2: #111620;
          --border: rgba(191,160,84,0.12);
          --border-hi: rgba(191,160,84,0.3);
          --text: #E8E4DC;
          --muted: #6B7385;
          --green: #3DBA7E;
          --red: #E05252;
          --blue: #5B8BF5;
        }

        .page {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: var(--text);
        }

        .bg-radial {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 72% 18%, rgba(191,160,84,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 8% 85%, rgba(191,160,84,0.04) 0%, transparent 50%);
        }
        .bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(191,160,84,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191,160,84,0.022) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .bg-vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(6,8,16,0.75) 100%);
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(16px, 5vw, 72px);
          height: 64px;
          border-bottom: 1px solid rgba(191,160,84,0.07);
          background: rgba(6,8,16,0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          opacity: 0; transform: translateY(-8px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .nav.in { opacity: 1; transform: translateY(0); }

        .nav-brand {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 600; letter-spacing: 0.1em;
          color: var(--gold); cursor: pointer;
        }
        .brand-mark {
          width: 28px; height: 28px;
          border: 1.5px solid var(--gold); border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: var(--gold);
          background: rgba(191,160,84,0.08);
        }

        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-link {
          font-size: 11px; font-weight: 400; letter-spacing: 0.13em;
          color: var(--muted); text-transform: uppercase;
          cursor: pointer; background: none; border: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--text); }

        .nav-actions { display: flex; gap: 10px; align-items: center; }

        .nbtn {
          padding: 7px 18px; border-radius: 6px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          transition: all 0.2s;
        }
        .nbtn-ghost {
          background: transparent; border: 1px solid var(--border-hi); color: var(--gold);
        }
        .nbtn-ghost:hover { background: rgba(191,160,84,0.08); }
        .nbtn-solid {
          background: var(--gold); border: 1px solid var(--gold); color: #06080E; font-weight: 600;
        }
        .nbtn-solid:hover { background: var(--gold-hi); }

        .hero {
          position: relative; z-index: 10;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding-top: 64px;
        }

        .hero-left {
          padding: clamp(32px, 7vw, 96px) clamp(16px, 5vw, 72px);
          display: flex; flex-direction: column; justify-content: center;
          min-height: calc(100vh - 64px);
        }

        .eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 26px;
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .eyebrow.in { opacity: 1; transform: translateX(0); }
        .eyebrow-pill {
          padding: 4px 12px; border-radius: 100px;
          background: rgba(191,160,84,0.1); border: 1px solid rgba(191,160,84,0.22);
          font-size: 10px; font-weight: 500; letter-spacing: 0.2em;
          color: var(--gold); text-transform: uppercase;
        }
        .live-row { display: flex; align-items: center; gap: 6px; }
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 0 0 rgba(61,186,126,0.4);
          animation: lp 2s ease-in-out infinite;
        }
        @keyframes lp {
          0% { box-shadow: 0 0 0 0 rgba(61,186,126,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(61,186,126,0); }
          100% { box-shadow: 0 0 0 0 rgba(61,186,126,0); }
        }
        .live-lbl { font-size: 10px; color: var(--muted); letter-spacing: 0.1em; }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5.2vw, 84px);
          font-weight: 300; line-height: 1.04; letter-spacing: -0.01em;
          color: var(--text);
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s;
          margin-bottom: 18px;
        }
        .headline.in { opacity: 1; transform: translateY(0); }
        .headline-gold {
          font-style: italic; font-weight: 600;
          background: linear-gradient(135deg, var(--gold-hi) 0%, var(--gold) 50%, var(--gold-lo) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .body-text {
          font-size: clamp(13px, 1.15vw, 15px); font-weight: 300; line-height: 1.82;
          color: var(--muted); max-width: 400px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease 0.18s, transform 0.8s ease 0.18s;
          margin-bottom: 40px;
        }
        .body-text.in { opacity: 1; transform: translateY(0); }

        .metrics {
          display: flex; gap: 0;
          border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
          margin-bottom: 40px;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.8s ease 0.28s, transform 0.8s ease 0.28s;
        }
        .metrics.in { opacity: 1; transform: translateY(0); }
        .met {
          flex: 1; padding: 16px 18px;
          border-right: 1px solid var(--border);
          background: var(--surface); position: relative;
        }
        .met:last-child { border-right: none; }
        .met-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent); opacity: 0.5;
        }
        .met-lbl { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .met-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.2vw, 28px); font-weight: 600; color: var(--text);
          line-height: 1; margin-bottom: 4px;
        }
        .met-delta { font-size: 10px; color: var(--green); font-weight: 500; }

        .ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.38s, transform 0.8s ease 0.38s;
        }
        .ctas.in { opacity: 1; transform: translateY(0); }

        .cta-p {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border: none; border-radius: 8px;
          background: linear-gradient(135deg, #C9A84C 0%, #8B6914 100%);
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
          color: #06080E; cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 6px 20px rgba(191,160,84,0.22), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .cta-p:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(191,160,84,0.32); }
        .cta-p:active { transform: translateY(0); }

        .cta-s {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 8px;
          background: rgba(191,160,84,0.06); border: 1px solid var(--border-hi);
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--gold); cursor: pointer;
          transition: all 0.22s ease;
        }
        .cta-s:hover { background: rgba(191,160,84,0.11); border-color: var(--gold); transform: translateY(-2px); }

        .hero-right {
          position: relative;
          height: calc(100vh - 64px);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(20px, 3vw, 48px) clamp(20px, 3vw, 48px) clamp(80px, 12vw, 170px) 0;
          overflow: hidden;
        }

        .dash-scene {
          position: relative; width: 100%; max-width: 540px;
          opacity: 0; transition: opacity 1s ease 0.7s;
          will-change: transform;
        }
        .dash-scene.in { opacity: 1; }

        .screen-glow {
          position: absolute; inset: -30px; border-radius: 28px; z-index: -1;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(191,160,84,0.1), transparent 70%);
          pointer-events: none;
        }

        .fbadge {
          position: absolute;
          background: rgba(12,16,24,0.92); border: 1px solid var(--border-hi);
          border-radius: 10px; padding: 10px 14px;
          backdrop-filter: blur(16px); box-shadow: 0 8px 28px rgba(0,0,0,0.5);
          pointer-events: none; z-index: 10;
        }
        .fbadge-a { top: -14px; left: -18px; animation: fy 4s ease-in-out infinite; }
        .fbadge-b { bottom: 110px; right: -14px; animation: fy 4s ease-in-out infinite 2s; }
        @keyframes fy { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .fb-lbl { font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 3px; }
        .fb-val { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 600; color: var(--gold); line-height:1; }
        .fb-sub { font-size: 9px; color: var(--green); margin-top: 2px; }

        .dash-frame {
          background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(191,160,84,0.05), 0 32px 80px rgba(0,0,0,0.72), inset 0 1px 0 rgba(191,160,84,0.07);
        }

        .dbar {
          display: flex; align-items: center; padding: 10px 14px; gap: 8px;
          border-bottom: 1px solid var(--border); background: rgba(6,8,16,0.6);
        }
        .ddots { display: flex; gap: 5px; }
        .dd { width: 9px; height: 9px; border-radius: 50%; }
        .dd-r{background:#FF5F57;} .dd-y{background:#FEBC2E;} .dd-g{background:#28C840;}
        .durl {
          flex: 1; margin: 0 10px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 5px;
          padding: 3px 10px; display: flex; align-items: center; gap: 5px;
          font-family: 'DM Mono', monospace; font-size: 9px; color: var(--muted);
        }
        .dlock { color: var(--green); }

        .dbody { padding: 14px; }

        .dtopbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .dwelcome { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: var(--text); }
        .ddate { font-size: 10px; color: var(--muted); letter-spacing: 0.06em; margin-top: 1px; }
        .davatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-lo));
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; color: #06080E;
          border: 1.5px solid rgba(191,160,84,0.4);
        }

        .kpis { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; margin-bottom: 10px; }
        .kpi {
          background: var(--surface2); border: 1px solid var(--border); border-radius: 7px;
          padding: 9px 11px; position: relative; overflow: hidden;
        }
        .kpi::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; }
        .kpi-g::before { background: linear-gradient(90deg, var(--gold), transparent); }
        .kpi-gr::before { background: linear-gradient(90deg, var(--green), transparent); }
        .kpi-b::before { background: linear-gradient(90deg, var(--blue), transparent); }
        .kv { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; color:var(--text); line-height:1; margin-bottom:2px; }
        .kl { font-size:8px; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; }
        .kd { display:flex; align-items:center; gap:3px; margin-top:4px; }
        .kbadge { font-size:8px; font-weight:500; padding:1px 5px; border-radius:3px; }
        .kb-u { background:rgba(61,186,126,0.15); color:var(--green); }
        .kb-d { background:rgba(224,82,82,0.15); color:var(--red); }
        .ks { font-size:8px; color:var(--muted); }

        .chart-box {
          background: var(--surface2); border: 1px solid var(--border); border-radius: 7px;
          padding: 11px; margin-bottom: 9px;
        }
        .chart-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:9px; }
        .chart-ttl { font-size:10px; font-weight:500; color:var(--text); letter-spacing:0.04em; }
        .periods { display:flex; gap:3px; }
        .pbtn { font-size:8px; padding:2px 7px; border-radius:4px; border:1px solid transparent; cursor:pointer; font-family:'DM Sans',sans-serif; }
        .pa { background:rgba(191,160,84,0.15); border-color:rgba(191,160,84,0.3); color:var(--gold); }
        .pi { background:transparent; color:var(--muted); border-color:transparent; }
        .barsrow { display:flex; align-items:flex-end; gap:2.5px; height:50px; }
        .bbar {
          flex:1; border-radius:2px 2px 0 0;
          background: linear-gradient(180deg, rgba(191,160,84,0.7), rgba(191,160,84,0.12));
          transform:scaleY(0); transform-origin:bottom;
          animation: barUp 0.5s ease forwards;
        }
        @keyframes barUp { to { transform: scaleY(1); } }

        .acts { display:flex; flex-direction:column; gap:5px; }
        .act {
          display:flex; align-items:center; gap:8px;
          padding:7px 9px; background:var(--surface2);
          border:1px solid var(--border); border-radius:6px;
        }
        .aico { width:22px; height:22px; border-radius:5px; display:flex; align-items:center; justify-content:center; font-size:10px; flex-shrink:0; }
        .aico-g { background:rgba(191,160,84,0.15); }
        .aico-gr { background:rgba(61,186,126,0.15); }
        .attl { font-size:9px; font-weight:500; color:var(--text); }
        .asub { font-size:8px; color:var(--muted); margin-top:1px; }
        .atime { font-size:8px; color:var(--muted); font-family:'DM Mono',monospace; margin-left:auto; }

        .scene {
          position: fixed; bottom: 0; left: 0; right: 0;
          height: clamp(160px, 35vh, 320px);
          z-index: 3; pointer-events: none;
        }

        .city-svg {
          position:absolute; bottom:0; left:0; width:100%; height:100%;
          opacity:0; transition: opacity 1.4s ease 0.4s;
        }
        .city-svg.in { opacity:1; }

        .car-track { position:absolute; bottom:22%; width:100%; }
        .car-anim {
          position:absolute; bottom:0;
          opacity:0; animation: driveIn 2.2s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes driveIn {
          0%   { left:-28%; opacity:0; }
          12%  { opacity:1; }
          78%  { left:37%; }
          88%  { left:35.5%; }
          100% { left:36%; }
        }

        .door-grp {
          transform-origin: 169px 36px;
          transition: transform 0.55s cubic-bezier(0.34,1.4,0.64,1);
        }
        .door-grp.open { transform: rotate(-44deg) skewY(-4deg); }

        .ceo {
          position:absolute; bottom:22%;
          left:calc(36% + 170px);
          opacity:0;
        }
        .ceo.in { animation: ceoUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes ceoUp {
          0%   { opacity:0; transform:translateY(18px) scale(0.87); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        .ceo-body { animation: sway 3.5s ease-in-out infinite; transform-origin:bottom center; }
        @keyframes sway { 0%,100%{transform:rotate(0)} 30%{transform:rotate(0.4deg)} 70%{transform:rotate(-0.4deg)} }
        .arm-r { animation: armR 2.2s ease-in-out infinite alternate; transform-origin:8px 4px; }
        @keyframes armR { from{transform:rotate(-6deg)} to{transform:rotate(5deg)} }

        .ground-line {
          position:absolute; bottom:0; left:0; right:0; height:22%;
          background: linear-gradient(180deg, transparent, rgba(191,160,84,0.025));
        }

        .scroll-i {
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:7px;
          z-index:50; pointer-events:none; opacity:0; transition: opacity 0.8s ease 4.8s;
        }
        .scroll-i.in { opacity:0.35; }
        .smouse { width:20px; height:30px; border:1.5px solid rgba(191,160,84,0.5); border-radius:10px; position:relative; }
        .swheel { position:absolute; top:4px; left:50%; transform:translateX(-50%); width:2.5px; height:6px; background:var(--gold); border-radius:2px; animation: sw 1.8s ease-in-out infinite; }
        @keyframes sw { 0%{top:4px;opacity:1} 75%{top:14px;opacity:0} 76%{top:4px;opacity:0} 100%{top:4px;opacity:1} }
        .slbl { font-size:8px; letter-spacing:0.22em; text-transform:uppercase; color:var(--muted); }

        @media (max-width: 960px) {
          .hero { grid-template-columns: 1fr; }
          .hero-left { min-height: auto; padding-bottom: 20px; }
          .hero-right { height: 55vw; min-height: 280px; max-height: 400px; padding: 0 16px 16px; }
          .nav-links { display: none; }
          .fbadge-b { display: none; }
          .fbadge-a { left: -6px; }
        }
        @media (max-width: 640px) {
          .hero-right { display: none; }
          .hero-left { padding: 28px 20px 160px; }
          .metrics { flex-direction: column; }
          .met { border-right: none !important; border-bottom: 1px solid var(--border); }
          .met:last-child { border-bottom: none; }
          .ctas { flex-direction: column; }
          .cta-p, .cta-s { justify-content: center; width: 100%; }
          .nbtn-ghost { display: none; }
          .kpis { grid-template-columns: 1fr 1fr; }
          .acts { display: none; }
          .scene { height: clamp(130px, 28vh, 220px); }
        }
        @media (max-width: 380px) {
          .kpis { grid-template-columns: 1fr; }
          .headline { font-size: 38px; }
        }
      `}</style>

      <div className="page">
        <div className="bg-radial" /><div className="bg-grid" /><div className="bg-vignette" />

        <nav className={`nav ${v(1)?'in':''}`}>
          <div className="nav-brand">
            <div className="brand-mark">A</div>RevenueRadar
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={()=>navigate('/about')}>About</button>
            <button className="nav-link" onClick={() => navigate('/organization')}>Organization</button>
            <button className="nav-link">Pricing</button>
          </div>
          <div className="nav-actions">
            <button className="nbtn nbtn-ghost" onClick={()=>navigate('/login')}>Sign In</button>
            <button className="nbtn nbtn-solid" onClick={()=>navigate('/register')}>Get Started</button>
          </div>
        </nav>

        <main className="hero">
          <div className="hero-left">
            <div className={`eyebrow ${v(4)?'in':''}`}>
              <div className="eyebrow-pill">Executive Intelligence</div>
              <div className="live-row">
                <div className="live-dot"/>
                <span className="live-lbl">Live Dashboard</span>
              </div>
            </div>

            <h1 className={`headline ${v(4)?'in':''}`}>
              Command Your<br/>Empire with<br/><span className="headline-gold">Precision.</span>
            </h1>

            <p className={`body-text ${v(4)?'in':''}`}>
              The only dashboard built for executives who demand real-time clarity.
              Unified intelligence across every department — delivered the instant decisions must be made.
            </p>

            <div className={`metrics ${v(4)?'in':''}`}>
              {[
                { lbl:'Revenue MTD', val:`$${count.rev}M`, delta:'↑ 12.4%' },
                { lbl:'Active Users', val:count.users.toLocaleString(), delta:'↑ 8.1%' },
                { lbl:'Uptime SLA',   val:`${count.uptime}%`, delta:'↑ 0.1%' },
              ].map((m,i)=>(
                <div className="met" key={i}>
                  <div className="met-bar"/>
                  <div className="met-lbl">{m.lbl}</div>
                  <div className="met-val">{m.val}</div>
                  <div className="met-delta">{m.delta}</div>
                </div>
              ))}
            </div>

            <div className={`ctas ${v(4)?'in':''}`}>
              <button className="cta-p" onClick={()=>navigate('/login')}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Sign In to Dashboard
              </button>
              <button className="cta-s" onClick={() => navigate('/organization')}>Create Organization</button>
            </div>
          </div>

          <div className="hero-right">
            <div className={`dash-scene ${v(4)?'in':''}`}
              style={{ transform:`perspective(1300px) rotateY(${-7+px*0.07}deg) rotateX(${2+py*0.04}deg) translateY(${py*3}px)` }}>

              <div className="screen-glow"/>
              <div className="fbadge fbadge-a">
                <div className="fb-lbl">Q4 Revenue</div>
                <div className="fb-val">$4.2M</div>
                <div className="fb-sub">↑ 12.4% vs last quarter</div>
              </div>
              <div className="fbadge fbadge-b">
                <div className="fb-lbl">Board Report</div>
                <div className="fb-val" style={{fontSize:13,color:'var(--text)'}}>Generated ✓</div>
                <div className="fb-sub">2 minutes ago</div>
              </div>

              <div className="dash-frame">
                <div className="dbar">
                  <div className="ddots">
                    <div className="dd dd-r"/><div className="dd dd-y"/><div className="dd dd-g"/>
                  </div>
                  <div className="durl">
                    <span className="dlock">🔒</span>app.apex-dashboard.io/overview
                  </div>
                </div>

                <div className="dbody">
                  <div className="dtopbar">
                    <div>
                      <div className="dwelcome">Good morning, Richard.</div>
                      <div className="ddate">Monday, March 02, 2026</div>
                    </div>
                    <div className="davatar">RC</div>
                  </div>

                  <div className="kpis">
                    {[
                      {cls:'kpi-g', val:'$4.2M', lbl:'Revenue',     badge:'+12%', up:true, sub:'vs last month'},
                      {cls:'kpi-gr',val:'94.2%', lbl:'Satisfaction', badge:'+2.1%',up:true, sub:'NPS score'},
                      {cls:'kpi-b', val:'2,847', lbl:'Active Users', badge:'+8%', up:true, sub:'this week'},
                    ].map((k,i)=>(
                      <div className={`kpi ${k.cls}`} key={i}>
                        <div className="kv">{k.val}</div>
                        <div className="kl">{k.lbl}</div>
                        <div className="kd">
                          <span className={`kbadge ${k.up?'kb-u':'kb-d'}`}>{k.badge}</span>
                          <span className="ks">{k.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="chart-box">
                    <div className="chart-top">
                      <div className="chart-ttl">Revenue Overview</div>
                      <div className="periods">
                        {['1W','1M','Q','YTD'].map((p,i)=>(
                          <button key={p} className={`pbtn ${i===2?'pa':'pi'}`}>{p}</button>
                        ))}
                      </div>
                    </div>
                    <div className="barsrow">
                      {BARS.map((h,i)=>(
                        <div key={i} className="bbar" style={{
                          height:`${h*100}%`,
                          animationDelay:`${i*0.045+0.9}s`,
                          background: i===11
                            ? 'linear-gradient(180deg,var(--gold-hi),rgba(191,160,84,0.25))'
                            : `linear-gradient(180deg,rgba(191,160,84,${0.45+h*0.4}),rgba(191,160,84,0.08))`
                        }}/>
                      ))}
                    </div>
                  </div>

                  <div className="acts">
                    {[
                      {ico:'📊',cls:'aico-g', ttl:'Board Report Generated',   sub:'Q4 2025 · 47 slides', time:'2m ago'},
                      {ico:'✓', cls:'aico-gr',ttl:'12 Critical Alerts Resolved',sub:'Ops team · Auto-closed',time:'18m ago'},
                    ].map((a,i)=>(
                      <div className="act" key={i}>
                        <div className={`aico ${a.cls}`}>{a.ico}</div>
                        <div>
                          <div className="attl">{a.ttl}</div>
                          <div className="asub">{a.sub}</div>
                        </div>
                        <div className="atime">{a.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="scene">
          <svg className={`city-svg ${v(1)?'in':''}`} viewBox="0 0 1440 260"
            preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#161C2A"/><stop offset="100%" stopColor="#0C1018"/>
              </linearGradient>
              <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1C2336"/><stop offset="100%" stopColor="#0C1018"/>
              </linearGradient>
              <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12181E"/><stop offset="100%" stopColor="#060810"/>
              </linearGradient>
            </defs>

            {[[0,55,130],[60,38,105],[102,68,165],[174,34,120],[212,52,148],[268,44,138],
              [316,76,178],[396,38,118],[436,62,158],[502,48,144],[554,72,172],[628,43,132],
              [676,58,156],[738,82,188],[824,48,140],[876,66,164],[946,52,150],[1002,78,183],
              [1084,42,130],[1132,62,158],[1200,70,172],[1276,52,146],[1336,38,112]
            ].map(([x,w,h],i)=>(
              <rect key={'b'+i} x={x} y={260-h} width={w} height={h} fill="url(#bg1)" opacity="0.55"/>
            ))}

            {[[8,62,148],[76,48,124],[128,72,162],[204,58,138],[266,86,176],[356,52,128],
              [412,68,152],[484,62,147],[550,76,166],[630,52,132],[686,72,157],[762,88,186],
              [854,58,142],[916,76,166],[996,62,152],[1062,82,176],[1148,52,132],[1206,72,160],
              [1284,88,172]
            ].map(([x,w,h],i)=>(
              <rect key={'m'+i} x={x} y={260-h} width={w} height={h} fill="url(#bg2)" opacity="0.88"/>
            ))}

            {Array.from({length:100},(_,i)=>{
              const wx=10+(i*89)%1420, wy=15+(i*61)%220
              return <rect key={'w'+i} x={wx} y={wy} width={3.5} height={5.5}
                fill={i%9===0?'#BFA054':i%5===0?'#C8D8F0':'#E8EFF8'}
                opacity={0.07+(i%6)*0.05} rx="0.4"/>
            })}

            {[[402,178,220],[760,186,230],[1064,176,216]].map(([x,h,t],i)=>(
              <g key={'ant'+i}>
                <line x1={x} y1={260-h} x2={x} y2={260-t} stroke="#BFA054" strokeWidth="0.8" opacity="0.25"/>
                <circle cx={x} cy={260-t} r="1.2" fill="#BFA054" opacity="0.3"/>
              </g>
            ))}

            <rect x="0" y="240" width="1440" height="20" fill="url(#road)"/>
            <line x1="0" y1="241.5" x2="1440" y2="241.5" stroke="rgba(191,160,84,0.2)" strokeWidth="0.5"/>
            {Array.from({length:22},(_,i)=>(
              <rect key={'d'+i} x={i*65+10} y="249" width="40" height="1.5" rx="0.75"
                fill="rgba(255,255,255,0.055)"/>
            ))}
          </svg>

          <div className="car-track">
            {v(1) && (
              <div className="car-anim">
                <svg width="290" height="88" viewBox="0 0 290 88" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#24262F"/><stop offset="45%" stopColor="#13151C"/><stop offset="100%" stopColor="#09090E"/>
                    </linearGradient>
                    <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1C1E28"/><stop offset="100%" stopColor="#0C0E16"/>
                    </linearGradient>
                    <linearGradient id="cg" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0C1E30" stopOpacity="0.96"/>
                      <stop offset="100%" stopColor="#1A3A5A" stopOpacity="0.92"/>
                    </linearGradient>
                    <radialGradient id="wg" cx="50%" cy="30%">
                      <stop offset="0%" stopColor="#3C3C3C"/>
                      <stop offset="55%" stopColor="#1C1C1C"/>
                      <stop offset="100%" stopColor="#080808"/>
                    </radialGradient>
                    <radialGradient id="hl" cx="0%" cy="50%">
                      <stop offset="0%" stopColor="#FFFDE8" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#FFFDE8" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="cs"><feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000" floodOpacity="0.55"/></filter>
                  </defs>

                  <ellipse cx="147" cy="82" rx="120" ry="7" fill="rgba(0,0,0,0.42)"/>
                  <path d="M20 60 L20 50 L270 50 L270 60 Q270 67 262 69 L28 69 Q20 67 20 60Z" fill="url(#cb)"/>
                  <path d="M20 50 L30 32 Q38 24 60 22 L100 18 Q122 14 148 14 L198 14 Q230 14 255 26 L270 42 L270 50Z" fill="url(#cb)" filter="url(#cs)"/>
                  <path d="M102 18 Q114 6 142 5 L192 5 Q218 6 228 16 L198 14 L148 14 L100 18Z" fill="url(#cr)"/>
                  <path d="M103 18 L116 7 L144 5 L144 16Z" fill="url(#cg)" opacity="0.93"/>
                  <path d="M149 5 L192 5 Q216 6 226 16 L198 14 L149 16Z" fill="url(#cg)" opacity="0.9"/>
                  <path d="M105 17 L116 8 L128 6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeLinecap="round"/>
                  <path d="M152 6 L195 6 Q212 7 222 15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7"/>
                  <path d="M100 18 L113 5 L144 4 L198 4 Q222 5 230 16" fill="none" stroke="rgba(191,160,84,0.22)" strokeWidth="0.8"/>
                  <path d="M100 18 L100 67 L149 67 L149 18Z" fill="#121420" stroke="rgba(191,160,84,0.06)" strokeWidth="0.5"/>
                  <rect x="120" y="40" width="18" height="5" rx="2.5" fill="rgba(191,160,84,0.38)"/>
                  <line x1="100" y1="18" x2="100" y2="67" stroke="rgba(191,160,84,0.14)" strokeWidth="0.8"/>
                  <g className={`door-grp ${phase>=2?'open':''}`}>
                    <path d="M152 18 L152 67 L228 67 L228 26 Z" fill="#111320" stroke="rgba(191,160,84,0.07)" strokeWidth="0.5"/>
                    <rect x="198" y="40" width="18" height="5" rx="2.5" fill="rgba(191,160,84,0.48)"/>
                  </g>
                  <line x1="152" y1="18" x2="152" y2="67" stroke="rgba(191,160,84,0.18)" strokeWidth="0.8"/>
                  <line x1="20" y1="48" x2="270" y2="48" stroke="rgba(191,160,84,0.14)" strokeWidth="0.8"/>
                  <line x1="20" y1="67" x2="270" y2="67" stroke="rgba(191,160,84,0.1)" strokeWidth="0.8"/>
                  <path d="M30 42 L260 42" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <ellipse cx="285" cy="40" rx="32" ry="10" fill="url(#hl)" opacity="0.35"/>
                  <path d="M265 31 Q277 34 280 40 Q277 46 265 49 L263 47 Q272 40 263 33Z" fill="#FFFEF0" opacity="0.95"/>
                  <line x1="264" y1="31" x2="255" y2="24" stroke="#FFFEF0" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
                  <path d="M20 32 L24 48 L20 54Z" fill="#C0392B" opacity="0.85"/>
                  <rect x="19" y="32" width="5" height="7" rx="0.8" fill="#E74C3C" opacity="0.75"/>
                  <rect x="19" y="41" width="5" height="8" rx="0.8" fill="#7B241C" opacity="0.8"/>
                  <ellipse cx="32" cy="68" rx="4" ry="2" fill="#141414"/>
                  <ellipse cx="43" cy="68" rx="4" ry="2" fill="#141414"/>
                  {[72,214].map((cx,i)=>(
                    <g key={i}>
                      <circle cx={cx} cy="70" r="19" fill="#0A0A0A"/>
                      <circle cx={cx} cy="70" r="19" fill="url(#wg)"/>
                      <circle cx={cx} cy="70" r="19" fill="none" stroke="#252525" strokeWidth="3.5"/>
                      <circle cx={cx} cy="70" r="12.5" fill="#181818"/>
                      <circle cx={cx} cy="70" r="11.5" fill="#1E1E1E"/>
                      {[0,51.4,102.8,154.2,205.6,257,308.4].map((a,j)=>{
                        const r=a*Math.PI/180
                        return <line key={j} x1={cx} y1={70}
                          x2={cx+9.5*Math.cos(r)} y2={70+9.5*Math.sin(r)}
                          stroke="#888" strokeWidth="1.6" strokeLinecap="round"/>
                      })}
                      <circle cx={cx} cy="70" r="4.5" fill="#BFA054" opacity="0.65"/>
                      <circle cx={cx} cy="70" r="2.2" fill="#E2C47A"/>
                      <circle cx={cx} cy="70" r="8.5" fill="none" stroke="#2A2A2A" strokeWidth="0.5"/>
                    </g>
                  ))}
                  <line x1="180" y1="5" x2="180" y2="1" stroke="#555" strokeWidth="1"/>
                  <circle cx="180" cy="0.5" r="1.5" fill="#777"/>
                </svg>
              </div>
            )}
          </div>

          {v(1) && (
            <div className={`ceo ${phase>=3?'in':''}`}>
              <div className="ceo-body">
                <svg width="54" height="118" viewBox="0 0 54 118" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E2028"/><stop offset="100%" stopColor="#0E0F16"/>
                    </linearGradient>
                    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E8C49E"/><stop offset="100%" stopColor="#C8A07A"/>
                    </linearGradient>
                    <linearGradient id="pant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#18191F"/><stop offset="100%" stopColor="#0C0D12"/>
                    </linearGradient>
                  </defs>
                  <ellipse cx="27" cy="116" rx="17" ry="4" fill="rgba(0,0,0,0.32)"/>
                  <rect x="14.5" y="72" width="10" height="40" rx="3.5" fill="url(#pant)"/>
                  <rect x="27.5" y="72" width="10" height="40" rx="3.5" fill="#141520"/>
                  <path d="M11 109 Q13.5 107 18 107 L24.5 107 Q26 107.5 26 110 L26 114 Q19 116 11 113Z" fill="#0A0A0A"/>
                  <path d="M25.5 109 Q28 107 32.5 107 L38 107 Q39.5 107.5 39.5 110 L39.5 114 Q32.5 116 25.5 113Z" fill="#0C0C0C"/>
                  <path d="M13 109 Q16 108 20 108" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
                  <path d="M27 109 Q30 108 35 108" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
                  <path d="M7 44 L7 74 L46 74 L46 44 Q39 37 27 37 Q15 37 7 44Z" fill="url(#suit)"/>
                  <path d="M7 44 L10 50 L10 74 L7 74Z" fill="rgba(255,255,255,0.02)"/>
                  <path d="M46 44 L43 50 L43 74 L46 74Z" fill="rgba(0,0,0,0.1)"/>
                  <path d="M27 39 L22 54 L27 61 L32 54 Z" fill="#F0EDE6" opacity="0.96"/>
                  <path d="M22 39 L18 44 L22 54 L27 42Z" fill="#181920"/>
                  <path d="M32 39 L36 44 L32 54 L27 42Z" fill="#1C1D24"/>
                  <path d="M25 50 L24 68 L27 72 L30 68 L29 50Z" fill="#8B1A1A" opacity="0.95"/>
                  <path d="M24.5 48 L27 52 L29.5 48Z" fill="#6B1010"/>
                  <path d="M26.2 54 L26.2 67" stroke="#A52020" strokeWidth="0.4" opacity="0.4"/>
                  <rect x="24.5" y="60" width="5" height="1.5" rx="0.75" fill="#BFA054" opacity="0.7"/>
                  <path d="M38 46 L42 43 L44 47 L41 49Z" fill="#BFA054" opacity="0.75"/>
                  <circle cx="27" cy="63" r="1" fill="rgba(200,190,180,0.4)"/>
                  <circle cx="27" cy="58" r="0.8" fill="rgba(200,190,180,0.3)"/>
                  <rect x="2" y="43" width="9" height="29" rx="4.5" fill="#191A22" transform="rotate(-5,6,57)"/>
                  <ellipse cx="4" cy="73" rx="4.5" ry="3" fill="url(#skin)" transform="rotate(-5,4,73)"/>
                  <g className="arm-r">
                    <rect x="43" y="43" width="9" height="27" rx="4.5" fill="#161720"/>
                    <ellipse cx="47" cy="71" rx="4.5" ry="3" fill="url(#skin)"/>
                    <rect x="41" y="72" width="20" height="13" rx="2.5" fill="#5C3E18"/>
                    <rect x="41" y="72" width="20" height="13" rx="2.5" fill="none" stroke="#7A5525" strokeWidth="0.8"/>
                    <path d="M47 72 L47 68.5 Q51 67 55 68.5 L55 72" fill="none" stroke="#4A3010" strokeWidth="1.6" strokeLinecap="round"/>
                    <rect x="41" y="76" width="20" height="1.2" fill="rgba(122,85,37,0.35)"/>
                    <rect x="49.5" y="73" width="3" height="12" rx="0.5" fill="#7A5525" opacity="0.3"/>
                    <rect x="49" y="76" width="4" height="5" rx="1" fill="#BFA054" opacity="0.8"/>
                    <rect x="50" y="76.5" width="2" height="4" rx="0.5" fill="#E2C47A" opacity="0.5"/>
                  </g>
                  <rect x="23" y="32" width="8" height="9" rx="3" fill="url(#skin)"/>
                  <ellipse cx="27" cy="23" rx="12" ry="13.5" fill="url(#skin)"/>
                  <path d="M15 19 Q15 8 27 8 Q39 8 39 19 Q37 12 27 12 Q17 12 15 19Z" fill="#22201C" opacity="0.95"/>
                  <path d="M15 19 Q14 22 14.5 25.5 Q13.5 21 15.5 19Z" fill="#8A8480" opacity="0.75"/>
                  <path d="M39 19 Q40 22 39.5 25.5 Q40.5 21 38.5 19Z" fill="#8A8480" opacity="0.75"/>
                  <path d="M18 13 Q22 9 27 9" stroke="#181610" strokeWidth="0.5" fill="none" opacity="0.6"/>
                  <ellipse cx="15" cy="23" rx="2.2" ry="3.2" fill="#D4A07A" opacity="0.9"/>
                  <ellipse cx="39" cy="23" rx="2.2" ry="3.2" fill="#D4A07A" opacity="0.9"/>
                  <path d="M15.5 21 Q15 23 15.5 25" stroke="#C08060" strokeWidth="0.6" fill="none"/>
                  <path d="M20 19.5 Q22.5 17.5 25.5 18.5" stroke="#2A1F12" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                  <path d="M28.5 18.5 Q31.5 17.5 34 19.5" stroke="#2A1F12" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="22.5" cy="23.5" rx="2.4" ry="2.7" fill="#1E1510"/>
                  <ellipse cx="31.5" cy="23.5" rx="2.4" ry="2.7" fill="#1E1510"/>
                  <ellipse cx="23.2" cy="22.8" rx="0.9" ry="0.9" fill="#FFFFFF" opacity="0.65"/>
                  <ellipse cx="32.2" cy="22.8" rx="0.9" ry="0.9" fill="#FFFFFF" opacity="0.65"/>
                  <circle cx="22.5" cy="23.5" r="4.2" fill="none" stroke="#BFA054" strokeWidth="0.9" opacity="0.8"/>
                  <circle cx="31.5" cy="23.5" r="4.2" fill="none" stroke="#BFA054" strokeWidth="0.9" opacity="0.8"/>
                  <line x1="26.7" y1="23.5" x2="27.3" y2="23.5" stroke="#BFA054" strokeWidth="0.9" opacity="0.8"/>
                  <line x1="15" y1="22.5" x2="18.3" y2="23" stroke="#BFA054" strokeWidth="0.9" opacity="0.65"/>
                  <line x1="35.7" y1="23" x2="39" y2="22.5" stroke="#BFA054" strokeWidth="0.9" opacity="0.65"/>
                  <circle cx="22.5" cy="23.5" r="4.2" fill="rgba(20,40,60,0.18)"/>
                  <circle cx="31.5" cy="23.5" r="4.2" fill="rgba(20,40,60,0.18)"/>
                  <path d="M25.5 26 Q27 30 28.5 26" stroke="#B88060" strokeWidth="0.9" fill="none" opacity="0.55"/>
                  <ellipse cx="25" cy="29" rx="1.2" ry="0.7" fill="#B08060" opacity="0.25"/>
                  <ellipse cx="29" cy="29" rx="1.2" ry="0.7" fill="#B08060" opacity="0.25"/>
                  <path d="M22.5 33 Q27 36 31.5 33" stroke="#A07050" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                  <path d="M23.5 33 Q27 34 30.5 33" stroke="#B08060" strokeWidth="0.5" fill="none" opacity="0.4"/>
                  <path d="M20 35 Q27 38 34 35" stroke="#C0906A" strokeWidth="0.5" fill="none" opacity="0.2"/>
                </svg>
              </div>
            </div>
          )}

          <div className="ground-line"/>
        </div>

        <div className={`scroll-i ${v(4)?'in':''}`}>
          <div className="smouse"><div className="swheel"/></div>
          <div className="slbl">Explore</div>
        </div>
      </div>
    </>
  )
}
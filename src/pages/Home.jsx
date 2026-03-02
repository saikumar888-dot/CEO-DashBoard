import { useNavigate } from "react-router-dom";
import dashboardImg from "../assets/ceo.png";
import graphImg from "../assets/graph.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --coal: #0b0d0f;
          --steel-dark: #111418;
          --steel-mid: #1a1f26;
          --steel-light: #252b34;
          --plate: #2e3540;
          --amber: #f97316;
          --amber-glow: #fb923c;
          --silver: #8a96a3;
          --mist: #c4cdd6;
          --white: #f0f4f8;
        }

        .steel-page {
          min-height: 100vh;
          background: var(--coal);
          font-family: 'DM Sans', sans-serif;
          color: var(--white);
        }

        /* HEADER */
        .steel-header {
          background: var(--steel-dark);
          border-bottom: 1px solid var(--plate);
          padding: 0 48px;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .steel-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.12em;
          font-size: 1.35rem;
          text-transform: uppercase;
        }

        .steel-header span {
          color: var(--amber);
        }

        .btn-login-header {
          border: 1px solid var(--amber);
          background: transparent;
          color: var(--amber);
          padding: 8px 24px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .btn-login-header:hover {
          background: var(--amber);
          color: var(--coal);
        }

        /* HERO */
        .steel-hero {
          background: var(--steel-dark);
          padding: 96px 48px 112px;
          position: relative;
          overflow: hidden;
        }

        .steel-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(249,115,22,0.08) 0%, transparent 70%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 79px,
              rgba(255,255,255,0.025) 79px,
              rgba(255,255,255,0.025) 80px
            );
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 24px;
        }

        .steel-hero h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          line-height: 1.05;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          max-width: 720px;
        }

        .steel-hero h2 em {
          color: var(--amber);
          font-style: normal;
        }

        .hero-sub {
          margin-top: 20px;
          font-size: 1rem;
          color: var(--silver);
          max-width: 520px;
          line-height: 1.7;
        }

        .hero-actions {
          margin-top: 40px;
          display: flex;
          gap: 16px;
        }

        .btn-primary {
          background: var(--amber);
          color: var(--coal);
          padding: 14px 36px;
          border: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: var(--amber-glow);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--plate);
          color: var(--mist);
          padding: 14px 36px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: var(--silver);
        }

        /* GRAPH PREVIEW */
        .hero-graph {
          margin-top: 48px;
          display: flex;
          justify-content: center;
        }

        .hero-graph img {
          max-width: 720px;
          width: 100%;
          background: var(--steel-mid);
          padding: 14px;
          border: 1px solid var(--plate);
        }

        /* RIGHT IMAGE */
        .hero-image {
          background: var(--steel-mid);
          padding: 14px;
          border: 1px solid var(--plate);
        }

        .hero-image img {
          width: 100%;
          display: block;
        }

        /* FEATURES */
        .features-section {
          padding: 80px 48px;
        }

        .features-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 56px;
        }

        .features-header h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .features-header::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--plate), transparent);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2px;
        }

        .feature-card {
          background: var(--steel-mid);
          padding: 32px 28px;
          border-left: 3px solid transparent;
        }

        .feature-card:hover {
          background: var(--steel-light);
          border-left-color: var(--amber);
        }

        .feature-number {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem;
          color: var(--amber);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          display: block;
        }

        .feature-card h5 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .feature-card p {
          font-size: 0.82rem;
          color: var(--silver);
        }

        /* FOOTER */
        .footer-cta {
          background: var(--steel-dark);
          border-top: 1px solid var(--plate);
          padding: 80px 48px;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="steel-page">
        {/* HEADER */}
        <header className="steel-header">
          <h1>Company&apos;s <span>CEO</span> Dashboard</h1>
          <button onClick={() => navigate("/login")} className="btn-login-header">
            Login
          </button>
        </header>

        {/* HERO */}
        <section className="steel-hero">
          <div className="hero-grid">
            {/* LEFT */}
            <div>
              <div className="hero-eyebrow">Executive Intelligence Platform</div>
              <h2>
                Production, cost &amp; performance —<br />
                <em>one dashboard.</em>
              </h2>
              <p className="hero-sub">
                A centralized intelligence platform designed specifically for steel industry leaders.
              </p>

              <div className="hero-actions">
                <button onClick={() => navigate("/login")} className="btn-primary">
                  Login to Dashboard
                </button>
                <button onClick={() => navigate("/organization")} className="btn-secondary">
                  New Organization
                </button>
              </div>

              {/* GRAPH BELOW BUTTONS */}
              <div className="hero-graph">
                <img src={graphImg} alt="Dashboard Analytics Preview" />
              </div>
            </div>

            {/* RIGHT (CEO IMAGE – previous position) */}
            <div className="hero-image">
              <img src={dashboardImg} alt="CEO Dashboard Overview" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <div className="features-header">
            <h3>What You&apos;ll Monitor</h3>
          </div>
          <div className="features-grid">
            <Feature index="01" title="Production & Plant Efficiency" />
            <Feature index="02" title="Raw Material & Inventory" />
            <Feature index="03" title="Energy & Cost Control" />
            <Feature index="04" title="Sales & Market Prices" />
            <Feature index="05" title="Profitability & Margins" />
            <Feature index="06" title="Safety & Compliance" />
          </div>
        </section>

        {/* FOOTER */}
        <section className="footer-cta">
          <h4>Built for Companies. Designed for Decision-Makers.</h4>
          <p>Get clarity before issues become losses.</p>
          <button onClick={() => navigate("/login")} className="btn-primary">
            Access Dashboard
          </button>
        </section>
      </div>
    </>
  );
};

const Feature = ({ title, index }) => (
  <div className="feature-card">
    <span className="feature-number">{index}</span>
    <h5>{title}</h5>
    <p>Real-time visibility and alerts to support fast, informed decisions.</p>
  </div>
);

export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Background */}
      <div className="bg-radial" />
      <div className="bg-grid" />
      <div className="bg-vignette" />

      {/* Nav */}
      <nav className="nav in">
        <div className="nav-brand" onClick={() => navigate("/")}>
          <div className="brand-mark">A</div>
          RevenueRadar
        </div>

        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/")}>Home</button>
          <button className="nav-link" onClick={() => navigate("/organization")}>Organization</button>
        </div>

        <div className="nav-actions">
          <button className="nbtn nbtn-solid" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div className="hero-left" style={{ maxWidth: 920 }}>

          {/* Hero */}
          <h1 className="headline in">
            See Your Revenue.
            <br />
            <span className="headline-gold">Run Your Business.</span>
          </h1>

          <p className="body-text in" style={{ maxWidth: 640 }}>
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              RevenueRadar
            </strong>{" "}
            is a real-time revenue and operations intelligence platform built for
            leaders who demand clarity. We unify critical business metrics into a
            single command view — enabling faster decisions, sharper execution,
            and confident growth.
          </p>

          {/* Sections */}
          <div className="metrics in" style={{ flexDirection: "column" }}>

            {/* Philosophy */}
            <div className="met">
              <div className="met-bar" />
              <div className="met-lbl">Our Philosophy</div>

              <p className="body-text" style={{ margin: 0 }}>
                Most organizations operate with delayed reports, fragmented
                tools, and reactive decision-making. RevenueRadar exists to
                replace hindsight with live operational truth.
              </p>

              <ul className="body-text" style={{ marginTop: 14, paddingLeft: 18 }}>
                <li>• Revenue data should be real-time, not retrospective</li>
                <li>• Insights should be unified, not scattered</li>
                <li>• Dashboards should drive decisions, not noise</li>
                <li>• Design should simplify complexity</li>
              </ul>
            </div>

            {/* What it does */}
            <div className="met">
              <div className="met-bar" />
              <div className="met-lbl">What RevenueRadar Does</div>

              <p className="body-text" style={{ margin: 0 }}>
                RevenueRadar functions as a live command center for revenue and
                operational performance.
              </p>

              <ul className="body-text" style={{ marginTop: 14, paddingLeft: 18 }}>
                <li>• Real-time revenue and KPI tracking</li>
                <li>• Unified intelligence across teams and systems</li>
                <li>• Automated, board-ready reporting</li>
                <li>• Instant alerts when thresholds are crossed</li>
                <li>• Enterprise-grade reliability and uptime</li>
              </ul>
            </div>

            {/* Built for leaders */}
            <div className="met">
              <div className="met-bar" />
              <div className="met-lbl">Built for Leaders</div>

              <p className="body-text" style={{ margin: 0 }}>
                RevenueRadar is designed for founders, executives, and operators
                running complex or high-growth organizations. Every interaction
                is engineered to reduce cognitive load and accelerate
                understanding.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div
            className="dash-frame"
            style={{
              marginTop: 56,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h2 className="headline-gold" style={{ fontSize: 30 }}>
              Our Mission
            </h2>
            <p
              className="body-text"
              style={{ maxWidth: 560, margin: "16px auto 0" }}
            >
              To give business leaders instant, trustworthy visibility into
              revenue and operations — so decisions are made with clarity,
              confidence, and speed.
            </p>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 96, textAlign: "center" }}>
            <div className="live-lbl" style={{ letterSpacing: "0.25em" }}>
              RevenueRadar — Real-Time Revenue Intelligence
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
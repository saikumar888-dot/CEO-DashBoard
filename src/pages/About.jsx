import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-[#060810] text-[#E8E4DC] px-6 md:px-16 lg:px-32 py-20">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs tracking-[0.35em] uppercase text-[#BFA054] mb-6">
          About RevenueRadar
        </p>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
          See Your Revenue.
          <br />
          <span className="italic font-semibold bg-gradient-to-br from-[#E2C47A] to-[#BFA054] bg-clip-text text-transparent">
            Run Your Business.
          </span>
        </h1>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed text-[#6B7385] max-w-3xl mb-20">
          <span className="text-[#E8E4DC] font-medium">RevenueRadar</span> is a
          real-time revenue and operations intelligence platform built for
          leaders who demand clarity. We unify critical business metrics into a
          single command view — enabling faster decisions, sharper execution, and
          confident growth.
        </p>

        {/* Sections */}
        <div className="space-y-14">

          {/* Philosophy */}
          <div className="bg-[#0C1018] border border-[rgba(191,160,84,0.15)] rounded-2xl p-10">
            <h3 className="font-serif text-2xl mb-4">Our Philosophy</h3>
            <p className="text-sm leading-relaxed text-[#6B7385] mb-6">
              Most organizations operate with delayed reports, fragmented tools,
              and reactive decision-making. RevenueRadar exists to replace
              hindsight with live operational truth.
            </p>
            <ul className="space-y-3 text-sm">
              <li>• Revenue data should be real-time, not retrospective</li>
              <li>• Insights should be unified, not scattered</li>
              <li>• Dashboards should drive decisions, not noise</li>
              <li>• Design should simplify complexity</li>
            </ul>
          </div>

          {/* What it does */}
          <div className="bg-[#0C1018] border border-[rgba(191,160,84,0.15)] rounded-2xl p-10">
            <h3 className="font-serif text-2xl mb-4">What RevenueRadar Does</h3>
            <p className="text-sm leading-relaxed text-[#6B7385] mb-6">
              RevenueRadar functions as a live command center for revenue and
              operational performance.
            </p>
            <ul className="space-y-3 text-sm">
              <li>• Real-time revenue and KPI tracking</li>
              <li>• Unified intelligence across teams and systems</li>
              <li>• Automated, board-ready reporting</li>
              <li>• Instant alerts when thresholds are crossed</li>
              <li>• Enterprise-grade reliability and uptime</li>
            </ul>
          </div>

          {/* Built for leaders */}
          <div className="bg-[#0C1018] border border-[rgba(191,160,84,0.15)] rounded-2xl p-10">
            <h3 className="font-serif text-2xl mb-4">Built for Leaders</h3>
            <p className="text-sm leading-relaxed text-[#6B7385]">
              RevenueRadar is designed for founders, executives, and operators
              running complex or high-growth organizations. Every interaction is
              engineered to reduce cognitive load and accelerate understanding.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center bg-gradient-to-b from-[rgba(191,160,84,0.12)] to-[#0C1018] border border-[rgba(191,160,84,0.25)] rounded-3xl px-10 py-16">
            <h2 className="font-serif text-3xl mb-6">Our Mission</h2>
            <p className="text-base leading-relaxed text-[#6B7385] max-w-2xl mx-auto">
              To give business leaders instant, trustworthy visibility into
              revenue and operations — so decisions are made with clarity,
              confidence, and speed.
            </p>
          </div>

        </div>

        {/* Footer line */}
        <div className="mt-24 text-center text-xs tracking-[0.25em] uppercase text-[#BFA054]">
          RevenueRadar — Real-Time Revenue Intelligence
        </div>

      </div>
    </div>
  )
}

export default About
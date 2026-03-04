import React, { useState, useEffect, useRef } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom"


/* ──────────────────────────────────────────────────────────
   MOCK DATA  — mirrors your backend schemas:
   CashFlow · Department · Revenue · User · Widget
   ────────────────────────────────────────────────────────── */

const MONTHS = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar']

const cashFlowData = [
  { month:'Aug', revenue:3.1, expense:2.2, profit:0.9 },
  { month:'Sep', revenue:3.4, expense:2.4, profit:1.0 },
  { month:'Oct', revenue:3.7, expense:2.5, profit:1.2 },
  { month:'Nov', revenue:3.9, expense:2.8, profit:1.1 },
  { month:'Dec', revenue:4.5, expense:3.0, profit:1.5 },
  { month:'Jan', revenue:4.1, expense:2.7, profit:1.4 },
  { month:'Feb', revenue:4.4, expense:2.9, profit:1.5 },
  { month:'Mar', revenue:4.2, expense:2.6, profit:1.6 },
]

const departments = [
  { name:'Engineering',  head:'Arjun Mehta',  budgetAllocated:1200000, budgetUsed:876000 },
  { name:'Marketing',    head:'Priya Sharma', budgetAllocated:600000,  budgetUsed:512000 },
  { name:'Sales',        head:'Rohan Gupta',  budgetAllocated:900000,  budgetUsed:430000 },
  { name:'Finance',      head:'Nisha Patel',  budgetAllocated:400000,  budgetUsed:398000 },
  { name:'Operations',   head:'Karan Joshi',  budgetAllocated:750000,  budgetUsed:620000 },
]

const revenueSources = [
  { source:'SaaS Subscriptions', amount:1840000, type:'Recurring', color:'#BFA054' },
  { source:'Enterprise Contracts', amount:1120000, type:'OneTime', color:'#5B8BF5' },
  { source:'Professional Services', amount:680000, type:'OneTime', color:'#3DBA7E' },
  { source:'API Licensing',         amount:380000, type:'Recurring', color:'#F0A030' },
  { source:'Marketplace Fees',      amount:180000, type:'Recurring', color:'#8B6BCC' },
]
const totalRevenueSrc = revenueSources.reduce((s,r)=>s+r.amount,0)

const recentActivity = [
  { icon:'💰', cls:'act-gold',  title:'Invoice #INV-0482 Received',       sub:'Tata Consultancy · Enterprise', time:'14m ago', amount:'+₹8.4L',  pos:true },
  { icon:'📊', cls:'act-blue',  title:'Q1 2026 Report Generated',          sub:'Finance · 52 slides auto-built', time:'32m ago', amount:null,        pos:null },
  { icon:'✓',  cls:'act-green', title:'Ops Budget Approved',               sub:'₹7.5L sanctioned',              time:'1h ago',  amount:'+₹7.5L',  pos:true },
  { icon:'⚠',  cls:'act-red',   title:'Marketing Budget at 85%',           sub:'₹5.12L of ₹6L used',            time:'2h ago',  amount:null,        pos:null },
  { icon:'👤', cls:'act-blue',  title:'New HOD Assigned — Engineering',    sub:'Arjun Mehta · Active',           time:'3h ago',  amount:null,        pos:null },
  { icon:'💸', cls:'act-gold',  title:'API Licensing Renewal',             sub:'InfraStack · ₹3.8L quarterly',   time:'5h ago',  amount:'+₹3.8L',  pos:true },
]

const users = [
  { initials:'RC', name:'Richard Chen',   role:'CEO',     av:'av-gold',  online:true },
  { initials:'NP', name:'Nisha Patel',    role:'FINANCE', av:'av-green', online:true },
  { initials:'AM', name:'Arjun Mehta',    role:'HOD',     av:'av-blue',  online:true },
  { initials:'PS', name:'Priya Sharma',   role:'HOD',     av:'av-amber', online:false },
  { initials:'RG', name:'Rohan Gupta',    role:'HOD',     av:'av-blue',  online:true },
  { initials:'KJ', name:'Karan Joshi',    role:'ADMIN',   av:'av-green', online:false },
]

const kpiData = {
  Monthly: {
    revenue: '$4.2M', revDelta: '+12.4%', revUp: true,
    netProfit: '$1.6M', profitDelta: '+8.1%', profitUp: true,
    cashInBank: '$11.8M', cashDelta: '+3.2%', cashUp: true,
    burnRate: '$2.6M', burnDelta: '-4.2%', burnUp: false,
    runway: 18, runwayFill: 72,
    grossMargin: '38.1%', gmDelta: '+1.2%', gmUp: true,
  },
  Quarterly: {
    revenue: '$12.6M', revDelta: '+18.7%', revUp: true,
    netProfit: '$4.8M', profitDelta: '+11.2%', profitUp: true,
    cashInBank: '$11.8M', cashDelta: '+3.2%', cashUp: true,
    burnRate: '$7.8M', burnDelta: '-2.1%', burnUp: false,
    runway: 18, runwayFill: 72,
    grossMargin: '38.1%', gmDelta: '+1.2%', gmUp: true,
  },
  Yearly: {
    revenue: '$48.4M', revDelta: '+22.3%', revUp: true,
    netProfit: '$17.2M', profitDelta: '+14.8%', profitUp: true,
    cashInBank: '$11.8M', cashDelta: '+3.2%', cashUp: true,
    burnRate: '$31.2M', burnDelta: '-0.8%', burnUp: false,
    runway: 18, runwayFill: 72,
    grossMargin: '38.1%', gmDelta: '+1.2%', gmUp: true,
  }
}

/* ── helpers ── */
const fmt = (n) => `₹${(n/100000).toFixed(1)}L`
const fmtCr = (n) => n >= 10000000 ? `₹${(n/10000000).toFixed(2)}Cr` : `₹${(n/100000).toFixed(1)}L`
const roleClass = { CEO:'role-ceo', HOD:'role-hod', FINANCE:'role-fin', ADMIN:'role-adm' }

/* ── custom recharts tooltip ── */
const CashTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:6,marginTop:3}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:p.color}}/>
          <span style={{fontSize:10,color:'var(--muted)',textTransform:'capitalize'}}>{p.name}</span>
          <span style={{marginLeft:'auto',fontWeight:600,color:'var(--text)',fontFamily:"'Cormorant Garamond',serif",fontSize:14}}>
            ${p.value}M
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('Monthly')
  const [activeNav, setActiveNav] = useState('overview')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("organizationCreated")
    navigate("/home")
  }


  const kpi = kpiData[period]

  const dateStr = now.toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric'
  })
  const timeStr = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })

  const nav = [
    { id:'overview',    icon:'◈', label:'Overview' },
    { id:'cashflow',    icon:'⬡', label:'Cash Flow' },
    { id:'revenue',     icon:'◉', label:'Revenue' },
    { id:'departments', icon:'⊞', label:'Departments' },
    { id:'reports',     icon:'◫', label:'Reports' },
  ]
  const navSec2 = [
    { id:'users',    icon:'⊕', label:'Team', badge: null },
    { id:'settings', icon:'⊘', label:'Settings' },
  ]

  return (
    <div className="db-root">
      {/* ── SIDEBAR ── */}
      <aside className="db-sidebar">
        <div className="db-logo">
          <div className="db-logo-mark">R</div>
          RevenueRadar
        </div>

        <nav className="db-nav">
          <span className="db-nav-section">Main</span>
          {nav.map(n => (
            <button
              key={n.id}
              className={`db-nav-item ${activeNav===n.id?'active':''}`}
              onClick={() => setActiveNav(n.id)}
            >
              <span className="db-nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}

          <span className="db-nav-section">Manage</span>
          {navSec2.map(n => (
            <button
              key={n.id}
              className={`db-nav-item ${activeNav===n.id?'active':''}`}
              onClick={() => setActiveNav(n.id)}
            >
              <span className="db-nav-icon">{n.icon}</span>
              {n.label}
              {n.badge && <span className="db-nav-badge">{n.badge}</span>}
            </button>
          ))}
        </nav>

      <div className="db-sidebar-bottom">
        <div className="db-user-row">
            <div className="db-avatar-sm">RC</div>
            <div>
              <div className="db-user-name">Richard Chen</div>
              <div className="db-user-role">Chief Executive</div>
            </div>
          </div>
        <button className="db-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="db-main">
        {/* Topbar */}
        <header className="db-topbar">
          <div className="db-topbar-left">
            <div className="db-topbar-title">Executive Overview</div>
            <div className="db-topbar-sub">{dateStr} · {timeStr} IST</div>
          </div>
          <div className="db-topbar-right">
            <div className="db-period-switcher">
              {['Monthly','Quarterly','Yearly'].map(p => (
                <button
                  key={p}
                  className={`db-period-btn ${period===p?'active':''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p.slice(0,1) + (p==='Monthly'?'1M':p==='Quarterly'?'Q':'YTD')}
                </button>
              ))}
            </div>
            <div className="db-icon-btn">
              🔔
              <div className="db-notif-dot"/>
            </div>
            <div className="db-icon-btn">⚙</div>
            <div className="db-topbar-avatar">RC</div>
          </div>
        </header>

        {/* Page body */}
        <div className="db-body">

          {/* ── Greeting Banner ── */}
          <div className="db-greeting">
            <div className="db-greeting-text">
              <h2>Good morning, <span>Richard.</span></h2>
              <p>Your empire is performing well — 3 critical items need your attention today.</p>
            </div>
            <div className="db-greeting-stats">
              <div className="db-gstat">
                <div className="db-gstat-val">18</div>
                <div className="db-gstat-lbl">Runway (mo)</div>
              </div>
              <div className="db-gstat">
                <div className="db-gstat-val">5</div>
                <div className="db-gstat-lbl">Departments</div>
              </div>
              <div className="db-gstat">
                <div className="db-gstat-val">6</div>
                <div className="db-gstat-lbl">Active Users</div>
              </div>
            </div>
            <div className="db-live-badge">
              <div className="db-live-dot"/> Live Data
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="db-kpi-row">
            {[
              { icon:'💰', cls:'kpi-gold',  lbl:'Total Revenue',   val: kpi.revenue,    delta: kpi.revDelta,    up: kpi.revUp,    sub: `vs last ${period.toLowerCase()}` },
              { icon:'📈', cls:'kpi-green', lbl:'Net Profit',      val: kpi.netProfit,  delta: kpi.profitDelta, up: kpi.profitUp, sub: `Gross margin ${kpi.grossMargin}` },
              { icon:'🏦', cls:'kpi-blue',  lbl:'Cash in Bank',    val: kpi.cashInBank, delta: kpi.cashDelta,   up: kpi.cashUp,   sub: 'Available liquidity' },
              { icon:'🔥', cls:'kpi-red',   lbl:'Burn Rate',       val: kpi.burnRate,   delta: kpi.burnDelta,   up: !kpi.burnUp,  sub: `${period} operating costs` },
              { icon:'⏱', cls:'kpi-amber', lbl:'Runway',          val: `${kpi.runway}mo`, delta: 'Stable', up: null, sub: 'At current burn rate' },
            ].map((c,i) => (
              <div className={`db-kpi-card ${c.cls}`} key={i}>
                <div className="db-kpi-icon">{c.icon}</div>
                <div className="db-kpi-val">{c.val}</div>
                <div className="db-kpi-lbl">{c.lbl}</div>
                <span className={`db-kpi-delta ${c.up===null?'delta-neu':c.up?'delta-up':'delta-down'}`}>
                  {c.up===null ? '—' : c.up ? '↑' : '↓'} {c.delta}
                </span>
                <div className="db-kpi-sub">{c.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Revenue vs Expense Chart + Activity ── */}
          <div className="db-grid-3">
            <div className="db-card">
              <div className="db-card-head">
                <div>
                  <div className="db-card-title">Revenue vs Expense</div>
                  <div className="db-card-sub">Monthly cash flow performance</div>
                </div>
                <div className="db-tabs">
                  {['Area','Bar'].map(t => (
                    <button key={t} className={`db-tab ${t==='Area'?'active':''}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="db-card-body" style={{paddingTop:8}}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={cashFlowData} margin={{top:4,right:4,bottom:0,left:-20}}>
                    <defs>
                      <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#BFA054" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#BFA054" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#E05252" stopOpacity={0.18}/>
                        <stop offset="95%" stopColor="#E05252" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradPro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#3DBA7E" stopOpacity={0.22}/>
                        <stop offset="95%" stopColor="#3DBA7E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(191,160,84,0.06)" strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="month" tick={{fontSize:9,fill:'#5A6070',fontFamily:'DM Sans'}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fontSize:9,fill:'#5A6070',fontFamily:'DM Sans'}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`}/>
                    <Tooltip content={<CashTip/>}/>
                    <Area type="monotone" dataKey="revenue" stroke="#BFA054" strokeWidth={1.8} fill="url(#gradRev)" dot={false} name="revenue"/>
                    <Area type="monotone" dataKey="expense" stroke="#E05252" strokeWidth={1.5} fill="url(#gradExp)" dot={false} name="expense"/>
                    <Area type="monotone" dataKey="profit"  stroke="#3DBA7E" strokeWidth={1.5} fill="url(#gradPro)" dot={false} name="profit"/>
                  </AreaChart>
                </ResponsiveContainer>
                {/* Legend */}
                <div style={{display:'flex',gap:16,marginTop:12,paddingLeft:4}}>
                  {[['#BFA054','Revenue'],['#E05252','Expense'],['#3DBA7E','Net Profit']].map(([c,l])=>(
                    <div key={l} style={{display:'flex',alignItems:'center',gap:5}}>
                      <div style={{width:8,height:8,borderRadius:2,background:c}}/>
                      <span style={{fontSize:9.5,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="db-card">
              <div className="db-card-head">
                <div>
                  <div className="db-card-title">Recent Activity</div>
                  <div className="db-card-sub">Transactions & events</div>
                </div>
                <button className="db-card-action">View all →</button>
              </div>
              <div className="db-card-body" style={{padding:'8px 16px'}}>
                <div className="db-activity-list">
                  {recentActivity.map((a,i)=>(
                    <div className="db-activity-item" key={i}>
                      <div className={`db-act-icon ${a.cls}`}>{a.icon}</div>
                      <div className="db-act-body">
                        <div className="db-act-title">{a.title}</div>
                        <div className="db-act-sub">{a.sub}</div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:3}}>
                        {a.amount && <span className={`db-act-amount ${a.pos?'pos':'neg'}`}>{a.amount}</span>}
                        <span className="db-act-time">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Department Budgets + Revenue Sources ── */}
          <div className="db-grid-2">
            {/* Dept table */}
            <div className="db-card">
              <div className="db-card-head">
                <div>
                  <div className="db-card-title">Department Budgets</div>
                  <div className="db-card-sub">Allocated vs utilized</div>
                </div>
                <button className="db-card-action">Manage →</button>
              </div>
              <div className="db-card-body" style={{padding:0}}>
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Head</th>
                      <th>Allocated</th>
                      <th>Used %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((d,i) => {
                      const pct = Math.round(d.budgetUsed / d.budgetAllocated * 100)
                      const barCls = pct >= 90 ? 'bar-danger' : pct >= 75 ? 'bar-warn' : 'bar-safe'
                      return (
                        <tr key={i}>
                          <td>
                            <div className="db-dept-name">{d.name}</div>
                          </td>
                          <td><div className="db-dept-head">{d.head}</div></td>
                          <td><span className="db-mono">{fmtCr(d.budgetAllocated)}</span></td>
                          <td style={{minWidth:90}}>
                            <div style={{display:'flex',alignItems:'center',gap:6}}>
                              <div style={{flex:1}}>
                                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                                  <span style={{fontSize:9,color:pct>=90?'var(--red)':pct>=75?'var(--amber)':'var(--green)'}}>{pct}%</span>
                                </div>
                                <div className="db-budget-bar-wrap">
                                  <div className={`db-budget-bar ${barCls}`} style={{width:`${pct}%`}}/>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Revenue Sources */}
            <div className="db-card">
              <div className="db-card-head">
                <div>
                  <div className="db-card-title">Revenue Sources</div>
                  <div className="db-card-sub">By stream · {period}</div>
                </div>
                <div style={{display:'flex',gap:6}}>
                  <span style={{fontSize:9,padding:'3px 8px',borderRadius:4,background:'rgba(61,186,126,0.12)',color:'var(--green)'}}>Recurring</span>
                  <span style={{fontSize:9,padding:'3px 8px',borderRadius:4,background:'var(--blue-dim)',color:'var(--blue)'}}>OneTime</span>
                </div>
              </div>
              <div className="db-card-body">
                {/* Donut */}
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                  <ResponsiveContainer width={110} height={110}>
                    <PieChart>
                      <Pie data={revenueSources} dataKey="amount" cx="50%" cy="50%"
                        innerRadius={28} outerRadius={48} strokeWidth={0} paddingAngle={2}>
                        {revenueSources.map((r,i)=><Cell key={i} fill={r.color}/>)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:'var(--text)',lineHeight:1}}>
                      {fmtCr(totalRevenueSrc)}
                    </div>
                    <div style={{fontSize:9,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',marginTop:4}}>Total {period} Revenue</div>
                    <div style={{fontSize:10,color:'var(--green)',marginTop:6}}>↑ 12.4% vs last period</div>
                  </div>
                </div>

                <div className="db-source-list">
                  {revenueSources.map((r,i) => {
                    const pct = Math.round(r.amount / totalRevenueSrc * 100)
                    return (
                      <div key={i}>
                        <div className="db-source-row" style={{marginBottom:4}}>
                          <div className="db-source-dot" style={{background:r.color}}/>
                          <div className="db-source-name">{r.source}</div>
                          <div className="db-source-amount">{fmtCr(r.amount)}</div>
                          <div className="db-source-pct">{pct}%</div>
                        </div>
                        <div className="db-source-bar-wrap" style={{marginLeft:20,marginBottom:6}}>
                          <div className="db-source-bar" style={{width:`${pct}%`,background:r.color,opacity:0.7}}/>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Cash Flow Summary + Runway + Users ── */}
          <div className="db-grid-3">
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {/* Cash Flow Summary */}
              <div className="db-card">
                <div className="db-card-head">
                  <div>
                    <div className="db-card-title">Cash Flow Summary</div>
                    <div className="db-card-sub">{period} breakdown</div>
                  </div>
                  <span style={{fontSize:9,padding:'3px 8px',borderRadius:100,background:'rgba(191,160,84,0.1)',border:'1px solid rgba(191,160,84,0.2)',color:'var(--gold)'}}>
                    {period}
                  </span>
                </div>
                <div className="db-card-body">
                  <div className="db-cashflow-row">
                    {[
                      { cls:'cf-rev',    lbl:'Total Revenue', val: kpi.revenue,   delta: kpi.revDelta,   up: kpi.revUp },
                      { cls:'cf-exp',    lbl:'Total Expense', val: kpi.burnRate,  delta: kpi.burnDelta,  up: false },
                      { cls:'cf-profit', lbl:'Net Profit',    val: kpi.netProfit, delta: kpi.profitDelta,up: kpi.profitUp },
                    ].map((c,i) => (
                      <div className={`db-cf-item ${c.cls}`} key={i}>
                        <div className="db-cf-lbl">{c.lbl}</div>
                        <div className="db-cf-val">{c.val}</div>
                        <div className={`db-cf-delta ${c.up?'delta-up':'delta-down'}`} style={{fontSize:10,fontWeight:500}}>
                          {c.up?'↑':'↓'} {c.delta}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Burn Rate bar chart */}
                  <div style={{marginTop:16}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>Monthly Burn Trend</span>
                      <span style={{fontSize:10,color:'var(--text-sub)'}}>8-month view</span>
                    </div>
                    <ResponsiveContainer width="100%" height={80}>
                      <BarChart data={cashFlowData} margin={{top:0,right:0,bottom:0,left:-30}}>
                        <CartesianGrid stroke="rgba(191,160,84,0.05)" strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="month" tick={{fontSize:8,fill:'#5A6070'}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fontSize:8,fill:'#5A6070'}} axisLine={false} tickLine={false}/>
                        <Tooltip content={<CashTip/>}/>
                        <Bar dataKey="expense" radius={[2,2,0,0]} maxBarSize={18}>
                          {cashFlowData.map((_,i)=>(
                            <Cell key={i} fill={i===cashFlowData.length-1?'#E05252':'rgba(224,82,82,0.38)'}/>
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Runway */}
              <div className="db-card">
                <div className="db-card-head">
                  <div className="db-card-title">Cash Runway</div>
                </div>
                <div className="db-card-body">
                  <div className="db-runway-wrap">
                    <div className="db-runway-head">
                      <div>
                        <div className="db-runway-val">{kpi.runway} <span style={{fontSize:16,fontWeight:300,color:'var(--muted)'}}>months</span></div>
                        <div className="db-runway-sub" style={{marginTop:4}}>At ${kpi.burnRate}/mo burn</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:10,color:'var(--green)'}}>✓ Healthy</div>
                        <div style={{fontSize:9,color:'var(--muted)',marginTop:2}}>Cash: {kpi.cashInBank}</div>
                      </div>
                    </div>
                    <div className="db-runway-track">
                      <div className="db-runway-fill" style={{width:`${kpi.runwayFill}%`}}/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                      <span style={{fontSize:9,color:'var(--muted)'}}>Today</span>
                      <span style={{fontSize:9,color:'var(--muted)'}}>+{kpi.runway}mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="db-card">
              <div className="db-card-head">
                <div>
                  <div className="db-card-title">Team</div>
                  <div className="db-card-sub">4 active · 2 offline</div>
                </div>
                <button className="db-card-action">+ Invite</button>
              </div>
              <div className="db-card-body">
                <div className="db-users-grid">
                  {users.map((u,i) => (
                    <div className="db-user-card" key={i}>
                      <div className={`db-user-av ${u.av}`}>{u.initials}</div>
                      <div className="db-user-info">
                        <div className="db-user-nm">{u.name}</div>
                        <div className={`db-user-rl ${roleClass[u.role]}`}>{u.role}</div>
                      </div>
                      <div className={`db-user-status ${u.online?'status-on':'status-off'}`}/>
                    </div>
                  ))}
                </div>

                {/* Role distribution */}
                <div style={{marginTop:16,padding:'12px 0 0',borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:10}}>
                    Role Distribution
                  </div>
                  {[
                    { role:'HOD', count:3, color:'var(--blue)', pct:50 },
                    { role:'FINANCE', count:1, color:'var(--green)', pct:17 },
                    { role:'ADMIN', count:1, color:'var(--muted)', pct:17 },
                    { role:'CEO', count:1, color:'var(--gold)', pct:16 },
                  ].map((r,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
                      <div style={{width:6,height:6,borderRadius:'50%',background:r.color,flexShrink:0}}/>
                      <span style={{fontSize:10,color:'var(--text-sub)',flex:1}}>{r.role}</span>
                      <div style={{width:80,height:3,background:'rgba(255,255,255,0.06)',borderRadius:2,overflow:'hidden'}}>
                        <div style={{width:`${r.pct}%`,height:'100%',background:r.color,borderRadius:2,opacity:0.7}}/>
                      </div>
                      <span style={{fontSize:9,color:'var(--muted)',minWidth:14,textAlign:'right'}}>{r.count}</span>
                    </div>
                  ))}
                </div>

                {/* Dept forms summary */}
                <div style={{marginTop:14,padding:'12px 0 0',borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>
                    Pending Reports
                  </div>
                  {[
                    {dept:'Engineering', freq:'Monthly', status:'Due today'},
                    {dept:'Marketing',   freq:'Quarterly', status:'2 days'},
                    {dept:'Finance',     freq:'Monthly', status:'Submitted ✓'},
                  ].map((r,i)=>(
                    <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid rgba(191,160,84,0.04)'}}>
                      <div>
                        <div style={{fontSize:11,fontWeight:500,color:'var(--text)'}}>{r.dept}</div>
                        <div style={{fontSize:9,color:'var(--muted)'}}>{r.freq}</div>
                      </div>
                      <span style={{
                        fontSize:9, padding:'2px 7px', borderRadius:4,
                        background: r.status==='Submitted ✓' ? 'var(--green-dim)' : r.status==='Due today' ? 'var(--red-dim)' : 'rgba(240,160,48,0.12)',
                        color: r.status==='Submitted ✓' ? 'var(--green)' : r.status==='Due today' ? 'var(--red)' : 'var(--amber)'
                      }}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
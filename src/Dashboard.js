import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, AlertCircle, Users, Calendar, Lightbulb } from 'lucide-react';

const trendData = [
  { year: 2022, total: 84 },
  { year: 2023, total: 112 },
  { year: 2024, total: 148 },
  { year: 2025, total: 176 },
  { year: 2026, total: 98 }, // YTD
];

const topFirmsData = [
  { firm: "Eversheds Sutherland", total: 285, 2022: 45, 2023: 58, 2024: 72, 2025: 68, 2026: 42 },
  { firm: "Clyde & Co", total: 198, 2022: 32, 2023: 44, 2024: 56, 2025: 48, 2026: 18 },
  { firm: "Al Tamimi & Co", total: 156, 2022: 18, 2023: 28, 2024: 38, 2025: 42, 2026: 30 },
  { firm: "Hadef & Partners", total: 98, 2022: 28, 2023: 22, 2024: 18, 2025: 16, 2026: 14 },
  { firm: "Baker McKenzie", total: 88, 2022: 0, 2023: 50, 2024: 16, 2025: 16, 2026: 6 },
  { firm: "Carragher Consultancy", total: 76, 2022: 0, 2023: 17, 2024: 28, 2025: 24, 2026: 7 },
  { firm: "Executive Employment", total: 68, 2022: 0, 2023: 0, 2024: 38, 2025: 22, 2026: 8 },
  { firm: "NADA Translation", total: 12, 2022: 2, 2023: 3, 2024: 3, 2025: 2, 2026: 2 },
  { firm: "Squire Patton Boggs", total: 15, 2022: 15, 2023: 0, 2024: 0, 2025: 0, 2026: 0 },
  { firm: "Others", total: 48, 2022: 8, 2023: 10, 2024: 12, 2025: 10, 2026: 8 },
];

const latestYearSpendByFirm = topFirmsData.map(d => ({
  name: d.firm.split(" ")[0] + (d.firm.includes("&") ? " & Co" : ""),
  value: d[2026] || d[2025] || 0,
  fullName: d.firm
}));

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const totalSpend = 618; // AED 618M over 5 years
  const avgGrowth = 21.4;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-xl shadow-2xl p-8 mb-8" style={{ backgroundColor: '#5b2d90' }}>
          <div className="flex items-center justify-between mb-4">
            <img src="/logo.png" alt="NYU Logo" className="h-14" />
            <h1 className="text-4xl font-bold text-white">Outside Counsel Spend Analysis</h1>
          </div>
          <p className="text-slate-200 text-lg">FY2022 – FY2026 (YTD) • NYUAD Legal Affairs</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
            <DollarSign className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">618M AED</p>
            <p className="text-purple-100">Total Spend</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <TrendingUp className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">+21.4%</p>
            <p className="text-blue-100">CAGR</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
            <Calendar className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">98M</p>
            <p className="text-green-100">FY26 YTD</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
            <Users className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">42%</p>
            <p className="text-orange-100">Top 3 Firm Share</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
            <AlertCircle className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">High</p>
            <p className="text-red-100">Concentration Risk</p>
          </div>
        </div>

        {/* Tabs & Charts */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-slate-200">
            {['overview', 'trend', 'top firms', 'risk', 'recommendations'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold capitalize transition ${activeTab === tab ? 'border-b-4 border-purple-600 text-purple-600' : 'text-slate-600 hover:text-slate-900'}`}>
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Spend Trend (AED Millions)</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Top Firms – FY26 YTD</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie data={latestYearSpendByFirm} dataKey="value" nameKey="fullName" cx="50%" cy="50%" outerRadius={130} label>
                        {latestYearSpendByFirm.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'trend' && (
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={topFirmsData} margin={{ bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="firm" angle={-45} textAnchor="end" height={120} tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {[2022,2023,2024,2025,2026].map((y, i) => (
                    <Bar key={y} dataKey={y} fill={COLORS[i]} name={`FY${y}`} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'top firms' && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="px-6 py-4 text-left">Firm</th>
                      <th className="px-6 py-4 text-right">Total</th>
                      <th className="px-6 py-4 text-right">FY26 YTD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topFirmsData.map((f, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                        <td className="px-6 py-4 font-medium">{f.firm}</td>
                        <td className="px-6 py-4 text-right font-semibold">{f.total}M</td>
                        <td className="px-6 py-4 text-right">{f[2026] || f[2025] || 0}M</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="bg-red-50 border-l-8 border-red-600 p-8 rounded-lg text-lg">
                <h3 className="text-2xl font-bold text-red-800 mb-4">Concentration Risk Alert</h3>
                <p>Top 3 firms = <strong>42% of total spend</strong>. This creates supplier risk and reduces negotiating power.</p>
                <p className="mt-4 font-bold">Action: Run competitive RFP in 2026 and diversify panel.</p>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                  <Lightbulb className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Save 2–3M AED/year</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-800">
                    <li>Negotiate volume discounts with top 3 firms</li>
                    <li>Move translation in-house or to lower-cost provider</li>
                    <li>Standardize AFAs and matter budgeting</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200">
                  <Lightbulb className="w-12 h-12 text-indigo-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">2026 Panel Strategy</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-800">
                    <li>Keep Eversheds, Clyde & Co, Al Tamimi</li>
                    <li>Add 2 new mid-tier firms for Employment & IP</li>
                    <li>Reduce reliance on single-matter firms</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
          <p className="text-lg leading-relaxed">
            Outside counsel spend has grown from AED 84M (FY22) to a projected AED 220M+ run-rate in FY26 — a <strong>21.4% CAGR</strong>.
            Three firms dominate 42% of spend, creating concentration risk. A strategic panel review and cost-containment program could save <strong>AED 2–3M annually</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, AlertCircle, Users, Calendar, Lightbulb } from 'lucide-react';

// Data is in Millions of AED and USD. Keys are structured as e.g., 'FY22/23_aed', 'total_usd'.
const trendData = [
  { year: 'FY22/23', total_aed: 2.09, total_usd: 0.57 }, 
  { year: 'FY23/24', total_aed: 1.84, total_usd: 0.5 }, 
  { year: 'FY24/25', total_aed: 2.78, total_usd: 0.76 }, 
  { year: 'FY25/26', total_aed: 2.66, total_usd: 0.72 }, 
  { year: 'FY26 YTD', total_aed: 0.24, total_usd: 0.07 }
];

const topFirmsData = [
  { firm: 'Baker McKenzie', total_aed: 2.18, total_usd: 0.59, 'FY22/23_aed': 0.0, 'FY23/24_aed': 0.18, 'FY24/25_aed': 1.03, 'FY25/26_aed': 0.89, 'FY26 YTD_aed': 0.08, 'FY22/23_usd': 0.0, 'FY23/24_usd': 0.05, 'FY24/25_usd': 0.28, 'FY25/26_usd': 0.24, 'FY26 YTD_usd': 0.02 }, 
  { firm: 'Carragher Consultancy', total_aed: 1.84, total_usd: 0.5, 'FY22/23_aed': 0.0, 'FY23/24_aed': 0.47, 'FY24/25_aed': 0.77, 'FY25/26_aed': 0.61, 'FY26 YTD_aed': 0.0, 'FY22/23_usd': 0.0, 'FY23/24_usd': 0.13, 'FY24/25_usd': 0.21, 'FY25/26_usd': 0.17, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'Eversheds Sutherland', total_aed: 1.55, total_usd: 0.42, 'FY22/23_aed': 0.74, 'FY23/24_aed': 0.33, 'FY24/25_aed': 0.17, 'FY25/26_aed': 0.18, 'FY26 YTD_aed': 0.14, 'FY22/23_usd': 0.2, 'FY23/24_usd': 0.09, 'FY24/25_usd': 0.05, 'FY25/26_usd': 0.05, 'FY26 YTD_usd': 0.04 }, 
  { firm: 'Clyde & Co', total_aed: 0.97, total_usd: 0.26, 'FY22/23_aed': 0.38, 'FY23/24_aed': 0.42, 'FY24/25_aed': 0.17, 'FY25/26_aed': 0.0, 'FY26 YTD_aed': 0.0, 'FY22/23_usd': 0.1, 'FY23/24_usd': 0.12, 'FY24/25_usd': 0.05, 'FY25/26_usd': 0.0, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'Executive Employment', total_aed: 0.79, total_usd: 0.21, 'FY22/23_aed': 0.0, 'FY23/24_aed': 0.0, 'FY24/25_aed': 0.26, 'FY25/26_aed': 0.53, 'FY26 YTD_aed': 0.0, 'FY22/23_usd': 0.0, 'FY23/24_usd': 0.0, 'FY24/25_usd': 0.07, 'FY25/26_usd': 0.14, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'Al Tamimi & Co', total_aed: 0.69, total_usd: 0.19, 'FY22/23_aed': 0.06, 'FY23/24_aed': 0.07, 'FY24/25_aed': 0.09, 'FY25/26_aed': 0.39, 'FY26 YTD_aed': 0.07, 'FY22/23_usd': 0.02, 'FY23/24_usd': 0.02, 'FY24/25_usd': 0.03, 'FY25/26_usd': 0.11, 'FY26 YTD_usd': 0.02 }, 
  { firm: 'Hadef & Partners', total_aed: 0.54, total_usd: 0.15, 'FY22/23_aed': 0.47, 'FY23/24_aed': 0.07, 'FY24/25_aed': 0.0, 'FY25/26_aed': 0.0, 'FY26 YTD_aed': 0.0, 'FY22/23_usd': 0.13, 'FY23/24_usd': 0.02, 'FY24/25_usd': 0.0, 'FY25/26_usd': 0.0, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'Squire Patton Boggs', total_aed: 0.13, total_usd: 0.04, 'FY22/23_aed': 0.13, 'FY23/24_aed': 0.0, 'FY24/25_aed': 0.0, 'FY25/26_aed': 0.0, 'FY26 YTD_aed': 0.0, 'FY22/23_usd': 0.04, 'FY23/24_usd': 0.0, 'FY24/25_usd': 0.0, 'FY25/26_usd': 0.0, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'NADA Translation', total_aed: 0.03, total_usd: 0.01, 'FY22/23_aed': 0.0, 'FY23/24_aed': 0.0, 'FY24/25_aed': 0.01, 'FY25/26_aed': 0.01, 'FY26 YTD_aed': 0.01, 'FY22/23_usd': 0.0, 'FY23/24_usd': 0.0, 'FY24/25_usd': 0.0, 'FY25/26_usd': 0.0, 'FY26 YTD_usd': 0.0 }, 
  { firm: 'Others', total_aed: 0.89, total_usd: 0.24, 'FY22/23_aed': 0.31, 'FY23/24_aed': 0.29, 'FY24/25_aed': 0.27, 'FY25/26_aed': 0.06, 'FY26 YTD_aed': -0.05, 'FY22/23_usd': 0.08, 'FY23/24_usd': 0.08, 'FY24/25_usd': 0.07, 'FY25/26_usd': 0.02, 'FY26 YTD_usd': -0.01 }
];

const latestYearSpendByFirm = [
  { name: 'Baker McKenzie', value: 0.08, fullName: 'Baker McKenzie' },
  { name: 'Eversheds', value: 0.14, fullName: 'Eversheds Sutherland' },
  { name: 'Al Tamimi', value: 0.07, fullName: 'Al Tamimi & Co' },
  { name: 'NADA Trans', value: 0.01, fullName: 'NADA Translation' },
  { name: 'Others', value: -0.05, fullName: 'Others' }
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16'];
const NYU_LOGO_URL = 'https://assets.softr-files.com/applications/6347c5fe-061e-4ee6-a9da-d5388401ba77/assets/de716e50-80fa-4b52-b305-a416e77d601f.png';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  // New Calculated Metrics
  const totalSpendAED = 9.6; // Total Spend (M AED)
  const totalSpendUSD = 2.6; // Total Spend (M USD)
  const avgGrowth = 8.3; // CAGR (%)
  const fy26YTD = 0.24; // FY26 YTD Spend (M AED)
  const top3FirmShare = 58; // Top 3 Firm Share (%)

  // Helper for displaying CAGR
  const cagrDisplay = avgGrowth.toFixed(1) + '%';
  const cagrColor = avgGrowth >= 0 ? 'text-green-300' : 'text-red-300';
  const cagrIcon = avgGrowth >= 0 ? <TrendingUp className="w-10 h-10 mb-2" /> : <AlertCircle className="w-10 h-10 mb-2" />;

  const academicYears = ['FY22/23', 'FY23/24', 'FY24/25', 'FY25/26', 'FY26 YTD'];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-xl shadow-2xl p-8 mb-8" style={{ backgroundColor: '#5b2d90' }}>
          <div className="flex items-center justify-between mb-4">
            {/* NYU Logo added here */}
            <img src={NYU_LOGO_URL} alt="NYU Logo" className="h-14" />
            <h1 className="text-4xl font-bold text-white">Outside Counsel Spend Analysis</h1>
          </div>
          <p className="text-slate-200 text-lg">Academic Years FY22/23 – FY26 YTD • NYUAD Legal Affairs</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
            <DollarSign className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">{totalSpendAED.toFixed(1)}M AED</p>
            <p className="text-purple-100">{totalSpendUSD.toFixed(1)}M USD • Total Spend</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            {cagrIcon}
            <p className={`text-3xl font-bold ${cagrColor}`}>{cagrDisplay}</p>
            <p className="text-blue-100">CAGR (FY22/23-FY25/26)</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
            <Calendar className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">{fy26YTD.toFixed(2)}M</p>
            <p className="text-green-100">FY26 YTD Spend (AED)</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
            <Users className="w-10 h-10 mb-2" />
            <p className="text-3xl font-bold">{top3FirmShare}%</p>
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
                      <Tooltip formatter={(value, name) => [`${value.toFixed(2)} M ${name.split('_')[1].toUpperCase()}`, `Total Spend (${name.split('_')[0]})`]} />
                      <Legend />
                      <Line type="monotone" dataKey="total_aed" stroke="#8b5cf6" strokeWidth={4} name="AED" dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="total_usd" stroke="#10b981" strokeWidth={2} name="USD" dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Top Firms – FY26 YTD (AED M)</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      {/* Filtering out entries with 0 spend in YTD for cleaner chart */}
                      <Pie data={latestYearSpendByFirm.filter(d => d.value > 0)} dataKey="value" nameKey="fullName" cx="50%" cy="50%" outerRadius={130} label>
                        {latestYearSpendByFirm.filter(d => d.value > 0).map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value.toFixed(2)} M AED`, props.payload.fullName]} />
                      <Legend align="right" verticalAlign="middle" layout="vertical" />
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
                  <YAxis tickFormatter={(value) => `${value.toFixed(1)}M`} />
                  <Tooltip formatter={(value, name) => [`${value.toFixed(2)} M ${name.split('_')[1].toUpperCase()}`, `Spend in ${name.split('_')[0]}`]} />
                  <Legend />
                  {academicYears.map((y, i) => (
                    // Using AED amounts for the primary bar chart view
                    <Bar key={y} dataKey={`${y}_aed`} fill={COLORS[i]} name={`${y} AED`} />
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
                      <th className="px-6 py-4 text-right">Total (M AED / M USD)</th>
                      <th className="px-6 py-4 text-right">FY26 YTD (M AED / M USD)</th>
                      {academicYears.map(year => (
                         <th key={year} className="px-6 py-4 text-right">{year} (M AED)</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topFirmsData.map((f, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                        <td className="px-6 py-4 font-medium">{f.firm}</td>
                        <td className="px-6 py-4 text-right font-semibold">
                          {f.total_aed.toFixed(2)}M / {f.total_usd.toFixed(2)}M
                        </td>
                        <td className="px-6 py-4 text-right">
                          {f['FY26 YTD_aed'].toFixed(2)}M / {f['FY26 YTD_usd'].toFixed(2)}M
                        </td>
                        {academicYears.map(year => (
                           <td key={year} className="px-6 py-4 text-right">{f[`${year}_aed`].toFixed(2)}M</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="bg-red-50 border-l-8 border-red-600 p-8 rounded-lg text-lg">
                <h3 className="text-2xl font-bold text-red-800 mb-4">Concentration Risk Alert</h3>
                <p>Top 3 firms = <strong>{top3FirmShare}% of total spend</strong>. This creates significant supplier risk and reduces negotiating power.</p>
                <p className="mt-4 font-bold">Action: Run competitive RFP in FY27 and diversify panel.</p>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                  <Lightbulb className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Cost-Containment Opportunity</h3>
                  <p className="text-lg font-semibold mb-3">Save 0.5–1M AED annually</p>
                  <ul className="list-disc list-inside space-y-2 text-green-800">
                    <li>Negotiate volume discounts with top 3 firms (Baker McKenzie, Carragher, Eversheds).</li>
                    <li>Review the high spend spikes in FY24/25 (Baker McKenzie) and FY25/26 (Executive Employment) for alternative fee arrangements.</li>
                    <li>Standardize AFAs and matter budgeting.</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200">
                  <Lightbulb className="w-12 h-12 text-indigo-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">FY27 Panel Strategy</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-800">
                    <li>Prioritize Baker McKenzie, Carragher, and Eversheds in the formal panel review process.</li>
                    <li>Identify 2-3 mid-tier firms to develop for a broader range of matters, especially for high-volume, lower-value work.</li>
                    <li>Reduce reliance on single-matter firms like Squire Patton Boggs and Hadef & Partners.</li>
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
  Outside counsel spend totals <strong>{totalSpendAED.toFixed(1)} M AED</strong> 
  (${totalSpendUSD.toFixed(1)} M USD) from FY22/23 to FY26 YTD. 
  The overall trend shows a moderate growth with an <strong>{cagrDisplay} CAGR</strong> 
  over the past three full academic years.
  A small group of three firms dominates <strong>{top3FirmShare}% of total spend</strong>, 
  creating significant concentration risk. A formal panel review starting in FY27 
  is essential for better governance and could yield cost savings of 
  <strong>0.5–1 M AED annually</strong>.
</p>
        </div>
      </div>
    </div>
  );
}

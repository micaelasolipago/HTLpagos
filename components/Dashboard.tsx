
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { User, Country } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Ene', flow: 4000, compensation: 2400 },
  { name: 'Feb', flow: 3000, compensation: 1398 },
  { name: 'Mar', flow: 2000, compensation: 9800 },
  { name: 'Abr', flow: 2780, compensation: 3908 },
  { name: 'May', flow: 1890, compensation: 4800 },
  { name: 'Jun', flow: 2390, compensation: 3800 },
];

const DashboardView: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Bienvenido, {user.name}</h2>
        <p className="text-slate-500 mt-1">Monitoreo de tu actividad en el ecosistema Solipago - Cono Sur.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Ahorro Acumulado', value: '$145.20', sub: '+12% vs mes ant.', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Reservas Activas', value: '3', sub: 'Próxima en 4 días', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Bonos Generados', value: '$84.50', sub: 'Por pagos locales', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Score de Confianza', value: '98/100', sub: 'Nivel: Gold Partner', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} className="text-emerald-500" />
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Actividad de Compensación Transfronteriza</h3>
            <select className="text-xs border rounded-lg px-2 py-1 bg-slate-50">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="flow" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="compensation" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Tránsitos Recientes</h3>
          <div className="space-y-6">
            {[
              { type: 'Booking', title: 'Apto Palermo, BA', status: 'Confirmado', amount: '-$120.00', date: 'Hoy' },
              { type: 'Credit', title: 'Pago Factura Edesur', status: 'Bono +1%', amount: '+$85.40', date: 'Ayer' },
              { type: 'System', title: 'Compensación Local', status: 'Liquidado', amount: '+$0.00', date: '01/06' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${activity.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                  {activity.amount.startsWith('+') ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.status}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${activity.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{activity.amount}</p>
                  <p className="text-[10px] text-slate-400">{activity.date}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-xs font-bold text-emerald-600 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-colors">Ver historial completo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;


import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Globe, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck,
  MoreVertical,
  Filter,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Country, CountryPartner, LocalBill } from '../types';

const MOCK_PARTNERS: CountryPartner[] = [
  { id: 'cp-1', name: 'Andina Fintech S.A.', email: 'admin@andina.cl', countries: [Country.CHILE, Country.PERU], balance: 45000, pendingCommissions: 1250, status: 'active', totalProcessedVolume: 1200000, lastActive: 'Hace 5 min' },
  { id: 'cp-2', name: 'Soluciones Rio de la Plata', email: 'ops@rioplata.com.ar', countries: [Country.ARGENTINA, Country.URUGUAY], balance: 12500, pendingCommissions: 840, status: 'active', totalProcessedVolume: 850000, lastActive: 'Hace 12 min' },
  { id: 'cp-3', name: 'Altiplano Bridge Partners', email: 'bolivia@altiplano.bo', countries: [Country.BOLIVIA, Country.PARAGUAY], balance: 3200, pendingCommissions: 150, status: 'onboarding', totalProcessedVolume: 12000, lastActive: 'Ayer' },
];

const MOCK_PENDING_APPROVALS: LocalBill[] = [
  { id: 'lb-1', category: 'Electricity', amount: 8500, currency: 'BOB', country: Country.BOLIVIA, description: 'CRE - Santa Cruz de la Sierra', expirationDate: '2024-06-25', status: 'verifying', payerId: 'usr-442' },
  { id: 'lb-2', category: 'Water', amount: 150, currency: 'PEN', country: Country.PERU, description: 'Sedapal - Lima Norte', expirationDate: '2024-06-28', status: 'verifying', payerId: 'usr-901' },
];

const PartnerManagement: React.FC = () => {
  const [view, setView] = useState<'partners' | 'approvals'>('partners');
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Country Partners</h2>
          <p className="text-slate-500 mt-1">Supervisión regional, liquidación de comisiones y auditoría de red.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView('partners')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'partners' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Directorio de Socios
          </button>
          <button 
            onClick={() => setView('approvals')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${view === 'approvals' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            Aprobación Manual
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{MOCK_PENDING_APPROVALS.length}</span>
          </button>
        </div>
      </div>

      {view === 'partners' && (
        <>
          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Volumen Total Red</p>
              <h4 className="text-2xl font-bold text-slate-900">$2.06M USD</h4>
              <div className="mt-2 flex items-center gap-1 text-emerald-500 text-xs font-medium">
                <ArrowUpRight size={14} /> +18.4% este mes
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Comisiones x Liquidar</p>
              <h4 className="text-2xl font-bold text-slate-900">$2,240 USD</h4>
              <div className="mt-2 text-slate-400 text-xs">Corte de ciclo: 30 de Junio</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Socios Activos</p>
              <h4 className="text-2xl font-bold text-slate-900">12 Entidades</h4>
              <div className="mt-2 text-emerald-500 text-xs">3 en proceso de onboarding</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar socio por nombre, país o ID..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
              <Filter size={18} /> Filtros Avanzados
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <UserPlus size={18} /> Nuevo Partner
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Socio Estratégico</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regiones</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Balance Bridge</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Comisión Pend.</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PARTNERS.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{partner.name}</span>
                        <span className="text-xs text-slate-500">{partner.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-1 flex-wrap">
                        {partner.countries.map(c => (
                          <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-tighter">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-medium text-slate-900">${partner.balance.toLocaleString()}</td>
                    <td className="px-6 py-5 text-right font-mono font-medium text-emerald-600">${partner.pendingCommissions.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${partner.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'approvals' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-amber-500" /> Cola de Auditoría Manual
            </h3>
            {MOCK_PENDING_APPROVALS.map((approval) => (
              <div key={approval.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-500 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold">
                      {approval.category[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{approval.description}</h4>
                      <p className="text-xs text-slate-500">ID Usuario: {approval.payerId} • {approval.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{approval.currency} ${approval.amount}</p>
                    <p className="text-[10px] font-bold text-amber-600 uppercase">Requiere Auditoría</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Aprobar
                  </button>
                  <button className="flex-1 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <XCircle size={16} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white h-fit sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-emerald-400" size={32} />
              <h3 className="text-2xl font-bold">Protocolo de Auditoría</h3>
            </div>
            <ul className="space-y-6 text-slate-400 text-sm">
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">1</span>
                <div>
                  <p className="text-white font-bold mb-1">Verificación de Duplicidad</p>
                  <p>Nuestro hash de imagen detecta si este comprobante ya fue subido por otro usuario.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">2</span>
                <div>
                  <p className="text-white font-bold mb-1">Cotejo de Entidad Receptora</p>
                  <p>Asegúrate que la cuenta de destino coincida con nuestras cuentas puente regionales.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</span>
                <div>
                  <p className="text-white font-bold mb-1">Liquidación Inmediata</p>
                  <p>Al aprobar, el saldo internacional se acredita de forma irrevocable en la billetera del usuario.</p>
                </div>
              </li>
            </ul>
            <button className="w-full mt-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all">
              Generar Reporte de Cumplimiento
            </button>
          </div>
        </div>
      )}

      {/* Modal Mockup for New Partner */}
      {isRegistering && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Registrar Nuevo Partner</h3>
              <button onClick={() => setIsRegistering(false)}><XCircle className="text-slate-300 hover:text-slate-900 transition-colors" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nombre de Entidad</label>
                  <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="Ej: Andean Fintech Ltd" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Email Corporativo</label>
                  <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="partners@empresa.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Países de Operación</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.values(Country).map(c => (
                    <button key={c} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium hover:bg-emerald-50 hover:border-emerald-500 transition-all">{c}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Documentación Legal (KYB)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400">
                  <CreditCard className="mx-auto mb-2 opacity-20" size={32} />
                  <p className="text-xs">Subir PDF con Personería Jurídica y Poderes</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 flex gap-4">
              <button 
                onClick={() => setIsRegistering(false)}
                className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button 
                className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Iniciar Onboarding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;

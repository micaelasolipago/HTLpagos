
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Search, 
  Settings, 
  ShieldCheck, 
  Globe, 
  Users,
  Building2,
  TrendingUp,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Country, User } from './types';
import DashboardView from './components/Dashboard';
import WalletView from './components/Wallet';
import MarketplaceView from './components/Marketplace';
import ArchitectureDocs from './components/ArchitectureDocs';
import PartnerManagement from './components/PartnerManagement';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wallet' | 'marketplace' | 'docs' | 'partners'>('dashboard');
  const [user, setUser] = useState<User>({
    id: 'usr-001',
    name: 'Javier Domínguez',
    email: 'javier@solipago.com',
    country: Country.ARGENTINA,
    walletBalance: 1250.50
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Panel General', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Marketplace', icon: Search },
    { id: 'wallet', label: 'Mi Billetera', icon: Wallet },
    { id: 'partners', label: 'Gestión Partners', icon: Users },
    { id: 'docs', label: 'Arquitectura', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">S</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Solipago</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Southern Cone Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">Administrador</p>
            </div>
            <Settings size={16} className="text-slate-500 cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2 text-slate-500">
            <Globe size={18} />
            <span className="text-sm font-medium">Red de Compensación Regional: Activa</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse ml-2"></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Balance Global:</span>
              <span className="text-sm font-bold text-slate-900">${(user.walletBalance * 10).toLocaleString()} USD</span>
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <DashboardView user={user} />}
          {activeTab === 'wallet' && <WalletView user={user} />}
          {activeTab === 'marketplace' && <MarketplaceView user={user} />}
          {activeTab === 'partners' && <PartnerManagement />}
          {activeTab === 'docs' && <ArchitectureDocs />}
        </div>
      </main>

      {/* Mobile Nav (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-4 z-50">
         {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 ${
                activeTab === item.id ? 'text-emerald-500' : 'text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] uppercase font-bold tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;

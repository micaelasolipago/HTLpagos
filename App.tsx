
import React, { useState } from 'react';
import { 
  LogOut,
  Home,
  MapPin
} from 'lucide-react';
import { Country, User } from './types';
import MarketplaceView from './components/Marketplace';
import PropertyManagement from './components/PropertyManagement';
import Login from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'guest' | 'owner' | 'renter'>('guest');
  const [user, setUser] = useState<User>({
    id: 'usr-001',
    name: 'Usuario',
    email: 'usuario@deptoypago.com',
    country: Country.ARGENTINA,
    walletBalance: 1250.50
  });

  const handleLogin = (type: 'guest' | 'owner' | 'renter') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('guest');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">S</div>
            <h1 className="font-bold text-slate-900">Deptoypago</h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">S</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Deptoypago</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Southern Cone Hub</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {userType === 'renter' ? (
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                <MapPin size={20} />
                <span className="font-medium">Explorar</span>
              </button>
            ) : (
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                <Home size={20} />
                <span className="font-medium">Mis Propiedades</span>
              </button>
            )}
          </nav>

          <div className="p-6 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">U</div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{userType === 'owner' ? 'Propietario' : 'Viajero'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {userType === 'renter' ? (
            <MarketplaceView user={user} />
          ) : (
            <PropertyManagement />
          )}
        </main>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden pb-20">
        {userType === 'renter' ? (
          <MarketplaceView user={user} />
        ) : (
          <PropertyManagement />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around z-50">
        <button className="flex-1 flex flex-col items-center gap-1 py-4 text-emerald-500">
          {userType === 'renter' ? (
            <>
              <MapPin size={20} />
              <span className="text-[10px] font-bold">Explorar</span>
            </>
          ) : (
            <>
              <Home size={20} />
              <span className="text-[10px] font-bold">Propiedades</span>
            </>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center gap-1 py-4 text-slate-600"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-bold">Salir</span>
        </button>
      </div>
    </div>
  );
};

export default App;

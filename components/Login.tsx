import React, { useState } from 'react';
import { Mail, Lock, Home, Calendar, LogIn, AlertCircle, Loader } from 'lucide-react';
import { signIn, signUp } from '../services/supabaseClient';

interface LoginProps {
  onLogin: (userType: 'guest' | 'owner' | 'renter', user?: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'owner' | 'renter'>('renter');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email && password) {
        let result;
        
        if (isSignUp) {
          result = await signUp(email, password, userType === 'owner' ? 'propietario' : 'viajero');
        } else {
          result = await signIn(email, password);
        }

        if (result.success) {
          onLogin(userType, result.data.user);
        } else {
          setError(result.error || 'Error en autenticación');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    onLogin('guest');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 to-blue-50 lg:bg-gradient-to-r lg:from-slate-900 lg:to-slate-900">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center px-12">
        <div className="mb-12">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6">S</div>
          <h1 className="text-5xl font-bold mb-4">Deptoypago</h1>
          <p className="text-lg text-slate-400">Plataforma Regional de Pagos y Alojamientos</p>
        </div>

        <div className="space-y-8 mt-16">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Home size={24} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Propietarios</h3>
              <p className="text-slate-400">Publica tus alquileres y gestiona reservas en tiempo real.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Viajeros</h3>
              <p className="text-slate-400">Descubre y reserva alojamientos en la región.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white lg:bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl text-white">S</div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Deptoypago</h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">Bienvenido</h2>
          <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">Inicia sesión para acceder a tu cuenta</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* User Type Selection */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setUserType('renter')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                userType === 'renter'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Calendar size={18} />
              Viajero
            </button>
            <button
              onClick={() => setUserType('owner')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                userType === 'owner'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Home size={18} />
              Propietario
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 sm:top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 sm:top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 sm:py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 sm:mt-6 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <LogIn size={18} />}
              {isSignUp ? 'Crear Cuenta' : 'Inicia Sesión'}
            </button>
          </form>

          {/* Sign Up Toggle */}
          <div className="text-center text-sm sm:text-base mb-6">
            {isSignUp ? (
              <>
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Inicia sesión
                </button>
              </>
            ) : (
              <>
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Crear cuenta
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs sm:text-sm text-slate-500">o</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Guest Access */}
          <button
            onClick={handleGuestAccess}
            className="w-full border-2 border-slate-200 text-slate-700 py-3 sm:py-3 rounded-lg font-bold hover:bg-slate-50 transition-all text-sm sm:text-base"
          >
            Acceso como Invitado
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 sm:mt-8">
            ¿No tienes cuenta? <a href="#" className="text-emerald-600 font-bold hover:underline">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

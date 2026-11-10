import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_USERS } from '../../lib/mockData';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle, 
  ArrowLeft, 
  UserCheck, 
  Database,
  Building2,
  HardHat,
  ChevronRight
} from 'lucide-react';
import { isFirebaseConfigured } from '../../lib/firebase';

export const PortalLoginPage: React.FC = () => {
  const { currentUser, login, switchUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === 'ADMIN' ? '/portal/admin' : '/portal/worker');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      navigate(user.role === 'ADMIN' ? '/portal/admin' : '/portal/worker');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (user: typeof INITIAL_USERS[0]) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await switchUser(user);
      navigate(user.role === 'ADMIN' ? '/portal/admin' : '/portal/worker');
    } catch (err: any) {
      setError(err.message || 'Quick login error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1726] text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/30 via-[#0B1726] to-[#0B1726] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group text-xs font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-1 text-amber-brand group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Website</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300 backdrop-blur-md">
          <Database className="w-3.5 h-3.5 text-amber-brand" />
          <span>{isFirebaseConfigured ? 'Firebase Cloud Database' : 'Local Storage Engine'}</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-[#10243A]/90 backdrop-blur-xl border border-white/15 rounded-lg p-6 sm:p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
              <ShieldCheck className="w-8 h-8 text-[#10243A]" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              RUMULI CORPORATE
            </h1>
            <p className="text-xs text-amber-brand font-semibold uppercase tracking-widest mt-0.5">
              Staff & Field Operations Portal
            </p>
          </div>

          {/* Strict Governance Notice */}
          <div className="mb-6 p-3 bg-blue-950/60 border border-blue-800/60 rounded text-xs text-blue-200 leading-relaxed flex items-start space-x-2.5">
            <Lock className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Restricted Internal System</span>
              Only registered Rumuli employees and field technicians provisioned by Administration can sign in. Self-registration is disabled.
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-800 rounded text-xs text-red-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Staff Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. baraka.mwamba@rumuli.co.tz"
                  required
                  className="w-full bg-[#0B1726]/80 border border-gray-700 rounded px-3 py-2.5 pl-9 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Staff Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#0B1726]/80 border border-gray-700 rounded px-3 py-2.5 pl-9 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#10243A] font-bold py-2.5 px-4 rounded text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Picker */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center justify-between">
              <span>One-Click Test Profiles</span>
              <span className="text-[10px] text-amber-brand font-normal">Click to test instantly</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {INITIAL_USERS.map((user) => (
                <button
                  key={user.uid}
                  type="button"
                  onClick={() => handleQuickLogin(user)}
                  className="w-full text-left p-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-brand/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-brand flex items-center justify-center font-bold text-xs">
                      {user.role === 'ADMIN' ? 'AD' : 'WK'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-brand transition-colors flex items-center space-x-1.5">
                        <span>{user.name}</span>
                        {user.role === 'ADMIN' ? (
                          <span className="bg-red-500/30 text-red-300 text-[9px] px-1 rounded uppercase font-bold">Admin</span>
                        ) : (
                          <span className="bg-emerald-500/30 text-emerald-300 text-[9px] px-1 rounded uppercase font-bold">Worker</span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[220px]">
                        {user.designation}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-amber-brand group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-500 border-t border-white/5">
        <p>© 2026 RUMULI CORPORATE (Rumuli Engineering & Live Line Technology Limited). Confidential Staff Network.</p>
      </footer>

    </div>
  );
};

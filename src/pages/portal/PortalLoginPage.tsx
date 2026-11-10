import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle, 
  ArrowLeft, 
  ChevronRight
} from 'lucide-react';
export const PortalLoginPage: React.FC = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const destination = (currentUser.role === 'ADMIN' || currentUser.role === 'ASSISTANT') ? '/portal/admin' : '/portal/worker';
      navigate(destination);
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      const destination = (user.role === 'ADMIN' || user.role === 'ASSISTANT') ? '/portal/admin' : '/portal/worker';
      navigate(destination);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1726] text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/30 via-[#0B1726] to-[#0B1726] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group text-xs font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-1 text-amber-brand group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Website</span>
        </Link>
        <Link to="/" className="flex items-center">
          <img 
            src="/logo-white.png" 
            alt="RUMULI CORPORATE" 
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>
      </header>

      {/* Login Card */}
      <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-[#10243A]/90 backdrop-blur-xl border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl">
          
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-3">
              <img 
                src="/logo-white.png" 
                alt="RUMULI CORPORATE" 
                className="h-14 sm:h-16 w-auto mx-auto object-contain"
              />
            </Link>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              RUMULI CORPORATE
            </h1>
            <p className="text-xs text-amber-brand font-semibold uppercase tracking-widest mt-0.5">
              Staff & Field Operations Portal
            </p>
          </div>

          <div className="mb-6 p-3 bg-blue-950/60 border border-blue-800/60 rounded text-xs text-blue-200 leading-relaxed flex items-start space-x-2.5">
            <Lock className="w-4 h-4 text-amber-brand flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Restricted Staff Access</span>
              Worker credentials are created exclusively by Corporate Administration. Self-registration is disabled.
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-800 rounded text-xs text-red-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

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
                  placeholder="admin@rumuli.com or worker email"
                  required
                  className="w-full bg-[#0B1726]/80 border border-gray-700 rounded px-3 py-2.5 pl-9 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
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
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </main>

      <footer className="relative z-10 py-6 px-4 text-center text-xs text-gray-500 border-t border-white/5">
        <p>© {new Date().getFullYear()} RUMULI CORPORATE (Rumuli Engineering & Live Line Technology Limited). Confidential Staff Network.</p>
      </footer>

    </div>
  );
};

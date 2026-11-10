import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_USERS } from '../../lib/mockData';
import { 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ArrowLeft, 
  Users, 
  ChevronDown, 
  CheckCircle2,
  HardHat,
  Database
} from 'lucide-react';
import { isFirebaseConfigured } from '../../lib/firebase';

export const PortalHeader: React.FC = () => {
  const { currentUser, logout, switchUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/portal/login');
  };

  return (
    <header className="bg-[#10243A] text-white border-b border-[#203D5C] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Portal Badge */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-white text-xs tracking-wider shadow-sm">
              RC
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white block">
                RUMULI CORPORATE
              </span>
              <span className="text-[10px] text-amber-brand font-semibold uppercase tracking-widest block -mt-0.5">
                Staff Operations Portal
              </span>
            </div>
          </Link>

          <span className="hidden md:inline-block h-5 w-px bg-gray-600 mx-2" />

          {/* Mode Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] bg-[#16314D] border border-blue-900/50 text-gray-300">
            <Database className="w-3 h-3 text-amber-brand" />
            <span>{isFirebaseConfigured ? 'Firebase Cloud Active' : 'Local Workspace Mode'}</span>
          </div>
        </div>

        {/* Right: Staff Info, Role Badge & Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserSwitcher(!showUserSwitcher)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium rounded bg-[#16314D] hover:bg-[#1C3E61] border border-[#203D5C] text-gray-200 transition-colors"
              title="Quickly switch between Admin and Field Workers for testing"
            >
              <Users className="w-3.5 h-3.5 text-amber-brand" />
              <span className="hidden sm:inline">Switch Demo User</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showUserSwitcher && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-[#10243A] rounded-sm shadow-xl border border-gray-200 py-1.5 z-50">
                <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Switch Active Account (Instant Test)
                </div>
                {INITIAL_USERS.map((u) => {
                  const isCurrent = currentUser?.uid === u.uid;
                  return (
                    <button
                      key={u.uid}
                      type="button"
                      onClick={() => {
                        switchUser(u);
                        setShowUserSwitcher(false);
                        navigate(u.role === 'ADMIN' ? '/portal/admin' : '/portal/worker');
                      }}
                      className={`w-full text-left px-3 py-2 flex items-start justify-between text-xs hover:bg-gray-50 transition-colors ${
                        isCurrent ? 'bg-amber-50/70 font-semibold' : ''
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center space-x-1">
                          <span>{u.name}</span>
                          {u.role === 'ADMIN' ? (
                            <span className="text-[10px] bg-red-100 text-red-800 px-1 rounded font-bold">Admin</span>
                          ) : (
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded font-bold">Worker</span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate max-w-[210px]">{u.designation}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{u.employeeId}</div>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Current User Badge */}
          {currentUser && (
            <div className="flex items-center space-x-2.5 pl-2 border-l border-gray-700">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-brand font-bold text-xs overflow-hidden">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  currentUser.name.charAt(0)
                )}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold leading-tight flex items-center space-x-1.5">
                  <span className="truncate max-w-[130px]">{currentUser.name}</span>
                  {isAdmin ? (
                    <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-[9px] px-1 py-0.2 rounded uppercase font-bold tracking-wider">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] px-1 py-0.2 rounded uppercase font-bold tracking-wider">
                      Worker
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 font-mono">{currentUser.employeeId}</div>
              </div>
            </div>
          )}

          {/* Website Return Link */}
          <Link
            to="/"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#16314D] rounded transition-colors"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors"
            title="Sign Out of Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

        </div>
      </div>
    </header>
  );
};


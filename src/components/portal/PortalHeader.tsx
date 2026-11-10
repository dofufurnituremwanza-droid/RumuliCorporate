import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PortalService } from '../../services/portalService';
import { 
  LogOut, 
  ArrowLeft, 
  Camera,
  Database
} from 'lucide-react';

export const PortalHeader: React.FC = () => {
  const { currentUser, logout, isAdmin, refreshCurrentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/portal/login');
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        await PortalService.updateUserProfileImage(currentUser.uid, dataUrl);
        await refreshCurrentUser();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="bg-[#10243A] text-white border-b border-[#203D5C] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5 group">
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

          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] bg-[#16314D] border border-blue-900/50 text-gray-300">
            <Database className="w-3 h-3 text-amber-brand" />
            <span>Firebase Cloud Connected</span>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center space-x-3">
          
          {currentUser && (
            <div className="flex items-center space-x-2.5">
              
              {/* Avatar with Photo Upload Trigger */}
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Click to update your profile photo"
                  className="w-9 h-9 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-brand font-bold text-xs overflow-hidden shadow-sm relative group-hover:border-amber-brand transition-colors"
                >
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.name.charAt(0)}</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              </div>

              {/* Staff Details */}
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold leading-tight flex items-center space-x-1.5">
                  <span className="truncate max-w-[140px] text-white">{currentUser.name}</span>
                  {isAdmin ? (
                    <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-[9px] px-1 py-0.2 rounded uppercase font-bold">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] px-1 py-0.2 rounded uppercase font-bold">
                      Staff
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  {currentUser.employeeId} • {currentUser.department}
                </div>
              </div>
            </div>
          )}

          {/* Return to Public Website */}
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
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

        </div>
      </div>
    </header>
  );
};

import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PortalService } from '../../services/portalService';
import { 
  LogOut, 
  ArrowLeft, 
  Camera
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <Link to="/" className="flex items-center space-x-2 group min-w-0">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-white text-xs tracking-wider shadow-sm flex-shrink-0">
              RC
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xs sm:text-sm tracking-wider text-white truncate block">
                RUMULI CORPORATE
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-brand font-semibold uppercase tracking-wider truncate block -mt-0.5">
                Staff Operations Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          
          {currentUser && (
            <div className="flex items-center space-x-2">
              
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
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-brand font-bold text-xs overflow-hidden shadow-sm relative group-hover:border-amber-brand transition-colors"
                >
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.name.charAt(0)}</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>

              {/* Staff Details */}
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold leading-tight flex items-center space-x-1.5">
                  <span className="truncate max-w-[130px] text-white">{currentUser.name}</span>
                  {currentUser.role === 'ADMIN' ? (
                    <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-[9px] px-1.5 py-0.2 rounded uppercase font-bold">
                      Admin
                    </span>
                  ) : currentUser.role === 'ASSISTANT' ? (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] px-1.5 py-0.2 rounded uppercase font-bold">
                      Operations Assistant
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] px-1.5 py-0.2 rounded uppercase font-bold">
                      Staff
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  {currentUser.employeeId}
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
            className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>

        </div>
      </div>
    </header>
  );
};

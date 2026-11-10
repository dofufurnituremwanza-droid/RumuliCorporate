import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CompliancePage } from './pages/CompliancePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Portal Pages
import { PortalLoginPage } from './pages/portal/PortalLoginPage';
import { WorkerDashboard } from './pages/portal/WorkerDashboard';
import { AdminDashboard } from './pages/portal/AdminDashboard';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Layout wrapper for Public Marketing Website
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F5F6] text-[#10243A]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// Portal Entrypoint Redirector
const PortalEntryRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1726] flex items-center justify-center text-white text-xs font-mono">
        Loading Rumuli Corporate Operations Portal...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal/login" replace />;
  }

  return (currentUser.role === 'ADMIN' || currentUser.role === 'ASSISTANT') ? (
    <Navigate to="/portal/admin" replace />
  ) : (
    <Navigate to="/portal/worker" replace />
  );
};

// Worker Protected Route
const WorkerProtectedRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center text-gray-700 text-xs font-mono">
        Authenticating Worker Session...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal/login" replace />;
  }

  return <WorkerDashboard />;
};

// Admin & Operations Assistant Protected Route
const AdminProtectedRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center text-gray-700 text-xs font-mono">
        Verifying Administrative Credentials...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal/login" replace />;
  }

  const canManage = currentUser.role === 'ADMIN' || currentUser.role === 'ASSISTANT';
  if (!canManage) {
    return <Navigate to="/portal/worker" replace />;
  }

  return <AdminDashboard />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Corporate Website Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
          <Route path="/compliance" element={<PublicLayout><CompliancePage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Staff & Field Operations Portal Routes */}
          <Route path="/portal" element={<PortalEntryRedirect />} />
          <Route path="/portal/login" element={<PortalLoginPage />} />
          <Route path="/portal/worker" element={<WorkerProtectedRoute />} />
          <Route path="/portal/admin" element={<AdminProtectedRoute />} />

          {/* Catch-all */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

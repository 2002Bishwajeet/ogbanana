import { Routes, Route } from "react-router";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Generator } from "./pages/Generator";
import { Pricing } from "./pages/Pricing";
import { TermsOfService } from "./pages/TermsOfService";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { LicensePage } from "./pages/LicensePage";
import { AuthModal } from "./components/auth/AuthModal";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, logout, openAuthModal, closeAuthModal, isAuthModalOpen } =
    useAuth();

  return (
    <div className="min-h-screen bg-bg text-main font-sans selection:bg-secondary selection:text-main">
      <NavBar user={user} onOpenAuth={openAuthModal} onLogout={logout} />

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<LicensePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

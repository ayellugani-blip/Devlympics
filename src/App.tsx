import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { UserProvider } from './context/UserContext';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { OpportunityDetailPage } from './pages/OpportunityDetailPage';
import { EligibilityCheckerPage } from './pages/EligibilityCheckerPage';
import { UploadSimplifyPage } from './pages/UploadSimplifyPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { VoiceAssistantModal } from './components/ui/VoiceAssistantModal';
import { Sparkles } from 'lucide-react';

export function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <AccessibilityProvider>
      <UserProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-indigo-100 selection:text-indigo-700">
            
            {/* Permanent Left Sidebar Navigation on Desktop & Mobile Drawer */}
            <Sidebar onOpenVoiceAssistant={() => setAssistantOpen(true)} />

            {/* Main Application Area (Scrolls cleanly on the right) */}
            <div className="flex-1 min-w-0 flex flex-col min-h-screen">
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/opportunity/:id" element={<OpportunityDetailPage />} />
                  <Route path="/eligibility" element={<EligibilityCheckerPage />} />
                  <Route path="/upload" element={<UploadSimplifyPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Universal Footer */}
              <Footer />
            </div>

            {/* AI Voice & Text Assistant Modal */}
            <VoiceAssistantModal
              isOpen={assistantOpen}
              onClose={() => setAssistantOpen(false)}
            />

            {/* Floating Assistant Trigger Button */}
            <aside aria-label="Floating Assistant Action">
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                title="Open SANGAM Assistant"
                aria-label="Open SANGAM Assistant"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
                <span className="text-xs font-bold tracking-wide">Ask SANGAM</span>
              </button>
            </aside>

          </div>
        </BrowserRouter>
      </UserProvider>
    </AccessibilityProvider>
  );
}

export default App;

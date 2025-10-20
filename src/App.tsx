import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Homepage } from "./pages/Homepage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AboutUs } from "./pages/AboutUs";
import { Academics } from './pages/Academics';
import { Admissions } from "./pages/Admissions";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Accessibility } from "./pages/Accessibility";
import { Feedback } from "./pages/Feedback";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // If we return from OAuth with an intent, ensure we land on Admissions so it can auto-open the right dialog
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Allow deep-linking into a page via ?page=...
    const page = params.get('page');
    const allowed = new Set([
      'home','about','academics','admissions','contact','privacy','terms','accessibility','feedback'
    ]);
    if (page && allowed.has(page)) {
      setCurrentPage(page);
    }

    const intent = params.get('intent');
    if (intent === 'application' || intent === 'event') {
      setCurrentPage('admissions');
    }
  }, []);

  // Ensure we start at the top when navigating to Admissions
  useEffect(() => {
    if (currentPage === 'admissions') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Homepage onPageChange={setCurrentPage} />;
      case "about":
        return <AboutUs onPageChange={setCurrentPage} />;
      case 'academics':
        return <Academics onPageChange={setCurrentPage} />;
      case "admissions":
        return <Admissions onPageChange={setCurrentPage} />;
      case "contact":
        return <Contact />;
      case "privacy":
        return <Privacy onPageChange={setCurrentPage} />;
      case "terms":
        return <Terms onPageChange={setCurrentPage} />;
      case "accessibility":
        return <Accessibility onPageChange={setCurrentPage} />;
      case "feedback":
        return <Feedback />;
      default:
        return <Homepage onPageChange={setCurrentPage} />;
    }
  };
  return (
      <div className="min-h-screen bg-white font-sans">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer onPageChange={setCurrentPage} />
        <Toaster position="top-right" />
      </div>
  );
}
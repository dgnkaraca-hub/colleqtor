import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import ObjectDetailPage from "./pages/ObjectDetailPage";
import JournalPage from "./pages/JournalPage";
import InquiryPage from "./pages/InquiryPage";
import AboutPage from "./pages/AboutPage";
import StyleguidePage from "./pages/StyleguidePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/koleksiyon" element={<CollectionPage />} />
          <Route path="/nesneler/:id" element={<ObjectDetailPage />} />
          <Route path="/gunluk" element={<JournalPage />} />
          <Route path="/yazisma" element={<InquiryPage />} />
          <Route
            path="/resim-cizim"
            element={<CollectionPage presetCategory="Resim & Çizim" />}
          />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/styleguide" element={<StyleguidePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

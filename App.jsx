import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SurprisePage from "./src/components/SurprisePage";
import CakePage from "./src/components/CakePage";
import NextSurprisePage from "./src/components/NextSurprisePage";
import LetterPage from "./src/components/LetterPage";
import FinalLovePage from "./src/components/FinalLovePage";

function StartAtFirstPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasCheckedInitialPath = useRef(false);

  useEffect(() => {
    if (hasCheckedInitialPath.current) return;
    hasCheckedInitialPath.current = true;

    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <StartAtFirstPage />
      <Routes>
        <Route path="/" element={<SurprisePage />} />
        <Route path="/cake" element={<CakePage />} />
        <Route path="/next-surprise" element={<NextSurprisePage />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/final-love" element={<FinalLovePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
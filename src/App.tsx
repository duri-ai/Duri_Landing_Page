import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Eula from "./pages/Eula.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/eula" element={<Eula />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App

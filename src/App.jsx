import Footer from "./components/Footer";
import Header from "./components/Header";
import Accueil from "./components/pages/Accueil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecole from "./components/pages/Ecole";
import Infos from "./components/pages/Infos";
import Equipe from "./components/pages/Equipe";

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/L'école" element={<Ecole />} />
            <Route path="/Infos" element={<Infos />} />
            <Route path="/Equipe" element={<Equipe />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

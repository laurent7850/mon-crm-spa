import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardPersonnel from "./pages/DashboardPersonnel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route d'accueil obligatoire */}
        <Route path="/" element={<div>Bienvenue sur mon CRM !</div>} />
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-personnel" element={<DashboardPersonnel user={{ id: 'USER_ID' }} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

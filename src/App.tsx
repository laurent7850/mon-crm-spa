import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardPersonnel from "./pages/DashboardPersonnel";

function App() {
  // State pour gérer l'utilisateur connecté
  const [user, setUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Accueil simple ou redirection */}
        <Route path="/" element={
          user 
            ? <Navigate to={user.role === 'admin' ? "/dashboard-admin" : "/dashboard-personnel"} /> 
            : <Navigate to="/login" />
        } />

        {/* Login : onLogin met à jour le state user */}
        <Route path="/login" element={<Login onLogin={setUser} />} />

        {/* Dashboard admin : accès seulement si user admin */}
        <Route
          path="/dashboard-admin"
          element={
            user && user.role === 'admin'
              ? <DashboardAdmin />
              : <Navigate to="/login" />
          }
        />

        {/* Dashboard personnel : accès seulement si user */}
        <Route
          path="/dashboard-personnel"
          element={
            user
              ? <DashboardPersonnel user={user} />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

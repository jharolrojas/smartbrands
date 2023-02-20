import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ContainerGraphsLead from "./components/graphs/ContainerGraphsLead";
import HomeLead from "./components/leads/HomeLead";
import HomeUser from "./components/users/HomeUser";
import HomeService from "./components/services/HomeService";
import NavBar from "./page/NavBar";
import { useEffect } from "react";
import useGetData from "./customHooks/useGetData";

function App() {
  const { user, setUser } = useGetData();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);
  return (
    <HashRouter>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/ListaLead" element={<HomeLead />} />
          <Route path="/ListaServicios" element={<HomeService />} />
          <Route path="/Graficas" element={<ContainerGraphsLead />} />
          <Route path="/ListaUsuarios" element={<HomeUser />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

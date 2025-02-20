import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/home", "/login", "/register"];

  return (
    <>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      <Routes>
        <Route path="/" element={<h1>Bienvenido al Gestor de Tareas</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

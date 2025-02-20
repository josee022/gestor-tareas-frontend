import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Bienvenido al Gestor de Tareas</h1>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1>Bienvenido al Gestor de Tareas</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Folders from "./pages/Folders";
import FolderDetails from "./pages/FolderDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/folders/:id" element={<FolderDetails />} />
      </Routes>
    </>
  );
};

export default App;

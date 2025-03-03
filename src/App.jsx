import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Folders from "./pages/Folders";
import FolderDetails from "./pages/FolderDetails";
import Tags from "./pages/Tags";
import CalendarPage from "./pages/Calendar";

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
        <Route path="/tags" element={<Tags />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
};

export default App;

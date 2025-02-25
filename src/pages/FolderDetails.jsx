import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FolderTasks from "../components/FolderTasks";
import AssignTaskToFolderModal from "../components/AssignTaskToFolderModal";
import TaskEditModal from "../components/TaskEditModal";
import api from "../services/api";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openAssignTask, setOpenAssignTask] = useState(false);
  const navigate = useNavigate();

  const [editTask, setEditTask] = useState(null);
  const [openEditTasks, setOpenEditTasks] = useState(false);

  const handleOpenEditModalTasks = (task) => {
    setEditTask(task);
    setOpenEditTasks(true);
  };

  const handleCloseEditModalTasks = () => {
    setOpenEditTasks(false);
    setEditTask(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      handleCloseEditModalTasks();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  };

  const handleTaskAssigned = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        const response = await api.get(`/folders/${id}/tasks`);
        setFolder(response.data.folder);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error al obtener detalles de la carpeta:", error);
      }
    };

    fetchFolderDetails();
  }, [id]);

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "url('/img/fondo3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "transparent",
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            Volver
          </Button>
          {folder ? (
            <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFF" }}
              >
                {folder.name}
              </Typography>
              <FolderTasks
                folder={folder}
                tasks={tasks}
                onRemoveTask={handleDeleteTask}
                onEditTask={handleOpenEditModalTasks}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                }}
                onClick={() => setOpenAssignTask(true)}
              >
                Añadir Tarea a {folder.name}
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "#FFF" }}>
              Cargando...
            </Typography>
          )}
        </Paper>
      </Box>

      <AssignTaskToFolderModal
        open={openAssignTask}
        onClose={() => setOpenAssignTask(false)}
        folder={folder}
        onTaskAssigned={handleTaskAssigned}
      />
      <TaskEditModal
        open={openEditTasks}
        onClose={handleCloseEditModalTasks}
        task={editTask}
        onUpdate={handleUpdateTask}
      />
    </Box>
  );
};

export default FolderDetails;

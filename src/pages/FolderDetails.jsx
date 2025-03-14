import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FolderIcon from "@mui/icons-material/Folder";
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

  const handleRemoveTaskFromFolder = async (taskId) => {
    if (window.confirm("¿Seguro que deseas quitar esta tarea de la carpeta?")) {
      try {
        await api.put(`/tasks/${taskId}/remove-folder`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Error al quitar la tarea de la carpeta:", error);
      }
    }
  };

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
          backgroundImage: "url('/img/fondo2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowX: "hidden",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "black",
            backgroundColor: "white",
            boxShadow : "4px 4px 10px rgba(0, 0, 0, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255 ,255, 0.8)",
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Paper
          elevation={4}
          sx={{
            padding: "1.5rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "rgba(0, 0, 0, 0.6)",
            textAlign: "center",
            color: "white",
          }}
        >
          {folder ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FolderIcon sx={{ mr: 1, fontSize: "2.5rem" }} />{" "}
                  {folder.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #C08457, #8D5B4C)",
                  }}
                  onClick={() => setOpenAssignTask(true)}
                >
                  + Añadir Tarea
                </Button>
              </Box>
              <FolderTasks
                folder={folder}
                tasks={tasks}
                onRemoveTask={handleDeleteTask}
                onEditTask={handleOpenEditModalTasks}
                onRemoveFromFolder={handleRemoveTaskFromFolder}
              />
            </>
          ) : (
            <Typography variant="body1">Cargando...</Typography>
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

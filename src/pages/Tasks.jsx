import { useState, useEffect } from "react";
import api from "../services/api";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import TaskEditModal from "../components/TaskEditModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TaskDetailsModal from "../components/TaskDetailsModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showTask, setShowTask] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(
        response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      await api.post("/tasks", newTask);
      fetchTasks();
      setOpenCreate(false);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleOpenEditModal = (task) => {
    setEditTask(task);
    setOpenEdit(true);
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    setEditTask(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      fetchTasks();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleOpenDetailsModal = (task) => {
    setShowTask(task);
    setOpenDetails(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetails(false);
    setShowTask(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: "url('/img/fondotasks.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#4A4A4A" }}
            >
              Lista de Tareas
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(to right, #C08457, #8D5B4C)",
                borderRadius: "20px",
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => setOpenCreate(true)}
            >
              Nueva Tarea
            </Button>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {tasks.length === 0 ? (
              <Typography variant="body1" sx={{ color: "#666" }}>
                No hay tareas disponibles
              </Typography>
            ) : (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "1rem",
                      borderRadius: "10px",
                      background: "#FFF",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#8D5B4C" }}
                    >
                      Prioridad: {task.priority}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#C08457" }}
                    >
                      Estado: {task.status}
                    </Typography>

                    {/* Mostrar Fecha Límite solo si está asignada */}
                    {task.due_date && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "14px", color: "#666" }}
                      >
                        Fecha Límite: {task.due_date}
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => handleOpenDetailsModal(task)}
                        sx={{ color: "#4A4A4A" }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenEditModal(task)}
                        sx={{ color: "#8D5B4C" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTask(task.id)}
                        sx={{ color: "#C08457" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>

        <TaskForm
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onCreate={handleCreateTask}
        />
        <TaskEditModal
          open={openEdit}
          onClose={handleCloseEditModal}
          task={editTask}
          onUpdate={handleUpdateTask}
        />
        <TaskDetailsModal
          open={openDetails}
          onClose={handleCloseDetailsModal}
          task={showTask}
        />
      </Box>
    </Box>
  );
};

export default Tasks;

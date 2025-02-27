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
import PushPinIcon from "@mui/icons-material/PushPin";
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
        response.data
          .map((task) => ({
            ...task,
            pinned_at: task.is_pinned
              ? task.pinned_at || new Date().toISOString()
              : null,
          }))
          .sort((a, b) => {
            if (a.is_pinned === b.is_pinned) {
              if (a.is_pinned) {
                return new Date(b.pinned_at) - new Date(a.pinned_at);
              }
              return new Date(b.created_at) - new Date(a.created_at);
            }
            return b.is_pinned - a.is_pinned;
          })
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

  const handleTogglePin = async (taskId, isPinned) => {
    try {
      await api.put(`/tasks/${taskId}/pin`);

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                is_pinned: !isPinned,
                pinned_at: !isPinned ? new Date().toISOString() : null,
              }
            : task
        );
        return updatedTasks.sort((a, b) => {
          if (a.is_pinned === b.is_pinned) {
            if (a.is_pinned) {
              return new Date(b.pinned_at) - new Date(a.pinned_at);
            }
            return new Date(b.created_at) - new Date(a.created_at);
          }
          return b.is_pinned - a.is_pinned;
        });
      });
    } catch (error) {
      console.error("Error al fijar/desfijar la tarea:", error);
    }
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
          elevation={0}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "transparent",
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
            <Box
              sx={{
                display: "inline-block",
                background: "linear-gradient(to right, #C08457, #FFD699)",
                padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                borderRadius: "25px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#FFF",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                Lista de Tareas
              </Typography>
            </Box>

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
          <Grid container spacing={3} justifyContent="flex-start">
            {tasks.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20vh",
                  textAlign: "center",
                  marginLeft: "24vw",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    borderRadius: "15px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#FFF",
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.7rem" },
                      background: "linear-gradient(to right, #C08457, #FFD699)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    No hay tareas disponibles
                  </Typography>
                </Box>
              </Box>
            ) : (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "1rem",
                      borderRadius: "10px",
                      background:
                        task.status === "completada" ? "#E0F7E9" : "#FFF",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      position: "relative",
                      minHeight: "150px",
                      opacity: task.status === "completada" ? 0.7 : 1,
                      border:
                        task.status === "completada"
                          ? "2px solid #4CAF50"
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => handleTogglePin(task.id, task.is_pinned)}
                        sx={{
                          color: task.is_pinned
                            ? "#8D5B4C"
                            : "rgba(0, 0, 0, 0.5)",
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.2)",
                          },
                        }}
                      >
                        <PushPinIcon
                          sx={{
                            fontSize: "20px",
                            opacity: task.is_pinned ? 1 : 0.5,
                            transform: task.is_pinned
                              ? "rotate(0deg)"
                              : "rotate(45deg)",
                          }}
                        />
                      </IconButton>
                    </Box>

                    {task.status === "completada" && (
                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#4CAF50",
                        }}
                      >
                        ✅
                      </Typography>
                    )}

                    {task.due_date && (
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#555",
                          background: "#FFD699",
                          padding: "4px 8px",
                          borderRadius: "5px",
                          whiteSpace: "nowrap",
                          "@media (max-width: 400px)": {
                            fontSize: "10px",
                            padding: "3px 6px",
                          },
                        }}
                      >
                        {new Date(task.due_date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                    )}

                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          marginTop: task.due_date ? "10px" : "0px",
                          textDecoration:
                            task.status === "completada"
                              ? "line-through"
                              : "none",
                          color:
                            task.status === "completada"
                              ? "#4CAF50"
                              : "inherit",
                        }}
                      >
                        {task.title.charAt(0).toUpperCase() +
                          task.title.slice(1)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: "#8D5B4C",
                          textAlign: "center",
                        }}
                      >
                        Prioridad: {task.priority}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: "#C08457",
                          textAlign: "center",
                        }}
                      >
                        Estado: {task.status}
                      </Typography>
                    </Box>

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

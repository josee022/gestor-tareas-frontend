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
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskTagModal from "../components/TaskTagModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showTask, setShowTask] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      console.log("Tareas obtenidas:", response.data);

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

  const tagColors = ["#E57373", "#81C784", "#64B5F6", "#FFD54F", "#BA68C8"];

  const getTagColor = (tagName) => {
    let hash = 0;
    for (let i = 0; i < tagName.length; i++) {
      hash = (hash * 31 + tagName.charCodeAt(i)) % 1000;
    }
    return tagColors[hash % tagColors.length];
  };

  const handleRemoveTag = async (taskId, tagId) => {
    try {
      await api.delete(`/tasks/${taskId}/tags/${tagId}`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, tags: task.tags.filter((tag) => tag.id !== tagId) }
            : task
        )
      );
    } catch (error) {
      console.error("Error al eliminar etiqueta:", error);
    }
  };

  const handleOpenTagModal = (task) => {
    setSelectedTask(task);
    setOpenTagModal(true);
  };

  const handleCloseTagModal = () => {
    setOpenTagModal(false);
    setSelectedTask(null);
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
          <Grid container spacing={2} justifyContent="flex-start">
            {tasks.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "15vh",
                  textAlign: "center",
                  marginLeft: "20vw",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#FFF",
                    fontSize: "1rem",
                    background: "linear-gradient(to right, #C08457, #FFD699)",
                    padding: "6px 12px",
                    borderRadius: "15px",
                  }}
                >
                  No hay tareas disponibles
                </Typography>
              </Box>
            ) : (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={3} key={task.id} sx={{ paddingBottom: "40px" }}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: "0.8rem",
                      borderRadius: "8px",
                      background:
                        task.status === "completada" ? "#E0F7E9" : "#FFF",
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                      minHeight: "180px",
                      height: "100%",
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
                        top: 6,
                        right: 6,
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
                            fontSize: "18px",
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
                          bottom: 6,
                          left: 6,
                          fontSize: "14px",
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
                          top: 6,
                          left: 6,
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#555",
                          background: "#FFD699",
                          padding: "3px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {new Date(task.due_date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        textAlign: "center",
                        textDecoration:
                          task.status === "completada"
                            ? "line-through"
                            : "none",
                        color:
                          task.status === "completada" ? "#4CAF50" : "inherit",
                        marginTop: "18px",
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: "#8D5B4C",
                        textAlign: "center",
                        fontSize: "0.8rem",
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
                        fontSize: "0.8rem",
                      }}
                    >
                      Estado: {task.status}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.3,
                        mt: 1,
                        justifyContent: "center",
                      }}
                    >
                      {Array.isArray(task.tags) && task.tags.length > 0 ? (
                        task.tags.map((tag) => (
                          <Chip
                            key={tag.id}
                            label={tag.name}
                            sx={{
                              backgroundColor: getTagColor(tag.name),
                              color: "#FFF",
                              fontSize: "0.7rem",
                              height: "18px",
                              borderRadius: "10px",
                            }}
                            onDelete={() => handleRemoveTag(task.id, tag.id)}
                            deleteIcon={
                              <CloseIcon
                                sx={{ color: "white", fontSize: "12px" }}
                              />
                            }
                          />
                        ))
                      ) : (
                        <Typography
                          variant="caption"
                          sx={{ color: "#999", fontSize: "10px" }}
                        >
                          Sin etiquetas
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                    >
                      <Button
                        onClick={() => handleOpenTagModal(task)}
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          backgroundColor: "#C08457",
                          "&:hover": {
                            backgroundColor: "#A06A3E",
                          },
                        }}
                      >
                        + Etiqueta
                      </Button>
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
        <TaskTagModal
          open={openTagModal}
          onClose={handleCloseTagModal}
          task={selectedTask}
          onTagAssigned={fetchTasks}
        />
      </Box>
    </Box>
  );
};

export default Tasks;

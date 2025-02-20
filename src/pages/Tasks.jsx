import { useState, useEffect } from "react";
import api from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 1,
  });
  const [editTask, setEditTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", newTask);
      setNewTask({ title: "", description: "", priority: 1 });
      fetchTasks();
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
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditTask(null);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask.id}`, editTask);
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/img/fondotasks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "95vh",
        width: "calc(100vw - 78px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: "2rem",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "500px",
          background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#4A4A4A", mb: 2 }}
        >
          Lista de Tareas
        </Typography>

        <form
          onSubmit={handleCreateTask}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            fullWidth
            label="Título"
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #C08457, #8D5B4C)",
              borderRadius: "25px",
              padding: "10px",
            }}
          >
            Agregar Tarea
          </Button>
        </form>

        <List sx={{ mt: 3 }}>
          {tasks.length === 0 ? (
            <Typography variant="body1" sx={{ color: "#666" }}>
              No hay tareas disponibles
            </Typography>
          ) : (
            tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  background: "#FFF",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                />
                <Box>
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
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Editar Tarea
          </Typography>
          {editTask && (
            <form
              onSubmit={handleUpdateTask}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                required
              />
              <TextField
                fullWidth
                label="Descripción"
                variant="outlined"
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                  borderRadius: "25px",
                  padding: "10px",
                }}
              >
                Guardar Cambios
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;

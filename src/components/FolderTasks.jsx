import PropTypes from "prop-types";
import { Box, Typography, Paper, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../services/api";

const FolderTasks = ({ folder, tasks, onRemoveTask, onEditTask }) => {
  const handleRemoveTask = async (taskId) => {
    if (window.confirm("¿Seguro que deseas quitar esta tarea de la carpeta?")) {
      try {
        await api.put(`/tasks/${taskId}/remove-folder`);
        onRemoveTask(taskId);
      } catch (error) {
        console.error("Error al quitar la tarea de la carpeta:", error);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        borderRadius: "15px",
        background: "#FFF",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "800px",
        mt: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {`Tareas en "${folder.name}"`}
      </Typography>

      <Grid container spacing={2}>
        {tasks.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ color: "#666", textAlign: "center", width: "100%" }}
          >
            No hay tareas en esta carpeta
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
                  textAlign: "center",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <IconButton
                    onClick={() => onEditTask(task)}
                    sx={{ color: "#8D5B4C" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveTask(task.id)}
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
  );
};

FolderTasks.propTypes = {
  folder: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default FolderTasks;

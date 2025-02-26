import PropTypes from "prop-types";
import { Box, Typography, Paper, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const FolderTasks = ({
  folder,
  tasks,
  onRemoveTask,
  onEditTask,
  onRemoveFromFolder,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        borderRadius: "15px",
        background: "linear-gradient(to bottom, #C08457, #8D5B4C)",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "1000px",
        mt: 3,
        color: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        {`Tareas en "${folder.name}"`}
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
        {tasks.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ color: "#DDD", textAlign: "center", width: "100%" }}
          >
            No hay tareas en esta carpeta
          </Typography>
        ) : (
          tasks.map((task) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={task.id}
              sx={{ display: "flex" }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background:
                    task.status === "completada"
                      ? "#E0F7E9"
                      : "linear-gradient(to bottom, #FFF, #EEE)",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  position: "relative",
                  width: "100%",
                  minHeight: "150px",
                  opacity: task.status === "completada" ? 0.7 : 1,
                  border:
                    task.status === "completada" ? "2px solid #4CAF50" : "none",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "rgba(255, 0, 0, 0.8)",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0px 0px 8px rgba(255, 0, 0, 0.8)",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                  onClick={() => onRemoveFromFolder(task.id)}
                >
                  <Typography
                    sx={{ color: "#FFF", fontWeight: "bold", fontSize: "14px" }}
                  >
                    ✖
                  </Typography>
                </Box>
                {task.status === "completada" && (
                  <Typography
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#4CAF50",
                    }}
                  >
                    ✅
                  </Typography>
                )}

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: task.due_date ? "10px" : "0px",
                    textDecoration:
                      task.status === "completada" ? "line-through" : "none",
                    color: task.status === "completada" ? "#4CAF50" : "inherit",
                  }}
                >
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
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
                    onClick={() => onRemoveTask(task.id)}
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
  onRemoveFromFolder: PropTypes.func.isRequired,
};

export default FolderTasks;

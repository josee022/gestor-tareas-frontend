import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../services/api";

const AssignTaskToFolderModal = ({
  open,
  onClose,
  folderId,
  onTaskAssigned,
}) => {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    if (open) {
      fetchAvailableTasks();
    }
  }, [open]);

  const fetchAvailableTasks = async () => {
    try {
      const response = await api.get("/tasks");
      const unassignedTasks = response.data.filter((task) => !task.folder_id);
      setAvailableTasks(unassignedTasks);
    } catch (error) {
      console.error("Error al obtener tareas disponibles:", error);
    }
  };

  const handleAssignTask = async () => {
    if (!selectedTask) return;
    try {
      await api.put(`/tasks/${selectedTask}/move`, { folder_id: folderId });
      onTaskAssigned();
      onClose();
    } catch (error) {
      console.error("Error al asignar tarea:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Asignar Tarea a la Carpeta
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tarea</InputLabel>
          <Select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            {availableTasks.length === 0 ? (
              <MenuItem disabled>No hay tareas disponibles</MenuItem>
            ) : (
              availableTasks.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.title}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAssignTask}
          disabled={!selectedTask}
          sx={{
            background: "linear-gradient(to right, #C08457, #8D5B4C)",
          }}
        >
          Asignar
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

AssignTaskToFolderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  folderId: PropTypes.number.isRequired,
  onTaskAssigned: PropTypes.func.isRequired,
};

export default AssignTaskToFolderModal;

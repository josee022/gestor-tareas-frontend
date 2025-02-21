import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TaskForm = ({ open, onClose, onCreate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "media",
    status: "pendiente",
    due_date: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(task);
    setTask({
      title: "",
      description: "",
      priority: "media",
      status: "pendiente",
      due_date: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Crear Nueva Tarea
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Prioridad</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <MenuItem value="baja">Baja</MenuItem>
              <MenuItem value="media">Media</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
              <MenuItem value="urgente">Urgente</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="due_date"
            type="date"
            value={task.due_date}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ background: "linear-gradient(to right, #C08457, #8D5B4C)" }}
          >
            Crear Tarea
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

// Validación de `props`
TaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
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

export default TaskForm;

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import api from "../services/api";

const TaskTagModal = ({ open, onClose, task, onTagAssigned }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    if (open) {
      fetchTags();
    }
  }, [open]);

  const fetchTags = async () => {
    try {
      const response = await api.get("/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error al obtener etiquetas:", error);
    }
  };

  const handleAssignTag = async () => {
    if (!task || !task.id) {
      console.error("Error: No hay una tarea válida seleccionada.");
      return;
    }

    if (!selectedTag) {
      console.error("Error: No se ha seleccionado ninguna etiqueta.");
      return;
    }

    try {
      await api.post(`/tasks/${task.id}/tags`, { tag_id: selectedTag });
      onTagAssigned();
      onClose();
    } catch (error) {
      console.error("Error al asignar etiqueta:", error);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      console.error("Error: El nombre de la etiqueta no puede estar vacío.");
      return;
    }

    try {
      const response = await api.post("/tags", { name: newTagName });
      setTags([...tags, response.data]);
      setNewTagName("");
    } catch (error) {
      console.error("Error al crear etiqueta:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Asignar Etiqueta
        </Typography>

        <Select
          fullWidth
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          sx={{ mb: 2 }}
        >
          {tags.length > 0 ? (
            tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No hay etiquetas disponibles</MenuItem>
          )}
        </Select>

        <Button
          fullWidth
          onClick={handleAssignTag}
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #C08457, #8D5B4C)",
            borderRadius: "25px",
            padding: "10px",
            mb: 2,
          }}
        >
          Asignar Etiqueta
        </Button>

        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          Crear Nueva Etiqueta
        </Typography>
        <TextField
          fullWidth
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Nombre de la nueva etiqueta"
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          onClick={handleCreateTag}
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #C08457, #8D5B4C)",
            borderRadius: "25px",
            padding: "10px",
          }}
        >
          Crear Etiqueta
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

TaskTagModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onTagAssigned: PropTypes.func.isRequired,
};

export default TaskTagModal;

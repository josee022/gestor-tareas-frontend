import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import api from "../services/api";

const FolderFormModal = ({ open, onClose, folder, onUpdate }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (folder) {
      setName(folder.name);
    } else {
      setName("");
    }
  }, [folder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (folder) {
        await api.put(`/folders/${folder.id}`, { name });
      } else {
        await api.post("/folders", { name });
      }
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error al guardar la carpeta:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {folder ? "Editar Carpeta" : "Nueva Carpeta"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            fullWidth
            label="Nombre de la carpeta"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            {folder ? "Actualizar" : "Crear"}
          </Button>
        </form>
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

FolderFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  folder: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default FolderFormModal;

import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";

const FolderEditModal = ({ open, onClose, folder, onUpdate }) => {
  const [editedFolder, setEditedFolder] = useState(folder || {});

  useEffect(() => {
    setEditedFolder(folder || {});
  }, [folder]);

  const handleChange = (e) => {
    setEditedFolder({ ...editedFolder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedFolder);
  };

  if (!folder) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Editar Carpeta
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            fullWidth
            label="Título"
            name="name"
            value={editedFolder.name || ""}
            onChange={handleChange}
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
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

FolderEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  folder: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
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

export default FolderEditModal;

import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

const FolderForm = ({ open, onClose, onCreate }) => {
  const [folder, setFolder] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFolder({ ...folder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(folder);
    setFolder({
      name: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Crear Nueva Carpeta
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={folder.name}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ background: "linear-gradient(to right, #C08457, #8D5B4C)" }}
          >
            Crear Carpeta
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

FolderForm.propTypes = {
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

export default FolderForm;

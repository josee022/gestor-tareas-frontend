import PropTypes from "prop-types";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import api from "../services/api";

const FolderCard = ({ folder, onEdit, onDelete, onSelect }) => {
  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta carpeta?")) {
      try {
        await api.delete(`/folders/${folder.id}`);
        onDelete();
      } catch (error) {
        console.error("Error al eliminar carpeta:", error);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        borderRadius: "10px",
        background: "#FFF",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "250px",
        height: "170px",
        justifyContent: "space-between",
        position: "relative",
        cursor: "pointer", // Permite indicar que es clickeable
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onClick={() => onSelect(folder)} // Llamamos a la función cuando se hace clic
    >
      <FolderIcon sx={{ fontSize: 50, color: "#C08457" }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {folder.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(folder);
          }}
          sx={{ color: "#8D5B4C" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          sx={{ color: "#C08457" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

FolderCard.propTypes = {
  folder: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired, // Nuevo prop para seleccionar carpeta
};

export default FolderCard;

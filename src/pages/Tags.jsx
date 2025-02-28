import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await api.get("/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error al cargar etiquetas", error);
    }
  };

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    try {
      await api.post("/tags", { name: newTag });
      setNewTag("");
      setOpen(false);
      fetchTags();
    } catch (error) {
      console.error("Error al crear etiqueta", error);
    }
  };

  const handleDeleteTag = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta etiqueta?")) {
      try {
        await api.delete(`/tags/${id}`);
        fetchTags();
      } catch (error) {
        console.error("Error al eliminar etiqueta", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: "url('/img/fondo6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3, maxWidth: "80%" }}>
          <Box
            sx={{
              display: "inline-block",
              background: "linear-gradient(to right, #C08457, #FFD699)",
              padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
              borderRadius: "25px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#FFF",
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              Gestión de Etiquetas
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#FFF",
              opacity: 0.85,
              background: "#E6A57D",
              padding: "10px",
              borderRadius: "10px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textAlign: "center",
            }}
          >
            Aquí tendrás todas las etiquetas creadas para utilizarlas en tus
            notas. Las etiquetas te ayudarán a organizar mejor tus tareas y a
            gestionar información importante de manera eficiente.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
            pr: 4,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
                background: "linear-gradient(to right, #C08457, #8D5B4C)",
              borderRadius: "15px",
              fontSize: "14px",
              padding: "6px 12px",
              textTransform: "none",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(to right, #C08457, #8D5B4C)",
              },
            }}
          >
            Nueva Etiqueta
          </Button>
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}
          sx={{ maxWidth: "80%" }}
        >
          {tags.map((tag) => (
            <Grid item xs={6} sm={4} md={3} key={tag.id}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 12px",
                  borderRadius: "8px 20px 8px 20px",
                  backgroundColor: "#FAE3C6",
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#F4D1A5",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#5D4037" }}
                >
                  {tag.name}
                </Typography>
                <IconButton
                  onClick={() => handleDeleteTag(tag.id)}
                  sx={{ color: "#A04030" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#FFF",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: 24,
              width: 300,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Nueva Etiqueta
            </Typography>
            <TextField
              fullWidth
              label="Nombre de la etiqueta"
              variant="outlined"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCreateTag}
              sx={{
                background: "linear-gradient(to right, #C08457, #8D5B4C)",
                borderRadius: "15px",
                fontSize: "14px",
                padding: "6px 12px",
                textTransform: "none",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "linear-gradient(to right, #E8B898, #C28B6B)",
                },
              }}
            >
              Crear
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Tags;

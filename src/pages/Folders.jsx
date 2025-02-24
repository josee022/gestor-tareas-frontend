import { useState, useEffect } from "react";
import api from "../services/api";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import FolderCard from "../components/FolderCard";
import FolderFormModal from "../components/FolderFormModal";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [editFolder, setEditFolder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await api.get("/folders");
      setFolders(
        response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
    } catch (error) {
      console.error("Error al obtener carpetas:", error);
    }
  };

  const handleCreateFolder = async (newFolder) => {
    try {
      const response = await api.post("/folders", newFolder);
      setFolders((prevFolders) => [response.data, ...prevFolders]); // Agrega la nueva carpeta al inicio
      setOpenModal(false);
    } catch (error) {
      console.error("Error al crear carpeta:", error);
    }
  };

  const handleUpdateFolder = async (updatedFolder) => {
    try {
      const response = await api.put(
        `/folders/${updatedFolder.id}`,
        updatedFolder
      );
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === updatedFolder.id
            ? { ...folder, ...response.data }
            : folder
        )
      );
      setOpenModal(false);
      setEditFolder(null);
    } catch (error) {
      console.error("Error al actualizar carpeta:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta carpeta?")) return;

    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== folderId)
    );

    try {
      await api.delete(`/folders/${folderId}`);
    } catch (error) {
      console.error("Error al eliminar la carpeta:", error);
      alert("Hubo un error al eliminar la carpeta.");
      fetchFolders(); // Vuelve a cargar la lista en caso de error
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: "url('/img/fondo3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "transparent",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box
              sx={{
                display: "inline-block",
                background: "linear-gradient(to right, #C08457, #FFD699)",
                padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                borderRadius: "25px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
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
                Lista de Carpetas
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(to right, #C08457, #8D5B4C)",
                borderRadius: "20px",
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => {
                setEditFolder(null);
                setOpenModal(true);
              }}
            >
              Nueva Carpeta
            </Button>
          </Box>
          <Grid container spacing={3} justifyContent="flex-start">
            {folders.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#FFF", textAlign: "center" }}
              >
                No hay carpetas disponibles
              </Typography>
            ) : (
              folders.map((folder) => (
                <Grid item xs={12} sm={6} md={4} key={folder.id}>
                  <FolderCard
                    folder={folder}
                    onEdit={() => {
                      setEditFolder(folder);
                      setOpenModal(true);
                    }}
                    onDelete={() => handleDeleteFolder(folder.id)}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Paper>
      </Box>

      <FolderFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditFolder(null);
        }}
        folder={editFolder}
        onUpdate={handleUpdateFolder}
        onCreate={handleCreateFolder}
      />
    </Box>
  );
};

export default Folders;

import { useState, useEffect } from "react";
import api from "../services/api";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import FolderForm from "../components/FolderForm";
import FolderEditModal from "../components/FolderEditModal";

const Folder = () => {
  const [folder, setFolder] = useState([]);
  const [editFolder, setEditFolder] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    fetchFolder();
  }, []);

  const fetchFolder = async () => {
    try {
      const response = await api.get("/folders");
      setFolder(
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
      await api.post("/folders", newFolder);
      fetchFolder();
      setOpenCreate(false);
    } catch (error) {
      console.error("Error al crear carpeta:", error);
    }
  };

  const handleDeleteFolder = async (id) => {
    try {
      await api.delete(`/folders/${id}`);
      fetchFolder();
    } catch (error) {
      console.error("Error al eliminar carpeta:", error);
    }
  };

  const handleOpenEditModal = (folder) => {
    setEditFolder(folder);
    setOpenEdit(true);
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    setEditFolder(null);
  };

  const handleUpdateFolder = async (updatedFolder) => {
    try {
      await api.put(`/folders/${updatedFolder.id}`, updatedFolder);
      fetchFolder();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar carpeta:", error);
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
          backgroundImage: "url('/img/fondo3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
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
              onClick={() => setOpenCreate(true)}
            >
              Nueva Carpeta
            </Button>
          </Box>
          <Grid container spacing={3} justifyContent="flex-start">
            {folder.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20vh",
                  textAlign: "center",
                  marginLeft: "24vw",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    borderRadius: "15px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#FFF",
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.7rem" },
                      background: "linear-gradient(to right, #C08457, #FFD699)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    No hay carpetas disponibles
                  </Typography>
                </Box>
              </Box>
            ) : (
              folder.map((folder) => (
                <Grid item xs={12} sm={6} md={4} key={folder.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "1rem",
                      borderRadius: "10px",
                      background: "#FFF",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      position: "relative",
                      minHeight: "150px",
                      opacity: 1,
                      border: "none",
                    }}
                  >
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          marginTop: "0px",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {folder.name.charAt(0).toUpperCase() +
                          folder.name.slice(1)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => handleOpenEditModal(folder)}
                        sx={{ color: "#8D5B4C" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteFolder(folder.id)}
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

        <FolderForm
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onCreate={handleCreateFolder}
        />
        <FolderEditModal
          open={openEdit}
          onClose={handleCloseEditModal}
          folder={editFolder}
          onUpdate={handleUpdateFolder}
        />
      </Box>
    </Box>
  );
};

export default Folder;

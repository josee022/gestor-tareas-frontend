import { useState, useEffect } from "react";
import api from "../services/api";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";
import FolderCard from "../components/FolderCard";
import FolderFormModal from "../components/FolderFormModal";
import FolderTasks from "../components/FolderTasks";
import AssignTaskToFolderModal from "../components/AssignTaskToFolderModal";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openAssignTask, setOpenAssignTask] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await api.get("/folders");
      const sortedFolders = response.data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setFolders(sortedFolders);
    } catch (error) {
      console.error("Error al obtener carpetas:", error);
    }
  };

  const handleOpenModal = (folder = null) => {
    setEditFolder(folder ? { ...folder } : null);
    setOpenModal(true);
  };

  const handleUpdateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === updatedFolder.id
          ? { ...folder, ...updatedFolder }
          : folder
      )
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditFolder(null);
  };

  const handleSelectFolder = async (folder) => {
    try {
      const response = await api.get(`/folders/${folder.id}/tasks`);
      setSelectedFolder({ ...folder, tasks: response.data });
    } catch (error) {
      console.error("Error al obtener tareas de la carpeta:", error);
    }
  };

  const handleDeleteFolder = (folderId) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== folderId)
    );
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
              onClick={() => handleOpenModal()}
            >
              Nueva Carpeta
            </Button>
          </Box>
          <Grid container spacing={3} justifyContent="flex-start">
            {folders.length === 0 ? (
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
              folders.map((folder) => (
                <Grid item xs={12} sm={6} md={4} key={folder.id}>
                  <FolderCard
                    key={folder.id}
                    folder={folder}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteFolder}
                    onSelect={handleSelectFolder} // Asegura que al hacer clic, se muestren las tareas
                  />
                </Grid>
              ))
            )}
          </Grid>

          {selectedFolder && (
            <>
              <FolderTasks
                folder={selectedFolder}
                tasks={selectedFolder.tasks}
                onRemoveTask={fetchFolders} // Para actualizar al eliminar
                onEditTask={fetchFolders} // Si en un futuro editamos tareas desde aquí
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                }}
                onClick={() => setOpenAssignTask(true)}
              >
                Agregar Tareas a {selectedFolder.name}
              </Button>
            </>
          )}
        </Paper>
      </Box>

      <FolderFormModal
        open={openModal}
        onClose={handleCloseModal}
        folder={editFolder}
        onUpdate={handleUpdateFolder}
      />

      <AssignTaskToFolderModal
        open={openAssignTask}
        onClose={() => setOpenAssignTask(false)}
        folder={selectedFolder}
        onTaskAssigned={fetchFolders}
      />
    </Box>
  );
};

export default Folders;

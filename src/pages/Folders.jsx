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
      setFolders(response.data);
    } catch (error) {
      console.error("Error al obtener carpetas:", error);
    }
  };

  const handleOpenModal = (folder = null) => {
    setEditFolder(folder);
    setOpenModal(true);
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
          backgroundImage: "url('/img/folders-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            width: "90%",
            maxWidth: "1200px",
            background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#4A4A4A" }}
            >
              Carpetas
            </Typography>
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
              <Typography variant="body1" sx={{ color: "#666" }}>
                No hay carpetas disponibles
              </Typography>
            ) : (
              folders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onEdit={handleOpenModal}
                  onClick={() => handleSelectFolder(folder)} // Aquí seleccionamos la carpeta
                />
              ))
            )}
          </Grid>

          {/* Si hay una carpeta seleccionada, mostramos sus tareas */}
          {selectedFolder && (
            <>
              <FolderTasks
                folder={selectedFolder}
                tasks={selectedFolder.tasks}
                onRemoveTask={fetchFolders}
                onEditTask={fetchFolders}
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

      {/* Modal para agregar carpetas */}
      <FolderFormModal
        open={openModal}
        onClose={handleCloseModal}
        folder={editFolder}
        onUpdate={fetchFolders}
      />

      {/* Modal para asignar tareas a carpetas */}
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

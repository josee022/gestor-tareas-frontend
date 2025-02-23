import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FolderTasks from "../components/FolderTasks";
import AssignTaskToFolderModal from "../components/AssignTaskToFolderModal";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openAssignTask, setOpenAssignTask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/folders/${id}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFolder(response.data.folder);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching folder details:", error);
      }
    };

    fetchFolderDetails();
  }, [id]);

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
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          >
            Volver
          </Button>
          {folder ? (
            <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFF" }}
              >
                {folder.name}
              </Typography>
              <FolderTasks
                folder={folder}
                tasks={tasks}
                onRemoveTask={() =>
                  setTasks(tasks.filter((task) => task.id !== id))
                }
                onEditTask={() => {}}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                }}
                onClick={() => setOpenAssignTask(true)}
              >
                Añadir Tarea a {folder.name}
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "#FFF" }}>
              Cargando...
            </Typography>
          )}
        </Paper>
      </Box>

      <AssignTaskToFolderModal
        open={openAssignTask}
        onClose={() => setOpenAssignTask(false)}
        folder={folder}
        onTaskAssigned={() => {
          setOpenAssignTask(false);
        }}
      />
    </Box>
  );
};

export default FolderDetails;

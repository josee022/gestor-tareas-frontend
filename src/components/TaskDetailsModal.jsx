import PropTypes from "prop-types";
import { Box, Typography, Modal, Button } from "@mui/material";

const TaskDetailsModal = ({ open, onClose, task }) => {
  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="body2"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: task.status === "completada" ? "#2E7D32" : "#C08457",
            textAlign: "center",
            mb: 2,
          }}
        >
          {task.status}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 1,
            textAlign: "justify",
            backgroundColor: "#f8f8f8",
            padding: "10px",
            borderRadius: "8px",
            fontStyle: task.description ? "normal" : "italic",
            color: task.description ? "#333" : "#888",
          }}
        >
          {task.description || "Sin descripción"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            px: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#8D5B4C",
              backgroundColor: "#FFE4C4",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            Prioridad: {task.priority}
          </Typography>

          {task.due_date && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#C08457",
                backgroundColor: "#FFD699",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              Fecha Límite: {task.due_date}
            </Typography>
          )}
        </Box>
        <br />
        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "linear-gradient(to right, #C08457, #8D5B4C)",
            display: "block",
            margin: "0 auto",
            borderRadius: "20px",
          }}
          onClick={onClose}
        >
          Cerrar
        </Button>
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
  borderRadius: "15px",
};

TaskDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object,
};

export default TaskDetailsModal;

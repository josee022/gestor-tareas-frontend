import PropTypes from "prop-types";
import { Box, Typography, Modal, Button } from "@mui/material";

const TaskDetailsModal = ({ open, onClose, task }) => {
  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Detalles de la Tarea
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {task.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Descripción:</strong> {task.description || "Sin descripción"}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Prioridad:</strong> {task.priority}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Estado:</strong> {task.status}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Fecha Límite:</strong> {task.due_date || "Sin asignar"}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "linear-gradient(to right, #C08457, #8D5B4C)",
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
  borderRadius: "10px",
};

TaskDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object,
};

export default TaskDetailsModal;

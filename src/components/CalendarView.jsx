import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../services/api";
import { Box, Typography } from "@mui/material";

moment.locale("es"); // Establece el idioma español para los meses

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Controla la fecha actual
  const [view, setView] = useState("month"); // Vista predeterminada en "mes"

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks/calendar");
      setEvents(
        response.data.map((task) => ({
          ...task,
        }))
      );
    } catch (error) {
      console.error("Error al obtener tareas para el calendario", error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(5px)",
        width: "100%",
        maxWidth: "900px",
        height: "80vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#000", mb: 3 }} // Color negro para el título
      >
        Calendario de Tareas
      </Typography>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#FFF",
          borderRadius: "10px",
          padding: "10px",
        }}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        view={view}
        onView={(newView) => setView(newView)}
        messages={{
          today: "Hoy",
          previous: "Atrás",
          next: "Siguiente",
          month: "Mes",
        }}
        views={{ month: true }} // Solo mantiene la vista de "Mes"
        formats={{
          monthHeaderFormat: (date) => moment(date).format("MMMM YYYY"), // "Febrero 2025"
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#C08457", // Color de las tareas
            color: "#333", // Texto oscuro para mejor visibilidad
            borderRadius: "5px",
            fontSize: "12px", // Reduce el tamaño del texto de las tareas
            padding: "2px 5px", // Ajusta el padding para que ocupen menos espacio
            whiteSpace: "nowrap", // Evita que se desborden en varias líneas
            overflow: "hidden",
            textOverflow: "ellipsis", // Agrega "..." si el texto es muy largo
          },
        })}
        dayPropGetter={(date) => {
          // Cambiar el fondo del día actual
          const isToday = moment(date).isSame(moment(), "day");
          return isToday
            ? {
                style: {
                  backgroundColor: "#F0D5B6", // Color pastel claro para el día actual
                },
              }
            : {};
        }}
      />
    </Box>
  );
};

export default CalendarView;

import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; 
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../services/api";
import { Box, Typography } from "@mui/material";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

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
        sx={{ fontWeight: "bold", color: "#000", mb: 3 }}
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
        views={{ month: true }}
        formats={{
          monthHeaderFormat: (date) => moment(date).format("MMMM YYYY"),
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#C08457",
            color: "#333",
            borderRadius: "5px",
            fontSize: "12px",
            padding: "2px 5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        })}
        dayPropGetter={(date) => {
          const isToday = moment(date).isSame(moment(), "day");
          return isToday
            ? {
                style: {
                  backgroundColor: "#F0D5B6",
                },
              }
            : {};
        }}
      />
    </Box>
  );
};

export default CalendarView;

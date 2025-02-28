import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import CalendarView from "../components/CalendarView";

const CalendarPage = () => {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/img/fondo6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: 4,
          overflowY: "auto",
        }}
      >
        <CalendarView />
      </Box>
    </Box>
  );
};

export default CalendarPage;

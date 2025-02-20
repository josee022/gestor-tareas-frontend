import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Dashboard,
  ListAlt,
  Folder,
  Label,
  PushPin,
  CalendarMonth,
  BarChart,
  Palette,
  Lock,
  Settings,
} from "@mui/icons-material";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Tareas", icon: <ListAlt />, path: "/tasks" },
  { text: "Carpetas", icon: <Folder />, path: "/folders" },
  { text: "Etiquetas", icon: <Label />, path: "/tags" },
  { text: "Notas Fijadas", icon: <PushPin />, path: "/pinned" },
  { text: "Calendario", icon: <CalendarMonth />, path: "/calendar" },
  { text: "Estadísticas", icon: <BarChart />, path: "/stats" },
  { text: "Personalización", icon: <Palette />, path: "/theme" },
  { text: "Notas Privadas", icon: <Lock />, path: "/private" },
  { text: "Ajustes", icon: <Settings />, path: "/settings" },
];

const Sidebar = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          background: "linear-gradient(to bottom, #FFEBCC, #FFD699)", // Fondo degradado pastel
          color: "#4A4A4A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Para distribuir mejor los elementos
          padding: "10px",
        },
      }}
    >
      {/* Logo y título */}
      <Box sx={{ textAlign: "center", py: 2 }}>
        <img
          src="/img/logoWeb.png"
          alt="Logo"
          style={{ width: "80px", borderRadius: "10px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
          Gestor de Tareas
        </Typography>
      </Box>

      {/* Lista de navegación */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: "10px",
                margin: "5px",
                transition: "background 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#4A4A4A" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer con algún detalle */}
      <Box sx={{ textAlign: "center", py: 2, fontSize: "12px", opacity: 0.8 }}>
        <Typography variant="body2">© 2025 Gestor de Tareas</Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

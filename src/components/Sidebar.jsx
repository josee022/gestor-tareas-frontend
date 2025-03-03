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
  ListAlt,
  Folder,
  Label,
  CalendarMonth,
} from "@mui/icons-material";

const menuItems = [
  { text: "Tareas", icon: <ListAlt />, path: "/tasks" },
  { text: "Carpetas", icon: <Folder />, path: "/folders" },
  { text: "Etiquetas", icon: <Label />, path: "/tags" },
  { text: "Calendario", icon: <CalendarMonth />, path: "/calendar" },
];

const Sidebar = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          height: "100vh",
          overflow: "hidden",
          background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
          color: "#4A4A4A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        },
      }}
    >
      <Box sx={{ textAlign: "center", py: 1 }}>
        <img
          src="/img/logoWeb.png"
          alt="Logo"
          style={{ width: "70px", borderRadius: "10px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
          Gestor de Tareas
        </Typography>
      </Box>

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
                "& .MuiTypography-root": { color: "#4A4A4A !important" },
              }}
            >
              <ListItemIcon sx={{ color: "#4A4A4A" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ textAlign: "center", py: 1, fontSize: "12px", opacity: 0.8 }}>
        <Typography variant="body2">© 2025 Gestor de Tareas</Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

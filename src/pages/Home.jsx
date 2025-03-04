import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: { main: "#8D5B4C" },
    secondary: { main: "#C08457" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          background:
            "linear-gradient(to right,rgb(255, 145, 0),rgb(243, 201, 154), transparent 40%, transparent 60%,rgb(243, 201, 154), rgb(255, 145, 0))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "100%",
            width: "50vw",
            backgroundImage: "url('/img/fondoGestiones.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Box
          component="img"
          src="/img/logoWeb.png"
          alt="TASKS Logo"
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "180px",
            height: "auto",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Stack spacing={3} sx={{ width: "20%", alignItems: "center" }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Organización
              </Typography>
              <Typography variant="body2">
                Administra tus tareas de forma sencilla.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background:
                  "linear-gradient(to bottom, #D7F8D7,rgb(203, 250, 203))",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Prioridades
              </Typography>
              <Typography variant="body2">
                Ordena tareas según importancia.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background:
                  "linear-gradient(to bottom,rgb(236, 228, 110),rgb(241, 241, 187))",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Sincronización
              </Typography>
              <Typography variant="body2">
                Accede desde cualquier dispositivo.
              </Typography>
            </Paper>
          </Stack>

          <Container maxWidth="sm">
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "rgb(0, 0, 0)", marginTop: -40 }}
            >
              Bienvenido a tu Gestor de Tareas
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  mr: 2,
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                  borderRadius: "25px",
                  padding: "10px 20px",
                  marginBottom: -100,
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(to right, #B76E50, #7A3E32)",
                    color: "white",
                  },
                }}
              >
                Iniciar Sesión
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  mr: 2,
                  background: "linear-gradient(to right, #C08457, #8D5B4C)",
                  borderRadius: "25px",
                  padding: "10px 20px",
                  marginBottom: -100,
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(to right, #B76E50, #7A3E32)",
                    color: "white",
                  },
                }}
              >
                Registrarse
              </Button>
            </Box>
          </Container>

          <Stack spacing={3} sx={{ width: "20%", alignItems: "center" }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background:
                  "linear-gradient(to bottom, rgb(236, 228, 110),rgb(241, 241, 187))",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Notificaciones
              </Typography>
              <Typography variant="body2">
                Recibe recordatorios importantes.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background:
                  "linear-gradient(to bottom, #D7F8D7,rgb(203, 250, 203))",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Seguridad
              </Typography>
              <Typography variant="body2">
                Protección con autenticación segura.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "15px",
                background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A4A4A" }}
              >
                Multiplataforma
              </Typography>
              <Typography variant="body2">
                Usa la app en cualquier navegador.
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

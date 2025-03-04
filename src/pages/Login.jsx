import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/login", { email, password });
      navigate("/tasks");
    } catch (error) {
      alert("Error en login: " + (error.response?.data?.message || "Error desconocido"));
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/img/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
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
      <Paper
        elevation={5}
        sx={{
          padding: "2rem",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(to bottom, #FFEBCC, #FFD699)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              background: "linear-gradient(to right, #C08457, #8D5B4C)",
              borderRadius: "25px",
              padding: "10px",
            }}
          >
            Login
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ color: "#8D5B4C", fontWeight: "bold" }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

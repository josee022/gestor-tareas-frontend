import { useState } from "react";
import api, { setAuthToken } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCsrfToken = async () => {
    try {
      await api.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error obteniendo CSRF token:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await getCsrfToken();
      const response = await api.post("/register", { name, email, password }, {withCredentials: false});
      setAuthToken(response.data.access_token);
      navigate("/tasks");
    } catch (error) {
      setError(error.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/img/register.jpg')",
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
          Registro
        </Typography>

        {error && (
          <Typography sx={{ color: "red", fontSize: "0.9rem", mt: 1 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Registrarse
          </Button>
        </form>

        <Typography sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#8D5B4C", fontWeight: "bold" }}>
            Inicia sesión aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;

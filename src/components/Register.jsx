import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !fullName || !email || !phone) {
      setMessage("Todos los campos son obligatorios");
      setIsError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Por favor, ingresa un correo electrónico válido.");
      setIsError(true);
      return;
    }
    const phoneRegex = /^\d{7,}$/;
    if (!phoneRegex.test(phone)) {
      setMessage(
        "Por favor, ingresa un número de teléfono válido (solo números)"
      );
      setIsError(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (user) => user.username === username || user.email === email
    );
    if (userExists) {
      setMessage(
        "El nombre de usuario o correo electrónico ya existe. Por favor, elige otro"
      );
      setIsError(true);
      return;
    }

    const newUser = { username, password, fullName, email, phone };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    setMessage("¡Registro exitoso! Ya puedes iniciar sesión.");
    setIsError(false);
    setUsername("");
    setPassword("");
    setFullName("");
    setEmail("");
    setPhone("");

    console.log("Usuario registrado:", newUser);
    console.log("Todos los usuarios en localStorage:", users);
  };

  return (
    <div className="register-page-container">
      <h1>Página de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div>
          <label htmlFor="fullName">Nombre Completo:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ingrese su nombre completo"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingrese su número de teléfono (solo números)"
            required
          />
        </div>
        <button type="submit">Registrarse</button>

        {message && (
          <p className={isError ? "message-error" : "message-success"}>
            {message}
          </p>
        )}
      </form>

      <p className="login-link-container">
        ¿Ya tienes cuenta? <Link to="/">Iniciar Sesión</Link>
      </p>
    </div>
  );
}

export default Register;

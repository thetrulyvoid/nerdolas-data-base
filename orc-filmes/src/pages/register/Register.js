import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        alert("Usuário já existe!");
        return;
      }

      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } else {
      alert("Preencha todos os campos.");
    }
  };

  return (
    <div className="register">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <div className="login-link">
        <span>Já tem uma conta? </span>
        <a href="/login">Faça login</a>
      </div>
    </div>
  );
};

export default Register;

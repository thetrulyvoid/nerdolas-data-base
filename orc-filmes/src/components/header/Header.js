import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user); 
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== "") {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchTerm}&language=pt-BR&page=1`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          navigate(`/search?q=${searchTerm}`, { state: { results: data.results } });
        } else {
          alert("Nenhum filme encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        alert("Erro ao realizar a busca.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://media.tenor.com/uiLfqsnCGF0AAAAj/zubrila.gif"
            alt="Logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <span>Favorites</span>
        </Link>
      </div>

      <div className="headerRight">
        <form onSubmit={handleSearchSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Pesquisar filme..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="searchInput"
          />
          <button type="submit" className="searchButton">
            🔍
          </button>
        </form>


        {currentUser ? (
          <div className="user__info">
            <span className="user__name">{currentUser.username}</span>
            <button onClick={handleLogout} className="logoutBtn">Sair</button>
          </div>
        ) : (

          <Link to="/register" className="registerLink">
            <span>Cadastre-se</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

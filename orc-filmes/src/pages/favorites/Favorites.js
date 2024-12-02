import React, { useEffect, useState } from "react";
import Cards from "../../components/card/card";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      const userFavorites =
        JSON.parse(localStorage.getItem("favorites_" + user.username)) || [];
      setFavorites(userFavorites);
    } else {
      alert("Você precisa estar logado para ver seus favoritos.");
    }
  }, []);

  return (
    <div className="favorites">
      <h2>Meus Favoritos</h2>
      {currentUser ? (
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((movie) => <Cards key={movie.id} movie={movie} />)
          ) : (
            <p>Você ainda não tem filmes favoritos.</p>
          )}
        </div>
      ) : (
        <p>Faça login para acessar seus favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;

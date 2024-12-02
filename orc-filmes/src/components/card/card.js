import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }

 
    if (user) {
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      const isMovieFavorite = savedFavorites.some((fav) => fav.id === movie.id);
      setIsFavorite(isMovieFavorite);
    }
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    if (!currentUser) {
      alert("Você precisa estar logado para adicionar aos favoritos.");
      return;
    }

    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.username}`)) || [];

    if (isFavorite) {

      const updatedFavorites = savedFavorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem(`favorites_${currentUser.username}`, JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {

      savedFavorites.push(movie);
      localStorage.setItem(`favorites_${currentUser.username}`, JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.original_title}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.original_title : ""}</div>
              <div className="card__runtime">
                {movie ? movie.release_date : ""}
                <span className="card__rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card__description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
            <button
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;

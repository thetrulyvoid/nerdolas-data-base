import React from "react";
import { useLocation } from 'react-router-dom';
import "./SearchResults.css";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation(); 
  const results = location.state?.results || []; 

  return (
    <div className="searchResults">
      <h2 className="resultados-pesquisa">Resultados da Pesquisa</h2>
      {results.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="movieGrid">
          {results.map((movie) => (
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
              <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                <div className="cards__overlay">
                  <div className="card__title">{movie ? movie.original_title : ""}</div>
                  <div className="card__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="card__rating">{movie ? movie.vote_average : ""}<i className="fas fa-star" /></span>
                  </div>
                  <div className="card__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

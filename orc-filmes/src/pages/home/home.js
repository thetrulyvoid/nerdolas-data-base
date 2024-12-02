import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }

    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=pt-BR"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} key={movie.id}>
              <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie?.original_title}</div>
                <div className="posterImage__runtime">
                  {movie?.release_date}{" "}
                  <span className="posterImage__rating">
                    {movie?.vote_average}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">{movie?.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;

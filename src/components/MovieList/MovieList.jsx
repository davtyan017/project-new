import React, { useRef, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./movielist.css";

const MovieList = ({ movies }) => {
  const movieListRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    const movieList = movieListRef.current;
    if (!movieList) return;

    movieList.classList.add("active");
    setStartX(e.pageX - movieList.offsetLeft);
    setScrollLeft(movieList.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    movieListRef.current?.classList.remove("active");
  };

  const handleMouseUp = () => {
    setIsDown(false);
    movieListRef.current?.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const movieList = movieListRef.current;
    if (!movieList) return;

    const x = e.pageX - movieList.offsetLeft;
    const walk = (x - startX) * 2; 
    movieList.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="movie-list"
      ref={movieListRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      
    </div>
  );
};

export default MovieList;

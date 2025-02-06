import React, { useState } from "react";
import "./moviecard.css";

const MovieCard = ({ movie }) => {
  const { title, overview, poster_path, vote_average } = movie;
  const [isHovered, setIsHovered] = useState(false);

  const openYouTubeSearch = (title) => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        title + " trailer"
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      {isHovered && (
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{overview.split(" ", 7).join(" ")}...</p>
          <div
            className="vote"
            style={{
              backgroundImage: `conic-gradient(orange 0 ${
                vote_average * 10
              }%, gray ${vote_average * 10}%)`,
            }}
          >
            <b>{vote_average.toFixed(1)}</b>
          </div>
          <button onClick={() => openYouTubeSearch(title)}>🔍 Trailer</button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

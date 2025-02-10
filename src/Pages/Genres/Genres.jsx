import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./genres.css";
import GenreDetails from "../GenresDetails/GenresDetails";
import ShowDetails from "../ShowDetails/ShowDetails";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM4NjNiZjI5MWY1NjUxOTAyYmIzYWY4MjI1NmUwMiIsIm5iZiI6MTcyMjI2NjcwOC45NTE2NTEsInN1YiI6IjYxNTYyZWY2ZTE4Yjk3MDA2MjkyODgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pc9HKdkZ00pcvwMOBUPleRf4V1CZ0SDc9IsGtZFmuA4";

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
};

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [selectedShow, setSelectedShow] = useState(null); 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_URL}/genre/tv/list`, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setGenres(data.genres || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load genres.");
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setSelectedShow(null); 
  };

  const handleShowClick = (showId) => {
    setSelectedShow(showId);
  };

  return (
    <div className="genres">
      <div className="navgenres">
        <h2>Genres</h2>
        <Link to="/">Home</Link>
      </div>

      <div className="genre-list">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ul>
            {genres.map((genre) => (
              <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                {genre.name}
              </li>
            ))}
          </ul>
        )}
        
        {selectedGenre && (
          <div className="genre-details-section">
            <GenreDetails genreId={selectedGenre} onShowClick={handleShowClick} />
          </div>
        )}

        {selectedShow && (
          <div className="show-details-section">
            <ShowDetails showId={selectedShow} />
          </div>
        )}
      </div>
    </div>
  );
}

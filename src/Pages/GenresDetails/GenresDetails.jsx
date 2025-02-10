import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./GenresDetails.css";

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

const GenreDetails = ({ genreId, onShowClick }) => {
  const [genreDetails, setGenreDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/discover/tv?with_genres=${genreId}`, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setGenreDetails(data.results || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load TV shows.");
        setLoading(false);
      }
    };
    fetchGenreDetails();
  }, [genreId]);

  return (
    <div className="genre-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && genreDetails.length > 0 ? (
        <ul>
          {genreDetails.map((show) => (
            <li key={show.id} onClick={() => onShowClick(show.id)}>
              {show.name}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No shows available for this genre.</p>
      )}
    </div>
  );
};

GenreDetails.propTypes = {
  genreId: PropTypes.number.isRequired,
  onShowClick: PropTypes.func.isRequired,
};

export default GenreDetails;

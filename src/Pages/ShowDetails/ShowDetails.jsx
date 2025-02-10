import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ShowDetails.css";

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

const ShowDetails = ({ showId }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/tv/${showId}`, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setShowDetails(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load show details.");
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [showId]);

  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";  

  return (
    <div className="show-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && showDetails && (
        <div>
          <h3>{showDetails.name}</h3>
          {showDetails.poster_path && (
            <img 
              src={`${IMAGE_URL}${showDetails.poster_path}`} 
              alt={showDetails.name} 
              className="show-poster" 
            />
          )}
          <p>{showDetails.overview}</p>
          <p>First air date: {showDetails.first_air_date}</p>
        </div>
      )}
    </div>
  );
};

ShowDetails.propTypes = {
  showId: PropTypes.number.isRequired,
};

export default ShowDetails;

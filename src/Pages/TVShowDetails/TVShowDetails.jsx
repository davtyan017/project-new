import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TVShowDetails.css"

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM4NjNiZjI5MWY1NjUxOTAyYmIzYWY4MjI1NmUwMiIsIm5iZiI6MTcyMjI2NjcwOC45NTE2NTEsInN1YiI6IjYxNTYyZWY2ZTE4Yjk3MDA2MjkyODgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pc9HKdkZ00pcvwMOBUPleRf4V1CZ0SDc9IsGtZFmuA4";  // Ensure this key is valid

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
};

export default function TVShowDetails() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/tv/${id}`, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTvShow(data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        setError("Failed to load TV show details.");
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!tvShow) return <p>Loading...</p>;

  return (
    <div className="TVShowDetails">
      <h3>{tvShow.name}</h3>
      <p>{tvShow.overview}</p>
      {tvShow.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          alt={tvShow.name}
        />
      )}
    </div>
  );
}

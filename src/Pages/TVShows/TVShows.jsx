import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./tvshows.css";

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

export default function TVShows() {
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await fetch(`${API_URL}/tv/popular`, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTvShows(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load TV shows.");
        setLoading(false);
      }
    };
    fetchTVShows();
  }, []);

  return (
    <div className="tvshows">
      <div className="navtvshows">
        <h2>TV Shows</h2>
        <Link to="/">Home</Link>
      </div>
      <div className="post">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <ul>
            {tvShows.map((show) => (
              <li key={show.id}>
                <Link to={`${show.id}`} state={{ background: location }}>
                  {show.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Outlet />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import Pagination from "./components/Pagination/Pagination";

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

const App = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (endpoint) => {
    try {
      const res = await fetch(endpoint, fetchOptions);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching movies:", err);
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies(`${API_URL}/discover/movie?page=${page}`);
      setMovies(data.results || []);
    };
    loadMovies();
  }, [page]);

  useEffect(() => {
    const loadTopMovies = async () => {
      const data = await fetchMovies(`${API_URL}/movie/top_rated?page=${page}`);
      setTopMovies(data.results || []);
    };
    loadTopMovies();
  }, [page]);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const data = await fetchMovies(`${API_URL}/search/movie?query=${query}`);
    setSearchResults(data.results || []);
  };

  return (
    <div className="App">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <div>
        {searchResults.length > 0 && <MovieList movies={searchResults} />}
      </div>

      <h2 className="listname">Top Rated Movies</h2>
      <div>
        <MovieList movies={topMovies} />
      </div>

      <h2 className="listname">All Movies</h2>
      <div>
        <MovieList movies={movies} />
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default App;

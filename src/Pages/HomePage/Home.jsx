import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";
import "./Home.css"; 

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

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Combined fetching for movies and top-rated movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [discoverRes, topRatedRes] = await Promise.all([
          fetch(`${API_URL}/discover/movie?page=${page}`, fetchOptions),
          fetch(`${API_URL}/movie/top_rated?page=${page}`, fetchOptions)
        ]);
        const discoverData = await discoverRes.json();
        const topRatedData = await topRatedRes.json();
        setMovies(discoverData.results || []);
        setTopMovies(topRatedData.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    loadMovies();
  }, [page]);

  // Handle movie search
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/search/movie?query=${query}`, fetchOptions);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Error searching movies:", err);
    }
  };

  return (
    <div className="Home">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {searchResults.length > 0 && (
        <div>
          <MovieList movies={searchResults} />
        </div>
      )}

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
}

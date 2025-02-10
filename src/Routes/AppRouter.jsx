import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import Home from "../Pages/HomePage/Home";
import TVShowDetails from "../Pages/TVShowDetails/TVShowDetails";
import Genres from "../Pages/Genres/Genres";
import TVShows from "../Pages/TVShows/TVShows";
import GenreDetails from "../Pages/GenresDetails/GenresDetails";
import ShowDetails from "../Pages/ShowDetails/ShowDetails";  

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tvshows" element={<TVShows />}>
          <Route path=":id" element={<TVShowDetails />} />
        </Route>
        <Route path="genres" element={<Genres />} />
        <Route path="genres/:id" element={<GenreDetails />} />
        <Route path="shows/:showId" element={<ShowDetails />} />  
      </Route>
    </Routes>
  );
}

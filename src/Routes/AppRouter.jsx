// AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import Home from "../Pages/HomePage/Home";
import TVShowDetails from "../Pages/TVShowDetails/TVShowDetails";
import Genres from "../Pages/Genres/Genres";
import People from "../Pages/People/People";
import TVShows from "../Pages/TVShows/TVShows";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* Notice the path here is "tvshows" (no hyphen) */}
        <Route path="tvshows" element={<TVShows />}>
          <Route path=":id" element={<TVShowDetails />} />
        </Route>
        <Route path="genres" element={<Genres />} />
        <Route path="people" element={<People />} />
      </Route>
    </Routes>
  );
}

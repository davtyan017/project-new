import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import netflix from "../../assets/Netflix-logo.png";
import bell from "../../assets/43.png";
import search_logo from "../../assets/icons8-search.svg";

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div>
        <Link to="/">
          <img className="netflix" src={netflix} alt="Netflix Logo" />
        </Link>
        <div 
          className="browse-menu"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <p className="browse">Browse</p>
          {isOpen && (
            <div className="dropdown">
              <Link to="/tvshows">TV Shows</Link>
              <Link to="/genres">Genres</Link>
              <Link to="/people">People</Link>
            </div>
          )}
        </div>
        <p>DVD</p>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="nav_form">
          <img src={search_logo} alt="Search" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </form>
        <img className="bell" src={bell} alt="Notifications" />
      </div>
    </nav>
  );
};

export default Navbar;

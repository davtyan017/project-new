import React from "react";
import "./navbar.css";
import netflix from "../../assets/Netflix-logo.png";
import bell from "../..//assets/43.png";
import search_logo from "../../assets/icons8-search.svg";

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <nav className="nav">
      <div>
        <a href="">
          <img className="netflix" src={netflix} alt="" />
        </a>
        <a href="">browse</a>
        <p>DVD</p>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className="nav_form">
          <img src={search_logo} alt="" />
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
        <img className="bell" src={bell} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;

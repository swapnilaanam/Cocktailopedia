import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ id, name, glass, category, image }) => {
  return (
    <article className="cocktail">
      <img src={image} alt={name} />
      <footer className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{category}</p>
        <Link to={`/cocktails/${id}`} className="btn btn-primary">
          Details
        </Link>
      </footer>
    </article>
  );
};

export default Cocktail;

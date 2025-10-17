import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/components.css";

/**
 * Displays a single favorite podcast
 */
const FavoriteCard = ({ show }) => {
  return (
    <Link to={`/show/${show.id}`} className="favorite-card">
      <img src={show.image} alt={show.title} className="show-image" />
      <div className="show-info">
        <h3>{show.title}</h3>
        <p>{show.description}</p>
        <p>
          Seasons: {show.seasons.length} | 
          Updated: {new Date(show.updated).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default FavoriteCard;

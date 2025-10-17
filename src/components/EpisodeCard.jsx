import React from 'react';
import '../styles/EpisodeCard.css';

/**
 * Displays a single episode
 */
const EpisodeCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <div className="episode-header">
        <h4 className="episode-title">{episode.title}</h4>
        <span className="episode-number">#{episode.number}</span>
      </div>
      <div className="episode-meta">
        {episode.image && <img src={episode.image} alt={episode.title} className="season-image" />}
        <p className="episode-description">{episode.description}</p>
      </div>
      <div className="episode-controls">
        <button className="play-btn" onClick={() => alert('Playing audio...')}>
          Play
        </button>
        <span className="progress-indicator">{episode.duration}</span>
      </div>
    </div>
  );
};

export default EpisodeCard;

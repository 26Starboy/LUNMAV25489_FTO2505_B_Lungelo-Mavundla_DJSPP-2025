import React, { useState } from "react";
import "../styles/SeasonList.css";

const SeasonList = ({ seasons }) => {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!seasons || seasons.length === 0) return <p className="empty-state">No seasons available</p>;

  return (
    <div className="season-list">
      {seasons.map((season) => (
        <div key={season.id} className="season-item">
          <button className="season-header" onClick={() => toggle(season.id)}>
            {season.title} ({season.episodes.length} episodes)
            <span className="toggle-indicator">{expanded[season.id] ? "-" : "+"}</span>
          </button>
          {expanded[season.id] && (
            <div className="episode-list">
              {season.episodes.map((ep) => (
                <div key={ep.id}>
                  <h4>{ep.number}. {ep.title}</h4>
                  <img src={ep.image} alt={ep.title} className="season-image" />
                  <p>{ep.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeasonList;

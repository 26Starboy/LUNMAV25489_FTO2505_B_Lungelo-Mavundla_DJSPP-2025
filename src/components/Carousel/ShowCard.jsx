import React, { useState } from "react";
import "../styles/components.css"; // Correct path

const ShowCard = ({ show }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const shortDesc =
    show.description.length > 100
      ? show.description.slice(0, 100) + "..."
      : show.description;

  return (
    <>
      <div className="show-card" onClick={() => setModalOpen(true)}>
        <img
          className="show-image"
          src={show.image || "/placeholder.png"}
          alt={show.title}
        />
        <div className="show-info">
          <h3>{show.title}</h3>
          <p>{shortDesc}</p>
          <div className="show-meta">
            <span className="pill">{show.genre_id}</span>
            <span className="pill">{show.seasons} seasons</span>
            <span className="pill">Updated {show.last_updated}</span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              Close
            </button>
            <img
              className="modal-image"
              src={show.image || "/placeholder.png"}
              alt={show.title}
            />
            <h2>{show.title}</h2>
            <p>{show.description}</p>
            <div className="show-meta">
              <span className="pill">{show.genre_id}</span>
              <span className="pill">{show.seasons} seasons</span>
              <span className="pill">Updated {show.last_updated}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCard;

import React from "react";
import "../../styles/components.css";

const Modal = ({ show, onClose }) => {
  if (!show) return null;
  const { image, title, description, genre, seasons, lastUpdated } = show;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={image} alt={title} className="modal-image" />
        <h2 className="modal-title">{title}</h2>
        <p className="modal-genre">{genre} | {seasons} Seasons</p>
        <p className="modal-updated">Last Updated: {lastUpdated}</p>
        <p className="modal-desc">{description}</p>
      </div>
    </div>
  );
};

export default Modal;

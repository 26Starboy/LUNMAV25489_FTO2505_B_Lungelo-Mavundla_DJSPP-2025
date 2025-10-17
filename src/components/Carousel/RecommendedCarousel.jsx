import React from "react";
import ShowCard from "./ShowCard";
import "../../styles/components.css";

const RecommendedCarousel = ({ shows }) => {
  return (
    <div className="carousel-container" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default RecommendedCarousel;

import React, { useEffect, useState } from "react";
import ShowCard from "../components/Carousel/ShowCard";
import "./../styles/components.css"; // Correct path to my CSS
import Pagination from "../components/ui/Pagination";

const LandingPage = () => {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 8;

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.error(err));
  }, []);

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  return (
    <div className="landing-page">
      <div className="show-grid">
        {currentShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <Pagination
        totalItems={shows.length}
        itemsPerPage={showsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LandingPage;

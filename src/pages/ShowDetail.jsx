import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShowDetail } from "../services/podcastApi";
import SeasonList from "../components/SeasonList";
import "../pages/ShowDetail.css";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShow = async () => {
      try {
        const data = await fetchShowDetail(id);
        setShow(data);
      } catch (err) {
        setError("Failed to load show details");
      } finally {
        setLoading(false);
      }
    };
    loadShow();
  }, [id]);

  if (loading) return <p>Loading show...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>No show found.</p>;

  return (
    <div>
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} style={{ width: "300px", borderRadius: "8px" }} />
      <p>{show.description}</p>
      <p>Genre: {show.genre}</p>
      <p>Last Updated: {new Date(show.lastUpdated).toLocaleDateString()}</p>
      <SeasonList seasons={show.seasons} />
    </div>
  );
};

export default ShowDetail;
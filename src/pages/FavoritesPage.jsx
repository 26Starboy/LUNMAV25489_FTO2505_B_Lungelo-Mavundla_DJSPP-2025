// src/pages/FavoritesPage.jsx
import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import FavoriteCard from "../components/Favorites/FavoriteCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No favorites yet.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem", padding: "1rem" }}>
      {favorites.map((show) => (
        <FavoriteCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default FavoritesPage;

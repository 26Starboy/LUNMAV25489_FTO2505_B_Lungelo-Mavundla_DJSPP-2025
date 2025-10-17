// src/context/FavoritesContext.jsx
import { createContext, useState, useEffect } from "react";
import { getFavoritesFromStorage, saveFavoritesToStorage } from "../services/storageService";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = getFavoritesFromStorage();
    if (stored) setFavorites(stored);
  }, []);

  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const addFavorite = (show) => {
    if (!favorites.find((f) => f.id === show.id)) {
      setFavorites([...favorites, show]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

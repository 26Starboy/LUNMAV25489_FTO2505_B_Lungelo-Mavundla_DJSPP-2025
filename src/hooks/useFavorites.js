// src/hooks/useFavorites.js
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const useFavorites = () => useContext(FavoritesContext);

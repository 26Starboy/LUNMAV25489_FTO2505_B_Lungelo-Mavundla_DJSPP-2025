// src/services/storageService.js

const FAVORITES_KEY = "favorites";

export const getFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to read favorites from storage:", err);
    return [];
  }
};

export const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (err) {
    console.error("Failed to save favorites to storage:", err);
  }
};
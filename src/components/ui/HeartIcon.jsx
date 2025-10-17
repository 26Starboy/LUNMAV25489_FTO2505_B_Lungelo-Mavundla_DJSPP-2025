import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HeartIcon = ({ episodeId, onToggle }) => {
  const { isFavorite } = useFavorites();
  return isFavorite(episodeId) ? (
    <FaHeart color="red" onClick={onToggle} style={{ cursor: 'pointer' }} />
  ) : (
    <FaRegHeart onClick={onToggle} style={{ cursor: 'pointer' }} />
  );
};

export default HeartIcon;

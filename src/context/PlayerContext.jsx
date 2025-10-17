import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

/**
 * Provides global audio player state
 */
export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => setIsPlaying(false);

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
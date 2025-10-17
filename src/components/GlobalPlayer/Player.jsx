import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import ProgressBar from './ProgressBar';
import TimeDisplay from './TimeDisplay';
import '../../styles/components.css';

const Player = () => {
  const { currentEpisode, isPlaying, play, pause, seek, currentTime, duration } = useAudioPlayer();

  if (!currentEpisode) return null;

  const togglePlay = () => {
    if (isPlaying) pause();
    else play(currentEpisode);
  };

  return (
    <div className="player-container">
      <span>{currentEpisode.showTitle} - {currentEpisode.title} (Season {currentEpisode.season})</span>
      <button onClick={togglePlay}>{isPlaying ? '❚❚ Pause' : '▶ Play'}</button>
      <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
      <TimeDisplay currentTime={currentTime} duration={duration} />
    </div>
  );
};

export default Player;

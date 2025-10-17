import { usePlayer } from '../context/PlayerContext';
import { useProgress } from '../context/ProgressContext';
import { useEffect } from 'react';

export const useAudioPlayer = () => {
  const { audioRef, isPlaying, currentTime, duration, currentEpisode, play, pause, seek, setCurrentTime, setDuration } = usePlayer();
  const { updateProgress, getProgress } = useProgress();

  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      const prog = getProgress(currentEpisode.id);
      audioRef.current.currentTime = prog.time;
      if (prog.finished) audioRef.current.pause();
    }
  }, [currentEpisode]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
      if (currentEpisode) updateProgress(currentEpisode.id, audioRef.current.currentTime, audioRef.current.ended);
    };
    const handleEnded = () => {
      if (currentEpisode) updateProgress(currentEpisode.id, 0, true);
    };
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentEpisode]);

  return { audioRef, isPlaying, currentTime, duration, currentEpisode, play, pause, seek, setCurrentTime, setDuration };
};

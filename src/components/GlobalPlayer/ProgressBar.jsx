import React from 'react';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className="progress-bar" onClick={handleSeek}>
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;

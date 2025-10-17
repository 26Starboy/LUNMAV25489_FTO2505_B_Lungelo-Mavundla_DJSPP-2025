import React from 'react';

const formatTime = seconds => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const TimeDisplay = ({ currentTime, duration }) => (
  <div className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</div>
);

export default TimeDisplay;

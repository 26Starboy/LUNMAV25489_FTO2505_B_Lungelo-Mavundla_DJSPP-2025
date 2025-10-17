import React, { createContext, useState } from "react";

export const ProgressContext = createContext();

/**
 * Provides current progress of audio playback
 */
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // 0 - 100%

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

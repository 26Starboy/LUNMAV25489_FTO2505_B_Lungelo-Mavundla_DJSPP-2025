// src/services/podcastApi.js
export const PLACEHOLDER_AUDIO = "https://podcast-api.netlify.app/placeholder-audio.mp3";

export const fetchAllShows = async () => {
  const res = await fetch("https://podcast-api.netlify.app");
  if (!res.ok) throw new Error("Failed to fetch shows");
  return await res.json();
};

export const fetchShowDetail = async (id) => {
  const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!res.ok) throw new Error("Failed to fetch show detail");
  return await res.json();
};

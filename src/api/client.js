// src/api/client.js
// API helper functions to fetch podcast shows

// Base URL for the podcast API
const API_BASE = 'https://podcast-api.netlify.app'

// Fetch all shows from the API
export const fetchShows = async () => {
  const res = await fetch(`${API_BASE}/shows`)
  // Parse JSON response
  return res.json()
}

// Fetch a single show by its ID
export const fetchShowById = async (id) => {
  const res = await fetch(`${API_BASE}/id/${id}`)
  
  // Throw an error if the show is not found
  if (!res.ok) throw new Error('Show not found')
  
  return res.json()
}

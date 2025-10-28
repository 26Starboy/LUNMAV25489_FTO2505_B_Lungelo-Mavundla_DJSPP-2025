// src/api/client.js
const API_BASE = 'https://podcast-api.netlify.app'

export const fetchShows = async () => {
  const res = await fetch(`${API_BASE}/shows`)
  return res.json()
}

export const fetchShowById = async (id) => {
  const res = await fetch(`${API_BASE}/id/${id}`)
  if (!res.ok) throw new Error('Show not found')
  return res.json()
}
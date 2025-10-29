// src/pages/ShowDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchShowById } from '../api/client'
import PodcastModal from '../components/PodcastModal'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function ShowDetail() {
  // ----------------------------
  // Get the show ID from the URL
  // ----------------------------
  const { id } = useParams()

  // ----------------------------
  // Local state: show data, loading, error
  // ----------------------------
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ----------------------------
  // Fetch show data on component mount or when ID changes
  // ----------------------------
  useEffect(() => {
    fetchShowById(id)
      .then(setShow)                  // Save the fetched show data
      .catch(err => setError(err.message))  // Save error message if fetch fails
      .finally(() => setLoading(false))     // Stop loading spinner
  }, [id])

  // ----------------------------
  // Render loading, error, or modal
  // ----------------------------
  if (loading) return <Loading />                        // Show spinner while loading
  if (error) return <Error message={error} />           // Show fetch error
  if (!show) return <Error message="Show not found" />  // Show error if ID invalid

  // ----------------------------
  // Show the podcast modal
  // ----------------------------
  return <PodcastModal podcast={show} onClose={() => window.history.back()} />
}

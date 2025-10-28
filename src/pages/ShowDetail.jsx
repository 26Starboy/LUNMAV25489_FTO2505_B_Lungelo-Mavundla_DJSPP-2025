// src/pages/ShowDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchShowById } from '../api/client'
import PodcastModal from '../components/PodcastModal'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function ShowDetail() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState	(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShowById(id)
      .then(setShow)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />
  if (error) return <Error message={error} />
  if (!show) return <Error message="Show not found" />

  return <PodcastModal podcast={show} onClose={() => window.history.back()} />
}
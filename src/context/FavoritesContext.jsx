import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }, [favorites])

  const addFavorite = (show, season = null, episode = null) => {
    // Ensure we have valid data
    if (!show || !show.id) {
      console.error('Invalid show data when adding favorite')
      return
    }

    const favoriteItem = {
      id: episode ? episode.id : show.id,
      type: episode ? 'episode' : 'show',
      show: {
        id: show.id,
        title: show.title || 'Unknown Show',
        image: show.image || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
        genres: show.genres || []
      },
      season: season ? {
        id: season.id || season.number,
        number: season.number || 1
      } : null,
      episode: episode ? {
        id: episode.id,
        title: episode.title || 'Unknown Episode',
        episodeNumber: episode.episodeNumber || 1,
        description: episode.description || 'No description available.'
      } : null,
      addedAt: new Date().toISOString()
    }

    setFavorites(prev => {
      // Avoid duplicates
      if (prev.some(item => item.id === favoriteItem.id)) {
        return prev
      }
      return [...prev, favoriteItem]
    })
  }

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const isFavorited = (id) => {
    return favorites.some(item => item.id === id)
  }

  const getFavoriteEpisodes = () => {
    return favorites.filter(item => item.type === 'episode')
  }

  const getFavoriteShows = () => {
    const showMap = new Map()
    
    favorites.forEach(item => {
      if (!item.show) return // Skip invalid items
      
      if (!showMap.has(item.show.id)) {
        showMap.set(item.show.id, {
          ...item.show,
          episodes: []
        })
      }
      
      if (item.episode && item.type === 'episode') {
        const show = showMap.get(item.show.id)
        show.episodes.push({
          ...item.episode,
          season: item.season,
          addedAt: item.addedAt
        })
      }
    })
    
    return Array.from(showMap.values())
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    getFavoriteEpisodes,
    getFavoriteShows
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesContext }
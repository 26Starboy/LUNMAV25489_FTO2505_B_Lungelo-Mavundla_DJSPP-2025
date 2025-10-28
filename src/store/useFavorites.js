// src/store/useFavorites.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        set((state) => {
          const exists = state.favorites.includes(id)
          return {
            favorites: exists
              ? state.favorites.filter(f => f !== id)
              : [...state.favorites, id]
          }
        })
      },
      isFavorite: (id) => get().favorites.includes(id)
    }),
    {
      name: 'podcast-favorites'
    }
  )
)
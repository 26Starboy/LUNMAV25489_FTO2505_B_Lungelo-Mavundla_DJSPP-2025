// src/store/useFavorites.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavorites = create(
  persist(
    (set, get) => ({
      // ----------------------------
      // State: List of favorite episode IDs
      // ----------------------------
      favorites: [],

      // ----------------------------
      // Action: Toggle favorite status
      // ----------------------------
      toggleFavorite: (id) => {
        set((state) => {
          const exists = state.favorites.includes(id)
          return {
            // If already favorited, remove it; otherwise, add it
            favorites: exists
              ? state.favorites.filter(f => f !== id)
              : [...state.favorites, id]
          }
        })
      },

      // ----------------------------
      // Getter: Check if episode is favorited
      // ----------------------------
      isFavorite: (id) => get().favorites.includes(id)
    }),
    {
      name: 'podcast-favorites' // key used in localStorage
    }
  )
)

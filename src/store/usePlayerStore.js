// src/store/usePlayerStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const PLACEHOLDER_AUDIO = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      currentEpisode: null,
      isPlaying: false,
      progress: 0,
      duration: 0,
      audio: null,

      // Play any episode
      play: (episode, show) => {
        const fullEpisode = { ...episode, showTitle: show.title, showImage: show.image }
        set({ currentEpisode: fullEpisode, isPlaying: true })

        // Reuse audio element
        let audio = get().audio
        if (!audio) {
          audio = new Audio(PLACEHOLDER_AUDIO)
          audio.ontimeupdate = () => {
            const { currentEpisode } = get()
            if (currentEpisode) {
              get().saveProgress(currentEpisode.id, audio.currentTime)
            }
            set({ progress: audio.currentTime })
          }
          audio.onloadedmetadata = () => set({ duration: audio.duration })
          audio.onended = () => set({ isPlaying: false })
          set({ audio })
        }

        audio.play()
      },

      pause: () => {
        get().audio?.pause()
        set({ isPlaying: false })
      },

      resume: () => {
        get().audio?.play()
        set({ isPlaying: true })
      },

      seek: (time) => {
        const audio = get().audio
        if (audio) {
          audio.currentTime = time
          set({ progress: time })
        }
      },

      // Save progress per episode
      progressMap: {},
      saveProgress: (episodeId, progress) => {
        set((state) => ({
          progressMap: { ...state.progressMap, [episodeId]: progress }
        }))
      },

      getProgress: (episodeId) => get().progressMap[episodeId] || 0,

      clear: () => {
        get().audio?.pause()
        set({ currentEpisode: null, isPlaying: false, progress: 0, duration: 0 })
      }
    }),
    {
      name: 'podcast-player',
      partialize: (state) => ({ progressMap: state.progressMap })
    }
  )
)
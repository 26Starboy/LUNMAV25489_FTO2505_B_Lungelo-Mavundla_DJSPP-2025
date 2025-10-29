// src/store/usePlayerStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Placeholder audio file used if the episode has no audio URL
const PLACEHOLDER_AUDIO = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      // ----------------------------
      // Player State
      // ----------------------------
      currentEpisode: null, // currently playing episode
      isPlaying: false,     // whether audio is playing
      progress: 0,          // current playback time
      duration: 0,          // total duration of episode
      audio: null,          // the HTMLAudioElement instance

      // ----------------------------
      // Play an Episode
      // ----------------------------
      play: (episode, show) => {
        // Combine episode with show metadata
        const fullEpisode = { ...episode, showTitle: show.title, showImage: show.image }
        set({ currentEpisode: fullEpisode, isPlaying: true })

        // Reuse audio element or create a new one
        let audio = get().audio
        if (!audio) {
          audio = new Audio(PLACEHOLDER_AUDIO) // create Audio instance
          
          // Update progress as audio plays
          audio.ontimeupdate = () => {
            const { currentEpisode } = get()
            if (currentEpisode) {
              get().saveProgress(currentEpisode.id, audio.currentTime)
            }
            set({ progress: audio.currentTime })
          }

          // Set duration when metadata loads
          audio.onloadedmetadata = () => set({ duration: audio.duration })

          // Handle when audio ends
          audio.onended = () => set({ isPlaying: false })

          set({ audio }) // store audio instance in Zustand
        }

        // Start playback
        audio.play()
      },

      // ----------------------------
      // Playback Controls
      // ----------------------------
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

      // ----------------------------
      // Progress Tracking
      // ----------------------------
      progressMap: {}, // stores progress keyed by episode ID

      // Save current progress for a specific episode
      saveProgress: (episodeId, progress) => {
        set((state) => ({
          progressMap: { ...state.progressMap, [episodeId]: progress }
        }))
      },

      // Retrieve saved progress for an episode
      getProgress: (episodeId) => get().progressMap[episodeId] || 0,

      // ----------------------------
      // Clear Player
      // ----------------------------
      clear: () => {
        get().audio?.pause()
        set({ currentEpisode: null, isPlaying: false, progress: 0, duration: 0 })
      }
    }),
    {
      name: 'podcast-player', // localStorage key
      partialize: (state) => ({ progressMap: state.progressMap }) // persist only progressMap
    }
  )
)

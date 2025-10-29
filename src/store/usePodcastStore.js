import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Placeholder audio URL for episodes without actual audio
const AUDIO_URL = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

// Single Audio instance used globally
let audio = null

export const usePodcastStore = create(
  persist(
    (set, get) => ({
      // ----------------------------
      // Theme Management
      // ----------------------------
      theme: 'light', // default theme
      setTheme: (t) => {
        set({ theme: t }) // update Zustand state
        document.documentElement.setAttribute('data-theme', t) // update DOM attribute for CSS
      },

      // ----------------------------
      // Playback State
      // ----------------------------
      currentEpisode: null, // currently playing episode
      isPlaying: false, // is audio playing
      progress: 0, // current playback time
      duration: 0, // total duration of episode

      // ----------------------------
      // Favorites & Progress Tracking
      // ----------------------------
      favourites: [], // array of favorite episodes
      listeningProgress: {}, // stores progress info keyed by episode ID

      // ----------------------------
      // Play an Episode
      // ----------------------------
      playEpisode: (ep) => {
        if (!audio) {
          audio = new Audio(AUDIO_URL) // create audio instance if none exists

          // Update playback progress in store as audio plays
          audio.ontimeupdate = () => {
            const { currentEpisode } = get()
            if (currentEpisode) {
              get().saveProgress(currentEpisode.id, audio.currentTime, audio.duration)
            }
            set({ progress: audio.currentTime, duration: audio.duration })
          }

          // Mark episode as finished when audio ends
          audio.onended = () => get().markFinished(get().currentEpisode?.id)
        }

        set({ currentEpisode: ep, isPlaying: true })

        // Resume from saved progress if available
        const saved = get().listeningProgress[ep.id]
        if (saved) audio.currentTime = saved.progress

        audio.play()
      },

      // ----------------------------
      // Playback Controls
      // ----------------------------
      pause: () => { audio?.pause(); set({ isPlaying: false }) },
      resume: () => { audio?.play(); set({ isPlaying: true }) },
      seek: (t) => { if (audio) audio.currentTime = t },

      // ----------------------------
      // Favorites Management
      // ----------------------------
      addFavourite: (ep, showTitle, season) => {
        const fav = { ...ep, showTitle, seasonNumber: season, addedAt: new Date().toISOString() }
        set(s => ({ favourites: [...s.favourites, fav] }))
      },
      removeFavourite: (id) => set(s => ({ favourites: s.favourites.filter(f => f.id !== id) })),
      isFavourite: (id) => get().favourites.some(f => f.id === id),

      // ----------------------------
      // Listening Progress
      // ----------------------------
      saveProgress: (id, p, d) => set(s => ({
        listeningProgress: { ...s.listeningProgress, [id]: { progress: p, duration: d, finished: p >= d } }
      })),
      markFinished: (id) => set(s => ({
        listeningProgress: { ...s.listeningProgress, [id]: { ...s.listeningProgress[id], finished: true } }
      }))
    }),
    { name: 'podcast-storage' } // persist store in localStorage
  )
)

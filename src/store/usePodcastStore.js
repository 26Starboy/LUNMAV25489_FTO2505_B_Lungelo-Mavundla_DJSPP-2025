import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const AUDIO_URL = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

let audio = null

export const usePodcastStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (t) => {
        set({ theme: t })
        document.documentElement.setAttribute('data-theme', t)
      },

      currentEpisode: null,
      isPlaying: false,
      progress: 0,
      duration: 0,
      favourites: [],
      listeningProgress: {},

      playEpisode: (ep) => {
        if (!audio) {
          audio = new Audio(AUDIO_URL)
          audio.ontimeupdate = () => {
            const { currentEpisode } = get()
            if (currentEpisode) {
              get().saveProgress(currentEpisode.id, audio.currentTime, audio.duration)
            }
            set({ progress: audio.currentTime, duration: audio.duration })
          }
          audio.onended = () => get().markFinished(get().currentEpisode?.id)
        }
        set({ currentEpisode: ep, isPlaying: true })
        const saved = get().listeningProgress[ep.id]
        if (saved) audio.currentTime = saved.progress
        audio.play()
      },

      pause: () => { audio?.pause(); set({ isPlaying: false }) },
      resume: () => { audio?.play(); set({ isPlaying: true }) },
      seek: (t) => { if (audio) audio.currentTime = t },

      addFavourite: (ep, showTitle, season) => {
        const fav = { ...ep, showTitle, seasonNumber: season, addedAt: new Date().toISOString() }
        set(s => ({ favourites: [...s.favourites, fav] }))
      },
      removeFavourite: (id) => set(s => ({ favourites: s.favourites.filter(f => f.id !== id) })),
      isFavourite: (id) => get().favourites.some(f => f.id === id),

      saveProgress: (id, p, d) => set(s => ({
        listeningProgress: { ...s.listeningProgress, [id]: { progress: p, duration: d, finished: p >= d } }
      })),
      markFinished: (id) => set(s => ({
        listeningProgress: { ...s.listeningProgress, [id]: { ...s.listeningProgress[id], finished: true } }
      }))
    }),
    { name: 'podcast-storage' }
  )
)
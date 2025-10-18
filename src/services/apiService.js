const API_BASE_URL = 'https://podcast-api.netlify.app'
const PLACEHOLDER_AUDIO = 'https://podcast-api.netlify.app/placeholder-audio.mp3'

export const GENRE_MAP = {
  1: 'Technology',
  2: 'Science',
  3: 'Business',
  4: 'Entertainment',
  5: 'Health',
  6: 'Education',
  7: 'News',
  8: 'Comedy',
  9: 'True Crime',
  10: 'History'
}

// Fallback mock data
const FALLBACK_PODCASTS = [
  {
    id: '1',
    title: 'Tech Talks Daily',
    description: 'Your daily dose of technology news and insights from industry experts around the world.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
    genres: [1, 3],
    updated: '2024-01-15T10:00:00Z',
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: [
          {
            id: 'e1',
            title: 'The Future of AI',
            description: 'Exploring how artificial intelligence is transforming industries and what to expect in the coming years.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          },
          {
            id: 'e2',
            title: 'Web Development Trends 2024',
            description: 'Latest frameworks, tools, and best practices in modern web development.',
            episodeNumber: 2,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Science Weekly',
    description: 'Breaking down complex scientific discoveries into understandable concepts for everyone.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop',
    genres: [2, 6],
    updated: '2024-01-14T15:30:00Z',
    seasons: [
      {
        id: 's2',
        number: 1,
        episodes: [
          {
            id: 'e3',
            title: 'Climate Change Solutions',
            description: 'Innovative approaches to tackling climate change from scientists worldwide.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Business Insights',
    description: 'Strategic business advice and market analysis for entrepreneurs and professionals.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
    genres: [3],
    updated: '2024-01-13T09:15:00Z',
    seasons: [
      {
        id: 's3',
        number: 1,
        episodes: [
          {
            id: 'e4',
            title: 'Startup Funding Strategies',
            description: 'How to secure funding and grow your startup in competitive markets.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'True Crime Stories',
    description: 'In-depth analysis of famous criminal cases with expert commentary.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    genres: [9],
    updated: '2024-01-12T20:45:00Z',
    seasons: [
      {
        id: 's4',
        number: 1,
        episodes: [
          {
            id: 'e5',
            title: 'The Cyber Heist',
            description: 'Investigating one of the biggest digital bank robberies in history.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Health & Wellness',
    description: 'Expert advice on physical and mental health, fitness, and overall wellbeing.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    genres: [5],
    updated: '2024-01-11T14:20:00Z',
    seasons: [
      {
        id: 's5',
        number: 1,
        episodes: [
          {
            id: 'e6',
            title: 'Mindfulness Meditation',
            description: 'Techniques and benefits of incorporating meditation into your daily routine.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Comedy Hour',
    description: 'Laugh out loud with our weekly comedy special featuring top stand-up comedians.',
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=400&fit=crop',
    genres: [8],
    updated: '2024-01-10T19:00:00Z',
    seasons: [
      {
        id: 's6',
        number: 1,
        episodes: [
          {
            id: 'e7',
            title: 'Stand-up Special',
            description: 'Hilarious takes on everyday life from rising comedy stars.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'History Uncovered',
    description: 'Fascinating stories from world history that shaped our modern society.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    genres: [10],
    updated: '2024-01-09T11:30:00Z',
    seasons: [
      {
        id: 's7',
        number: 1,
        episodes: [
          {
            id: 'e8',
            title: 'Ancient Civilizations',
            description: 'Exploring the mysteries of lost civilizations and their legacies.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  },
  {
    id: '8',
    title: 'News Brief',
    description: 'Daily news updates covering global events, politics, and current affairs.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c63e?w=400&h=400&fit=crop',
    genres: [7],
    updated: '2024-01-15T08:00:00Z',
    seasons: [
      {
        id: 's8',
        number: 1,
        episodes: [
          {
            id: 'e9',
            title: 'Global Market Update',
            description: 'Latest developments in international markets and economic trends.',
            episodeNumber: 1,
            audio: PLACEHOLDER_AUDIO
          }
        ]
      }
    ]
  }
]

class ApiService {
  async getAllPodcasts() {
    try {
      console.log('Fetching podcasts from API...')
      const response = await fetch(API_BASE_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('API response received:', data.length, 'podcasts')
      return data
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error.message)
      return FALLBACK_PODCASTS
    }
  }

  async getShowById(id) {
    try {
      console.log(`Fetching show ${id} from API...`)
      const response = await fetch(`${API_BASE_URL}/id/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Show data received:', data.title)
      return data
    } catch (error) {
      console.warn('API unavailable, using fallback show data:', error.message)
      const fallbackShow = FALLBACK_PODCASTS.find(show => show.id === id) || FALLBACK_PODCASTS[0]
      return fallbackShow
    }
  }

  async getShowsByGenre(genreId) {
    try {
      const response = await fetch(`${API_BASE_URL}/genre/${genreId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.warn('API unavailable for genre, using filtered fallback data:', error.message)
      return FALLBACK_PODCASTS.filter(show => show.genres.includes(parseInt(genreId)))
    }
  }

  getGenreName(genreId) {
    return GENRE_MAP[genreId] || `Genre ${genreId}`
  }

  getAudioUrl(episode) {
    return episode.audio || PLACEHOLDER_AUDIO
  }
}

export const apiService = new ApiService()
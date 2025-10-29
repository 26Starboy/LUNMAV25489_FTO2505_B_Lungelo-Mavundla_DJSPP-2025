// src/App.jsx — main application routes and layout

import { Routes, Route } from "react-router-dom" // Routing components
import Header from "./components/Header" // Header shown on every page
import Home from "./pages/Home" // Homepage listing podcasts
import ShowDetail from "./pages/ShowDetail" // Podcast details page
import Favourites from "./pages/Favourites" // User’s favourites page
import GlobalPlayer from "./components/GlobalPlayer" // Persistent audio player

export default function App() {
  return (
    <>
      <Header /> {/* Top navigation/header */}

      <Routes> {/* App routes */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/show/:id" element={<ShowDetail />} /> {/* Show details page */}
        <Route path="/favourites" element={<Favourites />} /> {/* Favourites page */}
      </Routes>

      <GlobalPlayer /> {/* Always-visible global player */}
    </>
  )
}

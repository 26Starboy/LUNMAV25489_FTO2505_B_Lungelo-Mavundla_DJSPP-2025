// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import ShowDetail from "./pages/ShowDetail"
import Favourites from "./pages/Favourites"
import GlobalPlayer from "./components/GlobalPlayer"  // ← ADD

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <GlobalPlayer />  {/* ← GLOBAL PLAYER */}
    </>
  )
}
import React from "react";
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import ShowDetail from "./pages/ShowDetail";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/show/:id" element={<ShowDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </MainLayout>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
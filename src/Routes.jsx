import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FavoritesPage from "./pages/FavoritesPage";
import ShowDetail from "./pages/ShowDetail";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/favorites", element: <FavoritesPage /> },
  { path: "/show/:id", element: <ShowDetail /> },
]);

export default router;

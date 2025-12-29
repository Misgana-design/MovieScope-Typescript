import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./layout/Header";
import { HomePage } from "./pages/HomePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { SearchPage } from "./pages/SearchPage";
import { MovieDetail } from "./pages/MovieDetailPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="./movie/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;

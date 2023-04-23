import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/Home/Home";
import MainLayout from "./layouts/MainLayout/MainLayout";
import MovieDetails from "./modules/MovieDetails/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
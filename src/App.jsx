import "./App.css";
import { Link, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Recipes Finder</h1>
        <nav className="shadow p-4 flex justify-between">
          <Link to="/" className="text-xl font-bold">
            Recipe Finder App
          </Link>
          <Link to="/favorites" className="text-xl font-bold">
            Favorites
          </Link>
        </nav>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

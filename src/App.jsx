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
        <nav>
          <Link to="/">Recipe Finder</Link>
          <Link to="/favorites">Favorites</Link>
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

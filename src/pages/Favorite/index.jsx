import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    setFavorites(JSON.parse(stored) || []);
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      {favorites.length ? (
        <RecipeList recipes={favorites} />
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Favorite;

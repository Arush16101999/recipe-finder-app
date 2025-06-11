import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import IngredientList from "../../components/IngredientList";
import { getFavorites, saveFavorites } from "../../utils/favorites";

const Details = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const recipeData = data.data.meals[0];
        setRecipe(recipeData);

        const favorites = getFavorites();
        const exist = favorites.some(
          (item) => item.idMeal === recipeData.idMeal
        );
        setIsFavorite(exist);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  // toggle favorite
  const toggleFavorite = useCallback(() => {
    let favorites = getFavorites();
    const exist = favorites.find((item) => item.idMeal === recipe.idMeal);

    if (exist) {
      favorites = favorites.filter((item) => item.idMeal !== recipe.idMeal);
      toast.success("Removed from favorites");
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      toast.success("Added to favorites");
      setIsFavorite(true);
    }
    saveFavorites(favorites);
  }, [recipe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-w-md mx-auto rounded"
        />
        <h1 className="text-2xl font-bold my-2">{recipe.strMeal}</h1>
        <button
          onClick={toggleFavorite}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <h2 className="mt-4 text-xl font-semibold">Instructions</h2>
        <p>{recipe.strInstructions}</p>
        <h2 className="mt-4 text-xl font-semibold">Ingredients</h2>
        <br />
        <IngredientList recipe={recipe} />
      </div>
    </>
  );
};

export default Details;

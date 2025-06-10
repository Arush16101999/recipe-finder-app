import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(data.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  // toggle favorite
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exist = favorites.find((item) => item.idMeal === recipe.idMeal);
    if (exist) {
      favorites = favorites.filter((item) => item.idMeal !== recipe.idMeal);
    } else {
      favorites.push(recipe);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    toast.success("Added to favorites");
  };

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
          Toggle Favorite
        </button>
        <h2 className="mt-4 text-xl font-semibold">Instructions</h2>
        <p>{recipe.strInstructions}</p>
        <h2 className="mt-4 text-xl font-semibold">Ingredients</h2>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            return ingredient ? (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </>
  );
};

export default Details;

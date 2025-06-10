import React from "react";
import { Link } from "react-router";

const RecipeList = ({ recipes }) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-gray-800 p-4 shadow rounded">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="p-2">{recipe.strMeal}</h3>
            <Link to={`/recipe/${recipe.idMeal}`} lassName="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeList;

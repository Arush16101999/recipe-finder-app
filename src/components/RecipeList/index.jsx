import React from "react";
import { Link } from "react-router";

const RecipeList = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
          <Link to={`/recipe/${recipe.idMeal}`}>View Details</Link>
        </div>
      ))}
    </>
  );
};

export default RecipeList;

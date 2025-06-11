import React from "react";

const IngredientList = ({ recipe }) => {
  return (
    <>
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
    </>
  );
};

export default IngredientList;

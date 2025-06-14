import axios from "axios";
import React, { useState } from "react";
import RecipeList from "../../components/RecipeList";

const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recipesPerPage = 6;

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (data?.data.meals) {
        setRecipes(data.data.meals);
        setCurrentPage(1);
      } else {
        setRecipes([]);
        setError("No recipes found");
      }
    } catch (err) {
      setError("An error occurred while fetching recipes" + err);
    }
    setLoading(false);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // Get current recipes for the current page
  const totalPages = Math.ceil(recipes.length / recipesPerPage); // Calculate total pages

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center gap-2 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for recipes..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <br />
        <RecipeList recipes={currentRecipes} />

        <br />
        {recipes.length > recipesPerPage && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

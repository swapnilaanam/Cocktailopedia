import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      let response = await fetch(`${url}${searchTerm}`);
      let data = await response.json();
      let { drinks } = data;
      if (drinks) {
        let newCocktails = drinks.map((cocktail) => {
          let { idDrink, strDrink, strGlass, strCategory, strDrinkThumb } =
            cocktail;
          return {
            id: idDrink,
            name: strDrink,
            glass: strGlass,
            category: strCategory,
            image: strDrinkThumb,
          };
        });
        setCocktails(newCocktails);
        setIsLoading(false);
      } else {
        setCocktails([]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

  return (
    <AppContext.Provider value={{ isLoading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

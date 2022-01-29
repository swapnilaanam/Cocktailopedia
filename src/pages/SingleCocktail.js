import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const getCoctailInfo = useCallback(
    async function () {
      setLoading(true);
      try {
        let response = await fetch(`${url}${id}`);
        let data = await response.json();
        let { drinks } = data;

        console.log(data);

        if (data) {
          const {
            strAlcoholic: info,
            strCategory: category,
            strDrink: name,
            strDrinkThumb: image,
            strGlass: glass,
            strInstructions: instruction,
            strIngredient1: ingredient1,
            strIngredient2: ingredient2,
            strIngredient3: ingredient3,
            strIngredient4: ingredient4,
            strIngredient5: ingredient5,
          } = drinks[0];

          const ingredients = [
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
            ingredient5,
          ];

          let newCocktail = {
            image,
            name,
            category,
            info,
            glass,
            instruction,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [id]
  );

  useEffect(() => {
    getCoctailInfo();
  }, [id, getCoctailInfo]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">No Cocktail To Display</h2>;
  }

  const { image, name, category, info, glass, instruction, ingredients } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category :</span> {category}
          </p>
          <p>
            <span className="drink-data">Info :</span> {info}
          </p>
          <p>
            <span className="drink-data">Glass :</span> {glass}
          </p>
          <p>
            <span className="drink-data">Instructons :</span> {instruction}
          </p>
          <p>
            <span className="drink-data">Ingredients :</span>
            {ingredients.map((ingredient) => {
              return ingredient ? <span>{ingredient} </span> : "";
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;

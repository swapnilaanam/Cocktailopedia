import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { isLoading, cocktails } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }
  if (cocktails.length === 0) {
    return <h1 className="section-title">No Cocktails Matched Your Search Criteria</h1>;
  }
  return (
    <section className="section">
      <h1 className="section-title">Cocktails</h1>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail}/>;
        })}
      </div>
    </section>
  );
};

export default CocktailList;

import React from "react";

import classes from "./Burger.css";
import BurgerIngridient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />;
      }); // [,]
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>;
  }
  return (
    <div>
      <div className={classes.Burger}>
        <BurgerIngridient type="bread-top" />
        {transformedIngredients}
        <BurgerIngridient type="bread-bottom" />
      </div>
    </div>
  );
};

export default burger;

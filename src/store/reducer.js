import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 1
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientN]: state.ingredients[action.ingredientN] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientN]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientN]: state.ingredients[action.ingredientN] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientN]
      };
    default:
      break;
  }
  return state;
};

export default reducer;

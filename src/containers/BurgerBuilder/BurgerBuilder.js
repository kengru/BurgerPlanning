import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingredient) {
    const ingredients = {
      ...ingredient
    };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((last, next) => {
        return last + next;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ ordering: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ ordering: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + "=" + this.props.ings[i]);
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordering={this.purchaseHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.ordering}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientN: ingredient }),
    onIngredientRemoved: ingredient =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientN: ingredient })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

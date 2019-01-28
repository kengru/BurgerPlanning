import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    ordering: false,
    loading: false
  }

  componentDidMount () {
    axios.get('https://burgerplanning.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
  }

  updatePurchaseState (ingredient) {
    const ingredients = {
      ...ingredient
    };
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((last, next) => {
      return last + next;
    }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount - 1;
    const priceSubstraction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceSubstraction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ ordering: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ ordering: false });
  }

  purchaseContinueHandler = () => {
    // alert('You can continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Ken G',
        address: {
          street: 'Fuerzas Armadas #10',
          country: 'Dominican Republic'
        },
        email: 'kengrullon@gmail.com'
      },
      deliveryMethod: 'FAST'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, ordering: false });
        // console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, ordering: false });
        // console.log(error)
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummary = null;
    let burger = <Spinner/>
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordering={this.purchaseHandler}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}/>
        </>);
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;
    }
    if ( this.state.loading ) {
      orderSummary = <Spinner/>
    }

    return (
      <>
        <Modal 
          show={this.state.ordering}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
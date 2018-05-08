import React, { Component } from "react";

class IngredientForm extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredient: '',
      ingredients: [{ ingredient: '' }],
    };
  }


  handleIngredientNameChange = (idx) => (evt) => {
    const newingredients = this.state.ingredients.map((Ingredient, sidx) => {
      if (idx !== sidx) return Ingredient;
      return { ...Ingredient, ingredient: evt.target.value };
    });

    this.setState({ ingredients: newingredients });
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ ingredient: '' }])
    });
  }

  handleRemoveIngredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    return (
      <form>
        {/* ... */}
        <h4>ingredients</h4>

        {this.state.ingredients.map((Ingredient, idx) => (
          <div className="Ingredient">
            <input
              type="text"
              placeholder={`Ingredient #${idx + 1}`}
              value={Ingredient.ingredient}
              onChange={this.handleIngredientNameChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveIngredient(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddIngredient} className="small">Add Ingredient</button>
      </form>
    )
  }
}

export default IngredientForm



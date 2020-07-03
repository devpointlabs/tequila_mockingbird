import React from 'react';
import Drink from './Drink';

class DrinkForm extends React.Component {
  state = { name: "", history: "", ingredients: "", prep_serv: ""};

  componentDidMount() {
    if (this.props.drink) {
      const {  name, history, ingredients, prep_serv } = this.props.drink;
      this.setState({ name: name, history: history, ingredients: ingredients, prep_serv: prep_serv});
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    // const { name, history, ingredients, prep_serv } = this.state;
    e.preventDefault();

    if (this.props.drink) {
      const { id } = this.props.drink;
      this.props.editDrink(id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
      this.props.toggleForm();
      this.setState();
    }
  };

  render() {
    const { name, history, ingredients, prep_serv } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Drink Name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          placeholder="History"
          name="history"
          value={history}
          onChange={this.handleChange}
        />
        <input
          placeholder="Ingredients"
          name="ingredients"
          value={ingredients}
          onChange={this.handleChange}
        />
        <input
          placeholder="Preparation"
          name="prep_serv"
          value={prep_serv}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default DrinkForm;


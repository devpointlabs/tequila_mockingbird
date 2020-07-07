import React from 'react';
import Drink from './Drink';
import axios from "axios";

class DrinkForm extends React.Component {
  state = { name: "", 
  history: "", 
  ingredients: "", 
  prep_serv: "", 
  boozeChoice: null,
  boozes: [],
};

  componentDidMount() {
    if (this.props.drink) {
      const {  name, history, ingredients, prep_serv } = this.props.drink;
      this.setState({ name: name, history: history, ingredients: ingredients, prep_serv: prep_serv});
    }
    // axios call to booze controller index method
    // to grab all boozes, set them to booze array 
    axios .get('/api/boozes')
    .then((res) => {
      this.setState({ boozes: res.data });
    })
    .catch(console.log("Party Foul"));

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.drink) {
      const { id } = this.props.drink;
      this.props.editDrink(id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
      this.props.toggleForm();
    }
  };
// function that is going to list out all booze
  addBoozeToDrink = () => {
    return this.state.boozes.map( (booze) => (
      <option value={booze.id}>
        {booze.name}
      </option>

    ))
  }


  render() {
    const { name, history, ingredients, prep_serv, boozeChoice } = this.state;
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
        {/* lists out all of the booze names */}
        <select 
          placeholder="Alcohol"
          // be a radio list where you can selected more then one booze
          name="boozeChoice" 
          value={boozeChoice}
          onChange={this.handleChange}
          >
          {this.addBoozeToDrink()}
        </select>

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


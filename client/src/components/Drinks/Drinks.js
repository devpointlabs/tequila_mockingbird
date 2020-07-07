import React from "react";
import Drink from "./Drink";
import DrinkForm from "./DrinkForm";
import axios from "axios";

class Drinks extends React.Component {
  state = {
    drinks: [],
    toggleForm: false,
  };


  componentDidMount() {
    axios
      .get("/api/drinks")
      .then((res) => {
        this.setState({ drinks: res.data });
      })
      .catch(console.log("Woopsie"));
  }


  renderDrinks = () =>
    this.state.drinks.map((drink) => <Drink {...drink} deleteDrink={this.deleteDrink}/>);

    toggle = () => {
      this.setState({ toggleForm: !this.state.toggleForm });
    };
  
  //! CRUD ACTIONS

  addDrink = (newDrink) => {
    const { drinks } = this.state;
    // debugger
    axios.post("/api/drinks", newDrink).then((res) => {
      this.setState({ drinks: [res.data, ...drinks] });
    });
  };

  deleteDrink = (id) => {
    axios.delete(`/api/drinks/${id}`)
      .then(res => {
      this.setState({ drinks: this.state.drinks.filter(drink => drink.id !== id)})
    })
  }


  render() {
    // DECONSTRUCTION
    const { drinks, toggleForm } = this.state;
    return (
      <div>
        <h1>Hammered</h1>
        <div>
          {toggleForm ? (
            <DrinkForm add={this.addDrink} toggleForm={this.toggle} />
          ) : (
            <div>No Form</div>
          )}
          <button onClick={() => this.toggle()}>Toggle Add Form</button>
        </div>
        {this.renderDrinks()}
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export default Drinks;
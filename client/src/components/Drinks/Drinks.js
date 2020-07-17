import React from "react";
import Drink from "./Drink";
import DrinkForm from "./DrinkForm";
import axios from "axios";

class Drinks extends React.Component {
  state = {
    drinks: [],
    toggleForm: false,
    boozedrinks: [],
  };

  componentDidMount() {
    axios
      .get("/api/drinks")
      .then((res) => {
        this.setState({ drinks: res.data });
      })
      .catch(console.log("Woopsie"));
  }
  f;

  renderDrinks = () =>
    this.state.drinks.map((drink) => (
      <Drink {...drink} deleteDrink={this.deleteDrink} />
    ));

  toggle = () => {
    this.setState({ toggleForm: !this.state.toggleForm });
  };

  //! CRUD ACTIONS

  addDrink = (newDrink, checkedBoozes) => {
    const { drinks } = this.state;
    axios.post("/api/drinks", newDrink).then((res) => {
      this.setState({ drinks: [res.data, ...drinks] });
      this.addBoozeDrink(res.data.id, checkedBoozes);
    });
  };

  addBoozeDrink = (drinkId, checkedBoozes) => {
    // assuming our create is normal
    const promiseBoozeArray = checkedBoozes.map(cb => {
      return axios.post(`/api/drinks/${drinkId}/boozedrinks`, {
        booze_id: cb.id,
      })  
    })
    Promise.all(promiseBoozeArray)
      .catch(
      console.log("oopsie woopsie")
    )

    // Backend mumbo jumbo
    // axios
    //   .post(`/api/drinks/${drinkId}/boozedrinks`, {boozedrink: {booze_id_array: checkedBoozes}})
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  deleteDrink = (id) => {
    axios.delete(`/api/drinks/${id}`).then((res) => {
      this.setState({
        drinks: this.state.drinks.filter((drink) => drink.id !== id),
      });
    });
  };

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

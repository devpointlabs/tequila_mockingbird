import React from "react";
import Drink from "./Drink";
import axios from "axios";

class DrinkForm extends React.Component {
  state = {
    name: "",
    history: "",
    ingredients: "",
    prep_serv: "",
    boozes: [],
    checkedBoozes: [],
  };

  componentDidMount() {
    if (this.props.drink) {
      const { name, history, ingredients, prep_serv, id } = this.props.drink;
      this.setState({
        name: name,
        history: history,
        ingredients: ingredients,
        prep_serv: prep_serv,
      });
    }
    // axios call to booze controller index method
    // to grab all boozes, set them to booze array
    axios
      .get("/api/boozes")
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
    //   const { id } = this.props.drink;
    //   axios.get(`/api/drinks/${id}/boozedrinks`).then((res) => {
    //     const boozeDrink = res.data[0];
    //     this.setState({ editBoozeId: boozeDrink.id });
    //   });
      const { name, history, ingredients, prep_serv, checkedBoozes } = this.state;
      this.props.editDrink(
        this.props.drink.id,
        {
          name: name,
          history: history,
          ingredients: ingredients,
          prep_serv: prep_serv,
        },
        checkedBoozes
      );
      this.props.toggleEdit();
    } else {
      const { name, history, ingredients, prep_serv, checkedBoozes } = this.state;
      this.props.add(
        {
          name: name,
          ingredients: ingredients,
          prep_serv: prep_serv,
          history: history,
        },
        checkedBoozes
      );
      this.props.toggleForm();
    }
  };
  // function that is going to list out all booze
  addBoozeToDrink = () => {
    return this.state.boozes.map((booze) => (
      <option value={booze.id}>{booze.name}</option>
    ));
  };

  handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    let newBoozes = this.state.boozes;
    newBoozes.map((booze) => {
      if (booze.id == e.target.value) booze.is_checked = e.target.checked;
    });
    let finalBooze = newBoozes.filter((booze) => {
      if (booze.is_checked === true) 
        return booze.id;
      // this.setState({isChecked: !this.state.isChecked})
    });
    this.setState({ checkedBoozes: finalBooze });
  };

  checkboxBooze = () => {
    return this.state.boozes.map((booze) => (
      <div>
        <label>{booze.name}</label>
        <input
          type="checkbox"
          value={booze.id} // ==> true
          name={booze.name}
          checked={booze.is_checked}
          onChange={this.handleCheckboxChange}
        />
      </div>
    ));
  };

  render() {
    const { name, history, ingredients, prep_serv, checkedBoozes } = this.state;
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
        {/* <select 
          placeholder="Alcohol"
          // be a radio list where you can selected more then one booze
          name="checkedBoozes" 
          value={checkedBoozes}
          onChange={this.handleChange}
          ><option> 
            booze...
          </option>
          {this.addBoozeToDrink()}
        </select> */}
        <input
          placeholder="Preparation"
          name="prep_serv"
          value={prep_serv}
          onChange={this.handleChange}
        />
        <div>
          <label>What Booze goes in here?</label>
          <hr />
          {this.checkboxBooze()}
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export default DrinkForm;

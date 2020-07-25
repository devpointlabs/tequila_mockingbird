import React from "react";
import Drink from "./Drink";
import DrinkForm from "./DrinkForm";
import axios from "axios";
import { ConnectedBoozes } from "../Booze/Boozes";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { Card, Image } from "semantic-ui-react";

class Drinks extends React.Component {
  state = {
    drinks: [],
    toggleForm: false,
    boozedrinks: [],
  };

  componentDidMount() {
    if (this.props.drinksSearch) {
      this.setState({ drinks: this.props.drinksSearch })
    } else {

      axios
        .get("/api/drinks")
        .then((res) => {
          this.setState({ drinks: res.data });
        })
        .catch(console.log("Woopsie"));
    }
  }

  renderDrinks = () =>
    this.state.drinks.map((drink) => (
      <Drink {...drink} deleteDrink={this.deleteDrink} user={this.props.auth.user} />
    ));

  toggle = () => {
    this.setState({ toggleForm: true })
    
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
    const promiseBoozeArray = checkedBoozes.map((cb) => {
      return axios.post(`/api/drinks/${drinkId}/boozedrinks`, {
        booze_id: cb.id,
      });
    });
    Promise.all(promiseBoozeArray).catch(console.log("oopsie woopsie"));

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

  isAdminButton = () => {
    if (this.props.auth.user.admin)
      return <button onClick={() => this.toggle()}>Add a Cocktail</button>;
  };

  render() {
    // DECONSTRUCTION
    const { drinks, toggleForm } = this.state;
    return (
      <>
        {this.props.drinksSearch ? (
          <h3>Drink Results</h3>
        ) : (

            <h1>Cocktails</h1>
          )}
        <div>
          {/* {toggleForm ? (
            <DrinkForm add={this.addDrink} toggleForm={this.toggle} />
          ) : null}
          {this.props.drinksSearch ? null :
            <button onClick={() => this.toggle()}>Add a Cocktail</button>
          } */}
        </div>
          {this.props.auth.user ? this.isAdminButton() : null}
        <Card.Group>
          <Card onClick={() => this.toggle()} >
            {!toggleForm ? (
              <Image size='medium' src={"https://pluspng.com/img-png/free-png-plus-sign-plus-icon-512.png"}/>
              ) : null}
            <Card.Content>
              <Card.Header >Add a Cocktail</Card.Header>
              {toggleForm ? (
            <DrinkForm add={this.addDrink} toggleForm={this.toggle} />
          ) : null}
            </Card.Content>
          </Card>
          {this.renderDrinks()}
        </Card.Group>
      </>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export class ConnectedDrinks extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <Drinks {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedDrinks);

import React from "react";
import axios from "axios";
import { Input, Button, Form } from "semantic-ui-react";
import Drinks from "../Drinks/Drinks";
import Boozes from "../Booze/Boozes";
import { withRouter } from "react-router-dom";
import image from "../Image/tequilalogo.png";
class SearchBar extends React.Component {
  state = { search: null, drinks: [], boozes: [], searched: false };
  searchBoozeDrinks = (e, search) => {
    e.preventDefault();
    axios.get(`/api/search_drinks?search=${search}`).then((res) => {
      this.setState({ drinks: res.data });
      this.setState({ searched: true });
    });
    axios.get(`/api/search_boozes?search=${search}`).then((res) => {
      this.setState({ boozes: res.data });
      this.setState({ searched: true });
    });
  };
  handleSearchChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    if (value === "") {
      this.clearSearch(value);
    }
  };
  componentWillUpdate() {
    this.props.history.listen((location, action) => {
      if (action === "PUSH") {
        // debugger
        console.log("Hit");
        this.clearSearch();
        // this.setState({search: null, boozes: [], drinks: []})
      }
      console.log(location, action);
      // Do stuff.
    });
  }
  clearSearch = (searchValue) => {
    if (searchValue === "" || searchValue === undefined) {
      // debugger
      this.setState({ search: "", boozes: [], drinks: [], searched: false });
      // this.setState({ drinks: [] });
      // this.setState({ boozes: [] });
      // this.setState({ searched: false });
    }
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: "1em",
          }}
        >
          <img src={image} style={{ width: "4em", height: "5em" }} />
          {/* Search Me */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: ".5em",
            }}
          >
            <Form>
              <Input
                placeholder="Find a cocktail..."
                onChange={this.handleSearchChange}
                value={this.state.search}
                name="search"
              />
              <Button
                onClick={(e) => this.searchBoozeDrinks(e, this.state.search)}
              >
                Search
              </Button>
            </Form>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* RESULTS */}
          {this.state.searched ? (
            this.state.drinks.length > 0 ? (
              <Drinks drinksSearch={this.state.drinks} />
            ) : (
              "No Cocktails found "
            )
          ) : null}
          {this.state.searched ? (
            this.state.boozes.length > 0 ? (
              <Boozes boozesSearch={this.state.boozes} />
            ) : (
              "No Alcohol found "
            )
          ) : null}
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
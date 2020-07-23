import React from "react";
import axios from "axios";
import { Input, Button, Form } from "semantic-ui-react";
import Drinks from "../Drinks/Drinks";
import Boozes from "../Booze/Boozes";

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

  clearSearch = (searchValue) => {
    if (searchValue === "") {
      this.setState({ drinks: [] });
      this.setState({ searched: false });
    }
  };

  render() {
    return (
      <div>
        <Form>
          {/* Search Me */}
          <Input
            placeholder="Search for..."
            onChange={this.handleSearchChange}
            value={this.state.search}
            name="search"
          />
          <Button onClick={(e) => this.searchBoozeDrinks(e, this.state.search)}>
            Search
          </Button>
        </Form>
        {this.state.searched ? (
          this.state.drinks.length > 0 ? (
            <Drinks drinksSearch={this.state.drinks} />
          ) : (
            "No Drinks found"
          )
        ) : null}
        {this.state.searched ? (
          this.state.boozes.length > 0 ? (
            <Boozes boozesSearch={this.state.boozes} />
          ) : (
            "No Boozes found"
          )
        ) : null}
      </div>
    );
  }
}

export default SearchBar;

//  get "search_posts", to: "posts#search_posts"

// def search_posts
//     render json: Post.search_posts(params[:search], params[:search])
//   end

// def self.filter_category(id)
//     find_by_sql(["
//       SELECT posts.*
//       FROM categories
//       LEFT JOIN categories_posts as cp on categories.id = cp.category_id
//       LEFT JOIN posts on cp.post_id = posts.id
//       WHERE categories.id = ?
//       ORDER BY updated_at DESC
//       ", id])
//   end

//   def self.search_posts(title, body)
//     find_by_sql(["
//     SELECT *
//     FROM posts
//     WHERE LOWER(title) LIKE LOWER(?) OR LOWER(body) LIKE LOWER(?)
//     ORDER BY updated_at DESC
//     ", "%#{title}%", "%#{body}%"])
//   end

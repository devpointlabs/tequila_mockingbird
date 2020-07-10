import React from "react";
import Booze from "./Booze";

class BoozeForm extends React.Component {
  state = { name: "", production: "", history: "", is_checked: false };

  componentDidMount() {
    if (this.props.booze) {
      const {  name, production, history } = this.props.booze;
      this.setState({ name: name, production: production, history: history });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    
    e.preventDefault();

    if (this.props.booze) {
      const { id } = this.props.booze;
      this.props.editBooze(id, this.state);
      this.props.toggleEdit();
    } else {
      this.props.add(this.state);
      this.props.toggleForm();
    }
  };

  render() {
    const { name, production, history } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          placeholder="Production"
          name="production"
          value={production}
          onChange={this.handleChange}
        />
          <input
          placeholder="History"
          name="history"
          value={history}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default BoozeForm;
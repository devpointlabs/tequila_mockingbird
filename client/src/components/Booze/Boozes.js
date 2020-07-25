import React from "react";
// import "../../../App.css";
import Booze from "./Booze";
import BoozeForm from "./BoozeForm";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";

class Boozes extends React.Component {
  state = {
    boozes: [],
    showForm: false,
  };

  componentDidMount() {
    if (this.props.boozesSearch) {
      this.setState({ boozes: this.props.boozesSearch });
    } else {
      axios
        .get("/api/boozes")
        .then((res) => {
          this.setState({ boozes: res.data });
        })
        .catch(console.log("Party Foul"));
    }
  }

  renderBoozes = () =>
    this.state.boozes.map((aSingleBooze) => (
      <Booze
        {...aSingleBooze}
        deleteBooze={this.deleteBooze}
        user={this.props.auth.user}
      />
    ));
  toggle = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  //! CRUD ACTIONS

  addBooze = (newBooze) => {
    const { boozes } = this.state;
    axios.post("/api/boozes", newBooze).then((res) => {
      this.setState({ boozes: [res.data, ...boozes] });
    });
  };

  deleteBooze = (id) => {
    axios.delete(`/api/boozes/${id}`).then((res) => {
      this.setState({
        boozes: this.state.boozes.filter((booze) => booze.id !== id),
      });
    });
  };

  isAdmin = () => {
    if (!this.props.auth.user.admin) return null;
    return <button onClick={() => this.toggle()}>Add an Alcohol</button>;
  };

  render() {
    // DECONSTRUCTION
    const { boozes, showForm } = this.state;
    return (
      <div>
        {this.props.boozesSearch ? (
          <h3>Booze Results</h3>
        ) : (
          <h3>Alcohol</h3>
        )}
        <div>
          {showForm ? (
            <BoozeForm add={this.addBooze} toggleForm={this.toggle} />
          ) : null}
          {this.props.auth.user ? this.isAdmin() : null}
        </div>
        {this.renderBoozes()}
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export class ConnectedBoozes extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <Boozes {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedBoozes);

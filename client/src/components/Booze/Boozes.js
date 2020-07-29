import React from "react";
// import "../../../App.css";
import Booze from "./Booze";
import BoozeForm from "./BoozeForm";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import "../Booze/BoozeDrinkStyles.css";

class Boozes extends React.Component {
  state = {
    boozes: [],
    toggleForm: false,
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
    this.setState({ toggleForm: true });
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
    const { boozes, showForm, toggleForm, image } = this.state;
    return (
      <div id="container">
      <>
        {this.props.boozesSearch ? (
          <h3>Booze Results</h3>
        ) : (
            <h1>Alcohol</h1>
          )}


        <Card.Group >
          {this.props.auth.user && this.props.auth.user.admin ?
            <Card onClick={() => this.toggle()} >
              {!toggleForm ? (
                <Image size='medium' src={"https://pluspng.com/img-png/free-png-plus-sign-plus-icon-512.png"} />
              ) : null}
              <Card.Content>
                <Card.Header >Add an Alcohol</Card.Header>
                {toggleForm ? (
                  <BoozeForm add={this.addBooze} toggleForm={this.toggle} />
                ) : null}
              </Card.Content>
            </Card>
            : null}
          {this.renderBoozes()}
        </Card.Group>

      </>
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

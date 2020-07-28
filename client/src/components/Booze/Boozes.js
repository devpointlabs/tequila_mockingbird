import React from "react";
// import "../../../App.css";
import Booze from "./Booze";
import BoozeForm from "./BoozeForm";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import { withRouter } from "react-router-dom";
import { Card, Image , Button} from "semantic-ui-react";
import "./BoozeDrinkStyles.css";

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
    this.setState({ toggleForm: !this.state.toggleForm });
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
    const { boozes, showForm, toggleForm, image, } = this.state;
    return (
      <div id="container">
        {this.props.boozesSearch ? (
          <h3>Alcohol Results</h3>
        ) : (
            <h1>Alcohol</h1>
          )}

        {this.props.auth.user && this.props.auth.user.admin && toggleForm ?
          (
            <>
              <BoozeForm add={this.addDrink} toggleForm={this.toggle} />
              <Button onClick={() => this.toggle()}>
                {this.state.toggleForm ? "Close Form" : ""}
              </Button>
            </>
          ) : null}

        <Card.Group >
          {this.props.auth.user && this.props.auth.user.admin && !toggleForm ? (
            <Card >
              <Image size='medium' src={"https://pluspng.com/img-png/free-png-plus-sign-plus-icon-512.png"} onClick={() => this.toggle()} />
              <Card.Content>
                <Card.Header onClick={() => this.toggle()}> Add an Alcohol</Card.Header>
              </Card.Content>
            </Card>
          ) : null}
          {this.renderBoozes()}
        </Card.Group>

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

{/* <Card.Group >
  {this.props.auth.user && this.props.auth.user.admin ?
    <Card  >
      {!toggleForm ? (
        <Image size='medium' src={"https://pluspng.com/img-png/free-png-plus-sign-plus-icon-512.png"} onClick={() => this.toggle()} />
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
</Card.Group> */}
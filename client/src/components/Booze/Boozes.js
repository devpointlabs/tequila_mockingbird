import React from "react";
// import "../../../App.css";
import Booze from "./Booze";
import BoozeForm from "./BoozeForm";
import axios from "axios";

class Boozes extends React.Component {
  state = {
    boozes: [],
    showForm: false,
  };


  componentDidMount() {
    axios
      .get("/api/boozes")
      .then((res) => {
        this.setState({ boozes: res.data });
      })
      .catch(console.log("Party Foul"));
  }


  renderBoozes = () =>
    this.state.boozes.map((aSingleBooze) => <Booze {...aSingleBooze} deleteBooze={this.deleteBooze}/>);
    toggle = () => {
      this.setState({ showForm: !this.state.showForm });
    };
  
  //! CRUD ACTIONS

  addBooze = (newBooze) => {
    const { boozes } = this.state;
    // debugger
    axios.post("/api/boozes", newBooze).then((res) => {
      this.setState({ boozes: [res.data, ...boozes] });
    });
  };

  deleteBooze = (id) => {
    axios.delete(`/api/boozes/${id}`)
      .then(res => {
      this.setState({ boozes: this.state.boozes.filter(booze => booze.id !== id)})
    })
  }


  render() {
    // DECONSTRUCTION
    const { boozes, showForm } = this.state;
    return (
      <div>
        <h1>Hello Booze World</h1>
        <div>
          {showForm ? (
            <BoozeForm add={this.addBooze} toggleForm={this.toggle} />
          ) : (
            <div>No Form</div>
          )}
          <button onClick={() => this.toggle()}>Toggle Add Form</button>
        </div>
        {this.renderBoozes()}
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export default Boozes;

import React from "react";
import axios from "axios";
import BoozeForm from "./BoozeForm";

class BoozeView extends React.Component {
  state = { booze: {}, toggleEdit: false };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/boozes/${id}`).then((res) => {
      this.setState({ booze: res.data });
    });
  }

  editBooze = (id, booze) => {
    axios.put(`/api/boozes/${id}`, booze)
      .then(res => {
      this.setState({booze: res.data})
    })
  };

  updateTodo = (id) => {
  axios.put(`/api/booze/${id}`)
    .then( res => {
      const todos = this.state.todos.map( t => {
      if (t.id === id)
        return res.data;
      return t;
    });
    this.setState({ todos, });
  })
}

  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };



  render() {
    const { name, history, production } = this.state.booze;
    return (
      <div>
        <h1>{name}</h1> 

        <h2>History</h2>
        <h3>{history}</h3>
        <h2>Production</h2>
        <h3>{production}</h3>

        {this.state.toggleEdit ? <BoozeForm booze={this.state.booze} editBooze={this.editBooze} toggleEdit={this.toggle}/> : null}
        <button onClick={() => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>

       

      </div>
    );
  }
}

export default BoozeView;
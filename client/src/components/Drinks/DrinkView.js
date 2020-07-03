import React from 'react';
import axios from 'axios';
import DrinkForm from './DrinkForm';


class DrinkView extends React.Component {
  state = { drink: {}, toggleEdit: false};

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/drinks/${id}`).then((res) => {
      this.setState({ drink: res.data });
    });
  }

  editDrink = (id, drink) => {
    axios.put(`/api/drinks/${id}`, drink)
      .then(res => {
      this.setState({drink: res.data})
      })
  };

  updateDrink = (id) => {
  axios.put(`/api/drinks/${id}`)
    .then( res => {
      const drinks = this.state.drinks.map( t => {
        if(t.id === id)
          return res.data;
        return t;
      });
      this.setState({ drinks, });
    })
  }

  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  render() {
    const { name, history, ingredients, prep_serv} = this.state.drink;
    return (
      <div>
        <h3>{name}</h3>
        {this.state.toggleEdit ? <DrinkForm drink={this.state.drink} editDrink={this.editDrink} toggleEdit={this.toggle}/> : null}
        <button onClick={() => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
      </div>
    );
  }

}



export default DrinkView;
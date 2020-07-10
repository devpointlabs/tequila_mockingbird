import React from 'react';
import axios from 'axios';
import DrinkForm from './DrinkForm';


class DrinkView extends React.Component {
  state = { 
   drink: {},
   toggleEdit: false,
   boozes: []
  };

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
      this.updateBoozeDrink(id, drink.boozeChoice)
      })
  };

  updateBoozeDrink = (drink_id, booze_id) => {
    debugger
    axios.put(`/api/drinks/`)
  }

  // 

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

  // deleteDrink = (id) => {
  //   axios.delete(`/api/drinks/${id}`)
  //     .then(res => {
  //     this.setState({ drink: this.state.drink.filter(drink => drink.id !== id)})
  //   })
  //   return <Redirect to = {{ pathname: "/drinks" }} />;
    
  // }

  render() {
    const { name, history, ingredients, prep_serv} = this.state.drink;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{history}</h1>
        <h1>{ingredients}</h1>
        <h1>{prep_serv}</h1>
        
        {this.state.toggleEdit ? <DrinkForm drink={this.state.drink} editDrink={this.editDrink} toggleEdit={this.toggle}/> : null}
        <button onClick={ () => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
        {/* <button onClick={() => this.state.deleteDrink}>Delete</button> */}
        
      </div>
    );
  }

}



export default DrinkView;
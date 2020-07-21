import React from 'react';
import axios from 'axios';
import DrinkForm from './DrinkForm';
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import Comments from '../Comment/Comments';
import CommentForm from '../Comment/CommentForm';

const defaultDrink = 'https://image.flaticon.com/icons/png/128/3184/3184574.png';


class DrinkView extends React.Component {
  state = { 
   drink: {},
   toggleEdit: false,
   boozes: [],
  };

  componentDidMount() { 
    const { id } = this.props.match.params;
    axios.get(`/api/drinks/${id}`).then((res) => {
      this.setState({ drink: res.data });
     
    });
    //fills boozes array 
    axios
    .get("/api/boozes")
    .then((res) => {
      this.setState({ boozes: res.data });
    })
    // const { booze_id, drink_id } = this.props.match.params;
    // axios.get(`/api/drinks/${drink_id}/boozedrinks/${booze_id}`).then((res) => {
    //   this.setState({ boozedrink: res.data });
    // });
  
  }

  editDrink = (id, drink, checkedBoozes) => {

    let data = new FormData() 
    data.append('file',drink.file)
    // 1. edit the actual drink
    axios.put(`/api/drinks/${id}?name=${drink.name}&history=${drink.history}&prep_serv=${drink.prep_serv}&ingredients=${drink.ingredients}`, data)
    .then(res => {
      this.setState({ drink: res.data })
      
      // 2. we need to delete all boozedrinks associated with this drink
      // axios call to a method in drink that deletes all boooze drinks models.
      this.deleteBoozeDrinks(id)
      // 3. we need to recreate the new boozedrinks associations.
      // do the same thing that we have in our create boozedrinks fucntion
      this.addBoozeDrink(id, checkedBoozes)
      })
  };

  addBoozeDrink = (drinkId, checkedBoozes) => {
       // assuming our create is normal
    const promiseBoozeArray = checkedBoozes.map(cb => {
      return axios.post(`/api/drinks/${drinkId}/boozedrinks`, {
        booze_id: cb.id,
      })  
    })
    Promise.all(promiseBoozeArray)
      .catch(
      console.log("oopsie woopsie")
    )
    // Backend mumbo jumbo
    // axios
    //   .post(`/api/drinks/${drinkId}/boozedrinks`, {boozedrink: {booze_id_array: checkedBoozes}})
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  deleteBoozeDrinks = (drinkId) => {
         axios.delete(`/api/drinks/${drinkId}/boozedrinks`)
      .then(console.log("It worked"))
    }


  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  render() {
    const { name, history, ingredients, prep_serv, id, image} = this.state.drink;
  
    return (
      <div>
        <h1>{name}</h1>
        <h2>History</h2>
        <h3>{history}</h3>
        <h2>Ingredients</h2>
        <h3>{ingredients}</h3>
        <h2>Served In</h2>
        <h3>{prep_serv}</h3>
        <img src={image || defaultDrink} />
        {/* add defaultDrink or drinkimage */}
        {/* <h1>{boozes_name}</h1> */}
        {this.state.toggleEdit ? <DrinkForm drink={this.state.drink} editDrink={this.editDrink} toggleEdit={this.toggle}/> : null}
        <button onClick={ () => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
       
        {/* <button onClick={() => this.state.deleteDrink}>Delete</button> */}
        <h2> Comments</h2>
        <Comments drinkId={this.props.match.params.id} />
      </div>
    );
  }

}


export default DrinkView;
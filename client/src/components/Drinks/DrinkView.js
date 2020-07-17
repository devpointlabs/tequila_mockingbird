import React from 'react';
import axios from 'axios';
import DrinkForm from './DrinkForm';
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';



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
    // debugger
  }

  editDrink = (id, drink, checkedBoozes) => {
    debugger

    // 1. edit the actual drink
    axios.put(`/api/drinks/${id}`, drink)
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
   debugger
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
    debugger
      axios.delete(`/api/drinks/${drinkId}/boozedrinks`)
      .then(console.log("It worked"))
    }


  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  render() {
    const { name, history, ingredients, prep_serv, id} = this.state.drink;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{history}</h1>
        <h1>{ingredients}</h1>
        <h1>{prep_serv}</h1>
        {/* <h1>{boozes_name}</h1> */}
        {this.state.toggleEdit ? <DrinkForm drink={this.state.drink} editDrink={this.editDrink} toggleEdit={this.toggle}/> : null}
        <button onClick={ () => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
        {/* <button onClick={() => this.state.deleteDrink}>Delete</button> */}
        <h3> Add an image or comment?</h3>
        <Comment drinkId={id} />
      </div>
    );
  }

}


export default DrinkView;
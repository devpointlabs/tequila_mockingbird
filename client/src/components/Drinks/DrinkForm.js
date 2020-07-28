import React from "react";
import Drink from "./Drink";
import axios from "axios";
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid} from 'semantic-ui-react';
import './Form.css';
import styled from 'styled-components';


const defaultDrink = 'https://image.flaticon.com/icons/png/128/3184/3184574.png';

// const Button = styled.button`
//   width: 6em;
//   margin: 10px;
//   padding: 4px 3px;
// `


const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}


class DrinkForm extends React.Component {
  state = {
    name: "",
    history: "",
    ingredients: "",
    prep_serv: "",
    image: "",
    boozes: [],
    checkedBoozes: [],
    file: ''
  };

  onDrop = (files) => {
    this.setState({file: files[0] });
  }

  componentDidMount() {
    if (this.props.drink) {
      const { name, history, ingredients, prep_serv, id, file, image } = this.props.drink;
      this.setState({
        name: name,
        history: history,
        ingredients: ingredients,
        prep_serv: prep_serv,
        file: file,
        image: image
      });
    }
    // axios call to booze controller index method
    // to grab all boozes, set them to booze array
    axios
      .get("/api/boozes")
      .then((res) => {
        this.setState({ boozes: res.data });
      })
      .catch(console.log("Party Foul"));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.drink) {
      const { name, history, ingredients, prep_serv, checkedBoozes, file } = this.state;
      this.props.editDrink(
        this.props.drink.id,
        {
          name: name,
          history: history,
          ingredients: ingredients,
          prep_serv: prep_serv,
          file: file,
        },
        checkedBoozes
      );
      this.props.toggleEdit();
    } else {
      const { name, history, ingredients, prep_serv, checkedBoozes, file } = this.state;
      this.props.add(
        {
          name: name,
          ingredients: ingredients,
          prep_serv: prep_serv,
          history: history,
          file: file
        },
        checkedBoozes
      );
      this.props.toggleForm();
    }
  };
  // function that is going to list out all booze
  addBoozeToDrink = () => {
    return this.state.boozes.map((booze) => (
      <option value={booze.id}>{booze.name}</option>
    ));
  };

  handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    let newBoozes = this.state.boozes;
    newBoozes.map((booze) => {
      if (booze.id == e.target.value) booze.is_checked = e.target.checked;
    });
    let finalBooze = newBoozes.filter((booze) => {
      if (booze.is_checked === true)
        return booze.id;
      // this.setState({isChecked: !this.state.isChecked})
    });
    this.setState({ checkedBoozes: finalBooze });
  };

  checkboxBooze = () => {
    return this.state.boozes.map((booze) => (
      <div className='chex'>
        <input
          type="checkbox"
          value={booze.id} // ==> true
          name={booze.name}
          checked={booze.is_checked}
          onChange={this.handleCheckboxChange}
        />
        <label> {booze.name}</label>
      </div>
    ));
  };

  
  dropZone = () => {
    const { file, } = this.state;
    return(
      <Form onSubmit={this.handleSubmit}>
          <Dropzone
            className='dropZone'
            onDrop={this.onDrop}
            multiple={false}
          >
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  style={styles.dropzone}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
          </Dropzone>
      </Form>
    )}

    

    render() {
      const { name, history, ingredients, prep_serv, checkedBoozes, image } = this.state;
      return (
        <div>
          {/* should this be on the drinks page??? */}
          {/* <br/> */}
          {/* <h1 className='formTitle'>Create your own drink!</h1>
          <h4 className='formTitle'>Share your own recipes here, let us know how it's made and the history behind your own creation</h4> */}
        <form onSubmit={this.handleSubmit}>
        <div className='format'>
          <div class='column'>
          <br/>
          <ul>
            <li>
              <label>Name: </label>
              <br/>
              <input
                placeholder="Drink Name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </li>
            <li>
            <label>History: </label>
              <br/>
          <textarea
            rows='6'
            cols='30'
            placeholder="History"
            name="history"
            value={history}
            onChange={this.handleChange}
          />
            </li>
            <li> 
            <label>Ingredients: </label>
              <br/> 
          <textarea 
            rows='10'
            cols='30'
            placeholder="Ingredients"
            name="ingredients"
            value={ingredients}
            onChange={this.handleChange}
          />
            </li>
            <li>
            <label>Preparation: </label>
              <br/>
          <textarea
            rows='6'

            cols='30'
            placeholder="Preparation"
            name="prep_serv"
            value={prep_serv}
            onChange={this.handleChange}
          />
            </li>
          </ul>
          <label className='checkLabel'>Choose your alcohol:</label>
          <br />
          {this.checkboxBooze()}
          </div>
          <div>
            {this.props.drink ? this.dropZone() : ""}
          </div>
          <hr />
          <br/>
          <button class='ui fluid button'>Submit</button>
        </div>
        </form>
        </div>
      );
    }
  }

  
  export default DrinkForm;

import React from "react";
import Drink from "./Drink";
import axios from "axios";
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid} from 'semantic-ui-react';

const defaultDrink = 'https://image.flaticon.com/icons/png/128/3184/3184574.png';

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
      //   const { id } = this.props.drink;
      //   axios.get(`/api/drinks/${id}/boozedrinks`).then((res) => {
      //     const boozeDrink = res.data[0];
      //     this.setState({ editBoozeId: boozeDrink.id });
      //   });
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
      <div>
        <label>{booze.name}</label>
        <input
          type="checkbox"
          value={booze.id} // ==> true
          name={booze.name}
          checked={booze.is_checked}
          onChange={this.handleCheckboxChange}
        />
      </div>
    ));
  };

  dropZone = () => {
    const { file, } = this.state;
    return(
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
          <Dropzone
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
        </Grid.Column>
      </Form>
    )}

    

    render() {
      const { name, history, ingredients, prep_serv, checkedBoozes, image } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <br/><br/>
          <h1>Make A Drink!</h1>
          <input
            placeholder="Drink Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            placeholder="History"
            name="history"
            value={history}
            onChange={this.handleChange}
          />
          <input
            placeholder="Ingredients"
            name="ingredients"
            value={ingredients}
            onChange={this.handleChange}
          />
          <input
            placeholder="Preparation"
            name="prep_serv"
            value={prep_serv}
            onChange={this.handleChange}
          />
          <div>
            <label>What Booze goes in here?</label>
            <hr />
            {this.checkboxBooze()}
          </div>
          {this.props.drink ? this.dropZone() : ""}
          <hr />
          <button>Submit</button>
        </form>
      );
    }
  }

  
  export default DrinkForm;

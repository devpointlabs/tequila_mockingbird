import React from "react";
import Booze from "./Booze";
import axios from "axios";
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid } from 'semantic-ui-react';

const defaulBooze = 'https://image.flaticon.com/icons/png/128/3184/3184574.png';

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
class BoozeForm extends React.Component {
  state = {
    name: "",
    production: "",
    history: "",
    is_checked: false,
    file: ''
  };

  componentDidMount() {
    if (this.props.booze) {
      const { name, production, history, file, image } = this.props.booze;
      this.setState({ name: name, 
        production: production, 
        history: history, 
        file: file,
        image: image});
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {

    e.preventDefault();

    // May need to change something here
    if (this.props.booze) {
      const { name, history, production, file } = this.props.booze;
      this.props.editBooze(
        this.props.booze.id,
        { 
          name: name,
          history: history,
          production: production,
          file: file,
        }
        );
      this.props.toggleEdit();
    } else {
      const { name, history, production, file } = this.state;
      this.props.add(
        { 
          name: name,
          history: history,
          production: production,
          file: file,
        }
      );
      this.props.toggleForm();
    }
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
    const { name, production, history, image } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          placeholder="Production"
          name="production"
          value={production}
          onChange={this.handleChange}
        />
        <input
          placeholder="History"
          name="history"
          value={history}
          onChange={this.handleChange}
        />
        <div>
        {this.props.booze ? this.dropZone() : ""}
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export default BoozeForm;
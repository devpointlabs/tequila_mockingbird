import React from "react";
import Comments from "./Comments";
import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';

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

class CommentForm extends React.Component {
  state = { review: "", formValues: { file: '' }};

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0], } });
  }

  componentDidMount() {
    if (this.props.comment) {
      const { review } = this.props.comment;
      this.setState({ review: review });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.add(this.state);
  };


editImage = () => {
  const { review, formValues:{file}} = this.state;
  return (
    <Form onSubmit={this.handleSubmit}>
      <Grid.Column width={6}>


        <input
          placeholder="Comment"
          name="review"
          value={review}
          onChange={this.handleChange}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        {/* <Dropzone
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
        </Dropzone> */}
      </Grid.Column>
      <Button>Submit</Button>
    </Form>
  )
}

  render() {
    const { review } = this.state
    return (
      <>
        <this.editImage />
      </>
    )
  }
}


export default CommentForm;
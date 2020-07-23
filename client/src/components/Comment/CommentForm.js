import React from "react";
// import Comments from "./Comments";
// import Dropzone from 'react-dropzone'; //Import Dropzone
import { Form, Grid, Image, Container, Divider, Header, Button, } from 'semantic-ui-react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

// const EditorComponent = () => <Editor />

class CommentForm extends React.Component {
  state = { 
    review: '',
    editorState: EditorState.createEmpty()
  };

  componentDidMount() {
    if (this.props.comment) {
      const { review } = this.props.comment;
      this.setState({ review: review });
    }
  }

  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  onEditorStateChange = (e,review) => {
    this.setState({
      review,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.add(this.state);
    this.setState({review: ''})
  };


editImage = () => {
  const {review, editorState} = this.state;
  return (
    <Form onSubmit={this.handleSubmit}>
      <Grid.Column width={6}>


        <Editor
          editorState={editorState}
          review={review}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          name="review"
          value={review}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <input
          placeholder="Comment"
          name="review"
          value={review}
          onChange={this.handleChange}
          required
        /> */}
      </Grid.Column>
      <Button>Submit</Button>
    </Form>
  )
}

  render() {
    const { review, editorState } = this.state
    return (
      <>
        <this.editImage />
      </>
    )
  }
}


export default CommentForm;
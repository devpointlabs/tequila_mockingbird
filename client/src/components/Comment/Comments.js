import React from "react";

import CommentForm from "./CommentForm";
import axios from "axios";


class Comments extends React.Component {
  state = {
    comments: [],
  };


  
  componentDidMount() {
    
    axios
      .get(`/api/drinks/${this.props.drinkId}/comments`)
      .then((res) => {
        this.setState({ comments: res.data });
      })
        .catch(console.log("Woopsie"));
    } 


  renderComments = () => {
    return (
    this.state.comments.map((comment) => (
      <div>
        {comment.review}{comment.image}
      </div>
    ))
  )
};

//! CRUD ACTIONS

  addComment = ( comment ) => {
    const { comments } = this.state;
   
    axios.post((`/api/drinks/${this.props.drinkId}/comments`), comment).then((res) => {
      this.setState({ comments: [res.data, ...comments] });

    });
  };



  render() {
    // DECONSTRUCTION
    const { comments } = this.state
    return (
      <div>
        {/* <h1>Hammered</h1> */}
        {this.renderComments()}
        <div>
          
            <CommentForm add={this.addComment} />
          
        </div>
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export default Comments;

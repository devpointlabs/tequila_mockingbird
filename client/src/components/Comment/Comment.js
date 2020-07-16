import React from "react";

import CommentForm from "./CommentForm";
import axios from "axios";


class Comment extends React.Component {
  state = {
    reviews: [],
    file: [],
    comments: [],

  };


  
  componentDidMount() {
    if (this.props.drinkId){
    axios
      .get(`/api/drinks/${this.props.drinkId}/comments`)
      .then((res) => {
        this.setState({ comments: res.data });
      })
    
        .catch(console.log("Woopsie"));
    } 
  }


  renderComments = () => {
    this.state.comments.map((comment) => comment.review);

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
        <h1>Hammered</h1>
        <div>
          
            <CommentForm add={this.addComment} />
          
        </div>
        {this.renderComments()}
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export default Comment;

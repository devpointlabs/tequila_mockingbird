import React from "react";
import CommentForm from "./CommentForm";
import axios from "axios";
import "../Booze/BoozeDrinkStyles.css";

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
    return this.state.comments.map((comment) => (
      <div>
        {/* <span className="comments">
        </span> */}
        {/* Adming */}
        <table>
          <tr>
            <td>{comment.review}</td>
            <td>{this.props.user ? this.isAdmin(comment.id) : null}</td>
          </tr>
        </table>
      </div>
    ));
  };

  isAdmin = (id) => {
    if (this.props.user.admin)
      return <button onClick={() => this.deleteComment(id)}>Delete</button>;
    return null;
  };

  deleteComment = (id) => {
    axios
      .delete(`/api/drinks/${this.props.drinkId}/comments/${id}`)
      .then((res) => {
        this.setState({
          comments: this.state.comments.filter((c) => {
            return c.id !== id;
          }),
        });
      });
  };

  //! CRUD ACTIONS

  addComment = (comment) => {
    const { comments } = this.state;

    axios
      .post(`/api/drinks/${this.props.drinkId}/comments`, comment)
      .then((res) => {
        this.setState({ comments: [res.data, ...comments] });
      });
  };

  render() {
    // DECONSTRUCTION
    const { comments } = this.state;
    return (
      <div>
        {this.renderComments()}
        <div style={{ marginTop: "5px" }}>
          <CommentForm add={this.addComment} />
        </div>
      </div>
    );
  }
}

// FUNCTIONS

// JSX/HTML

export default Comments;

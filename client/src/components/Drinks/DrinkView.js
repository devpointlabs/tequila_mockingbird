import React from "react";
import axios from "axios";
import DrinkForm from "./DrinkForm";
import Dropzone from "react-dropzone"; //Import Dropzone
import {
  Form,
  Grid,
  Image,
  Container,
  Divider,
  Header,
  Button,
  AccordionPanel,
} from "semantic-ui-react";
import Comments from "../Comment/Comments";
import CommentForm from "../Comment/CommentForm";
import { Link, withRouter } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";

const defaultDrink =
  "https://image.flaticon.com/icons/png/128/3184/3184574.png";

class DrinkView extends React.Component {
  state = {
    drink: {},
    toggleEdit: false,
    boozes: [],
    liquor: [],
    audits: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/drinks/${id}`).then((res) => {
      this.setState({ drink: res.data });
    });
    //fills boozes array
    axios.get("/api/boozes").then((res) => {
      this.setState({ boozes: res.data });
    });

    axios.get(`/api/drinks/${id}/boozes`).then((res) => {
      this.setState({ liquor: res.data });
    });
    axios.get(`/api/drinks/${id}/audits`).then((res) => {
      this.setState({ audits: res.data });
    });
    // const { booze_id, drink_id } = this.props.match.params;
    // axios.get(`/api/drinks/${drink_id}/boozedrinks/${booze_id}`).then((res) => {
    //   this.setState({ boozedrink: res.data });
    // });
  }

  editDrink = (id, drink, checkedBoozes) => {
    let data = new FormData();
    data.append("file", drink.file);
    // 1. edit the actual drink
    axios
      .put(
        `/api/drinks/${id}?name=${drink.name}&history=${drink.history}&prep_serv=${drink.prep_serv}&ingredients=${drink.ingredients}`,
        data
      )
      .then((res) => {
        this.setState({ drink: res.data });

        // 2. we need to delete all boozedrinks associated with this drink
        // axios call to a method in drink that deletes all boooze drinks models.
        this.deleteBoozeDrinks(id);
        // 3. we need to recreate the new boozedrinks associations.
        // do the same thing that we have in our create boozedrinks fucntion
        this.addBoozeDrink(id, checkedBoozes);
      });
  };

  addBoozeDrink = (drinkId, checkedBoozes) => {
    // assuming our create is normal
    const promiseBoozeArray = checkedBoozes.map((cb) => {
      return axios.post(`/api/drinks/${drinkId}/boozedrinks`, {
        booze_id: cb.id,
      });
    });
    Promise.all(promiseBoozeArray).catch(console.log("oopsie woopsie"));
    // Backend mumbo jumbo
    // axios
    //   .post(`/api/drinks/${drinkId}/boozedrinks`, {boozedrink: {booze_id_array: checkedBoozes}})
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  deleteBoozeDrinks = (drinkId) => {
    axios
      .delete(`/api/drinks/${drinkId}/boozedrinks`)
      .then(console.log("It worked"));
  };

  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  renderLiquor = () => {
    return this.state.liquor.map((l) => (
      <div>
        <Link to={`/boozes/${l.id}`}>{l.name}</Link>
      </div>
    ));
  };

  auditChanges = (changes) => {
    // Grabs the values changed from the changes object and maps through all the values changed
    // Audit magic grabs previous one, and current one. One === value
    // There was only two values in an array so we just grab the index of each.
    
    if (changes.image === null) {changes.image = defaultDrink}
    var arr2 = Object.values(changes).map(function (value) {
      return (
        <div>
          Was: "{value[0]}" <br /> Edited to: "{value[1]}"
        </div>
      );
    });
    return arr2;
  };
  
  auditTitle = (changes) => {
    // Grabs the key from the changes object and maps through all the keys changed
    if (changes.image === null) {changes.image = defaultDrink}
    var arr1 = Object.keys(changes).map(function (key) {
      // Makes first letter of each string a capital letter
      return key.charAt(0).toUpperCase() + key.slice(1) + " ";
      // name.charAt(0).toUpperCase() + name.slice(1);
    });
    return arr1;
  };

  renderAudits = () => {
    if (this.state.audits.length === 0) return null
    return this.state.audits.map((a) => {
      // time(a.created_at)
      return (
        <div>
          {/* <Moment format="YYYY/MM/DD"> */}
          Edited At: {this.dateCreated(a.created_at)}
          {/* </Moment> */}
          {/* <p>{this.auditChanges(a.audited_changes).map(thing => <div>Topics Changed: {thing }</div>)}</p> */}
          <div>
            Topics Changed: <b>{this.auditTitle(a.audited_changes)}</b>
          </div>
          <div>{this.auditChanges(a.audited_changes)}</div>
          <hr />
        </div>
      );
    });
  };

  isAdmin = () => {
    if (this.props.auth.user.admin)
      return (
        <div>
          <hr />
          <h4>Edit Logs</h4>
          {this.renderAudits()}
        </div>
      );
    return null;
  };

  dateCreated = (audit) => {
    //! REFACTOR THIS TO MOMENTJS
    var date = new Date(audit);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let dayOfWeek = days[date.getDay()];
    let hour = date.getHours();
    var ampm = hour >= 12 ? "PM" : "AM";
    let min = date.getMinutes();
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? "0" + min : min;
    var strTime = hour + ":" + min + " " + ampm;
    var fullDate = month + "/" + day + "/" + year;
    return `${fullDate} at ${strTime} (${dayOfWeek})`;
  };

  isAdminButton = () => {
    if (this.props.auth.user.admin)
      return (
        <button onClick={() => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
      );
  };

  render() {
    const {
      name,
      history,
      ingredients,
      prep_serv,
      id,
      image,
    } = this.state.drink;

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
        {this.props.auth.user ? this.isAdmin() : null}
        {this.state.toggleEdit ? (
          <DrinkForm
            drink={this.state.drink}
            editDrink={this.editDrink}
            toggleEdit={this.toggle}
          />
        ) : null}
        {this.props.auth.user ? this.isAdminButton() : null}
        <hr />
        {this.renderLiquor()}
        {/* <button onClick={() => this.state.deleteDrink}>Delete</button> */}
        <h2> Comments</h2>
        <Comments
          drinkId={this.props.match.params.id}
          user={this.props.auth.user}
        />
      </div>
    );
  }
}

export class ConnectedDrinkView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <DrinkView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedDrinkView);

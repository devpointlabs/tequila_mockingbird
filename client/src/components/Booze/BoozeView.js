import React from "react";
import axios from "axios";
import BoozeForm from "./BoozeForm";
import { Link, withRouter } from "react-router-dom";
import { AuthConsumer } from "../../providers/AuthProvider";

const defaultBooze = 'https://image.flaticon.com/icons/svg/920/920605.svg';



class BoozeView extends React.Component {

  state = { booze: {}, toggleEdit: false, drinks: [], audits: [] };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/boozes/${id}`).then((res) => {
      this.setState({ booze: res.data });
    });
    axios.get(`/api/boozes/${id}/drinks`).then((res) => {
      this.setState({ drinks: res.data });
    });
    axios.get(`/api/boozes/${id}/audits`).then((res) => {
      this.setState({ audits: res.data });
    });
  }

  editBooze = (id, booze) => {
    let data = new FormData();
    debugger
    data.append("file", booze.file);
    axios
    .put(
      `/api/boozes/${id}?name=${booze.name}&history=${booze.history}&production=${booze.production}`, 
      data
    )
    .then((res) => {
      this.setState({ booze: res.data, });
    });

  };

  // updateTodo = (id) => {
  //   axios.put(`/api/booze/${id}`).then((res) => {
  //     const todos = this.state.todos.map((t) => {
  //       if (t.id === id) return res.data;
  //       return t;
  //     });
  //     this.setState({ todos });
  //   });
  // };

  toggle = () => {
    this.setState({ toggleEdit: !this.state.toggleEdit });
  };

  renderDrinks = () => {
    return this.state.drinks.map((d) => (
      <div>
        <Link to={`/drinks/${d.id}`}>{d.name}</Link>
      </div>
    ));
  };

  auditChanges = (changes) => {
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
    var arr1 = Object.keys(changes).map(function (key) {
      return key.charAt(0).toUpperCase() + key.slice(1) + " ";
      // name.charAt(0).toUpperCase() + name.slice(1);
    });
    return arr1;
  };

  renderAudits = () => {
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
          <p></p>
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
  
  isAdminButton = () => {
    if (this.props.auth.user.admin)
      return (
        <button onClick={() => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
      );
    return null;
    
  }

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

  render() {
    const { name, history, production, image } = this.state.booze;
    return (
      <div>
        <h1>{name}</h1>

        <h2>History</h2>
        <h3>{history}</h3>
        <h2>Production</h2>
        <h3>{production}</h3>
        <img src={image || defaultBooze} />
        {this.props.auth.user ? this.isAdmin() : null}

        {this.state.toggleEdit ? <BoozeForm booze={this.state.booze} editBooze={this.editBooze} toggleEdit={this.toggle}/> : null}
        <button onClick={() => this.toggle()}>
          {this.state.toggleEdit ? "Close Form" : "Edit"}
        </button>
      <hr/>
      <h2>{name} Cocktails</h2>
      {this.renderDrinks()}
        {this.state.toggleEdit ? (
          <BoozeForm
            booze={this.state.booze}
            editBooze={this.editBooze}
            toggleEdit={this.toggle}
          />
        ) : null}
        {this.props.auth.user ? this.isAdminButton() : null}
        

        {this.renderDrinks()}

        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" 
        title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 
        title="Flaticon">www.flaticon.com</a></div>
      </div>
    );
  }
}

export class ConnectedBoozeView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <BoozeView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedBoozeView);
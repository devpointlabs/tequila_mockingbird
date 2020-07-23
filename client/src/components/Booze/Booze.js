import React from "react";
// import "../../../App.css";
import { Link } from "react-router-dom";

const Booze = ({ name, production, history, id, deleteBooze, user }) => {

  const isAdmin = () => {
    if (user.admin) return <button onClick={() => deleteBooze(id)}>Delete</button>
    return null;
  }
  
  return (
    <div>
      <ul>
        <h1>{name}</h1>
        <li>
          {production} {history}
        </li>
        <Link to={`/boozes/${id}`}>Booze Page</Link>
        {user ? (
          isAdmin()
        ) : null}
      </ul>
    </div>
  );
};

export default Booze;

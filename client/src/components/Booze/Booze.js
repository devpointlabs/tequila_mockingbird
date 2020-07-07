import React from "react";
// import "../../../App.css";
import { Link } from "react-router-dom";

const Booze = ({ name, production, history, id, deleteBooze }) => {
  return (
    <div>
      <ul>
         <h1>{name}</h1>  
        <li>
        {production} {history}
        </li>
        <Link to={`/boozes/${id}`}>Booze Page</Link>
        <button onClick={() => deleteBooze(id)}>Delete</button>
      </ul>
    </div>
  );
};

export default Booze;
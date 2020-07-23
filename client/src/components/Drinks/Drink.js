import React from "react";
import { Link } from "react-router-dom";
import Drinks from "./Drinks";

const Drink = (props) => {
  const isAdmin = () => {
    if (props.user.admin)
      return (
        <button onClick={() => props.deleteDrink(props.id)}> Delete</button>
      );
    return null;
  };
  return (
    <div>
      <ul>
        <li>
          {props.name}
          {props.history}
          {props.ingredients}
          {props.prep_serv}
        </li>
        {/* TO DO */}
        {/* <hr />
          Edit Logs: 
        <ul>
          {updated_at}
        </ul> */}
        <Link to={`/drinks/${props.id}`}>Cocktail Page</Link>
        {props.user ? isAdmin() : null}
      </ul>
    </div>
  );
};

export default Drink;

import React from "react";
import { Link } from "react-router-dom";
import Drinks from './Drinks';


const Drink = ({ name, history, ingredients, prep_serv, deleteDrink, id}) => {
  return (
    <div>
      <ul>
        <li>
          {name}
          {history}
          {ingredients}
          {prep_serv}
        </li>
        <Link to={`/drinks/${id}`}>Cocktail Page</Link>
        <button onClick={() => deleteDrink(id)}>Delete</button>
     
      </ul>
    </div>
  );
};

export default Drink;
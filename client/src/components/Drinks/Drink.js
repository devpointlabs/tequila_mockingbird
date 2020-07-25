import React from "react";
import { Link, } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'
import Drinks from "./Drinks";

const defaultDrink =
  "https://image.flaticon.com/icons/png/128/3184/3184574.png";

const Drink = (props) => {
  const isAdmin = () => {
    if (props.user.admin)
      return (
        <button onClick={() => props.deleteDrink(props.id)}> Delete</button>
      );
    return null;
  };
  return (
    


  <Card href ={`/drinks/${props.id}`} >
  
    <Image floated='right' size='medium'src={props.image || defaultDrink} wrapped ui={false} />
    <Card.Content>
      <Card.Header >{props.name}</Card.Header>
      <Card.Content> 
        {props.user ? isAdmin() : null}
      </Card.Content>
    </Card.Content>
  </Card>

    
    
  );
};

export default Drink;



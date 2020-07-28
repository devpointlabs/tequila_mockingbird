import React from "react";
import { Link, } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'
import Drinks from "./Drinks";

const defaultDrink =
  "https://image.flaticon.com/icons/png/128/3184/3184574.png";

const Drink = (props) => {

  return (



    <Card>
        <Image as='a' href={`/drinks/${props.id}`} size='large' src={props.image || defaultDrink} wrapped ui={false} />
        <Card.Content >
          <Card.Header as='a' href={`/drinks/${props.id}`}>
            {props.name}
            </Card.Header>
        {props.user && props.user.admin ?
          <Button onClick={() => props.deleteDrink(props.id)}> Delete</Button>
          : null}

      </Card.Content>

    </Card>



  );
};

export default Drink;



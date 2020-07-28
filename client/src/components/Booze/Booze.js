import React from "react";
// import "../../../App.css";
import { Link } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'

const defaultBooze = "https://image.flaticon.com/icons/svg/920/920605.svg";

const Booze = ({ name, production, history, id, deleteBooze, user, image }) => {

  const isAdmin = () => {
    if (user.admin) return <button onClick={() => deleteBooze(id)}>Delete</button>
    return null;
  }

  return (
    <>
      <Card>
        <Image as='a' href={`/boozes/${id}`} size='large' src={image || defaultBooze} wrapped ui={false} />
        <Card.Content >
          <Card.Header as='a' href={`/boozes/${id}`}>
            {name}
          </Card.Header>
          {user && user.admin ?
            <Button onClick={() => deleteBooze(id)}> Delete</Button>
            : null}
        </Card.Content>
      </Card>
    </>
 
  );
};

export default Booze;

import React from 'react';
import { Link, } from 'react-router-dom';
import { Header, Image, Button } from 'semantic-ui-react';
import image from "./Image/404_image.png";

const NoMatch = () => (
  <div>
    <Header as="h1" textAlign="center">  </Header>
    <Header as="h1" textAlign="center">Party Foul...</Header>
    <Image src={image} size='large' centered/>

    <div>
      <Button>
      <Link to="/"> Take me home</Link>
      </Button>
    </div>
    
  </div>
)

export default NoMatch;
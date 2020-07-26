import React from 'react';
import { Link, } from 'react-router-dom';
import { Header, Image, Button } from 'semantic-ui-react';

const NoMatch = () => (
  <div>
    <Header as="h1" textAlign="center">  </Header>
    <Header as="h1" textAlign="center">Party Foul...</Header>
    <Image src={"https://cdn11.bigcommerce.com/s-ek50668lzs/images/stencil/1280x1280/products/2623/2887/2579-lg__20068.1577641809.jpg?c=1?imbypass=on&imbypass=on"} size='large' centered/>
    <div>
      <Button>
      <Link to="/"> Take me home</Link>
      </Button>
    </div>
  </div>
)

export default NoMatch;
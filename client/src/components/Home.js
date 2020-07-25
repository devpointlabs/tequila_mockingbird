import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import SearchBar from "./Search/SearchBar";


const Home = () => (
  
  <div>
    <Header as="h1" textAlign="center">  </Header>
    <Header as="h1" textAlign="center">Tequila Mockingbird</Header>
    <Header as="h3" textAlign="center">The free drink encyclopedia</Header>
    <Header as="h1" textAlign="center">  </Header>
    <Image src={"https://www.indiewire.com/wp-content/uploads/2016/08/20140216-131646.jpg?resize=800,450"} centered/>
    <Header as="h1" textAlign="center">  </Header>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      <SearchBar/>
    </div>
  </div>

)

export default Home;
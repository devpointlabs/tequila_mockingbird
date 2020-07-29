import React from 'react';
import { Header, Image, Container } from 'semantic-ui-react';
import SearchBar from "./Search/SearchBar";


const Home = () => (
  
  <div>
      <Header as="h1" textAlign="center">Tequila Mockingbird</Header>
      <Header as="h3" textAlign="center">The Cocktail Encyclopedia</Header>
      <hr></hr>
      <br></br>
      <Image src={"https://www.indiewire.com/wp-content/uploads/2016/08/20140216-131646.jpg?resize=800,450"} centered size='huge'/>
      <br></br>
      <hr></hr>
    <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-end"
        }}
        >
      <SearchBar size='huge'/>
    </div>
  </div>
  

)

export default Home;
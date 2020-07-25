import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import SearchBar from "./Search/SearchBar";

class Navbar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <Menu.Menu position='right'>
          <Link to='/profile'>
            <Menu.Item
              name='profile'
              id='profile'
              active={location.pathname === '/profile'}
            />
          </Link>
          <Menu.Item
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='Create account'
              active={location.pathname === '/register'}
            />
          </Link>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }
  
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to='/'>
            <Menu.Item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
          </Link>
          <Link to='/drinks'>
            <Menu.Item
              name='drinks'
              id='drinks'
              active={this.props.location.pathname === '/drinks'}
            />
          </Link>
          <Link to='/boozes'>
            <Menu.Item
              name='booze'
              id='booze'
              active={this.props.location.pathname === '/boozes'}
            />
          </Link>
            { this.rightNavItems() }
          <Menu.Menu>
            <SearchBar to='/search'>
              Search
            </SearchBar>
          </Menu.Menu>
        </Menu>
        
      </div>
    )
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);
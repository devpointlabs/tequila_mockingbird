import React, { useState } from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Button, Form, Segment, Header, } from 'semantic-ui-react';
import { ReCaptcha } from 'react-recaptcha-google'

const SITE_KEY= process.env.REACT_APP_SITE_KEY
console.log(SITE_KEY)


class Register extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    recaptchaSuccessful: false,
    name: '',
  };



  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
    componentDidMount() {
      
      if (this.captchaDemo) {
        
          console.log("started, just a second...")
          this.captchaDemo.reset();
      }
    }
    onLoadRecaptcha() {
     
        if (this.captchaDemo) {
          
            this.captchaDemo.reset();
        }
    }
    verifyCallback(recaptchaToken) {
      debugger
      // Here you will get the final recaptchaToken!!!  
      console.log(recaptchaToken, "<= your recaptcha token")  
      if(recaptchaToken.length) this.setState({recaptchaSuccessful: true})
    }


   
   


  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, recaptchaSuccessful, name} = this.state;
    const { auth: { handleRegister, }, history, } = this.props;
    if (password === passwordConfirmation && recaptchaSuccessful === true)
      handleRegister({ email, password, passwordConfirmation, name,  }, history);

    else
      alert(recaptchaSuccessful + 'Password do not match')
  }
  
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }


  render() {

    const { email, password, passwordConfirmation, name } = this.state;
    

    return (
      <>
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
        <Form.Input     //Adding name to registration form
          label="Name"
          required
          name="name"
          value={name}
          placeholder="Name"
          onChange={this.handleChange}
        />
          <Form.Input
            label="Email"
            required
            autoFocus
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
        <ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            data-theme="dark"            
            render="explicit"
            sitekey = {SITE_KEY}
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />
        </>
    )

  }
}

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <>
        <AuthConsumer>
          {auth => <Register {...this.props} auth={auth} />}
        </AuthConsumer>
        
      </>
    )
  }
}

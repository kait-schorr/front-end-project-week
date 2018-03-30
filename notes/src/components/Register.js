import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { login, resetPassword } from "../utilities/auth";

function mapStateToProps(state) {
  return {};
}
function setErrorMsg(msg) {
  return {
    loginError: msg
  };
}

class Login extends Component {
  state = {
    redirect: true,
    loginError: null
  };
  handleOnSubmit(event) {
    event.preventDefault();
    login(this.email.value, this.password.value).catch(error => {
      this.setState(setErrorMsg("Invalid Login Stuff!"));
    });
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email, Please"
              ref={email => (this.email = email)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              placeholder="Enter Password"
              type="password"
              name="password"
              id="password"
              ref={password => (this.password = password)}
            />
          </FormGroup>
          <h3>{this.state.loginError}</h3>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
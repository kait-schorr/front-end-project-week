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
    loginError: null,
    email: "",
    password: ""
  };
  handleOnSubmit(event) {
    event.preventDefault();
    login(this.state.email, this.state.password).catch(error => {
      this.setState(setErrorMsg("Invalid Login Stuff!"));
    });
  }
  handleOnChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    let copy = this.state;
    copy[event.target.name] = event.target.value;
    this.setState(copy);
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form
          onSubmit={this.handleOnSubmit.bind(this)}
          onChange={this.handleOnChange.bind(this)}
        >
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email, Please"
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              placeholder="Enter Password"
              type="password"
              name="password"
              id="password"
              value={this.state.password}
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

//First-level routing component: login component

import React, { Component } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import "./login.css";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../redux/actions.js";

class Login extends Component {
  //initializing state：
  state = {
    show: false, //Whether to hide when logging password input
    username: "",
    password: "",
  };

  //event response function
  handleClick = () => this.setState({ show: !this.state.show });

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  login = () => {
    this.props.login(this.state);
  };

  //Jump to the Register component
  toRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
    const { msg, redirectTo } = this.props.user;

    //Automatic redirection if 'redirectTo' attribute has value
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div id="wrapper">
        <div id="header">
          <Box
            bg="#5d5b8d"
            color="white"
            fontSize="18px"
            fontWeight="bold"
            w="70vw"
            maxW="550px"
            p={3}
            borderRadius="lg"
            textAlign="center"
          >
            Chat App
          </Box>
        </div>
        <div id="login">
          <br />

          <VStack spacing="5px" color="black">
            {msg ? <div className="error-msg">{msg}</div> : null}

            <FormControl id="first-name" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter Username"
                onChange={this.handleUsernameChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={this.state.show ? "text" : "password"}
                  placeholder="Enter Your Password"
                  onChange={this.handlePasswordChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={this.handleClick}>
                    {this.state.show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <br />

            <Button
              colorScheme="facebook"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={this.login}
            >
              Log in
            </Button>

            <Button
              colorScheme="telegram"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={this.toRegister}
            >
              Create your account
            </Button>
          </VStack>
        </div>
      </div>
    );
  }
}

//Wrap a container outside the Login component for interacting with redux

const LoginContainer = connect((state) => ({ user: state.user }), {
  login,
})(Login);
export default LoginContainer;

//First-level routing components: register components

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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import "./register.css";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { register } from "../../redux/actions.js";

class Register extends Component {
  //状态：
  state = {
    show: false, //Record whether to hide the input
    username: "",
    password: "",
    password2: "",
    type: "student", //(student / teacher)
  };

  //event response function
  handleClick = () => this.setState({ show: !this.state.show });

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePassword2Change = (event) => {
    this.setState({ password2: event.target.value });
  };

  handleTypeChange = (value) => {
    this.setState({ type: value });
  };

  register = () => {
    this.props.register(this.state);
  };

  //Jump to Login component
  toLogin = () => {
    this.props.history.replace("/login");
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
        <div id="signup">
          <br />

          <VStack spacing="5px" color="black">
            {msg ? <div className="error-msg">{msg}</div> : null}

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter Username"
                onChange={this.handleUsernameChange}
              />
            </FormControl>

            <FormControl isRequired>
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

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={this.state.show ? "text" : "password"}
                  placeholder="Confirm Your Password"
                  onChange={this.handlePassword2Change}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={this.handleClick}>
                    {this.state.show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <br />

            <RadioGroup
              defaultValue="student"
              value={this.state.type}
              onChange={this.handleTypeChange}
            >
              <Stack spacing={40} direction="row">
                <Radio colorScheme="red" value="teacher">
                  TEACHER
                </Radio>
                <Radio colorScheme="green" value="student">
                  STUDENT
                </Radio>
              </Stack>
            </RadioGroup>

            <br />

            <Button
              colorScheme="facebook"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={this.register}
            >
              Sign Up
            </Button>

            <Button
              colorScheme="telegram"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={this.toLogin}
            >
              Already have an account
            </Button>
          </VStack>
        </div>
      </div>
    );
  }
}

const RegisterContainer = connect((state) => ({ user: state.user }), {
  register,
})(Register);
export default RegisterContainer;

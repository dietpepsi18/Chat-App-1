//This component is the "Teacher Information Update" page
//This component is a secondary component below the Main component

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PictureSelect from "../../components/picture-select/PictureSelect.jsx";

import {
  VStack,
  Input,
  InputGroup,
  Button,
  Box,
  InputLeftAddon,
} from "@chakra-ui/react";

import { updateUser } from "../../redux/actions.js";

class TeacherInfo extends Component {
  //initilize state
  state = {
    picture: "",
    school: "",
    major: "",
    info: "",
  };

  //event response function
  handleSchoolName = (event) => {
    this.setState({ school: event.target.value });
  };

  handleMajor = (event) => {
    this.setState({ major: event.target.value });
  };

  handleInfo = (event) => {
    this.setState({ info: event.target.value });
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  //update the picture: pass this method as a parameter to the PictureSelect component below
  setPicture = (picture) => {
    this.setState({ picture: picture });
  };

  render() {
    //Take out the user state from redux：
    const { picture, type } = this.props.user;
    //If the current account already has an avatar, it is considered that there is no need to update the information, and you can directly jump to the corresponding main interface after logging in
    if (picture) {
      const path = type === "student" ? "/student" : "/teacher";
      return <Redirect to={path} />;
    }

    return (
      <div id="wrapper">
        <div id="header">
          <Box
            bg="#5d5b8d"
            color="white"
            fontSize="18px"
            fontWeight="bold"
            w="80vw"
            maxW="650px"
            p={3}
            borderRadius="lg"
            textAlign="center"
          >
            Teacher Information Update
          </Box>
        </div>

        <div>
          <PictureSelect setPicture={this.setPicture} />

          <br />

          <VStack spacing="5px" color="black">
            <InputGroup size="sm">
              <InputLeftAddon
                children="School Name"
                backgroundColor="#5d5b8d"
                color="white"
              />
              <Input
                variant="filled"
                backgroundColor="lightgray"
                onChange={this.handleSchoolName}
              />
            </InputGroup>

            <br />

            <InputGroup size="sm">
              <InputLeftAddon
                children="Major"
                backgroundColor="#5d5b8d"
                color="white"
              />
              <Input
                variant="filled"
                backgroundColor="lightgray"
                onChange={this.handleMajor}
              />
            </InputGroup>

            <br />

            <InputGroup size="sm">
              <InputLeftAddon
                children="Information"
                backgroundColor="#5d5b8d"
                color="white"
              />
              <Input
                variant="filled"
                backgroundColor="lightgray"
                onChange={this.handleInfo}
              />
            </InputGroup>
            <br />
          </VStack>
        </div>

        <Button
          colorScheme="facebook"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={this.save}
        >
          Update
        </Button>
      </div>
    );
  }
}

//container component：
const TeacherInfoContainer = connect((state) => ({ user: state.user }), {
  updateUser,
})(TeacherInfo);

export default TeacherInfoContainer;

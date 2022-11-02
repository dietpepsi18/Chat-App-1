//Chat component interface, and its routing container component, which is a secondary component under the Main component
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import "./chat.css";
import { List, Image } from "antd-mobile";

import { sendMsg } from "../../redux/actions.js";

const Item = List.Item;

class Chat extends Component {
  //initializing state
  state = {
    content: "", //Use the content entered in the input box as the component state
  };

  // Lifecycle function: When the Chat component is loaded for the first time, the message displays the bottom information
  componentDidMount() {
    const page = document.querySelector("#chat-area");
    page.scrollIntoView(false);
  }

  //Lifecycle function: make the message display the bottom information every time the Chat component is updated
  componentDidUpdate() {
    const page = document.querySelector("#chat-area");
    page.scrollIntoView(false);
  }

  //event response function
  handleChange = (event) => {
    this.setState({ content: event.target.value });
  };

  handleSend = () => {
    //Collect data to be sent
    const from = this.props.user._id;
    const to = this.props.match.params.userid; //When the Main component maps the route, the id of the chat partner has been passed into the path parameter
    const content = this.state.content;

    //send request (send only if there is content)
    if (content) {
      this.props.sendMsg({ from: from, to: to, content: content });
    }

    //After the message is sent successfully, clear the data in the input box
    this.setState({ content: "" });
  };

  render() {
    //First get all the data need from the state
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    //Calculate the ‘chatId’ of the current chat（from_to or to_from）
    const myId = user._id;

    //If the data has not been obtained asynchronously from the server, it will not be displayed
    //Once the data request is successful, the component will be re-rendered, and this step will be skipped and the following operations will continue.
    if (!users[myId]) {
      return null;
    }

    const targetId = this.props.match.params.userid;
    const chatId = [myId, targetId].sort().join("_"); //get ‘chatId’

    //filter chatMsgs（Filter out my chat records with a specific user, that is, find the chat record with the corresponding chatId）
    const msgs = chatMsgs.filter((msg) => {
      return msg.chat_id === chatId;
    });
    //But now I have to distinguish the msgs of the chat records between me and a specific user: one is sent by me to the other party, and the other is sent to me by the other party

    //get other party's picture & username
    const targetPicture = users[targetId].picture;

    //Prevent the other party's information from being incomplete: display only when the other party's avatar information has value, otherwise display null
    const targetPicturePath = targetPicture
      ? require(`../../images/${targetPicture}.png`)
      : null;

    return (
      <div id="chat-page">
        <Box
          bg="#5d5b8d"
          color="white"
          fontSize="16px"
          fontWeight="bold"
          w="78vw"
          maxW="550px"
          p={2}
          borderRadius="lg"
          textAlign="center"
        >
          <IconButton
            aria-label="go back"
            icon={<ArrowLeftIcon />}
            backgroundColor="transparent"
            size="xs"
            color="gray.400"
            left="-40%"
            onClick={() => this.props.history.goBack()}
          />
          {users[targetId].username}
        </Box>
        <div id="chat-area-wrapper">
          <div id="chat-area">
            <List>
              {
                //msgs has to be further distinguished: one is sent by me to the other party, and the other is sent by the other party to me
                msgs.map((msg) => {
                  if (myId === msg.to) {
                    //If it is sent to me by the other party, add the following elements
                    return (
                      <Item
                        key={msg._id}
                        prefix={
                          <Image
                            src={targetPicturePath}
                            width={30}
                            height={30}
                          />
                        }
                      >
                        {msg.content}
                      </Item>
                    );
                  } else {
                    //If I sent it to the other party, add the following elements
                    return (
                      <Item key={msg._id} className="chat-me" extra="Me">
                        {msg.content}
                      </Item>
                    );
                  }
                })
              }
            </List>
          </div>
        </div>

        <div className="input-message-area">
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              placeholder="Enter your message here"
              onChange={this.handleChange}
              value={this.state.content}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="100%"
                size="md"
                colorScheme="facebook"
                rightIcon={<ArrowForwardIcon />}
                onClick={this.handleSend}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    );
  }
}

const ChatContainer = connect(
  (state) => ({ user: state.user, chat: state.chat }),
  { sendMsg }
)(Chat);

export default ChatContainer;

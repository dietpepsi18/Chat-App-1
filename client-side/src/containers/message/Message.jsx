/* This component is a secondary component below the Main component */

import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Image } from "antd-mobile";
import "./message.css";

const Item = List.Item;

class Message extends Component {
  /*The function of grouping chatMsgs is encapsulated into a function, and the last piece of information is taken from each group to form an array
    1）Find the lastMsg of each group and store it in an object, key is chat_id
    2）get an array of all lastMsg
    3）Sort the array in descending order by create_time
  */

  getLastMsgs = (chatMsgs, userid) => {
    //1) Prepare an object containing the lastMsg of each group
    const lastMsgObjs = {};

    chatMsgs.forEach((msg) => {
      const chatId = msg.chat_id;
      const lastMsg = lastMsgObjs[chatId];

      //If there is no lastMsg of the current group in the container of lastMsg, save it directly
      if (!lastMsg) {
        lastMsgObjs[chatId] = msg;
      } else {
        if (msg.create_time > lastMsg.create_time) {
          lastMsgObjs[chatId] = msg;
        }
      }
    });

    //2) get an array of all lastMsg
    const lastMsgs = Object.values(lastMsgObjs);

    //3) Sort the array in descending order by create_time
    lastMsgs.sort(function (m1, m2) {
      return m2.create_time - m1.create_time;
    });

    return lastMsgs;
  };

  //====================================================================
  render() {
    //Get the data needed first
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    //group chatMsgs according to chat_id

    const lastMsgs = this.getLastMsgs(chatMsgs, user._id);

    return (
      <div id="message-area-wrapper">
        <div id="message-body">
          <List>
            {lastMsgs.map((msg) => {
              //Get the other party's user information
              const targetId = msg.to === user._id ? msg.from : msg.to;

              return (
                <Item
                  key={msg.chat_id}
                  prefix={
                    <Image
                      src={
                        users[targetId].picture
                          ? require(`../../images/${users[targetId].picture}.png`)
                          : null
                      }
                      width={30}
                      height={30}
                    />
                  }
                  description={msg.content}
                  arrow
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`);
                  }}
                >
                  {users[targetId].username}
                </Item>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

const MessageContainer = connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message);

export default MessageContainer;

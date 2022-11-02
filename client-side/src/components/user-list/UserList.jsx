//his component is a general UI component, not a routing component, used to display a list of specified users

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; //to enable UI components will be able to use routing component methods
import { Card } from "antd-mobile";
import "./userList.css";

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
  };

  render() {
    const { userList } = this.props;

    return (
      <div id="userlist-wrapper">
        <div id="userlist-inner-wrapper">
          {
            //Add element to each user object in the array
            userList.map((user) => (
              <div
                background="gray"
                key={user._id}
                className="userlist-outerdiv"
              >
                {user.type}:
                <Card
                  onClick={() => this.props.history.push(`/chat/${user._id}`)}
                  //Once you click on a contact, jump to the chat routing path with id
                  title={user.username}
                  headerStyle={{
                    borderBottom: "solid #7876ad 1px",
                    width: "70vw",
                  }}
                >
                  <img
                    className="userlist-image"
                    src={require(`../../images/${user.picture}.png`)}
                    alt="userPicture"
                  />
                  <div className="userlist-school">School: {user.school}</div>
                  <div className="userlist-major">Major: {user.major}</div>
                  <div className="userlist-info">Major: {user.info}</div>
                </Card>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const UserListContainer = withRouter(UserList);
export default UserListContainer;

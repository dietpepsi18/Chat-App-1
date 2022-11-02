/* This component is a secondary component below the Main component
  This component is for showing the personal information */

import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Button, Modal } from "antd-mobile";

import "./profile.css";
import { resetUser } from "../../redux/actions";

class Profile extends Component {
  //event response function
  logout = () => {
    Modal.show({
      content: "Are you sure you want to Log Out? ",
      closeOnAction: true,
      actions: [
        {
          key: "logout",
          text: "Log Out",
          onClick: () => {
            Cookies.remove("userid");
            this.props.resetUser();
          },
        },
        {
          key: "cancel",
          text: "Cancel",
          primary: true,
        },
      ],
    });
  };

  render() {
    const { username, info, picture, school, major } = this.props.user;

    return (
      <div id="profile-wrap">
        <img
          id="profile-image"
          src={require(`../../images/${picture}.png`)}
          alt="userPicture"
        />
        <div id="profile-username">username: &nbsp; {username}</div>
        <div id="profile-major">major:&nbsp;&nbsp; {major}</div>

        <div id="profile-information">Account Information: </div>
        <div id="profile-school">school: {school}</div>
        <div id="profile-info">information: {info}</div>
        <Button color="danger" onClick={this.logout} block>
          Log Out
        </Button>
      </div>
    );
  }
}

const ProfileContainer = connect((state) => ({ user: state.user }), {
  resetUser,
})(Profile);

export default ProfileContainer;

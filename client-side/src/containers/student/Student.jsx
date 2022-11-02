/* Student component，
   This component will show after the login is successful and the information has been completed.
   This component is a secondary component below the Main component*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/actions.js";

import UserList from "../../components/user-list/UserList.jsx";

class Student extends Component {
  //As soon as the component is loaded, the request is sent
  componentDidMount() {
    this.props.getUserList("teacher");
  }

  render() {
    return <UserList userList={this.props.userList} />;
  }
}

const StudentContainer = connect((state) => ({ userList: state.userList }), {
  getUserList,
})(Student);

export default StudentContainer;

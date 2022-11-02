//First-level routing component: main interface component (component after login)
/* The Main component needs to implement the following functions：
    1、automatic login
        1）If there is a userid in the browser cookie, skip the login page and automatically log in to the main interface
        2）If there is no userid in the browser cookie, it will automatically enter the login interface
    
    2、If you have logged in, if the root path is requested at this time, a redirected routing path will be calculated according to the user's type and picture, and the redirect will be automatically jumped.
 */

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie"; //for manipulating frontend cookies object
import {
  AddressBookFill,
  MessageFill,
  InformationCircleFill,
} from "antd-mobile-icons";
import "./main.css";

import TeacherInfo from "../teacher-info/TeacherInfo.jsx";
import StudentInfo from "../student-info/StudentInfo.jsx";
import Teacher from "../teacher/Teacher.jsx";
import Student from "../student/Student.jsx";
import Message from "../message/Message.jsx";
import Profile from "../profile/Profile.jsx";
import Chat from "../chat/Chat.jsx";
import NotFound from "../../components/no-found/NotFound.jsx";
import NavFooter from "../../components/nav-footer/NavFooter.jsx";

import { getUser } from "../../redux/actions.js";

class Main extends Component {
  //Life cycle function, once the component is loaded, if there is userid in the cookie,
  //but the state user in redux does not have the _id attribute,
  //send a request to the server to get the user attribute
  componentDidMount() {
    const userid = Cookies.get("userid");
    const { user } = this.props;

    if (userid && !user._id) {
      this.props.getUser();
    }
  }

  /* ------------------Add properties to the component object(store the properties in an array in advance)----------------------- */
  navList = [
    {
      path: "/teacher",
      component: Teacher,
      title: "Students", //Used to display the top header
      icon: <AddressBookFill />, //Used to show bottom icons
      text: "Students", //Used to display icon text
    },
    {
      path: "/student",
      component: Student,
      title: "All Teachers",
      icon: <AddressBookFill />,
      text: "Teachers",
    },
    {
      path: "/message",
      component: Message,
      title: "Message",
      icon: <MessageFill />,
      text: "Message",
    },
    {
      path: "/profile",
      component: Profile,
      title: "Profile",
      icon: <InformationCircleFill />,
      text: "Profile",
    },
  ];

  /* --------------------------------------------------------------------------- */

  //This function is used to dynamically generate a jump path and return the corresponding routing path
  getRedirectTo = (type, picture) => {
    let path = "";
    if (type === "teacher") {
      path = "/teacher";
    } else {
      path = "/student";
    }

    if (!picture) {
      path += "info";
    }

    return path;
  };

  render() {
    //Before rendering the page, check if the user is logged in,
    //if not (ie, there is no userid in the cookie) automatically redirect to the login page)
    const userid = Cookies.get("userid");

    if (!userid) {
      return <Redirect to="/login" />;
    }

    //when there is userid in the cookie:
    //Read the 'user' state in redux（the user state in redux may be empty at this time）
    //the user state in redux has been passed in as a parameter through the container component
    else {
      const { user } = this.props;

      if (!user._id) {
        return null;
      } else {
        let path = this.props.location.pathname;
        if (path === "/") {
          path = this.getRedirectTo(user.type, user.picture);
          return <Redirect to={path} />;
        }
      }
    }

    /* -----Compare the requested path with the component property array navList to find the header title and bottom title of the corresponding component */
    let path = this.props.location.pathname;
    const currentNav = this.navList.find((nav) => {
      return nav.path === path;
    });

    if (currentNav) {
      //Determine which route needs to be hidden in the two routing components of Teacher and Student
      const { user } = this.props;
      if (user.type === "teacher") {
        this.navList[1].hide = true;
      } else {
        this.navList[0].hide = true;
      }
    }

    return (
      <div>
        {/* If the request is the path in the navList array, the following div information is displayed */}
        {currentNav ? <div id="topBar">{currentNav.title}</div> : null}

        <Switch>
          {/* The following are the components in the navList array: equivalent to traversing four routing components */}
          {this.navList.map((nav) => {
            return (
              <Route path={nav.path} component={nav.component} key={nav.path} />
            );
          })}
          <Route path="/teacherinfo" component={TeacherInfo} />
          <Route path="/studentinfo" component={StudentInfo} />
          <Route path="/chat/:userid" component={Chat} />
          <Route component={NotFound} />
        </Switch>

        {/* If the request is the path in the navList array, the following div information is displayed */}
        {currentNav ? <NavFooter navList={this.navList} /> : null}
      </div>
    );
  }
}

//container component:
const MainContainer = connect((state) => ({ user: state.user }), { getUser })(
  Main
);
export default MainContainer;

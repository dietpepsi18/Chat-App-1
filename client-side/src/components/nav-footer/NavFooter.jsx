import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./navFooter.css";

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
  };

  render() {
    let { navList } = this.props;

    //Remove the objects whose 'hide' property is true in the 'navList' array
    navList = navList.filter((nav) => {
      return !nav.hide;
    });

    const path = this.props.location.pathname; //Get the path of the request, but only the routing component has the location attribute
    //To use the API of routing components in non-routing components, need to use the withRouter function
    //At the same time, need to package a component container for non-routing components

    return (
      <TabBar
        activeKey={path}
        onChange={(value) => this.props.history.replace(value)}
      >
        {navList.map((nav) => {
          return (
            <TabBar.Item
              key={nav.path}
              title={nav.text}
              selected={path === nav.path}
              icon={nav.icon}
            />
          );
        })}
      </TabBar>
    );
  }
}

const NavFooterContainer = withRouter(NavFooter); //the routing component‘s properties will be passed to the non-routing component：history/location/match
export default NavFooterContainer;

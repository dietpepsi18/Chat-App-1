//This is a general UI component for selecting the user's picture
import React, { Component } from "react";
import "./pictureSelect.css";
import PropTypes from "prop-types"; //handling components' prop properties

export default class PictureSelect extends Component {
  static propTypes = {
    setPicture: PropTypes.func.isRequired,
  };

  //initializing state
  state = {
    pictureChosen: "", //selected picture
  };

  constructor(props) {
    super(props);
    //Prepare the image to be displayed and store it in 'pictureArray'
    this.pictureArray = [];
    for (let i = 0; i < 20; i++) {
      this.pictureArray.push({
        text: "picture" + (i + 1),
        icon: require("../../images/picture" + (i + 1) + ".png"),
      });
    }
  }

  //event response function
  handleClick = (event) => {
    //Update the current component state
    this.setState({ pictureChosen: event.target.src });

    //Call the function passed in by props, to update the state of the parent component
    this.props.setPicture(event.target.alt);
  };

  render() {
    return (
      <div>
        <div id="choose-header">
          {this.state.pictureChosen
            ? "picture selected: "
            : "Please select a picture"}
          {this.state.pictureChosen ? (
            <img src={this.state.pictureChosen} alt="chosen" />
          ) : (
            <div></div>
          )}
        </div>
        <div id="picturePool">
          {this.pictureArray.map((obj) => {
            return (
              <div key={obj.text}>
                <img src={obj.icon} alt={obj.text} onClick={this.handleClick} />
                <div>{obj.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

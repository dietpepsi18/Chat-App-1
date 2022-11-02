/*This interface is mainly used to prompt that the page cannot be found
  because it does not interact with redux, so don't need to put it in the containers folder */

import React, { Component } from "react";
import { Button } from "@chakra-ui/react";

export default class NotFound extends Component {
  //button click event
  toHome = () => {
    this.props.history.replace("/");
  };

  render() {
    return (
      <div>
        <div>
          <h2>Sorry, we couldn't find that page</h2>
          <Button
            colorScheme="telegram"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={this.toHome}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
}

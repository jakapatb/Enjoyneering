import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";

import Avatar from "@material-ui/core/Avatar";
// core components
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import {
  createClassroom,
  fetchPromotePass,
  promoteStatus
} from "actions/index.js";

export class SectionProfile extends Component {
  state = {
    types: ["administrator", "student", "visitor"],
    open: [true],
    modal: false,
    promote: { available: false },
    location: {}
  };



  render() {
    const { classes, auth } = this.props;
    return (
      <div>
        <GridContainer direction={"row"}>
          <Avatar
            src={this.props.auth.data.photoURL}
            alt="..."
            className={classes.avatar}
          />
          <h2>{auth.data.displayName}</h2>
        </GridContainer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  content: state.content
});

const mapDispatchToProps = {
  createClassroom,
  fetchPromotePass,
  promoteStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(profilePageStyle)(SectionProfile));

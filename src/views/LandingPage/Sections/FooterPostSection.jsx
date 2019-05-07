import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import {Link } from "react-router-dom"
import withStyles from "@material-ui/core/styles/withStyles";
import footerPostStyle from "assets/jss/material-kit-react/views/landingPageSections/footerPostStyle.jsx";
import { getUserFromUid } from "../../../actions/helpers";
import GridContainer from "components/Grid/GridContainer.jsx";
import Chip from "@material-ui/core/Chip";
class FooterPostSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: []
    };
  }
  componentDidMount() {
    this.mappingUid(this.props.ownerUid);
  }
  componentWillReceiveProps(nextProps) {
    this.mappingUid(nextProps.ownerUid);
  }
  mappingUid = ownerUid => {
    let promises = ownerUid.map(async uid => await getUserFromUid(uid));

    Promise.all(promises).then(owners => {
      this.setState({ owners: owners });
    });
  };

  render() {
    const { classes } = this.props;
    const { owners } = this.state;
    return (
      <GridContainer
        justify={"flex-start"}
        alignItems={"center"}
        direction={"row"}
      >
        {owners.map((user, key) => (
          <Link to={"/profile/?uid=" + user.uid}>
            <Chip
              avatar={<Avatar alt="Owner" src={user.photoURL} />}
              label={user.displayName}
              className={classes.chip}
              variant="outlined"
              color="primary"
              clickable
            />
          </Link>
        ))}
      </GridContainer>
    );
  }
}

export default withStyles(footerPostStyle)(FooterPostSection);

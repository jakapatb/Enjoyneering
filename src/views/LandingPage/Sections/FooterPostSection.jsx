import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import footerPostStyle from "assets/jss/material-kit-react/views/landingPageSections/footerPostStyle.jsx";
import { getUserFromUid } from "../../../actions/helpers";
import GridContainer from "components/Grid/GridContainer.jsx";
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
      console.log(owners);
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
          <Button href="/profile-page/" className={classes.button}>
            <Avatar
              alt="Owner"
              src={user.photoURL}
              className={classes.avatar}
            />
            {" " + user.displayName + " "}
          </Button>
        ))}
      </GridContainer>
    );
  }
}

export default withStyles(footerPostStyle)(FooterPostSection);

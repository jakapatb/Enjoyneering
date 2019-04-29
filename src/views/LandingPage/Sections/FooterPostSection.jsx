import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import footerPostStyle from "assets/jss/material-kit-react/views/landingPageSections/footerPostStyle.jsx";
import { getUserFromUid } from "../../../actions/helpers";

class FooterPostSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: []
    };
  }
  componentDidMount() {
    this.props.ownerUid.map(uid => {
      getUserFromUid(uid).then(owner => {
        let owners = this.state.owners;
        owners.push(owner);
        this.setState({ owners: owners });
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { owners } = this.state;
    return owners.map((user, key) => (
      <div key={key}>
        <Button href="/profile-page/" className={classes.button}>
          <Avatar alt="Owner" src={user.photoURL} className={classes.avatar} />
          {" " + user.displayName + " "}
        </Button>
      </div>
    ));
  }
}

export default withStyles(footerPostStyle)(FooterPostSection);

import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import footerPostStyle from "assets/jss/material-kit-react/views/landingPageSections/footerPostStyle.jsx";


class FooterPostSection extends Component {
  render(){
      const {owner ,classes} = this.props;
      
    return (
      <div>
         <Button
          href="/profile-page/"
          color="transparent"
          className={classes.button}
        >
          <Avatar
            alt="Owner"
            src={owner.photoURL}
            className={classes.avatar}
          />
          {" " + owner.displayName}
        </Button>
      </div>
    );
  }
}

export default withStyles(footerPostStyle)(FooterPostSection);

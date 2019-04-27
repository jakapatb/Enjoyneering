import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons

// core components

import Avatar from "@material-ui/core/Avatar";
//import * as moment from "moment";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import { getUserFromUid } from "actions/helpers.js";
const style = {
  cardTitle,
  textCenter: {
    textAlign: "justify"
  },
  textMuted: {
    color: "#6c757d"
  },
  avatar: {
    paddingLefe: "5px"
  },
  inline: {
    display: "inline"
  }
};

class SubCommentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: {
        displayName: ""
      }
    };
  }
  componentDidMount() {
    const { content } = this.props;
    getUserFromUid(content.ownerUid).then(owner =>
      this.setState({
        owner: owner
      })
    );
  }

  render() {
    const { content, classes } = this.props;
    const { owner } = this.state;
    return (
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <Avatar alt="member" src={owner.photoURL} />
        </ListItemIcon>
        <ListItemText
          inset
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                {owner.displayName}
              </Typography>
              {" — "}
              {content.content}
            </React.Fragment>
          }
          //owner.displayName} secondary={content.content}
        />
      </ListItem>
    );
  }
}

export default withStyles(style)(SubCommentsSection);

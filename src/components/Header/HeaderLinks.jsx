/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Avatar from "@material-ui/core/Avatar";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import imageAvatar from "assets/img/faces/avatar.jpg"



function HeaderLinks({ user,...props }) {
  const { classes } = props;
  return <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/?test" color="transparent"  className={classes.navLink}>
          Home
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown noLiPadding buttonText="Menus" buttonProps={{ className: classes.navLink, color: "transparent" }} buttonIcon={Apps} dropdownList={[<Link to="/login-page" className={classes.dropdownLink}>
              Sign in
            </Link>, <a href="https://creativetimofficial.github.io/material-kit-react/#/documentation" target="_blank" className={classes.dropdownLink}>
              Register
            </a>]} />
      </ListItem>
      {user.isAuth ? <ListItem className={classes.listItem}>
          <Tooltip id="instagram-tooltip" title="Your Profile" placement={window.innerWidth > 959 ? "top" : "left"} classes={{ tooltip: classes.tooltip }}>
            <Button href="/profile-page" color="transparent" className={classes.navLink}>
              {user.data.displayName} <Avatar alt="Remy Sharp" src={user.data.photoURL} className={classes.avatar} />
            </Button>
          </Tooltip>
        </ListItem> : <ListItem className={classes.listItem}>
          <Link to="/login-page" className={classes.navLink}>
            Sign in
          </Link>
        </ListItem>}
    </List>;
}

export default withStyles(headerLinksStyle)(HeaderLinks);

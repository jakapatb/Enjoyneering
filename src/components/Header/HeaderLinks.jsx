/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import NotiIcon from "@material-ui/icons/Notifications";
import profileImage from "assets/img/faces/avatar.jpg";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Avatar from "@material-ui/core/Avatar";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { signOut, goToSearch , goToPost } from "actions/index.js";

function HeaderLinks({ ...props }) {
  const { goToSearch, signOut, auth, classes, noti } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          onKeyPress={e => {
            if (e.key == "Enter" && e.target.value != null) {
              goToSearch(e.target.value.trim());
            }
          }}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/?test" color="transparent" className={classes.navLink}>
          Home
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        {auth.isAuth ? (
          <CustomDropdown
            noLiPadding
            buttonText="Menus"
            buttonProps={{ className: classes.navLink, color: "transparent" }}
            buttonIcon={Apps}
            dropdownList={
              auth.data.status == "administrator"
                ? [
                    <Link
                      className={classes.dropdownLink}
                      color="transparent"
                      to="/create-post"
                    >
                      Create Post
                    </Link>,
                    <Link
                      className={classes.dropdownLink}
                      color="transparent"
                      to="/management"
                    >
                      Management
                    </Link>,
                    <Button
                      className={classes.dropdownLink}
                      color="transparent"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  ]
                : [
                    <Link
                      className={classes.dropdownLink}
                      color="transparent"
                      to="/management"
                    >
                      Management
                    </Link>,
                    <Button
                      className={classes.dropdownLink}
                      color="transparent"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  ]
            }
          />
        ) : (
          <CustomDropdown
            noLiPadding
            buttonText="Menus"
            buttonProps={{ className: classes.navLink, color: "transparent" }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/login-page" className={classes.dropdownLink}>
                Sign in
              </Link>
            ]}
          />
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          left
          caret={false}
          hoverColor="black"
          dropdownHeader="Dropdown Header"
          buttonText={
            <div className={classes.rootBadge}>
              <Badge
                badgeContent={noti.length > 0 && noti.length}
                invisible={noti.length > 0}
                color={noti.length > 0 ? "secondary" :"default"}
                className={classes.margin}
              >
                <NotiIcon className={classes.icons} />
              </Badge>
            </div>
          }
          buttonProps={{
            className: classes.navLink + " " + classes.imageDropdownButton,
            color: "transparent"
          }}
          //? เปลี่ยนสีหลังจาก อ่านแล้ว
          dropdownList={noti.data.map((message, index) => {
            switch (message.type) {
              case "love":
                return (
                  <a href={"landing-page?post=" + message.postId} onClick={goToPost(message.postId, auth.data.uid, message.key)}className={classes.dropdownLink}>
                    {message.seen && "Seen "}{message.love} Love Your "{message.title}" post
                  </a>
                );
              case "comment":
                return (
                  <a href={"landing-page?post="+message.postId} onClick={goToPost(message.postId,auth.data.uid,message.key)} className={classes.dropdownLink}>
                   {message.seen&&"Seen "}Someone Comment in Your "{message.title}" post
                  </a>
                );
              default:
                return (<Link to="/" className={classes.dropdownLink}>
                  SomeThing Wrong!
                  </Link>);
            }
          })}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          left
          caret={false}
          hoverColor="black"
          dropdownHeader="Dropdown Header"
          buttonText={
            <img
              src={auth.isAuth ? auth.data.photoURL : profileImage}
              className={classes.img}
              alt="profile"
            />
          }
          buttonProps={{
            className: classes.navLink + " " + classes.imageDropdownButton,
            color: "transparent"
          }}
          dropdownList={["Me", "Settings and other stuff", "Sign out"]}
        />
      </ListItem>
    </List>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  noti: state.notifications
});

const mapDispatchToProps = {
  signOut,
  goToSearch
};

export default compose(
  withStyles(headerLinksStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderLinks);

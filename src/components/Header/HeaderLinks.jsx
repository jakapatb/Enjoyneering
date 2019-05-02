import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import NotiIcon from "@material-ui/icons/Notifications";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { signOut, markSeenNoti} from "actions/index.js"
import { goToSearch } from "actions/helpers.js";


function HeaderLinks({...props }) {
  const { markSeenNoti,signOut, auth,noti, classes,search } = props;
  var Menus = [
    <Link
      className={classes.dropdownLink}
      color="transparent"
      to="/management/profile"
    >
      Profile
    </Link>,
    <Link
      className={classes.dropdownLink}
      color="transparent"
      to="/management/classroom"
    >
      Classroom
    </Link>,
    auth.status !== "visitor" && (
      <Link
        className={classes.dropdownLink}
        color="transparent"
        to="/create-post"
      >
        Create Post
      </Link>
    ),

    <Button
      className={classes.dropdownLink}
      color="transparent"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  ];
  return (
    <List className={classes.list}>
      {search === undefined && (
        <ListItem className={classes.listItem}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            onKeyPress={e => {
              if (e.key === "Enter" && e.target.value != null) {
                goToSearch(e.target.value.trim());
              }
            }}
          />
        </ListItem>
      )}
      <ListItem className={classes.listItem}>
        <Link to="/" color="transparent" className={classes.navLink}>
          Home
        </Link>
      </ListItem>
      {auth.isAuth && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            left
            caret={false}
            hoverColor="black"
            dropdownHeader="Notifications "
            buttonText={
              <div className={classes.rootBadge}>
                <Badge
                  badgeContent={noti.length > 0 && noti.length}
                  invisible={noti.length > 0}
                  color={noti.length > 0 ? "secondary" : "default"}
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
                    <div className={classes.dropdownLink}>
                      <a
                        href={"landing-page/" + message.postId}
                        onClick={() =>
                          markSeenNoti(message.postId, message.notiId)
                        }
                        className={classes.textLink}
                        style={
                          message.seen ? { backgroundColor: "#ddd" } : {}
                        }
                      >
                        {message.seen && "Seen "}
                        {message.love} Love Your "{message.title}" post
                      </a>
                    </div>
                  );
                case "comment":
                  return (
                    <div className={classes.dropdownLink}>
                      <a
                        className={classes.textLink}
                        href={"landing-page/" + message.postId}
                        onClick={() =>
                          markSeenNoti(message.postId, message.notiId)
                        }
                      >
                        {message.seen && "Seen "} Someone Comment in Your "
                        {message.title}" post
                      </a>
                    </div>
                  );
                default:
                  return (
                    <Link to="/" className={classes.dropdownLink}>
                      SomeThing Wrong!
                    </Link>
                  );
              }
            })}
          />
        </ListItem>
      )}
      {auth.isAuth ? ( //true
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={
              <React.Fragment>
                {" "}
                {auth.data.displayName}
                <Avatar
                  alt="Remy Sharp"
                  src={auth.data.photoURL}
                  className={classes.avatar}
                />
              </React.Fragment>
            }
            buttonProps={{ className: classes.navLink, color: "transparent" }}
            dropdownList={Menus}
          />
        </ListItem>
      ) : (
        //false
        <ListItem className={classes.listItem}>
          <Link
            to="/login-page"
            color="transparent"
            className={classes.navLink}
          >
            Sign in
          </Link>
        </ListItem>
      )}
    </List>
  );
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  noti:state.notifications
})

const mapDispatchToProps = {
  signOut, markSeenNoti
}


export default compose(
  withStyles(headerLinksStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(HeaderLinks);

import React,{useState} from "react";
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
import { signOut, markSeenNoti } from "actions/index.js";
import { goToSearch } from "actions/helpers.js";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
function HeaderLinks({ ...props }) {
  const { signOut, auth, noti, classes, search } = props;

  const [state, setstate] = useState(null)
  let textInput = React.createRef();
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

  function handleClick(e) {
    if(state==null){
      try {
         textInput.current.focus();
      } catch (error) {
        console.log(error)
      }
    }else {
       goToSearch(state);
    }
  }


  return (
    <List className={classes.list}>
      {search === undefined && (
        <ListItem className={classes.listItem}>
          <InputBase
            placeholder="Search…"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            inputProps={{ ref: textInput }}
            onChange={e => setstate(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter" && e.target.value != null) {
                goToSearch(e.target.value.trim());
              }
            }}
          />
          <IconButton
            className={classes.iconButton}
            onClick={handleClick}
            color="inherit"
            aria-label="Search"
          >
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} />
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
                  invisible={noti.length <= 0}
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
                    <Link
                      to={
                        "/landing-page/" +
                        message.postId +
                        "?notiId=" +
                        message.notiId +
                        "&scroll=0"
                      }
                      className={classes.textLink}
                      style={
                        message.seen
                          ? { backgroundColor: "#ddd" }
                          : {}
                      }
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "}
                        {message.love} Love Your "{message.title}"
                        post
                      </div>
                    </Link>
                  );
                case "comment":
                  return (
                    <Link
                      className={classes.textLink}
                      to={
                        "/landing-page/" +
                        message.postId +
                        "?notiId=" +
                        message.notiId +
                        "&scroll=1"
                      }
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "} Someone Comment
                        in Your "{message.title}" post
                      </div>
                    </Link>
                  );
                case "delete":
                  return (
                    <Link
                      className={classes.textLink}
                      to={"/" /*! จะเช็คว่าอ่านแล้วยังไง? */}
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "} "{message.title}" has deleted
                      </div>
                    </Link>
                  );
                case "public":
                  return (
                    <Link
                      className={classes.textLink}
                      to={
                        "/landing-page/" +
                        message.postId +
                        "?notiId=" +
                        message.notiId
                      }
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "} "{message.title}" move to {message.public?("Public"):("Private")}
                      </div>
                    </Link>
                  );
                case "recommend":
                  return (
                    <Link
                      className={classes.textLink}
                      to={
                        "/landing-page/" +
                        message.postId +
                        "?notiId=" +
                        message.notiId
                      }
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "} "{message.title}" move to {message.recommend?("Recommended"):("Unrecommended")}
                      </div>
                    </Link>
                  );
                case "newOwner":
                  return (
                    <Link
                      className={classes.textLink}
                      to={
                        "/landing-page/" +
                        message.postId +
                        "?notiId=" +
                        message.notiId +
                        "&scroll=0"
                      }
                    >
                      <div className={classes.dropdownLink}>
                        {message.seen && "Seen "} someone has owner "{message.title}" post
                      </div>
                    </Link>
                  );
                //TODO Delete Notification  {go to dashboard}
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

const mapStateToProps = state => ({
  auth: state.auth,
  noti: state.notifications
});

const mapDispatchToProps = {
  signOut,
  markSeenNoti
};

export default compose(
  withStyles(headerLinksStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderLinks);

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// @material-ui/icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// core components

import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from "@material-ui/core/Avatar";
import * as moment from 'moment';
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import { getUserFromUid } from "actions/helpers.js";
import { fetchSubComments, editComment ,deleteComment} from "actions/index.js";
import Grow from "@material-ui/core/Grow";
import SubCommentsSection from "./SubCommentsSection";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
const style = theme => ({
  cardTitle,
  root: {
  },
  textCenter: {
    textAlign: "justify",
    margin: "0 0 0 0"
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
});

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.content.content,
      open: [false],
      subComments: [],
      anchorEl: false,
      edit: false,
      error: false,
      owner: {
        displayName: ""
      }
    };
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      comment: nextProps.content.content,
    });
  };

  handleClick = key => () => {
    const { fetchSubComments, id } = this.props;

    this.setState(state => (state.open[key] = !state.open[key]));
    if (!this.state.open[key])
      fetchSubComments(id).then(subCom => {
        this.setState(state => (state.subComments = subCom));
      });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: false });
  };

  componentDidMount() {
    const { content } = this.props;
    getUserFromUid(content.ownerUid).then(owner =>
      this.setState({
        owner: owner
      })
    );
  }
  handleDelete = () => {
    const { deleteComment, id } = this.props;
    deleteComment(id).then(() => {
      this.setState({ anchorEl: false });
    });
  };
  handleOpenEdit = () => {
    this.setState({ edit: true, anchorEl: false });
  };
  handelEdit = event => {
    this.setState({ comment: event.target.value });
  };
  handleEditSubmit = event => {
    const { editComment, id } = this.props;
    if (event.target.value.trim() !== "") {
      editComment(event.target.value.trim(), id);
      this.setState({ edit: false });
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    const { content, classes, auth } = this.props;
    const {
      owner,
      open,
      subComments,
      anchorEl,
      edit,
      comment,
  
    } = this.state;
    return (
        <ListItem divider className={classes.root}>
          <Card className={classes.textCenter}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Owner"
                  src={owner.photoURL}
                  className={classes.avatar}
                />
              }
              action={
                <IconButton>
                  <MoreVertIcon onClick={this.handleClick} />
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    {auth.isAuth && auth.data.uid === content.ownerUid && (
                      <React.Fragment>
                        <MenuItem onClick={this.handleOpenEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDelete}>
                          Delete comment
                        </MenuItem>
                      </React.Fragment>
                    )}
                  </Menu>
                </IconButton>
              }
              title={owner.displayName}
              subheader={moment(content.date.toDate()).fromNow()}
            />
            <CardBody>
              {// edit
              edit ? (
                <TextField
                  id="outlined-dense"
                  label="Editing..."
                  margin="dense"
                  variant="outlined"
                  autoFocus
                  InputProps={{
                    onChange: this.handelEdit,
                    onBlur: this.handleEditSubmit,
                    onKeyPress: e => e.key === "Enter" && this.handleEditSubmit,
                    value: comment,
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputRoot,
                      focused: classes.cssFocused
                    }
                  }}
                />
              ) : (
                <p>{comment}</p>
              )}
            </CardBody>

            {/**
          //!undone feature
          subComments.length !== 0 && (
            <List component="nav" className={classes.root} disablePadding>
              <div key={0}>
                <ListItem button onClick={this.handleClick(0)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={"sdasd"} />
                  {open[0] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[0]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subComments.map(() => (
                      <SubCommentsSection owner={owner} content={content} />
                    ))}
                  </List>
                </Collapse>
              </div>
            </List>
          )*/}
          </Card>
        </ListItem>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  fetchSubComments,
  editComment,
  deleteComment
};


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(CommentSection));

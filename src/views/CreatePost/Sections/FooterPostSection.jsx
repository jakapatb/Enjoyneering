import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import footerPostStyle from "assets/jss/material-kit-react/views/landingPageSections/footerPostStyle.jsx";
import { getUserFromUid } from "../../../actions/helpers";
import GridContainer from "components/Grid/GridContainer.jsx";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "components/Modal/Modal.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
class FooterPostSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      modal: false,
      types: ["Author", "other"],
      open: [true],
      isError: false
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

  handleModal = () => {
    this.setState(state => ({ modal: !state.modal }));
  };
  handleAddUid = e => {
    if (e.key === "Enter") {
      let uid = e.target.value;
      getUserFromUid(uid.trim())
        .then((newOwner) => {
          this.props
            .addUid(uid.trim())
            .then(() => {
              this.setState((state)=>{
                let owners = state.owners
                owners.push(newOwner);
                return {owners:owners ,isError:false}
              })
            })
            .catch(() => this.setState({ isError: true }));
        })
        .catch(() => this.setState({ isError: true }));
    }
  };
  //? แล้วต้องทำขออนุญาติไหม ?
  render() {
    const { classes } = this.props;
    const { owners, modal, open, isError } = this.state;
    return (
      <GridContainer
        justify={"flex-start"}
        alignItems={"center"}
        direction={"row"}
      >
        {owners.map((user, key) => (
          <Button className={classes.button}>
            <Avatar
              alt="Owner"
              src={user.photoURL}
              className={classes.avatar}
            />
            {" " + user.displayName + " "}
          </Button>
        ))}
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleModal}
        >
          <AddIcon />
        </Fab>
        <Modal
          isOpen={modal}
          handleModal={this.handleModal}
          title={"Insert UID"}
          content={
            <div>
              <List
                component="nav"
                subheader={
                  <ListSubheader
                    component="div"
                    className={classes.classList}
                  />
                }
                className={classes.root}
              >
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText inset primary={"Authors"} />
                  {open[0] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={open[0]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {owners.map((owner, index) => (
                      <ListItem
                        button
                        className={classes.nested}
                        key={index}
                      >
                        <ListItemIcon>
                          <Avatar alt="member" src={owner.photoURL} />
                        </ListItemIcon>
                        <ListItemText inset primary={owner.displayName} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </List>

              <GridContainer direction={"row"}>
                <TextField
                  required
                  fullWidth
                  error={isError}
                  type="search"
                  id="outlined-required"
                  label="insert UID"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onKeyPress={this.handleAddUid}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                />
              </GridContainer>
            </div>
          }
        />
      </GridContainer>
    );
  }
}

export default withStyles(footerPostStyle)(FooterPostSection);

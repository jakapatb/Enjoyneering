import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GridContainer from "components/Grid/GridContainer.jsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GridItem from "components/Grid/GridItem.jsx";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Modal from "components/Modal/Modal";
import { createClassroom ,fetchPromotePass} from "actions/index.js";
import {availablePromote } from "actions/helpers.js";
import { Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  classList: {
    flexGrow: 1,
    width: "100%"
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

export class SectionClass extends Component {
         state = {
           types: ["administrator", "student", "visitor"],
           open: [true],
           modal: false,
           promote: { available :false}
         };

         handleClick = key => () => {
           this.setState(state => (state.open[key] = !state.open[key]));
         };

         handleCreateClassrom = () => {
           this.setState({ modal: true });
         };
         handleGenPass = () => {
           availablePromote();
         };
         handleModal = () => {
           this.setState({ modal: !this.state.modal });
         };

         componentDidMount() {
           const { content } = this.props;
           this.props.fetchPromotePass();
           this.getLocation();
           if (content.hasContent) {
             this.setState({ members: content.data });
           }
         }

         getLocation() {
           if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(this.showPosition);
           } else {
             console.log("fail");
           }
         }

         showPosition(position) {
           console.log(
             "Latitude " + position.coords.latitude,
             "Longitude: " + position.coords.longitude
           );
         }

         render() {
           const { classes ,content } = this.props;
           const { open, types, modal } = this.state;
           return (
             <div>
               <Modal
                 isOpen={modal}
                 title={"Promote Members"}
                 content={
                   <GridContainer>
                     <GridItem xs={12} sm={12} md={12}>
                       {  content.hasModal?(content.modal.available? (
                         <h3>{content.modal.promoteStatus.password}</h3>
                       ):(<Button onClick={this.handleGenPass}>
                         generate Password
                       </Button>)):(<h2>Loading...</h2>)
                       }
                     </GridItem>
                   </GridContainer>
                 }
                 handleModal={this.handleModal}
                 submit={() => this.handleGenPass()}
               />

               <List
                 component="nav"
                 subheader={
                   <ListSubheader
                     component="div"
                     className={classes.classList}
                   >
                     <GridContainer>
                       <GridItem xs={10} sm={10} md={11}>
                         Your Classrooms{" "}
                       </GridItem>
                       <GridItem xs={1} sm={1} md={1}>
                         <CustomDropdown
                           noLiPadding
                           caret={false}
                           buttonProps={{
                             className: classes.navLink,
                             color: "transparent"
                           }}
                           buttonIcon={MoreVertIcon}
                           dropdownList={[
                             <Button onClick={this.handleCreateClassrom}>
                               Create Classroom
                             </Button>
                           ]}
                         />
                       </GridItem>
                     </GridContainer>
                   </ListSubheader>
                 }
                 className={classes.root}
               >
                 {types.map((type, key) => (
                   <div key={key}>
                     <ListItem button onClick={this.handleClick(key)}>
                       <ListItemIcon>
                         <InboxIcon />
                       </ListItemIcon>
                       <ListItemText inset primary={type} />
                       {open[key] ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>

                     <Collapse
                       in={open[key]}
                       timeout="auto"
                       unmountOnExit
                     >
                       <List component="div" disablePadding>
                         {content.hasContent&&content.data
                           .filter(member => member.status === type)
                           .map(member => {
                             return (
                               <ListItem
                                 button
                                 className={classes.nested}
                               >
                                 <ListItemIcon>
                                   <Avatar
                                     alt="member"
                                     src={member.photoURL}
                                   />
                                 </ListItemIcon>
                                 <ListItemText
                                   inset
                                   primary={member.displayName}
                                 />
                               </ListItem>
                             );
                           })}
                       </List>
                     </Collapse>
                   </div>
                 ))}
               </List>
             </div>
           );
         }
       }
const mapStateToProps = state => ({
  content: state.content
});

const mapDispatchToProps = {
  createClassroom ,fetchPromotePass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionClass));

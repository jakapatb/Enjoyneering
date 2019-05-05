import React, { Component } from "react";
import {Link } from "react-router-dom"
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
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import GridItem from "components/Grid/GridItem.jsx";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Modal from "components/Modal/Modal";
import {
  createClassroom,
  fetchPromotePass,
  promoteStatus
} from "actions/index.js";
import { changeAvailablePromote, generatePassword } from "actions/helpers.js";
import { Button } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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
           promote: { available: false },
           location: {}
         };

         handleClick = key => () => {
           this.setState(state => (state.open[key] = !state.open[key]));
         };

         handleCreateClassrom = () => {
           this.setState({ modal: true });
         };
         handleGenPass = () => {
           changeAvailablePromote(!this.props.content.modal.available);
         };
         handleModal = () => {
           this.setState({ modal: !this.state.modal });
         };
         handleRegentPass = () => {
           generatePassword()
         }

         handleUseCode = event => {
           if (event.key === "Enter") {
             if (
               event.target.value.trim() !== "" &&
               event.target.value.trim().match(/.{8}/i)
             ) {
                this.props.promoteStatus(event.target.value.trim()).then(()=>{
                  //TODO show Success Promote
                  //TODO show reload in 5 second
                }
                ).catch(err=>{
                               //TODO show failed Promote
                               console.log(err);
                             })
              } else {
                       //TODO code not complete
                       console.log("warning");
                     }
           }
         };

         componentDidMount() {
           const { content } = this.props;
           this.props.fetchPromotePass();
           if (content.hasContent) {
             this.setState({ members: content.data });
           }
         }

         render() {
           const {
             classes,
             content,
             hasContent,
             classroom,
             auth
           } = this.props;
           const { open, types, modal } = this.state;
           return (
             <div>
               <Modal
                 isOpen={modal}
                 title={"Promote Members"}
                 content={
                   <GridContainer>
                     <GridItem xs={12} sm={12} md={12}>
                       {content.hasModal ? (
                         auth.status === "administrator" ? (
                           content.modal.available ? (
                             <CustomTabs
                               headerColor="primary"
                               tabs={[
                                 {
                                   tabName: "Password",
                                   tabIcon: Face,
                                   tabContent: (
                                     <div>
                                       <h2
                                         className={
                                           classes.textCenter
                                         }
                                       >
                                         toStatus:{" "}
                                         {
                                           content.modal
                                             .toStatus
                                         }
                                       </h2>
                                       <h2>
                                         password :{" "}
                                         {
                                           content.modal.password
                                         }
                                       </h2>
                                       <Button
                                         onClick={
                                           this.handleRegentPass
                                         }
                                       >
                                         {" "}
                                         regenerate Password
                                       </Button>
                                       <Button
                                         onClick={this.handleGenPass}
                                       >
                                         Cancel
                                       </Button>
                                     </div>
                                   )
                                 },
                                 {
                                   tabName: "Location",
                                   tabIcon: Chat,
                                   tabContent: (
                                     <div>
                                       <p>Comming soon</p>
                                       {/**<p>Latitude : {content.modal.loaction}</p>
                            <p>Longitude : {content.modal.loaction}</p>  */}
                                     </div>
                                   )
                                 }
                               ]}
                             />
                           ) : (
                             <Button onClick={this.handleGenPass}>
                               generate Password
                             </Button>
                           )
                         ) : (
                           <div>
                             <CustomInput
                               labelText="input Your Code"
                               inputProps={{
                                 placeholder: "Your Code"
                               }}
                               formControlProps={{
                                 fullWidth: true,
                                 onKeyPress: this.handleUseCode
                               }}
                             />
                           </div>
                         )
                       ) : (
                         <h2>Loading...</h2>
                       )}
                     </GridItem>
                   </GridContainer>
                 }
                 handleModal={this.handleModal}
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
                             <Button
                               onClick={this.handleCreateClassrom}
                             >
                               Promote Member
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
                     <ListItem
                       button
                       onClick={this.handleClick(key)}
                     >
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
                         {hasContent &&classroom!==undefined&&
                           classroom
                             .filter(
                               member => member.status === type
                             )
                             .map(member => {
                               return (
                                 <Link to={"/profile/?uid="+member.uid}>
                                   <ListItem
                                     button
                                     className={
                                       classes.nested
                                     }
                                   >
                                     <ListItemIcon>
                                       <Avatar
                                         alt="member"
                                         src={
                                           member.photoURL
                                         }
                                       />
                                     </ListItemIcon>
                                     <ListItemText
                                       inset
                                       primary={
                                         member.displayName
                                       }
                                     />
                                   </ListItem>
                                 </Link>
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
  auth:state.auth,
  content: state.content
});

const mapDispatchToProps = {
  createClassroom,
  fetchPromotePass,
  promoteStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionClass));

import React, { Component } from 'react'
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
import Modal from 'components/Modal/Modal'
import { getUserFromUid } from 'actions/helpers.js'
import { createClassroom } from "actions/index.js";
import { Button } from '@material-ui/core';
import CustomInput from "components/CustomInput/CustomInput.jsx";


const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  classList: {
    flexGrow: 1, width: "100%",
  },
  navLink:{
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
           classrooms:[],
           open: [],
           members:[],
           modal:false,
           inputName:"Test"
         };

         handleClick = (key) => ()=> {
           this.setState((state) => state.open[key] = !state.open[key]);
         };

         handleCreateClassrom = () => {
           this.setState({modal:true})
         }
         handleModal =() =>{
          this.setState({modal:!this.state.modal})  
         }

         componentDidMount(){
           if (this.props.classrooms.hasContent){
             this.props.classrooms.data.forEach((classroom, key) => {
               var members =[]
               if (Array.isArray(classroom.membersUid)) {
                 classroom.membersUid.forEach(async (uid) => {
                   members.push(await getUserFromUid(uid));
                 })
               }
               this.setState((state) => ({ 
                open: [...state.open, false],
                classrooms:[...state.classrooms,classroom],
                members:[...state.members,members]
               }))
             })
           }
         }
         
         render() {
           const { classes, createClassroom } = this.props;
           const { open, classrooms, members ,modal ,inputName} = this.state;
           return (
             <div>
               <Modal
                 isOpen={modal}
                 title={"Create Classroom"}
                 content={
                   <GridContainer>
                     <GridItem xs={12} sm={12} md={12}>
                       <CustomInput
                         labelText="Classroom name"
                         id="float"
                         inputProps={{ value:inputName}}
                         formControlProps={{
                           fullWidth: true
                         }}
                       />
                     </GridItem>
                   </GridContainer>
                 }
                 handleModal={this.handleModal}
                 submit={() => createClassroom("tstasa", "1234")}
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
                 {classrooms.map((classroom, key) => (
                   <div key={key}>
                     <ListItem
                       button
                       onClick={this.handleClick(key)}
                     >
                       <ListItemIcon>
                         <InboxIcon />
                       </ListItemIcon>
                       <ListItemText
                         inset
                         primary={classroom.name}
                       />
                       {open[key] ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>

                     <Collapse
                       in={open[key]}
                       timeout="auto"
                       unmountOnExit
                     >
                       <List component="div" disablePadding>
                         {members[key].map(member => {
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
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  createClassroom
};


       
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SectionClass));

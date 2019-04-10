import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { getUserFromUid } from 'actions/helpers.js'
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

export class SectionClass extends Component {
         state = {
           classrooms:[],
           open: [],
           members:[]
         };

         handleClick = (key) => ()=> {
           this.setState((state) => state.open[key] = !state.open[key]);
         };

         componentDidMount(){
           if (this.props.classrooms.hasContent){
             this.props.classrooms.data.forEach((classroom, key) => {
               var members =[]
                classroom.membersUid.forEach(async (uid) => {
                  members.push(await getUserFromUid(uid));
                 }
               );
               this.setState((state) => ({ 
                open: [...state.open, false],
                classrooms:[...state.classrooms,classroom],
                members:[...state.members,members]
               }))
             })
           }
         }
         render() {
           const { classes, } = this.props;
           const { open, classrooms, members} = this.state;
           return (
             <div>
               <List
                 component="nav"
                 subheader={
                   <ListSubheader component="div">
                     Your Classrooms
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
                                 <Avatar alt="member" src={member.photoURL}/>
                               </ListItemIcon>
                               <ListItemText
                                 inset
                                 primary={member.displayName}
                               />
                             </ListItem>
                           )
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

export default withStyles(styles)(SectionClass);

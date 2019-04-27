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
import { fetchSubComments } from "actions/index.js";
import SubCommentsSection from "./SubCommentsSection";
import { connect } from "react-redux";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "justify"
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
};

class ArticleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [false],
      subComments:[],
      owner: {
        displayName: ""
      }
    };
  }

  handleClick = key => () => {
        const { fetchSubComments, id } = this.props;
    this.setState(state => (state.open[key] = !state.open[key]));
    if(!this.state.open[key]) fetchSubComments(id).then((subCom)=>{
      this.setState(state => (state.subComments=subCom))
    })
  };

  componentDidMount() {
    const { content } = this.props;
    getUserFromUid(content.ownerUid).then(owner =>
      this.setState({
        owner: owner
      })
    );
    
  }
  render() {
    const { content, classes} = this.props;
    const { owner, open ,subComments} = this.state;
    return (
      <GridItem xs={12} sm={12} md={8}>
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
                <MoreVertIcon />
              </IconButton>
            }
            title={owner.displayName}
            subheader={moment(content.date.toDate()).fromNow()}
          />
          <CardBody>
            <p>{content.content}</p>
          </CardBody>
          {subComments.length!== 0 && (
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
          )}
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  fetchSubComments
};


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(ArticleSection));

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Avatar from "@material-ui/core/Avatar";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import * as moment from 'moment';
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import { getUserFromUid } from "actions/index.js";
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
  }
};

class ArticleSection extends React.Component {
  constructor(props){
    super(props);
    this.state={
      owner:{
        displayName:"wait"
      }
    }
  }
  componentDidMount(){
    const { content} =this.props;
    getUserFromUid(content.ownerUid).then(owner =>
      this.setState({
        owner: owner
      })
    );
  }
  render() {
    const { content, classes } = this.props;
    const {owner} = this.state;
    return <GridItem xs={12} sm={12} md={8}>
        <Card className={classes.textCenter}>
          <CardHeader color="danger">
              {/* <Avatar alt="Owner" src={owner.photoURL} className={classes.avatar} />  */}{owner.displayName}
          </CardHeader>
          <CardBody>
            <p>{content.content}</p>
          </CardBody>
          <CardFooter className={classes.textMuted}>
            {moment(content.date).fromNow()}
          </CardFooter>
        </Card>
      </GridItem>;
  }
}

export default withStyles(style)(ArticleSection);

import React from "react";
import { Link } from "react-router-dom";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import CardMedia from "@material-ui/core/CardMedia";
import image from "assets/img/bg.jpg";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import { getImgfromStorage } from "actions/index.js";
import * as moment from "moment";
import CardBody from "components/Card/CardBody.jsx";

const style = {
  cardTitle,
  imgCard: {
    objectFit: "cover ",
    width: "100%",
    height:300
    /* maxHeight: "100%", */
  },
  card: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: '1 0 auto',
  },
};

class SectionPost extends React.Component {
constructor(props){
  super(props)
  this.state={
    imgUrl :image
  }
}
  componentDidMount() {
    getImgfromStorage(this.props.hit.objectID, "title.jpg").then(imgUrl =>
      this.setState({ imgUrl: imgUrl })
    );
  }

  render() {
    const { classes,hit } = this.props;
    return <GridItem xs={8} sm={8} md={12}>
        <Link to={{ pathname: "/landing-page/", search: "post=" + hit.objectID, state: { id: hit.objectID } }}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardBody className={classes.content}>
                <div className={classes.imgCardOverlay}>
                  <h3 className={classes.cardTitle}>{hit.title}</h3>
                  {/*  <h4>{hit.subtitle}</h4> */}
                  <h4>{moment(hit.date).format("lll")}</h4>
                </div>
              </CardBody>
            <img className={classes.imgCard} src={this.state.imgUrl} alt="post" />
            </div>
        

          </Card>
        </Link>
      </GridItem>;
  }
};

export default withStyles(style)(SectionPost);
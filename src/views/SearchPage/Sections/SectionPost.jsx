import React from "react";
import { Link } from "react-router-dom";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import image from "assets/img/bg.jpg";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import { getImgfromStorage } from "actions/index.js";
import * as moment from "moment";
const style = {
  ...imagesStyles,
  cardTitle,
  imgCard: {
    objectFit: "cover ",
    width: "100%",
  },
  card: {
    position: "realative",
    height: "300px"
  }
};

class SectionPost extends React.Component {
constructor(props){
  super(props)
  this.state={
    imgUrl :image
  }
}
  componentDidMount() {
    getImgfromStorage(this.props.data.id, 'title.jpg').then(imgUrl => this.setState({ imgUrl: imgUrl }))
  }

  render() {
    const { classes,data } = this.props;
    return <Link to={{ pathname: "/landing-page/", search: "post=" + data.id, state: { id: data.id } }}>
        <Card xs={12} sm={12} md={8}>
          <img className={classes.imgCard} src={this.state.imgUrl} alt="Card-img" />
          <div className={classes.imgCardOverlay}>
            <h2 className={classes.cardTitle}>{data.title}</h2>
            <h4>{data.subtitle}</h4>
          <h4>{moment(data.date).format('lll')}</h4>
          </div>
        </Card>
      </Link>;
  }
};

export default withStyles(style)(SectionPost);
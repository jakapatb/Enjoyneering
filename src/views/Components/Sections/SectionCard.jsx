import React from "react";
import { Link } from "react-router-dom";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";
import thumbnail from "assets/img/thumbnail.jpg";
const style = {
  card:{
    width:250
  },
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
};

class SectionCard extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <Link to="/landing-page">
        <Card className={classes.card}>
          <img className={classes.imgCardTop} src={thumbnail} alt="Card-img-cap" />
          <CardBody>
            <h4 className={classes.cardTitle}>Card title</h4>
            <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p><small className={classes.textMuted}>Last updated 3 mins ago</small></p>
          </CardBody>
        </Card>
      </Link>
    );
  }
};

export default withStyles(style)(SectionCard);
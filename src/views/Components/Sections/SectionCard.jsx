import React from "react";
import { Link } from "react-router-dom";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import thumbnail from "assets/img/thumbnail.jpg";
import { getImgfromStorage } from "actions/index.js";
import * as moment from 'moment';
const style = {
  card:{
    width:250,
    height:400,
  },
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
  imgCardTop:{
    objectFit: 'cover',
    width: 250,
    maxHeight:'100%'
  },
  cardHeader:{
    
    width: 250,
    height:175,
    padding:0,
    margin:0
  }
};

class SectionCard extends React.Component {
  constructor(props){
  super(props);
  this.state={
    imgUrl:thumbnail
  }
  }
  componentDidMount(){
    getImgfromStorage(this.props.data.id,'title.jpg').then(imgUrl=>this.setState({imgUrl:imgUrl}))
  }
  render() {
    const { classes,data } = this.props;
    return <Link to={{ pathname: "/landing-page/", search: "post=" + data.id, state: { id: data.id } }}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}>
            <img className={classes.imgCardTop} src={this.state.imgUrl} alt="Card-img-cap" />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>{data.title}</h4>
            <p>{data.subtitle}</p>
            <p>
              <small className={classes.textMuted}>
                {moment(data.date).fromNow()}
              </small>
            </p>
          </CardBody>
        </Card>
      </Link>;
  }
};


export default withStyles(style)(SectionCard);
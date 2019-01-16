import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import exampleStyle from "assets/jss/material-kit-react/views/componentsSections/exampleStyle.jsx";
import { cardTitle } from "assets/jss/material-kit-react.jsx";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";

import {connect} from 'react-redux'
import {compose} from 'redux'
import { fetchListPost } from 'actions/index.js'
import SectionCard from "./SectionCard.jsx";
const style = {
  gridList: {
    justify:"center",
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    background: "##3f3631",
    border: {
      radius: 10
    }
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140,
    width: "auto"
  },
  ...exampleStyle,
  ...imagesStyles,
  cardTitle
};
class SectionRecent extends React.Component {
  
  componentDidMount(){
      const condition = ['date','<=',new Date]  
    this.props.fetchListPost(condition, 5);
  }
  render() {

    const { list, classes } = this.props;
    return <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h2>Recent Posts</h2>
          </div>
          <GridContainer justify="center">
            <GridList className={classes.gridList} cols={2.5}>
            {
              list.hasRecent && list.recent.map((post,index)=>
               <SectionCard data={post} key={index}/>
              )
            }
            </GridList>
          </GridContainer>
          <Link to="/">
            <Button type="button" color="primary">
              View More »
            </Button>
          </Link>
        </div>
      </div>;
  }
}
const mapStateToProps = (state) => ({
  auth : state.auth,
  list :state.listPost
})

const mapDispatchToProps = {
  fetchListPost
};

export default compose(withStyles(style),connect(mapStateToProps,mapDispatchToProps))(SectionRecent);

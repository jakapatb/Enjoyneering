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
  render() {
    const { classes } = this.props;
    return <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h2>Recent Posts</h2>
          </div>
          <GridContainer justify="center">
            <GridList className={classes.gridList} cols={2.5}>
            <SectionCard id={"test1"} />
            <SectionCard id={"test2"} />
            <SectionCard id={"test3"}/>
            <SectionCard id={"test4"}/>
            <SectionCard id={"test5"}/>
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

export default withStyles(style)(SectionRecent);

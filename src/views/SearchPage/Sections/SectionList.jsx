import React from "react";
// react components for routing our app without refresh
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import listStyle from "assets/jss/material-kit-react/views/landingPageSections/listStyle.jsx";
import GridListTile from "@material-ui/core/GridListTile";
import { compose } from "redux";
import SectionPost from "./SectionPost";

class SectionList extends React.Component {

  render() {
    const { classes, hits, recommend, isPublic } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justify="space-between"
            alignItems="center"
          />

          <GridContainer justify="center">
            <GridList
              className={classes.gridList}
              cellHeight={"auto"}
              cols={isWidthUp("sm", this.props.width) ? 2 : 1}
            >
              {hits.map((post, index) => (
                <GridListTile
                  key={index}
                  cols={index % 5 === 0 ? 2 : 1}
                  rows={index % 5 === 0 ? 2 : 1}
                >
                  <SectionPost
                    hit={post}
                    key={index}
                    id={index}
                    isPublic={isPublic}
                    recommend={recommend}
                  />
                </GridListTile>
              ))}
            </GridList>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(listStyle)
)(SectionList);

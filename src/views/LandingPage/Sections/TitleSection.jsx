import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import articleStyle from "assets/jss/material-kit-react/views/landingPageSections/articleStyle.jsx";

class TitleSection extends React.Component {
  render() {
    const { content, classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{content.title}</h2>
          </GridItem>
        </GridContainer>
        <div />
      </div>
    );
  }
}

export default withStyles(articleStyle)(TitleSection);

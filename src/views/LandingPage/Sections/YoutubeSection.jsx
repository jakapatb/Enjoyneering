import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

import YouTube from "react-youtube";

class YoutubeSection extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    /* event.target.pauseVideo(); */
  }
  render() {
    const { content, classes } = this.props;
      const opts = {
          width:"100%",
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: content.autoplay
          }
      };
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
                    <YouTube
                        videoId={content.videoId}
                        opts={opts}
                        onReady={this._onReady}
                    />
          </GridItem>
        </GridContainer>
        <div>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(YoutubeSection);

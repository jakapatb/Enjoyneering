import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import YouTube from "react-youtube";

class YoutubeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      videoId: ""
    };
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  _handleVideoId = event => {
    if ((event.key = "Enter")) {
      this.setState({ videoId: event.target.value, ready: true });
    }
  };
  _handleEdit = event => {
    this.setState({ ready: false });
  };
  removeContent = () => {
    this.props.remove(this.props.index);
  }
  render() {
    const { content, classes } = this.props;
    const opts = {
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    if (!this.state.ready) {
      return (
        <div className={classes.section}>
          <Button  round color="warning" onClick={this.removeContent}>
            Remove
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <CustomInput
                labelText="Youtube:Fill video Id"
                id="float"
                formControlProps={{
                  fullWidth: true,
                  onKeyPress: this._handleVideoId,
                  value: this.state.videoId
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      return (
        <div className={classes.section}>
          <h3>Youtube</h3>
          <Tooltip
            id="tooltip-right"
            title="Change Youtube Video"
            placement="right"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button justIcon round color="warning">
              <Edit style={{ color: "#FFFFFF" }} onClick={this._handleEdit} />
            </Button>
          </Tooltip>
          <Button  round color="warning" onClick={this.removeContent}>
            Remove
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <YouTube
                videoId={this.state.videoId}
                opts={opts}
                onReady={this._onReady}
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

export default withStyles(productStyle)(YoutubeSection);

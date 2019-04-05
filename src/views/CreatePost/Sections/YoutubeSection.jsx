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
      videoId: "",
      autoplay:0
    };
  }
  componentDidMount = () => {
    this.setState({
      ready: this.props.content.ready,
      videoId: this.props.content.videoId,
      autoplay: this.props.content.autoplay
    })
  }
  
  _onReady(event) {
    // access to player in all event handlers via event.target
    /* event.target.pauseVideo(); */
  }

  youtubeIdFinder = (url) => {
    var id
    if (url.includes("youtu.be")) {
      id = url.split("youtu.be/").find((arr) => {
        return !arr.includes("http")
      })
    }else if(url.includes("v=")){
      id = url.split("v=")[1];
    }
    else{
      return url;
    }
    return id.match(".{11}")[0]
    
  }

  _handleSubmit= event => {
    const { index , submit} = this.props;
    const { autoplay} = this.state;
    if ((event.key === "Enter")) {
      if (
        event.target.value.trim() !== "" &&
        event.target.value.trim().match(/.{11}/i)
      ) {
        var vId = this.youtubeIdFinder(event.target.value);
        submit({
          type: "Youtube",
          videoId: vId,
          index: index,
          autoplay: autoplay
        });
        this.setState({ videoId: vId, ready: true });
      } else {
        console.log("warning");
      }
    }
  };
  _handleChange=(event) => {
    this.setState({ videoId: event.target.value });
  }
  _handleEdit = event => {
    this.setState({ ready: false ,videoId:""});
  };
  removeContent = () => {
    this.props.remove(this.props.index);
  }

  render() {
    const { classes } = this.props;
    const opts = {
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
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
                  onChange: this._handleChange,
                  onKeyPress: this._handleSubmit,
                }}
                inputProps={{
                  value: this.state.videoId
                }}
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      return <div className={classes.section}>
          <h3>Youtube</h3>
          <Tooltip id="tooltip-right" title="Change Youtube Video" placement="right" classes={{ tooltip: classes.tooltip }}>
            <Button justIcon round color="warning" onClick={this._handleEdit}>
              <Edit style={{ color: "#FFFFFF" }} />
            </Button>
          </Tooltip>
          <Button round color="warning" onClick={this.removeContent}>
            Remove
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <YouTube videoId={this.state.videoId} opts={opts} onReady={this._onReady} />
            </GridItem>
          </GridContainer>
        </div>;
    }
  }
}

export default withStyles(productStyle)(YoutubeSection);

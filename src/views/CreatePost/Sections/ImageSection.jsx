import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import imageStyle from "assets/jss/material-kit-react/views/landingPageSections/imageStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropzone from "react-dropzone";
class ImageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.content.imgUrl,
      file: "",
      ready: props.content.ready
    };
  }
  componentDidMount() {
  }
  handleChange = files => {
    const { index, submit } = this.props;
    var fileTypes = ["jpg", "jpeg", "png"];
    let reader = new FileReader();
    let file = files[0];
    var fileType = file.name
      .split(".")
      .pop()
      .toLowerCase();
    if (fileTypes.includes(fileType)) {
      // input is image file
      reader.onloadend = () => {
        submit({
          type: "Image",
          file: file,
          id: this.props.content.id,
          imgUrl: reader.result,
          index: index,
          fileType: fileType
        });
        this.setState({ file: file, imgUrl: reader.result, ready: true });
      };
      reader.readAsDataURL(file);
    } else {
      //input wrong
    }
  };
//! Bug Remove not Correct
  removeContent = () => {
    this.props.remove(this.props.index);
  };

  render() {
    const { classes } = this.props;
    const { imgUrl } = this.state;
    return (
      <div className={classes.section}>
        <Button round color="warning" onClick={this.removeContent}>
          Remove
        </Button>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Dropzone
              onDrop={acceptedFiles => this.handleChange(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className={classes.dropZone}

                  >
                    <div className={classes.OverImage}>
                      <h2 className={classes.textInImage}>
                        Drop Image Here or Click me
                      </h2>
                    </div>
                    <img
                      src={imgUrl}
                      className={classes.image}
                      alt="preview"
                    />
                    <input {...getInputProps()} />
                  </div>
                </section>
              )}
            </Dropzone>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(imageStyle)(ImageSection);

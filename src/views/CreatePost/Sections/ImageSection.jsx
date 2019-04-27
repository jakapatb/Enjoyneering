import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import imageStyle from "assets/jss/material-kit-react/views/landingPageSections/imageStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { getImgfromStorage } from "actions/helpers.js"
class ImageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.content.imgUrl,
      file: "",
      ready:props.content.ready
    };
  }
   componentDidMount(){
          getImgfromStorage(this.props.id, this.props.content.fileName).then((imgUrl) => this.setState({ imgUrl: imgUrl,ready:false })).catch((e)=>console.log(e));
    } 
  handleChange = event => {
    event.preventDefault();
    const { index , submit} = this.props;
    var fileTypes = ['jpg', 'jpeg', 'png'];
    let reader = new FileReader();
    let file = event.target.files[0];
    var fileType = file.name.split('.').pop().toLowerCase();
    if (fileTypes.includes(fileType)){ // input is image file
      reader.onloadend = () => {
        submit({ type: "Image", file: file, imgUrl: reader.result, index: index, fileType: fileType })
        this.setState({ file: file, imgUrl: reader.result ,ready:true});
      };
      reader.readAsDataURL(file);
    }else{ //input wrong

    }
    
  };

  removeContent = () => {
    this.props.remove(this.props.index);
  };

  render() {
    const { classes } = this.props;
    const { imgUrl,ready } = this.state;
    return (
      <div className={classes.section}>
        <Button round color="warning" onClick={this.removeContent}>
          Remove
        </Button>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
              <img src={imgUrl} className={classes.image} alt="preview" />
              <CustomInput
                labelText="imgUrl"
                id="imgUrl"
                inputProps={{
                  type: "file"
                }}
                formControlProps={{
                  fullWidth: true,
                  onChange: this.handleChange
                }}
              />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(imageStyle)(ImageSection);

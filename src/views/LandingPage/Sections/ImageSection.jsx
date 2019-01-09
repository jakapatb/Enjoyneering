import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import { getImgfromStorage } from "actions/index.js";
import imageStyle from "assets/jss/material-kit-react/views/landingPageSections/imageStyle.jsx";


class ImageSection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            imgUrl:""
        }
    }
    componentDidMount(){
        const fileName = "pic"+this.props.content.index+'.jpg';
        console.log(fileName)
        getImgfromStorage(this.props.id,fileName).then((imgUrl)=>this.setState({imgUrl:imgUrl}));
    }
    render() {
        const {classes } = this.props;
        return <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <img src={this.state.imgUrl} className={classes.image} />
              </GridItem>
            </GridContainer>
          </div>;
    }
}

export default withStyles(imageStyle)(ImageSection);

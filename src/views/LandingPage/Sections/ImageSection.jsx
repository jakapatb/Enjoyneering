import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { getImgfromStorage } from "actions/helpers.js";
import imageStyle from "assets/jss/material-kit-react/views/landingPageSections/imageStyle.jsx";


class ImageSection extends React.Component {
    constructor(props){
        super(props);
        this.state={
            imgUrl:""
        }
    }
    componentDidMount(){
      const {content,id} = this.props;
      getImgfromStorage(id, content.fileName).then((imgUrl)=>this.setState({imgUrl:imgUrl}));
    }
    render() {
        const {classes,content } = this.props;
        return <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <img src={this.state.imgUrl} className={classes.image} alt={"cotent "+content.index}/>
              </GridItem>
            </GridContainer>
          </div>;
    }
}

export default withStyles(imageStyle)(ImageSection);

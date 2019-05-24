import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import imageStyle from "assets/jss/material-kit-react/views/landingPageSections/imageStyle.jsx";


class ImageSection extends React.Component {
    render() {
        const {classes,content } = this.props;
        return <div className={classes.section}>
            <GridContainer justify="center" className={classes.zone}>
                <img src={content.imgUrl} className={classes.image} alt={"cotent "+content.index}/>
            </GridContainer>
          </div>;
    }
}

export default withStyles(imageStyle)(ImageSection);

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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputBase from "@material-ui/core/InputBase";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ArticleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      ready:false
    };
  }
  render() {
    const { classes } = this.props;
    const { ready,title, content } = this.state;
    if (!ready) {
      return <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
            <CustomInput/><br/>
            <CustomInput/>
              {/* <h2 className={classes.title}>{title}</h2>
              <h5 className={classes.description}>{content}</h5> */}
            </GridItem>
          </GridContainer>
        </div>;
    } else {
      return (
        <div className={classes.section}>
        <h3>Article</h3>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>{title}</h2>
              <h5 className={classes.description}>{content}</h5>
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

export default withStyles(productStyle)(ArticleSection);

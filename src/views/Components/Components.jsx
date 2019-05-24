import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionList from "./Sections/SectionList.jsx";
 import SectionCarousel from "./Sections/SectionCarousel.jsx";  
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";



class Components extends React.Component {
  
  render() {
    const { auth, classes, ...rest } = this.props;
    return (
      <div style={{ background: "#b24e2e" }}>
        <Header
          brand="Enjoyneering KMITL"
          rightLinks={<HeaderLinks user={auth} test="123" />}
          fixed
          color="transparent"
          changeColorOnScroll={{ height: 400, color: "white" }}
          {...rest}
        />
        <Parallax className={classes.parallax}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Enjoyneering KMITL</h1>
                  <h3 className={classes.subtitle}>
                    Make KMITL better again.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionCarousel />
        </div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionList
            listName={"recent"}
            title={"What's New?"}
            type={[1, 0]}
            
          />
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
}


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(componentsStyle)(Components))
);

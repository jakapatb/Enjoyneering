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
      <div>
        <Header
          brand="Enjoyneering KMITL"
          rightLinks={<HeaderLinks user={auth} test="123" />}
          fixed
          color="transparent"
          changeColorOnScroll={{ height: 400, color: "white" }}
          {...rest}
        />
        <Parallax image={require("assets/img/concert.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Enjoyneering KMITL</h1>
                  <h3 className={classes.subtitle}>Make KMITL better again.</h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionCarousel />
          <SectionList
            listName={"recommend"}
            title={"Recommend from Teacher"}
            condition={{
              type: "where",
              name: "recommend",
              operator: "==",
              value: true
            }}
          />
          <SectionList listName={"recent"} title={"What's New?"} />
          {/**
          <SectionList
            listName={"test"}
            title={"testTest"}
            condition={{
              type: "where",
              name: "tags",
              operator: "array-contains",
              value: "TEST"
            }}
          /> */}
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {
}


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(componentsStyle)(Components))
);

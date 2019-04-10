import React from "react";
import { connect } from "react-redux";
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
import managementStyle from "assets/jss/material-kit-react/views/management.jsx";
import SectionTeacher from "./Sections/SectionTeacher";
import SectionStudent from "./Sections/SectionStudent";
import { fetchClassrooms } from "actions/index.js"

class Management extends React.Component {

  componentDidMount(){
    this.props.fetchClassrooms()
  }

    render() {
        const { auth,content, classes, ...rest } = this.props;
        return <div>
            <Header brand="Enjoyneering KMITL" rightLinks={<HeaderLinks user={auth} test="123" />} fixed color="transparent" changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
            <Parallax image={require("assets/img/bg2.jpg")}>
              <div className={classes.container}>
                <GridContainer>
                  <GridItem>
                    <div className={classes.brand}>
                      <h1 className={classes.title}>
                        Classrooms Management
                      </h1>
                    <h3 className={classes.subtitle}>{auth.isAuth?(auth.data.status):("Student")}</h3> 
                    </div>
                  </GridItem>
                </GridContainer>
              </div>
            </Parallax>
            <div
              className={classNames(classes.main, classes.mainRaised)}
            >
            <div className={classes.container}>

                <GridContainer>
              {auth.status === "administrator" ? (
                  <SectionTeacher content={content}/>
                ) : (
                  <SectionStudent />
                )
              }
              </GridContainer>

            </div>
          </div>
            <Footer />
          </div>;
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
  content: state.content
});

const mapDispatchToProps = {
  fetchClassrooms
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(managementStyle)(Management));

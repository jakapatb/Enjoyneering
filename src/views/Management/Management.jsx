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
import NavPills from "components/NavPills/NavPills.jsx";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Loader from "components/Loader/Loader.jsx";

import SectionClass from "./Sections/SectionClass";
import {
  fetchClassrooms,
  clearClassrooms,
  fetchPromotePass
} from "actions/index.js";

class Management extends React.Component {

  componentDidMount(){
    this.props.fetchClassrooms();
  }
  componentWillUnmount() {
    this.props.clearClassrooms();
  }
  

    render() {
        const { auth,content, classes, ...rest } = this.props;
        return (
          <div>
            <Header
              brand="Enjoyneering KMITL"
              rightLinks={<HeaderLinks user={auth} test="123" />}
              fixed
              color="transparent"
              changeColorOnScroll={{ height: 100, color: "white" }}
              {...rest}
            />
            <Parallax image={require("assets/img/bg2.jpg")}>
              <div className={classes.container}>
                <GridContainer>
                  <GridItem>
                    <div className={classes.brand}>
                      <h1 className={classes.title}>
                        Classrooms Management
                      </h1>
                      <h2 className={classes.subtitle}>
                        {auth.status}
                      </h2>
                    </div>
                  </GridItem>
                </GridContainer>
              </div>
            </Parallax>
            <div
              className={classNames(classes.main, classes.mainRaised)}
            >
              <div className={classes.container}>
                <GridContainer justify="center">
                  {content.hasContent ? (<GridItem s={12} sm={12} md={12}>
                    <NavPills
                      color="rose"
                      horizontal={{
                        tabsGrid: { s: 12, sm: 2, md: 2 },
                        contentGrid: { s: 12, sm: 10, md: 10 }
                      }}
                      tabs={[
                        {
                          tabButton: "Classroom",
                          tabIcon: Dashboard,
                          tabContent: (
                            <span>
                                <SectionClass
                                  classroom={content.data.classroom}
                                  hasContent={content.hasContent}
                                />
                                Element type is invalid: expected a
                                string (for built-in components) or a
                                class/function (for composite
                                components) but got: symbol.
                            </span>
                          )
                        },
                        {
                          tabButton: "Schedule",
                          tabIcon: Schedule,
                          tabContent: (
                            <span>
                              <p>
                                Efficiently unleash cross-media
                                information without cross-media value.
                                Quickly maximize timely deliverables for
                                real-time schemas.
                              </p>
                              <br />
                              <p>
                                Dramatically maintain clicks-and-mortar
                                solutions without functional solutions.
                                Dramatically visualize customer directed
                                convergence without revolutionary ROI.
                              </p>
                            </span>
                          )
                        }
                      ]}
                    />
                  </GridItem>):(<Loader/>)

                  }
                </GridContainer>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
  content: state.content
});

const mapDispatchToProps = {
  fetchClassrooms,
  clearClassrooms,
  fetchPromotePass
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(managementStyle)(Management));

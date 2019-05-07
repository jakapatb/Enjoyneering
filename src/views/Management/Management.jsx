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
import Loader from "components/Loader/Loader.jsx";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SectionProfile from "./Sections/SectionProfile"
import SectionClass from "./Sections/SectionClass";
import {
  fetchClassrooms,
  clearClassrooms,
  fetchPromotePass
} from "actions/index.js";

class Management extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      uid:""
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    let index = 0;
    switch (params.active) {
      case "classroom":
        index = 1;
        break;
      case "profile":
        index = 0;
        break;
      default:
        break;
    }
    this.setState({ active: index });
    this.props.fetchClassrooms();
  }

  componentWillUpdate(nextProps) {
      if(nextProps.match.params.active!== this.props.match.params.active){
          const {
      match: { params }
    } = this.props;
    let index = 0;
    switch (params.active) {
      case "classroom":
        index = 0;
        break;
      case "profile":
        index = 1;
        break;
      default:
        break;
    }
    this.setState({ active: index });
      }
  }
  componentWillUnmount() {
    this.props.clearClassrooms();
  }

  render() {
    const { auth, content, classes, ...rest } = this.props;
    const { active } = this.state;
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
        <Parallax className={classes.parallax} >
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Classrooms Management</h1>
                  <h2 className={classes.subtitle}>{auth.status}</h2>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              {content.hasContent ? (
                <GridItem s={12} sm={12} md={12}>
                  <NavPills
                    active={active}
                    color="rose"
                    horizontal={{
                      tabsGrid: { s: 12, sm: 2, md: 2 },
                      contentGrid: { s: 12, sm: 10, md: 10 }
                    }}
                    tabs={[
                      {
                        tabButton: "Edit Profile",
                        tabIcon: AccountCircle,
                        tabContent: (
                          <span>
                            <SectionProfile
                              classroom={content.data.classroom}
                              hasContent={content.hasContent}
                            />
                          </span>
                        )
                      },
                      {
                        tabButton: "Classroom",
                        tabIcon: Dashboard,
                        tabContent: (
                          <span>
                            <SectionClass
                              classroom={content.data.classroom}
                              hasContent={content.hasContent}
                            />
                          </span>
                        )
                      }
                    ]}
                  />
                </GridItem>
              ) : (
                <Loader />
              )}
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

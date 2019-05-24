import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Chip from "@material-ui/core/Chip";
import { getUserFromUid } from "actions/helpers.js";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import { connect } from "react-redux";
import { compose } from "redux";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      displayName: "",
      photoURL: "",
      email:""
    };
  }
  componentDidMount = () => {
    const {auth, history} = this.props
    const subParams = new URLSearchParams(this.props.history.location.search);
    if (subParams.get("uid")) {
      getUserFromUid(subParams.get("uid")).then(user => {
        this.setState({ uid: subParams.get("uid"), ...user });
      }).catch(()=>history.push("/profile"))
    }else{
      if(!auth.isAuth){
         history.push("/");
      }else{
        this.setState({...auth.data}) 
      }
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    const { photoURL, displayName, email } = this.state;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div>
        <Header
          color="transparent"
          brand="Enjoyneering"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img
                        src={photoURL}
                        alt="..."
                        className={imageClasses}
                      />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{displayName}</h3>
                      <h6>{email}</h6>
                      <Chip
                        className={classes.chipWrapper}
                        color="primary"
                        label="Infomation Engineering"
                      />
                      <Chip
                        className={classes.chipWrapper}
                        color="primary"
                        label="Infomation Engineering"
                      />
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  An artist of considerable range, Chet Faker — the name
                  taken by Melbourne-raised, Brooklyn-based Nick Murphy —
                  writes, performs and records all of his own music, giving
                  it a warm, intimate feel with a solid groove structure.{" "}
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={8}
                  className={classes.navWrapper}
                />
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default compose(
  withStyles(profilePageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePage);

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import { connect } from "react-redux";
import { signOut } from "actions/index.js";
import image from "assets/img/bg7.jpg";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "configs/firebase";
class LoginPage extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      /*
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID, */
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      isSignedIn: false,
      email: "",
      pass: "",
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.auth.isAuth != prevProps.auth.isAuth) {
      setTimeout(
        function() {
          this.setState({ cardAnimaton: "" });
        }.bind(this),
        700
      );
    }
}

  handleInput = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    this.setState({ [name]: value });
  };
  handleSignOut = () => {
    this.props.signOut();
  };

  render() {
    const { auth, classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Enjoyneering"
          rightLinks={<HeaderLinks user={auth} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    {this.props.auth.isAuth ? (
                      <div>
                        <h1>{this.props.auth.data.displayName}</h1>
                        <Button onClick={this.handleSignOut}>Sign Out</Button>
                      </div>
                    ) : (
                      <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                    )}
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(loginPageStyle)(LoginPage));

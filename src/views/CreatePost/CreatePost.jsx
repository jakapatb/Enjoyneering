import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


// @material-ui/icons
import Avatar from "@material-ui/core/Avatar";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import createPostStyle from "assets/jss/material-kit-react/views/createPost.jsx";

// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost, clearPost } from "actions/index.js";
import YoutubeSection from "./Sections/YoutubeSection";
import ImageSection from "./Sections/ImageSection";
import ArticleSection from './Sections/ArticleSection';

const dashboardRoutes = [];

class CreatePost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      contents:[],
    }
  }
  _handleList=(type)=>()=>{
    var Contents = this.state.contents;
    Contents.push(type);
    this.setState({ contents: Contents});
  }
  _removeContent=(index)=>{
    var Contents = this.state.contents;
    Contents.splice(index,1);
    console.log(index,Contents);
    this.setState({contents:Contents});
  }

    render() {
      console.log(this.state.contents)
        const { auth, classes, ...rest } = this.props;
        return <div>
            <Header color="transparent" routes={dashboardRoutes} brand="Enjoyneering KMITL" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 400, color: "white" }} {...rest} />
            <Parallax filter image={auth.data.imgUrl}>
              <div className={classes.container}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput className={classes.input} labelText="Title" id="float" formControlProps={{ fullWidth: true }} inputProps={{ classes: { input: classes.resize } }} />
                    <CustomInput className={classes.input} labelText="SubTitle" id="float" formControlProps={{ fullWidth: true }} inputProps={{ classes: { input: classes.subtitle } }} />
                    <Button href="/profile-page" color="transparent" className={classes.button}>
                      <Avatar alt="Remy Sharp" src={auth.data.photoURL} className={classes.avatar} />
                      {" " + auth.data.displayName}
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <Button onClick={this._handleList("Article")}>
                  Article
                </Button>
                <Button onClick={this._handleList("Image")}>
                  Image
                </Button>
                <Button onClick={this._handleList("Youtube")}>
                  Youtube
                </Button>
                {
                this.state.contents.map((type,index)=>{
                    switch (type) {
                      case "Article":
                        return <ArticleSection index={index} remove={this._removeContent} />;
                      case "Image":
                        return <ImageSection index={index} remove={this._removeContent} />;
                      case "Youtube":
                        return <YoutubeSection index={index} remove={this._removeContent} />;
                    }
                  })
                }
              </div>
            </div>
            <Footer />
          </div>;
    }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
    fetchPost, clearPost
};

export default compose(
    withStyles(createPostStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreatePost);

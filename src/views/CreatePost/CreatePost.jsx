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
import { sendPost } from "actions/index.js";
import YoutubeSection from "./Sections/YoutubeSection";
import ImageSection from "./Sections/ImageSection";
import ArticleSection from "./Sections/ArticleSection";

const dashboardRoutes = [];

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      title: "",
      subtitle: "",
      imgUrl: "",
      tags: []
    };
  }
  _handleList = type => () => {
    var Contents = this.state.contents;
    Contents.push({ type: type });
    this.setState({ contents: Contents });
  };
  _removeContent = index => {
    var Contents = this.state.contents;
    Contents.splice(index, 1);
    console.log(index, Contents);
    this.setState({ contents: Contents });
  };

  _handleTags = event => {
    if (event.key=="Enter") {
      var Tags = this.state.tags;
      Tags.push(event.target.value.toUpperCase());
      this.setState({tags:Tags});
      event.target.value = '';
    }
  };

  _handleChildSubmit = content => {
    var Contents = this.state.contents;
    Contents[content.index] = content;
    this.setState({ contents: Contents });
  };

  _handleSubmit = () => {
    const { title, subtitle, contents, file, imgUrl, tags } = this.state;
    const { auth, sendPost } = this.props;
    const post = {
      title: title,
      subtitle: subtitle,
      contents: contents,
      ownerUid: auth.data.uid,
      file: file,
      imgUrl: imgUrl,
      tags: tags
    };
    sendPost(post);
  };

  _handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  _handleImageTitle = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({ file: file, imgUrl: reader.result });
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { auth, classes, ...rest } = this.props;
    const { imgUrl,tags } = this.state;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Enjoyneering KMITL"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{ height: 400, color: "white" }}
          {...rest}
        />
        <Parallax filter image={imgUrl}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  className={classes.input}
                  labelText="Title"
                  id="title"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this._handleChange
                  }}
                  inputProps={{ classes: { input: classes.resize } }}
                />
                <CustomInput
                  className={classes.input}
                  labelText="SubTitle"
                  id="subtitle"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this._handleChange
                  }}
                  inputProps={{ classes: { input: classes.subtitle } }}
                />
                <Button
                  href="/profile-page"
                  color="transparent"
                  className={classes.button}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={auth.data.photoURL}
                    className={classes.avatar}
                  />
                  {" " + auth.data.displayName}
                </Button>
              </GridItem>
              <GridItem>
                  {
                  tags.map(tag => <Badge color="info">{tag}</Badge>)
                  }
                <CustomInput
                  labelText="Text limit 10"
                  id="tags"
                  formControlProps={{
                    onKeyPress:this._handleTags
                  }}
                  inputProps={{ type: "text" }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="imgUrl"
                  id="imgUrl"
                  formControlProps={{
                    onChange: this._handleImageTitle
                  }}
                  inputProps={{ type: "file" }}
                />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Button onClick={this._handleList("Article")}>Article</Button>
            <Button onClick={this._handleList("Image")}>Image</Button>
            <Button onClick={this._handleList("Youtube")}>Youtube</Button>
            {this.state.contents.map((content, index) => {
              switch (content.type) {
                case "Article":
                  return (
                    <ArticleSection
                      index={index}
                      remove={this._removeContent}
                      submit={this._handleChildSubmit}
                    />
                  );
                case "Image":
                  return (
                    <ImageSection
                      index={index}
                      remove={this._removeContent}
                      submit={this._handleChildSubmit}
                    />
                  );
                case "Youtube":
                  return (
                    <YoutubeSection
                      index={index}
                      remove={this._removeContent}
                      submit={this._handleChildSubmit}
                    />
                  );
              }
            })}

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Button round color="warning" onClick={this._handleSubmit}>
                  Submit
                </Button>
              </GridItem>
            </GridContainer>
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

const mapDispatchToProps = {
  sendPost
};

export default compose(
  withStyles(createPostStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreatePost);

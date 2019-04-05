import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
//import Avatar from "@material-ui/core/Avatar";
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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';
// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { sendPost, fetchPost, clearPost } from "actions/index.js";
import YoutubeSection from "./Sections/YoutubeSection";
import ImageSection from "./Sections/ImageSection";
import ArticleSection from "./Sections/ArticleSection";
import Image from "assets/img/bg.jpg";
const dashboardRoutes = [];

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDialog:false,
      postId: undefined,
      contents: [],
      title: "",
      subtitle: "",
      imgUrl: Image,
      tags: [],
      isChangeTitleImg: false,
      deletedContents: []
    };
  }

  componentDidMount = () => {
    const { history, fetchPost } = this.props;
    if (history.location.search.includes("?edit=")) {
      //หากมีการแก้ไข
      const postId = history.location.search.split("?edit=")[1];
      this.setState({ postId: postId });
      fetchPost(postId);
    }
  };

  componentWillUpdate = (nextProps, nextState) => {
    //นำข้อมูลเก่าแสดง
    if (!this.props.post.hasPost && nextProps.post.hasPost) {
      this.setState({
        contents: Object.values(nextProps.post.data.contents).sort(
          (a, b) => a.index - b.index
        ),
        tags: nextProps.post.data.tags,
        title: nextProps.post.data.title,
        subtitle: nextProps.post.data.subtitle,
        imgUrl: nextProps.post.data.imgUrl
      });
    }
  };
  componentWillUnmount() {
    this.props.clearPost();
  }

  _handleList = type => () => {
    // Create new Content
    var Contents = this.state.contents;
    Contents.push({ type: type });
    this.setState({ contents: Contents });
  };
  _removeContent = index => {
    const { deletedContents, contents } = this.state;
    var DeletedContents = deletedContents;
    var Contents = contents;
    var deletedContent = Contents.splice(index, 1)[0];
    if (deletedContent.id !== null) {
      // content ที่เคยอัพลงfirestoreแล้ว
      DeletedContents.push(deletedContent);
    }
    this.setState({ contents: Contents, deeteContents: DeletedContents });
  };

  _handleTags = event => {
    if (event.key === "Enter") {
      const tag = event.target.value.toUpperCase();
      var tags = this.state.tags;
      if (!tags.includes(tag)) {
        // กันไม่ให้ มีTags ซ้ำ
        tags.push(tag);
        this.setState({ tags: tags });
        event.target.value = "";
      } else {
        //TODO แจ้งเตือนว่าTag ซ้ำ
      }
    }
  };
  _removeTag = index => () => {
    var Tags = this.state.tags;
    Tags.splice(index, 1);
    this.setState({ tags: Tags });
  };

  _handleChildSubmit = content => {
    var Contents = this.state.contents;
    Contents[content.index] = content;
    this.setState({ contents: Contents });
  };

//for handle dialog Submit
_handleSubmitDialog = () => {
  if(this.state.submitDialog){
    this.setState({submitDialog:false})
  }else {
    this.setState({submitDialog:true})
  }
}
  _handleSubmit = () => {
    const {
      title,
      subtitle,
      contents,
      file,
      imgUrl,
      tags,
      postId,
      deletedContents
    } = this.state;
    const { sendPost } = this.props;
    const post = {
      postId: postId,
      title: title,
      subtitle: subtitle,
      contents: contents,
      file: file,
      imgUrl: imgUrl,
      tags: tags,
      deletedContents: deletedContents
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
    if(typeof file == "object"){
      reader.onloadend = () => {
        this.setState({
          file: file,
          imgUrl: reader.result,
          isChangeTitleImg: true
        });
      };
  
      reader.readAsDataURL(file);
    }else if(typeof this.state.file !== "object"){
      this.setState({
        isChangeTitleImg: false
      });
    }
  };

  

  render() {
    const { post, auth, classes, ...rest } = this.props;
    const { imgUrl, tags, title, subtitle } = this.state;

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
                  inputProps={{
                    classes: { input: classes.resize },
                    value: title
                  }}
                />
                <CustomInput
                  className={classes.input}
                  labelText="SubTitle"
                  id="subtitle"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this._handleChange
                  }}
                  inputProps={{
                    classes: { input: classes.subtitle },
                    value: subtitle
                  }}
                />
                {/*
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
                */}
              </GridItem>
              <GridItem>
                {tags.map((tag, index) => (
                  <Button
                    simple
                    className={classes.tag}
                    onClick={this._removeTag(index)}
                  >
                    <Badge color="primary" round>
                      {" "}
                      {tag}
                    </Badge>
                  </Button>
                ))}
                <br />
                <CustomInput
                  labelText="Text limit 10"
                  id="tags"
                  formControlProps={{ onKeyPress: this._handleTags }}
                  inputProps={{ type: "text" }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="imgUrl"
                  id="imgUrl"
                  formControlProps={{ onChange: this._handleImageTitle }}
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
                        key={content.id}
                        index={index}
                        remove={this._removeContent}
                        submit={this._handleChildSubmit}
                        content={content}
                      />
                    );
                  case "Image":
                    return (
                      <ImageSection
                        key={content.id}
                        index={index}
                        remove={this._removeContent}
                        submit={this._handleChildSubmit}
                        content={content}
                        id={this.state.postId}
                      />
                    );
                  case "Youtube":
                    return (
                      <YoutubeSection
                        key={content.id}
                        index={index}
                        remove={this._removeContent}
                        submit={this._handleChildSubmit}
                        content={content}
                      />
                    );
                  default:
                    return null;
                }
              })}

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this._handleSubmitDialog}
                  >
                    Submit
                  </Button>
                  <Dialog
                    open={this.state.submitDialog}
                    onClose={this._handleSubmitDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">
                        {"คุณแน่ใจแล้วใช่ไหม"}
                      </DialogTitle>
                   {
                     post.isFetching ? (
                      <DialogContent className={classes.progressSubmit}>
                      <CircularProgress className={classes.progress} />
                    </DialogContent>
                     ):(
                      
                      <div>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          กรุณาตรวจสอบโพสของคุณ 
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={this._handleSubmitDialog} color="primary">
                        Close
                      </Button>
                      <Button
                        onClick={this._handleSubmit}
                        color="primary"
                        autoFocus
                      >
                        Submit
                      </Button>
                    </DialogActions>
                        </div>
                     )
                   }
                   
                  </Dialog>
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
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {
  sendPost,
  fetchPost,
  clearPost
};

export default compose(
  withStyles(createPostStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreatePost);

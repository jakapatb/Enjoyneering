import React from "react";
import {Redirect} from "react-router-dom"
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
import { sendPost, fetchPost, clearPost } from "actions/post.js";
import YoutubeSection from "./Sections/YoutubeSection";
import ImageSection from "./Sections/ImageSection";
import ArticleSection from "./Sections/ArticleSection";
import TitleSection from "./Sections/TitleSection";
import Dropzone from "react-dropzone";
import FooterPostSection from "./Sections/FooterPostSection";
const dashboardRoutes = [];

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;
//! ownerUid เพิ่มไม่ขึ้น
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDialog: false,
      postId: undefined,
      contents: [],
      title: "",
      subtitle: "",
      imgUrl: "",
      tags: [],
      value: "",
      isChangeTitleImg: false,
      deletedContents: [],
      ownerUid: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount = async () => {
    const { history, fetchPost, auth,post } = this.props;
    if (history.location.search.includes("?edit=")) {
      //หากมีการแก้ไข
      //! เข้าได้เฉพาะเจ้าของเท่านั้น
      const postId = history.location.search.split("?edit=")[1];
      await fetchPost(postId);
      this.setState({ postId: postId, imgUrl:post.data.imgUrl });
    } else {
      this.setState({ ownerUid: [auth.data.uid] });
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
        imgUrl: nextProps.post.data.imgUrl,
        ownerUid: nextProps.post.data.ownerUid
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
    if (deletedContent.id !== undefined) {
      // content ที่เคยอัพลงfirestoreแล้ว
      DeletedContents.push({
        id: deletedContent.id,
        fileName: deletedContent.fileName
      });
    }
    this.setState({ contents: Contents, deletedContents: DeletedContents });
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
    if (this.state.submitDialog) {
      if (!this.props.post.isFetching) {
        this.setState({ submitDialog: false });
      }
    } else {
      this.setState({ submitDialog: true });
    }
  };
  _handleSubmit = () => {
    const {
      title,
      subtitle,
      contents,
      file,
      imgUrl,
      tags,
      postId,
      ownerUid,
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
      ownerUid:ownerUid,
      deletedContents: deletedContents
    };
    sendPost(post);
  };

  _handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  _handleImageTitle = files => {
    let reader = new FileReader();
    let file = files[0];
    if (typeof file == "object") {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imgUrl: reader.result,
          isChangeTitleImg: true
        });
      };

      reader.readAsDataURL(file);
    } else if (typeof this.state.file !== "object") {
      this.setState({
        isChangeTitleImg: false
      });
    }
  };
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyUp(e) {
    const key = e.keyCode;

    if (key === ENTER_KEY || key === COMMA_KEY) {
      this.addTag();
    }
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    if (key === BACKSPACE_KEY && !this.state.value) {
      this.editPrevTag();
    }
  }

  addTag = () => {
    const { tags, value } = this.state;
    if(value!==undefined){
      let tag = value.trim().toUpperCase();

    tag = tag.replace(/,/g, "");

    if (!tag) {
      return;
    }

    this.setState({
      tags: [...tags, tag],
      value: ""
    });
    }
  };

  editPrevTag(tag) {
    let { tags } = this.state;
    if ((tag === undefined)) tag = tags.pop();
    else tags = tags.filter(obj => obj !== tag);
    this.setState({ tags, value: tag });
  }
  
  addOwnerUid = ownerUid =>
    new Promise((resolve, reject) => {
      this.setState(state => {
        let newOwners = state.ownerUid;
        if (newOwners.includes(ownerUid)) return reject();

        newOwners.push(ownerUid);
        this.setState({ ownerUid: newOwners });
        return resolve(newOwners);
      });
    });

  render() {
    const { post, auth, classes, ...rest } = this.props;
    const {imgUrl, tags, title, subtitle, value } = this.state;
    if (
      this.props.post.isUpload.length > 0 &&
      this.props.post.isUpload.every(upload => upload === true)
    )
      return (
        <Redirect
          to={{
            pathname: "/landing-page/" + post.id
          }}
        />
      );
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Enjoyneering KMITL"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{ height: 400}}
          {...rest}
        />
        <Parallax filter image={imgUrl}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  className={classes.input}
                  id="title"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this._handleChange
                  }}
                  inputProps={{
                    placeholder: "Title",
                    classes: { input: classes.resize },
                    value: title
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  className={classes.input}
                  id="subtitle"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this._handleChange
                  }}
                  inputProps={{
                    placeholder: "Description",
                    classes: { input: classes.subtitle },
                    value: subtitle
                  }}
                />
              </GridItem>
              <GridItem>
                <div className={classes.form}>
                  <div className={classes.tags}>
                    <ul>
                      {tags.map((tag, i) => (
                        <li
                          key={tag + i}
                          className={classes.tag}
                          onClick={() => this.editPrevTag(tag)}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={value}
                      onChange={this.handleChange}
                      ref="tag"
                      className={classes.tag_input}
                      onBlur={this.addTag}
                      onKeyUp={this.handleKeyUp}
                      onKeyDown={this.handleKeyDown}
                    />
                  </div>
                  <small>
                    Press <code>enter</code> or <code>,</code> to add a tag.
                    Press <code>backspace</code> to edit previous tag.
                  </small>
                </div>
                <br />
              </GridItem>
              <GridItem>
                <Dropzone
                  onDrop={acceptedFiles =>
                    this._handleImageTitle(acceptedFiles)
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className={classes.dropZone}>
                        <input {...getInputProps()} />
                        <h2>Drop Image Here or Click me</h2>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {/*
                <CustomInput
                  labelText="imgUrl"
                  id="imgUrl"
                  formControlProps={{ onChange: this._handleImageTitle }}
                  inputProps={{ type: "file" }}
                />*/}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {this.state.contents.map((content, index) => {
              switch (content.type) {
                case "Title":
                  return (
                    <TitleSection
                      key={content.id}
                      index={index}
                      remove={this._removeContent}
                      submit={this._handleChildSubmit}
                      content={content}
                    />
                  );
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
            {auth.isAuth && (
              <div>
                <Button onClick={this._handleList("Title")}>
                  Title
                </Button>
                <Button onClick={this._handleList("Article")}>
                  Article
                </Button>
                <Button onClick={this._handleList("Image")}>Image</Button>
                <Button onClick={this._handleList("Youtube")}>
                  Youtube
                </Button>
                <FooterPostSection
                  ownerUid={this.state.ownerUid}
                  addUid={this.addOwnerUid}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this._handleSubmitDialog}
                >
                  Submit
                </Button>
              </div>
            )}
            <Dialog
              open={this.state.submitDialog}
              onClose={this._handleSubmitDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"คุณแน่ใจแล้วใช่ไหม"}
              </DialogTitle>
              {post.isFetching ? (
                <DialogContent className={classes.progressSubmit}>
                  <CircularProgress
                    className={classes.progress}
                    value={
                      post.isUpload.filter(up => up === true).length /
                      post.isUpload.length
                    }
                  />
                  <h3>
                    {post.isUpload.filter(up => up === true).length +
                      " / " +
                      post.isUpload.length}
                  </h3>
                </DialogContent>
              ) : (
                <div>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      กรุณาตรวจสอบโพสของคุณ
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this._handleSubmitDialog}
                      color="primary"
                    >
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
              )}
            </Dialog>
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
  clearPost,
};

export default compose(
  withStyles(createPostStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreatePost);

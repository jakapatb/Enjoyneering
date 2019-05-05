import React from "react";
import { Link } from "react-router-dom";
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
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Favorite from "@material-ui/icons/Favorite";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Loader from "components/Loader/Loader.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import TitleSection from "./Sections/TitleSection.jsx"
import ArticleSection from "./Sections/ArticleSection.jsx";
import YoutubeSection from "./Sections/YoutubeSection.jsx";
import ImageSection from "./Sections/ImageSection.jsx";
import FooterPostSection from "./Sections/FooterPostSection.jsx";
import CommentListSection from "./Sections/CommentListSection.jsx";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost, clearPost, deletePost } from "actions/post.js";
import {
  fetchComments,
  pressLove,
  allowPublic,
  recommedPost,
  markSeenNoti
} from "actions/index.js";
import Modal from "components/Modal/Modal.jsx";
const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: [false, false, false],
      love: false,
      number: 0,
      postId: ""
    };
  }
  componentDidMount = async () => {
    const {
      match: { params }
    } = this.props;
    await this.handleFetchPost(params);
  };
  componentWillReceiveProps = nextProps => {
    const {
      match: { params }
    } = nextProps;
    if (this.props.match.params !== params) {
      this.handleFetchPost(params);
    }
  };

  handleFetchPost = async params => {
    const { fetchPost, fetchComments,markSeenNoti, history } = this.props;
    const subParams = new URLSearchParams(history.location.search);
    window.scrollTo(0, 0);
    this.setState({ postId: params.post });
    await fetchPost(params.post).catch(() => {
      history.push("/");
    });
    await fetchComments(params.post);
    
    if (subParams.get("scroll")) {
      switch (subParams.get("scroll")) {
        case "0":
          await this.scrollTo("love");
          break;
        case "1":
          await this.scrollTo("comment");
          break;
        default:
          break;
      }
    }
    if (subParams.get("notiId")) {
      console.log("nofi Work");
      await markSeenNoti(this.state.postId, subParams.get("notiId"));
    }
  };
  componentWillUpdate(nextProps) {
    const { post, auth } = nextProps;
    if (post.hasPost && !this.props.post.hasPost) {
      if (post.data.love.includes(auth.data.uid)) {
        this.setState({ love: true });
      }
      this.setState({ number: post.data.love.length });
    }
  }
  scrollTo = type => {
    if (type === "love") {
      this.loveEnd.scrollIntoView({ behavior: "smooth" });
    } else if (type === "comment") {
      this.commentEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  handleLove = async () => {
    const { love, number } = this.state;
    const { pressLove } = this.props;
    await pressLove(!love);
    await this.setState({
      love: !love,
      number: !love ? number + 1 : number - 1
    });
  };

  //! เปลี่ยนไใช้ state modal  เป็น อาเรย์ดีกว่า
  handleModal = index => {
    var thisModal = this.state.modal;

    if (thisModal.some(obj => obj === true)) {
      const allClose = [false, false, false];
      this.setState({ modal: allClose });
    } else {
      thisModal[index] = true;
      this.setState({ modal: thisModal });
    }
  };

  handleAllow = () => {
    this.props.allowPublic(this.state.postId, !this.props.post.public);
  };
  handleRecommend = () => {
    this.props.recommedPost(!this.props.post.recommend);
  };

  componentWillUnmount = () => {
    this.props.clearPost();
  };

  _handleDeletePost = () => {
    this.props
      .deletePost(this.props.post.id)
      .then(() => this.props.history.push("/"));
  };
  render() {
    const { auth, post, classes, ...rest } = this.props;
    const { postId, modal } = this.state;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Enjoyneering"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{ height: 400, color: "white" }}
          {...rest}
        />
        <Parallax filter image={post.hasPost && post.data.imgUrl}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h1 className={classes.title}>{post.data.title}</h1>
                <h4>{post.data.subtitle}</h4>
                <ul>
                  {post.hasPost &&
                    post.data.tags.map((tag, i) => (
                      <Link to={"/search/?s=" + tag} style={{ color: "#FFF" }}>
                        <li key={tag + i} className={classes.tag}>
                          {tag}
                        </li>
                      </Link>
                    ))}
                </ul>
                <br />
                {post.hasPost && (
                  <div>
                    <Modal
                      isOpen={modal[0]}
                      handleModal={this.handleModal}
                      number={0}
                      submit={this.handleAllow}
                      title={"Public Permission"}
                      content={"คุณต้องการเปิด Public บทความนี้หรือไม่"}
                    />

                    <Modal
                      isOpen={modal[1]}
                      number={1}
                      handleModal={this.handleModal}
                      submit={this._handleDeletePost}
                      title={"Detele this post"}
                      content={
                        post.isFetching ? (
                          <Loader />
                        ) : (
                          "คุณต้องการลบโพสนี้หรือไม่"
                        )
                      }
                    />
                    <Modal
                      isOpen={modal[2]}
                      handleModal={this.handleModal}
                      number={2}
                      submit={this.handleRecommend}
                      title={"Recommend this post"}
                      content={"คุณต้องการRecommend บทความนี้หรือไม่"}
                    />
                  </div>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        {post.hasPost ? (
          <div className={classNames(classes.main, classes.mainRaised)}>
            {!post.public && (
              <SnackbarContent
                message={
                  <span>
                    <b>INFO ALERT:</b> บทความนี้ยังไม่เปิด Public
                  </span>
                }
                close
                button={
                  auth.status === "administrator"
                    ? {
                        name: "Public Permission",
                        onClick: () => this.handleModal(0)
                      }
                    : undefined
                }
                color="warning"
                icon="info_outline"
              />
            )}
            <Clearfix />
            {(auth.status === "administrator" ||
              post.data.ownerUid.includes(auth.data.uid)) && (
              <GridContainer
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                style={{ paddingRight: "30px" }}
              >
                <CustomDropdown
                  right
                  noLiPadding
                  caret={false}
                  buttonProps={{
                    className: classes.navLink
                    //fontSize: "inherit"
                  }}
                  buttonIcon={MoreVertIcon}
                  dropdownList={[
                    <Link
                      className={classes.navLink}
                      to={"/create-post/?edit=" + postId}
                    >
                      Edit
                    </Link>,
                    <Button
                      color="transparent"
                      className={classes.navLink}
                      onClick={() => this.handleModal(0)}
                    >
                      {post.public ? "set to private" : "set to public"}
                    </Button>,
                    <Button
                      color="transparent"
                      className={classes.navLink}
                      onClick={() => this.handleModal(2)}
                    >
                      {post.recommend ? "unrecommend" : "recommend"}
                    </Button>,
                    <Button
                      color="transparent"
                      className={classes.navLink}
                      onClick={() => this.handleModal(1)}
                    >
                      Delete this Post
                    </Button>
                  ]}
                />
              </GridContainer>
            )}
            <div className={classes.container}>
              {/* Content */}
              {post.hasPost ? (
                Object.values(post.data.contents)
                  .sort((a, b) => {
                    return a.index - b.index;
                  })
                  .map(content => {
                    switch (content.type) {
                      case "Title":
                        return <TitleSection content={content} />;
                      case "Article":
                        return <ArticleSection content={content} />;
                      case "Youtube":
                        return <YoutubeSection content={content} />;
                      case "Image":
                        return <ImageSection content={content} id={postId} />;
                      default:
                        return null;
                    }
                  })
              ) : (
                <Loader />
              )}
              {/* Footer */}
              <div
                ref={el => {
                  this.loveEnd = el;
                }}
              />
              {post.hasPost && (
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    color="primary"
                    round
                    onClick={this.handleLove}
                    simple={!this.state.love}
                    disabled={!auth.isAuth}
                  >
                    <Favorite /> {this.state.number} love it!
                  </Button>
                  <FooterPostSection ownerUid={post.data.ownerUid} />
                </GridItem>
              )}
              {post.hasComments && (
                <CommentListSection comments={post.comments} id={postId} />
              )}
              <span
                ref={el => {
                  this.commentEnd = el;
                }}
              />
            </div>
          </div>
        ) : (
          <Loader />
        )}
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
  fetchPost,
  fetchComments,
  clearPost,
  pressLove,
  allowPublic,
  deletePost,
  recommedPost,
  markSeenNoti
};

export default compose(
  withStyles(landingPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage);

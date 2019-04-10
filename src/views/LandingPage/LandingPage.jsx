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
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Favorite from "@material-ui/icons/Favorite";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
// Sections for this page
import ArticleSection from "./Sections/ArticleSection.jsx";
import YoutubeSection from "./Sections/YoutubeSection.jsx";
import ImageSection from "./Sections/ImageSection.jsx";
import FooterPostSection from "./Sections/FooterPostSection.jsx";
import CommentListSection from "./Sections/CommentListSection.jsx";

import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost, clearPost, pressLove, allowPublic} from "actions/index.js";
import { getImgfromStorage } from "actions/helpers.js";
import ModalSection from "./Sections/ModalSection.jsx";


const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      love: false,
      number: 0,
      postId: ""
    };
  }
  componentDidMount = async () => {
    const { fetchPost } = this.props;
    const params = new URLSearchParams(this.props.history.location.search);
    this.setState({ postId: params.get("post") });
    await fetchPost(params.get("post"));
    await getImgfromStorage(params.get("post"),"title.jpg").then((imgUrl)=>{
      console.log(imgUrl);
      
      this.setState({
        imgUrl:imgUrl
      })
    })
  };

  componentWillUpdate(nextProps) {
    const { post, auth } = nextProps;
    if (post.hasPost && !this.props.post.hasPost) {
      this.setState({
        modal: auth.data.status === "administrator" && !post.public
      })
      if (post.data.love.includes(auth.data.uid)) {
        this.setState({ love: true });
      }
      this.setState({ number: post.data.love.length });
    }
  }

  handleLove = async () => {
    const { love, number } = this.state;
    const { pressLove } = this.props;
    await pressLove(!love);
    await this.setState({
      love: !love,
      number: !love ? number + 1 : number - 1
    });
  };
  handleModal= () => {
    this.setState({
      modal:!this.state.modal
    })
  }
  handleAllow =() => {
    console.log("Allow");
    
    this.props.allowPublic(this.state.postId,true)
  }

  componentWillUnmount = () => {
    this.props.clearPost();
  };
  render() {
    const { auth, post, classes, ...rest } = this.props;
    const { postId,imgUrl ,modal} = this.state;
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
        <Parallax filter image={post.hasPost && imgUrl}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{post.data.title}</h1>
                <h4>{post.data.subtitle}</h4>
                {post.hasPost &&
                  post.data.tags.map(tag => (
                    <Badge color="info">{tag}</Badge>
                  ))}
                <br />
                {post.hasPost && (
                  <div>
                    <ModalSection isOpen={modal} handleModal={this.handleModal} allow={this.handleAllow}/>
                    <br />
                    {post.data.ownerUid === auth.data.uid && auth.isAuth && (
                      <Button
                        color="warning"
                        round
                        href={"/create-post/?edit=" + postId}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          { 
            !post.public && <SnackbarContent
              message={
                <span>
                  <b>INFO ALERT:</b> บทความนี้ยังไม่เปิด Public
              </span>
              }
              close
              button={auth.status==="administrator" ? {
                name: "Public Permission",
                onClick: this.handleModal
              } : undefined}
              color="warning"
              icon="info_outline"
            />
            
          }
          <Clearfix />
          <div className={classes.container}>
            {/* Content */}
            {post.hasPost ? (
              Object.values(post.data.contents)
                .sort((a, b) => {
                  return a.index - b.index;
                })
                .map(content => {
                  switch (content.type) {
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
              <CircularProgress className={classes.progress} size={150} />
            )}
            {/* Footer */}
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
                <FooterPostSection owner={post.data.owner} />
              </GridItem>
            )}
            {post.hasComments && (
              <CommentListSection comments={post.comments} id={postId} />
            )}
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
  fetchPost,
  clearPost,
  pressLove,
  allowPublic
};

export default compose(
  withStyles(landingPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage);

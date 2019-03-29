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
import Favorite from "@material-ui/icons/Favorite";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ArticleSection from "./Sections/ArticleSection.jsx";
import YoutubeSection from "./Sections/YoutubeSection.jsx";
import ImageSection from "./Sections/ImageSection.jsx";
import CommentListSection from "./Sections/CommentListSection.jsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost, clearPost, pressLove } from "actions/index.js";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      love:false,
      number:0,
      postId:""
    }
  }
  componentDidMount = () => {
    const { fetchPost} = this.props;
    const params = new URLSearchParams(this.props.history.location.search);
    this.setState({ postId: params.get("post") });
    fetchPost(params.get('post'));
  };
  
  componentWillUpdate(nextProps){
    const { post, auth } = nextProps;
    if (post.hasPost && !this.props.post.hasPost) {
      if (post.data.love.includes(auth.data.uid)) {
        this.setState({ love: true })
      }
      this.setState({ number: post.data.love.length })
    }
  }

  handleLove = async () => {
    const { love, number} = this.state
    const {pressLove } = this.props;
    await pressLove(!love)
    await this.setState({ love: !love, number: !love ? number + 1 : number - 1 })
  }

  componentWillUnmount = () => {
    this.props.clearPost();
  };
  render() {
    const { auth , post, classes, ...rest } = this.props;
    const { postId} = this.state;
    return <div>
        <Header color="transparent" routes={dashboardRoutes} brand="Enjoyneering" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 400, color: "white" }} {...rest} />
        <Parallax filter image={post.hasPost ? post.data.imgUrl : require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{post.data.title}</h1>
                <h4>{post.data.subtitle}</h4>
                {post.hasPost && post.data.tags.map(tag => (
                    <Badge color="info">{tag}</Badge>
                  ))}
                <br />
                {post.hasPost && <div>
                    <Button href="/profile-page/" color="transparent" className={classes.button}>
                      <Avatar alt="Owner" src={post.data.owner.photoURL} className={classes.avatar} />
                      {" " + post.data.owner.displayName}
                    </Button>
                    <br />
                    {post.data.ownerUid === auth.data.uid && auth.isAuth && <Button color="warning" round href={"/create-post/?edit=" + postId}>
                        Edit
                      </Button>}
                  </div>}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {post.hasPost && Object.values(post.data.contents)
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
                      return <ImageSection content={content} id={postId}/>;
                    default:
                      return null;
                  }
                })}
            <GridItem xs={12} sm={12} md={6}>
              {post.hasPost && <Button color="primary" round onClick={this.handleLove} simple={!this.state.love} disabled={!auth.isAuth}>
                  <Favorite /> {this.state.number} love it!
                </Button>}
            </GridItem>
            {post.hasComments && <CommentListSection comments={post.comments} id={postId} />}
          </div>
        </div>
        <Footer />
      </div>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const mapDispatchToProps = {
  fetchPost,
  clearPost,
  pressLove
};

export default compose(
  withStyles(landingPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage);

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

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ArticleSection from "./Sections/ArticleSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchPost } from "actions/index.js";
import { withRouter } from "react-router";
import YoutubeSection from "./Sections/YoutubeSection.jsx";
const dashboardRoutes = [];

class LandingPage extends React.Component {
  componentDidMount = () => {
    this.props.fetchPost(this.props.history.location.search);
  };

  render() {
    const { post, classes, ...rest } = this.props;
    console.log(post.data);
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
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{post.data.title}</h1>
                <h4>{post.data.subtitle}</h4>
                {post.hasPost &&
                  post.data.tags.map(tag => <Badge color="info">{tag}</Badge>)}
                  <br/>
                {post.hasPost && (
                  <Button href="/profile-page" color="transparent" className={classes.button}>
                    <Avatar
                      alt="Remy Sharp"
                      src={post.data.owner.photoURL}
                      className={classes.avatar}
                    />
                    {" "+post.data.owner.displayName}
                  </Button>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {post.hasPost &&
              Object.values(post.data.contents)
                .sort((a, b) => {
                  return a.index - b.index;
                })
                .map(content => {
                  switch (content.type) {
                    case "article":
                      return <ArticleSection content={content} />;
                    case "youtube":
                      return <YoutubeSection content={content} />;
                  }
                })}
            {/* <TeamSection />
            <WorkSection />  */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  fetchPost
};

export default compose(
  withStyles(landingPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage);

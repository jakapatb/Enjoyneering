import React from "react";
import { Link } from "react-router-dom";
// react component for creating beautiful carousel
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components

const style = {
  imgCard: {
    objectFit: "cover ",
    width: "100%",
    height: "300px"
  },
  childCarousel: {
    position: "realative",
    height: "300px"
  },
  title: {
    color: "#000000",
    textShadow: "0 0 5px #FFFFFF",
    fontWeight: 700
  },
  subtitle: {
    color: "#000000",
    textShadow: "0 0 2px #FFFFFF"
  }
};

class SectionChildCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl:  ""
    };
  }
  componentDidMount() {
    this.setState({ imgUrl: this.props.post.imgUrl});
  }

  render() {
    const { imgUrl } = this.state;
    const { post, classes } = this.props;
    return (
      <Link
        to={{
          pathname: "/landing-page/"+post.id,
          state: { id: post.id }
        }}
      >
        <div className={classes.childCarousel}>
          <img src={imgUrl} alt="First slide" className={classes.imgCard} />
          <div className="slick-caption">
            <h2 className={classes.title}>{post.title}</h2>
            <h4 className={classes.subtitle}>{post.subtitle}</h4>
          </div>
        </div>
      </Link>
    );
  }
}

export default withStyles(style)(SectionChildCarousel);

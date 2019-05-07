import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle.jsx";
import Particles from "react-particles-js";

const particlesOpt = require("configs/particlesjs-config.json");
class Parallax extends React.Component {
  constructor(props) {
    super(props);
    var windowScrollTop = window.pageYOffset / 3;
    this.state = {
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    };
    this.ironImageHd = null;
    this.resetTransform = this.resetTransform.bind(this);
  }
  componentDidMount() {
    var windowScrollTop = window.pageYOffset / 3;
    const hdLoaderImg = new Image();
    hdLoaderImg.src = this.props.image;
    hdLoaderImg.onload = () => {
      this.ironImageHd.setAttribute("style", `background-image: url('${this.props.image}')`);
      this.ironImageHd.classList.add(this.props.classes.fadeIn);
    };
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
    window.addEventListener("scroll", this.resetTransform);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.resetTransform);
  }
  resetTransform() {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: "translate3d(0," + windowScrollTop + "px,0)"
    });
  }
  render() {
             const {
               classes,
               filter,
               className,
               children,
               style,
               image,
               small
             } = this.props;
             const parallaxOnly = classNames({
               [classes.parallax]: true,
               [classes.filter]: filter,
               [classes.small]: small,
               [className]: className !== undefined
             });
             const parallaxClasses = classNames({
               [classes.parallax]: true,
               [classes.loaded]: true,
               [classes.filter]: filter,
               [classes.small]: small,
               [className]: className !== undefined
             });
             return (
               <div className={parallaxOnly} ref="parallax">
                 <Particles
                   params={particlesOpt}
                   className={classes.particles}
                 />
                 <div
                   className={parallaxClasses}
                   style={{
                     ...style,
                     backgroundImage: "url(" + image + ")",
                     ...this.state
                   }}
                   ref={imageLoadedElem =>
                     (this.ironImageHd = imageLoadedElem)
                   }
                 >
                   {children}
                 </div>
               </div>
             );
           }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string
};

export default withStyles(parallaxStyle)(Parallax);

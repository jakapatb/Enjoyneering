const parallaxStyle = {
  parallax: {
    height: "90vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  small: {
    height: "380px"
  },
  preload: {
    "z-index": 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundSize: "cover"
  },
  loaded: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    "z-index": 2,
    opacity: 0,
    backgroundSize: "cover",
    transition: "opacity 1s ease"
  },
  fadeIn: {
    opacity: 1
  }
};

export default parallaxStyle;

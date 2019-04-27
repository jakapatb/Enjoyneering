import { container, title } from "assets/jss/material-kit-react.jsx";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "5px"
  },
  button: {
    padding: "12px 0px",
    fontSize: "1.313rem",
    textTransform: "none"
  },
  progress: {
    padding: "20px 0px 20px 0px",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  tags: { background: "#fff", padding: "5px", overflow: "hidden" },
  tag: {
    background: "crimson",
    color: "#fff",
    display: "inline-block",
    position: "relative",
    padding: "5px 10px",
    borderRadius: "10em",
    margin: 5,
    fontWeight: "bold",
    //background: '#3498db',
    float: "left",
    textDecoration: "inherit",
    WebkitTransition: "color 0.2s",
    "&:before": {
      background: "#fff",
      borderRadius: 10,
      boxShadow: "inset 0 1px rgba(0, 0, 0, 0.25)",
      content: "",
      height: 6,
      left: 10,
      position: "absolute",
      width: 6,
      top: 10
    },
    "&:after": {
      background: "#fff",
      borderBottom: "13px solid transparent",
      borderLeft: "10px solid #eee",
      borderTop: "13px solid transparent",
      content: "",
      position: "absolute",
      right: 0,
      top: 0
    },
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000"
    },
    "&:hover:after": {
      borderLeftColor: "#fff"
    }
  },
  button: { background: "transparent", border: "0", cursor: "pointer" },
  tag_input: {
    padding: "5px 10px",
    boxSizing: "border-box",
    color: "#7f8c8d",
    border: "0",
    float: "left",
    margin: "10px 0",
    fontSize: "16px",
    outline: "0"
  },
  code: {
    fontSize: "12px",
    background: "#FCF8D0",
    display: "inline-block",
    fontFamily: "courier",
    padding: "4px 6px",
    borderRadius: "4px"
  },
  small: {
    color: "#7f8c8d",
    fontSize: "14px",
    marginTop: "10px",
    display: "block",
    lineHeight: "16px"
  }
};

export default landingPageStyle;

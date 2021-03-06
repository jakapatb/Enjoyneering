import { container, title } from "assets/jss/material-kit-react.jsx";
const searchPageStyle = theme => ({
  parallax: {
    height: "30vh"
  },
  container: {
    zIndex: "6",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "0px auto 0",
    color: "#FFFFFF"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-30px 15px 0px",
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
  input: {
    width: "150%",
    boxSizing: "border-box"
  },
  resize: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "3.3125rem",
    lineHeight: "1.15em"
  },
  tag: {
    margin: "0px",
    padding: "0px"
  },
  inputRoot: {
    color: "#fff",
    fontSize: "1.3rem",
    lineHeight: "1.15em",
    width: "100%",
    "&$cssFocused": {
      color: "white"
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    color:"#fff",
     width: 120,
    "&$cssFocused $notchedOutline": {
      borderColor: "white",
    },
  },
  notchedOutline: {
    borderColor: "#fff",
    
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    borderColor: "#fff",
    transition: theme.transitions.create("width"),
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "3.3125rem",
    lineHeight: "1.15em",
    width: "100%",
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px"
      }
    }
  },
  gridList: {
    justify: "center",
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
});

export default searchPageStyle;

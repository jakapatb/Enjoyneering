import { title } from "assets/jss/material-kit-react.jsx";

const productStyle = theme => ({
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999",
    whiteSpace: "pre-line"
  },
  commentList: {
    width: "100%",
    transition: theme.transitions.create("height"),
    backgroundColor: theme.palette.background.paper
  }
});

export default productStyle;

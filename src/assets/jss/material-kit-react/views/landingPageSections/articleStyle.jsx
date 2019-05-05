import { title } from "assets/jss/material-kit-react.jsx";

const articleStyle = {
  section: {
    padding: "0 0"
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
  buttonList: {
    flexGrow: 1,
    width: "100%"
  }
};

export default articleStyle;

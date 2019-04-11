import { title } from "assets/jss/material-kit-react.jsx";

const productStyle = {
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
    color: "#999"
  },
  image: {
    maxWidth: "100%",
    width: "auto",
    objectFit: "cover",
    transform: "translate3d(0, -60px, 0)"
  }
};

export default productStyle;
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
    display: "block",
    maxWidth: "100%",
    width: "auto",
    objectFit: "contain",
  },
  zone: {
    position: "relative",
    textAlign: "center",
    backgroundPosition: "center center",
    maxWidth: "100%",
    width: "auto",
    objectFit: "cover",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "none",
    transition: "border .24s ease-in-out"
  },
  dropZone: {
    padding:"50px 0",
    position: "relative",
    textAlign: "center",
    backgroundPosition: "center center",
    maxWidth: "100%",
    width: "auto",
    objectFit: "cover",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    color: "black",
    outline: "none",
    transition: "border .24s ease-in-out"
  },
  OverImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50% )",
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  textInImage: {
    backgroundColor: "#fff",
    opacity: 0.5,
    color: "#000",
  }
};

export default productStyle;

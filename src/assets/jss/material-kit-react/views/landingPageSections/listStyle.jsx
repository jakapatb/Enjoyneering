 import { container } from "assets/jss/material-kit-react.jsx";

const listStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    margin:"auto",
    padding: "60px 60px 60px 60px",
    color: "#000",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#eeeeee"
  },
  gridList: {
    height: "auto",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    background: "##3f3631",
    border: {
      radius: 10
    }
  },
  view: {
    "&:hover": {
      color: "#ff7043"
    }
  }
});

export default listStyle;

 
 
 
 
 

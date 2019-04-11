import React from 'react'
// nodejs library that concatenates classes
//import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import loaderStyle from "assets/jss/material-kit-react/components/loaderStyle.jsx";

function Loader({ ...props }) {
    const { classes } = props;
    return (<CircularProgress className={classes.progress} size={150}/>)
}


export default withStyles(loaderStyle)(Loader);
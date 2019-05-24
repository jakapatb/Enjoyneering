import React from "react";
import { Link } from "react-router-dom";
// material-ui components
import withWidth from "@material-ui/core/withWidth";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import thumbnail from "assets/img/thumbnail.jpg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { getUserFromUid } from "../../../actions/helpers";
var moment = require("moment");

//import * as moment from 'moment';
const style = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: "#ffffff",
    minWidth: 480,
    maxWidth: 1100,
    height: 200,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 20,
      marginRight: 10
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 540,
      marginBottom: 30,
      marginRight: 15
    }
    //
  },
  bigImage: {
    width: 500,
    [theme.breakpoints.up("lg")]: {
      width: 550 //! should change
      //flex:1,
      // height: 300
    }
  },
  image: {
    width: 250,
    height: 200,
    [theme.breakpoints.up("lg")]: {
      width: 270,
      height: 200
    }
  },
  img: {
    width: "inherit",
    minWidth: 250,
    maxWidth: 500,
    height: 200,
    objectPosition: "center",
    objectFit: "cover",
    [theme.breakpoints.up("lg")]: {
      minWidth: 270,
      maxWidth: 550,
      height: 200
    }
  },
  gridList: {
    flexWrap: "warp",
    width: "inherit",
    height: "inherit",
    [theme.breakpoints.up("md")]: {
      flexWrap: "inherit"
    }
  },
  gridImg: {
    width: "inherit"
  },
  details: {
    marginTop: 10,
    marginLeft: 10,
    width: 250,
    [theme.breakpoints.up("lg")]: {
      width: 270
    }
  }
});


class SectionPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.hit.imgUrl || thumbnail,
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ imgUrl: nextProps.hit.imgUrl });
  }
  render() {
    const { classes, hit,isPublic,recommend } = this.props;
    const { imgUrl,id } = this.state;
    return (
      (isPublic ? hit.public === isPublic : true) &&
      (recommend ? hit.recommend && recommend : true) && (
        <Link
          to={{
            pathname: "/landing-page/" + hit.objectID,
            state: { id: hit.objectID }
          }}
        >
          <Paper className={classes.paper} elevation={3}>
            <Grid container className={classes.gridList}>
              <Grid item className={classes.gridImg}>
                <ButtonBase
                  className={
                    id % 5 === 0 ? classes.bigImage : classes.image
                  }
                >
                  <img className={classes.img} alt="complex" src={imgUrl} />
                </ButtonBase>
              </Grid>
              <Grid item md={12} sm container className={classes.details}>
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <Typography variant={"h5"}>
                      {hit.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      paragraph
                      variant="subtitle1"
                    >
                      {hit.subtitle.length > (id % 5 === 0 ? 125 : 90)
                        ? hit.subtitle.substring(id % 5 === 0 ? 125 : 90) +
                          "..."
                        : hit.subtitle}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{ cursor: "pointer" }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {moment(hit.date).fromNow()}
                    </Typography>
                  </Grid>
                </Grid>
                {/**<Grid item>
                  <Typography variant="subtitle1">$19.00</Typography>
                </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        </Link>
      )
    );
  }
};


export default withWidth()(withStyles(style)(SectionPost));
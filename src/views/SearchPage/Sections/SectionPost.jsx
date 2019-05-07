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
import Chip from "@material-ui/core/Chip";
import { getUserFromUid } from "../../../actions/helpers";
import Avatar from "@material-ui/core/Avatar";
var moment = require("moment");

//import * as moment from 'moment';
const style = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: 0,
    backgroundColor: "#eeeeee"
    //maxWidth: 500
  },
  bigImage: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // width: 500, //! should change
      //flex:1,
      // height: 300
    }
  },
  image: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      height: 198
    }
  },
  img: {
    position: "relative",
    margin: "auto",
    display: "block",
    width: "100%",
    overflow: "hidden",
    height: "100%",
    objectFit: "cover"
  },
  gridList: {
    flexWrap: "warp",
    [theme.breakpoints.up("md")]: {
      flexWrap: "inherit"
    }
  },
  gridImg: {
    width: "100%",
    height: "100%",
  },
  details: {
    [theme.breakpoints.up("md")]: {
      marginTop: 20
    }
  }
});

class SectionPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.hit.imgUrl || thumbnail,
      owners: [],
      other:0
    };
  }
  componentDidMount() {
    this.mappingUid(this.props.hit.ownerUid);
  }
  componentWillReceiveProps(nextProps) {
    this.mappingUid(nextProps.hit.ownerUid);
  }
  mappingUid = ownerUid => {
    let promises = ownerUid.filter((_,i)=>i<=0).map(async uid => await getUserFromUid(uid));
    Promise.all(promises).then(owners => {
      this.setState({ owners: owners ,other:ownerUid.length-1});
    });
  };
  render() {
    const { classes, hit,isPublic,recommend } = this.props;
    const { imgUrl, owners,other } = this.state;
    return (
      (isPublic ? hit.public === isPublic : true) &&
      (recommend ? hit.recommend && recommend : true) && (
        <Link
          to={{
            pathname: "/landing-page/" + hit.objectID,
            state: { id: hit.objectID }
          }}
        >
          <Paper className={classes.paper}>
            <Grid container spacing={16} className={classes.gridList}>
              <Grid item className={classes.gridImg}>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={imgUrl} />
                </ButtonBase>
              </Grid>
              <Grid
                item
                md={12}
                sm
                container
                spacing={16}
                className={classes.details}
              >
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography variant={"h5"}>{hit.title}</Typography>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      paragraph
                      variant="subtitle1"
                    >
                      {hit.subtitle.length > 150
                        ? hit.subtitle.substring(150) + "..."
                        : hit.subtitle}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {owners.map((user, key) => (
                      <Link to={"/profile/?uid=" + user.uid}>
                        <Chip
                          avatar={
                            <Avatar alt="Owner" src={user.photoURL} />
                          }
                          label={user.displayName}
                          className={classes.chip}
                          variant="outlined"
                          color="primary"
                          clickable
                        />
                      </Link>
                    ))}
                    {other > 0 && (
                      <Typography color="textSecondary" variant="p" inline>
                        and {" " + other} more
                      </Typography>
                    )}
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
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

///import * as moment from 'moment';
const style = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: "#ffffff",

    [theme.breakpoints.up("sm")]: {
      minWidth: 480,
      maxWidth: 1100,
      marginBottom: 20,
      marginRight: 10,
      height: 200
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 540,
      marginBottom: 30,
      marginRight: 15
    }
    //
  },
  bigImage: {
    width: "100%",
    height: 200,
    [theme.breakpoints.up("sm")]: {
      width: 500
    },
    [theme.breakpoints.up("lg")]: {
      width: 550
    }
  },
  image: {
    width: "100%",
    height: 200,
    [theme.breakpoints.up("sm")]: {
      width: 250
    },
    [theme.breakpoints.up("lg")]: {
      width: 270
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
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      width: 250
    },
    [theme.breakpoints.up("lg")]: {
      width: 270
    }
  }
});
class SectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.data.imgUrl || thumbnail,
      owners: [],
      other: 0
    };
  }
  componentDidMount() {
    //this.mappingUid(this.props.data.ownerUid);
  }
  componentWillReceiveProps(nextProps) {
    //this.mappingUid(nextProps.data.ownerUid);
  }
  /**
 *   mappingUid = ownerUid => {
    let promises = ownerUid.filter((_,i)=>i<=(this.props.id===0?2:0)).map(async uid => await getUserFromUid(uid));
    Promise.all(promises).then(owners => {
      this.setState({ owners: owners ,other:ownerUid.length-(this.props.id===0?3:1)});
    });
  };
 */
  render() {
    const { classes, data, id } = this.props;
    const { imgUrl, owners, other } = this.state;
    return (
      <Link
        to={{
          pathname: "/landing-page/" + data.id,
          state: { id: data.id }
        }}
      >
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={0} className={classes.gridList}>
            <Grid item className={classes.gridImg}>
              <ButtonBase className={classes.bigImage}>
                <img className={classes.img} alt="complex" src={imgUrl} />
              </ButtonBase>
            </Grid>
            <Grid item md={12} sm container className={classes.details}>
              <Grid item xs container direction="column">
                <Grid item xs spacing={0}>
                  <Typography variant={"h5"}>{data.title}</Typography>
                  <Typography
                    gutterBottom
                    color="textSecondary"
                    paragraph
                    variant="subtitle1"
                  >
                    {data.subtitle.length > 125
                      ? data.subtitle.substring(0, 125) + "..."
                      : data.subtitle}
                  </Typography>
                </Grid>
                <Grid item style={{ marginBottom: 10 }}>
                  {/*owners.map((user, key) => (
                    <Link to={"/profile/?uid=" + user.uid}>
                      <Chip
                        avatar={<Avatar alt="Owner" src={user.photoURL} />}
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
                  )*/}
                  <Typography
                    style={{ cursor: "pointer" }}
                    variant="body1"
                    color="textSecondary"
                  >
                    {moment(data.date.toDate()).fromNow()}
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
    );
  }
};


export default withWidth()(withStyles(style)(SectionCard));
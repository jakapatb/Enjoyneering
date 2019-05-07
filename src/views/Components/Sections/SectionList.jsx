import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import listStyle from "assets/jss/material-kit-react/views/landingPageSections/listStyle.jsx";
import GridListTile from "@material-ui/core/GridListTile";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchListPost, clearListPost } from "actions/index.js";
import SectionCard from "./SectionCard.jsx";

class SectionList extends React.Component {
  componentDidMount() {
    const { listName, condition} = this.props;
    this.props.fetchListPost(listName,condition);
  }
  componentWillUnmount(){
    this.props.clearListPost()
  }
  render() {
    const { list, classes, listName, type } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography component="h3" variant="h3">
              {this.props.title}
            </Typography>
            <Link to={"/search?p=" + type[0] + "&r=" + type[1]}>
              <Typography component="h3" variant="h5" className={classes.view}>
                View more ›
              </Typography>
            </Link>
          </GridContainer>

          <GridContainer justify="center">
            <GridList
              className={classes.gridList}
              cellHeight={"auto"}
              spacing={32}
              cols={isWidthUp("sm", this.props.width) ? 2 : 1}
            >
              {list.hasRecent &&
                Array.isArray(list[listName]) &&
                list[listName].map((post, index) => (
                  <GridListTile
                    key={index}
                    cols={
                      index === 0
                        ? isWidthUp("md", this.props.width)
                          ? 2
                          : 1
                        : 1
                    }
                    rows={
                      index === 0
                        ? isWidthUp("md", this.props.width)
                          ? 2
                          : 1
                        : 1
                    }
                  >
                    <SectionCard data={post} key={index} id={index} />
                  </GridListTile>
                ))}
            </GridList>
          </GridContainer>
          {/**        <Link to={"/search?p=" + type[0] + "&r=" + type[1]}>
            <Button type="button" color="primary">
              View More »
            </Button>
          </Link> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  list: state.listPost
});

const mapDispatchToProps = {
  fetchListPost,
  clearListPost
};

export default compose(
  withWidth(),
  withStyles(listStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SectionList);

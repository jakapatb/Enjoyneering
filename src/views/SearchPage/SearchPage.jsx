import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import SearchIcon from "@material-ui/icons/SearchRounded";
import GridList from "@material-ui/core/GridList";
// core components
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import searchPageStyle from "assets/jss/material-kit-react/views/searchPage.jsx";
import { InstantSearch,connectSearchBox ,connectHits } from "react-instantsearch-dom";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchListPost} from "actions/index.js";

import SectionList from "./Sections/SectionList";
import TextField from "@material-ui/core/TextField";
const dashboardRoutes = [];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.history.location.search);
    const search = params.get("s");
    this.state = {
      type: "title",
      search: search,
      searching: false,
      checkedA: false,
      checkedB: false,
      seePrivate: false
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);
    const search = params.get("s");
    this.setState({search:search})
    console.log(params.get("p"),params.get("r"))
    if (this.props.auth.status !== "visitor") {
      this.setState({seePrivate:true})
      if (params.get("p") !== undefined) {
        this.setState({ checkedA: params.get("p") === "1" ? true : false });
      }
    }
    if (params.get("r") !== undefined) {
      this.setState({ checkedB: params.get("r") === "1" ? true : false });
    }
  }

  handleSearch = value => {
    this.setState({ search: value ,searching: true });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { auth, classes, ...rest } = this.props;
    const { search, checkedA, checkedB ,seePrivate } = this.state;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Enjoyneering"
          rightLinks={<HeaderLinks search={"search"} />}
          fixed
          changeColorOnScroll={{ height: 400, color: "white" }}
          {...rest}
        />
        <InstantSearch
          appId="81E61Q7CM2"
          apiKey="84cb8efd13a49bcd5f78ffbf5482c6f5"
          indexName="Enjoyneering"
        >
          <header>
            <Parallax
              filter
              className={classes.parallax}
         
            >
              <div className={classes.container}>
                <GridContainer xs={12} sm={12} md={12}>
                  <GridItem>
                    <FormGroup row>
                      {seePrivate && (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedA}
                              onChange={this.handleChange("checkedA")}
                              value="checkedA"
                            />
                          }
                          label="Public only"
                        />
                      )}
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange("checkedB")}
                            value="Recommend only"
                            color="primary"
                          />
                        }
                        label="Recommend"
                      />
                    </FormGroup>
                  </GridItem>
                  <ConnectSearchBox
                    search={search}
                    handleSearch={this.handleSearch}
                    classes={classes}
                  />
                </GridContainer>
              </div>
            </Parallax>
          </header>
          <main>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridList className={classes.gridList} cols={2.5}>
                    <ConntectHits
                      isPublic={checkedA}
                      recommend={checkedB}
                    />
                  </GridList>
                </GridContainer>
              </div>
            </div>
          </main>
        </InstantSearch>
        <Footer />
      </div>
    );
  }
}

const Hits =({hits ,isPublic ,recommend }) => {
  return (
    <SectionList hits={hits} isPublic={isPublic} recommend={recommend} />
  );
}



//TODO Change CSS 
const SearchBox = ({refine, search, handleSearch,classes }) => {
useEffect(() => {
  refine(search);
},[]);
  return (
    <ListItem className={classes.listItem}>
      <TextField
        id="outlined-dense"
        label="Search"
        margin="dense"
        variant="outlined"
        InputProps={{
          value: search,
          endAdornment: (
            <IconButton
              className={classes.iconButton}
              color="inherit"
              aria-label="Search"
              onClick={()=>{
                refine(search);
              }}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          ),
          className: classes.inputInput,
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        }}
        InputLabelProps={{
          classes: {
            root: classes.inputRoot,
            focused: classes.cssFocused
          }
        }}
        onChange={event=>handleSearch(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter" && event.target.value !== null) {
            refine(search);
          }
        }}
      />
    </ListItem>
  );
};
const ConntectHits = connectHits(Hits);
const ConnectSearchBox = connectSearchBox(SearchBox);

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    fetchListPost,

};

export default compose(
  withStyles(searchPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchPage);

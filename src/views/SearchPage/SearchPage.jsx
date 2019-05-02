import React from "react";
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
import InputAdornment from "@material-ui/core/InputAdornment";
// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchListPost} from "actions/index.js";
import SectionPost from "./Sections/SectionPost";
import TextField from "@material-ui/core/TextField";
const dashboardRoutes = [];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "title",
      search: null,
      searching: false,
      checkedA: false,
      checkedB: false
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search);
    const search = params.get("s");
    if(params.get("p")!==undefined){
      this.setState({checkedA:params.get("p")==1?(true):(false)})
    }
    if (params.get("r") !== undefined) {
      this.setState({ checkedB: params.get("r") == 1 ? true : false });
    }
    const { type } = this.state;
    this.getList(type, search);
  }

  getList = (type, search) => {
    var condition = [];
    console.log(search);
    if (search !== null && search !== "") {
      if (type === "tags") {
        condition[1] = "array-contains";
      } else {
        condition[1] = "==";
      }
      condition[0] = type;
      condition[2] = search.toUpperCase();
    } else {
      condition = ["date", "<=", new Date()];
    }
    this.setState({
      search: search
    });
    this.props.fetchListPost(condition, 5);
  };

  handleSearch = event => {
    this.setState({ search: event.target.value, searching: true });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { list, classes, ...rest } = this.props;
    const { search, checkedA, checkedB } = this.state;
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
              image={require("assets/img/bg.jpg")}
            >
              <div className={classes.container}>
                <GridContainer xs={12} sm={12} md={12}>
                  <ConnectSearchBox
                    search={search}
                    handleSearch={this.handleSearch}
                    classes={classes}
                  />

                  <GridItem>
                    <FormGroup row>
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
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange("checkedB")}
                            value="Recommend only"
                            color="primary"
                          />
                        }
                        label="Primary"
                      />
                    </FormGroup>
                  </GridItem>
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
  return hits.map(hit => (
    <SectionPost hit={hit} key={hit.objectID} isPublic={isPublic} recommend={recommend} />
  ));
}



//TODO Change CSS 
const SearchBox = ({refine, search, handleSearch,classes }) => {
  return (
    <ListItem className={classes.listItem}>
      <TextField
        id="outlined-dense"
        label="Search"
        margin="dense"
        variant="outlined"
        inputProps={{
          className: classes.inputInput
        }}
        InputProps={{
          value: search,
          onChange: handleSearch,
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon fontSize="large" color="disabled" />
            </InputAdornment>
          ),
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
        onKeyPress={event => {
          if (event.key === "Enter" && event.target.value !== null) {
            refine(search);
            handleSearch(event);
          }
        }}
      />
    </ListItem>
  );
};
const ConntectHits = connectHits(Hits);
const ConnectSearchBox = connectSearchBox(SearchBox);

const mapStateToProps = state => ({
    list: state.listPost,
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

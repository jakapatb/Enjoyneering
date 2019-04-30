import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import GridList from "@material-ui/core/GridList";
// core components
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import searchPageStyle from "assets/jss/material-kit-react/views/searchPage.jsx";
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";

// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchListPost} from "actions/index.js";
import SectionPost from "./Sections/SectionPost";
const dashboardRoutes = [];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "title",
      search: null,
      searching:false
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const search = params.search
    const { type } = this.state;
    this.getList(type, search);
  }

  getList = (type, search) => {
    var condition = [];
    console.log(search)
    if (search !== null&&search!=="") {
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

  handleSearch=(event)=>{
    this.setState({ search: event.target.value, searching:true });
  }

  render() {
    const { list, classes, ...rest } = this.props;
    const { search} = this.state;
    return <div>
        <Header color="transparent" routes={dashboardRoutes} brand="Enjoyneering" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 400, color: "white" }} {...rest} />
        <InstantSearch appId="81E61Q7CM2" apiKey="84cb8efd13a49bcd5f78ffbf5482c6f5" indexName="Enjoyneering">
          <header>
            <Parallax filter className={classes.parallax} image={require("assets/img/landing-bg.jpg")}>
              <div className={classes.container}>
                <GridContainer xs={12} sm={12} md={12}>
                  <ConnectSearchBox search={search} handleSearch={this.handleSearch} classes={classes} />
                  <h1>{search}</h1>
                </GridContainer>
              </div>
            </Parallax>
          </header>
          <main>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridList className={classes.gridList} cols={2.5}>
                    <Hits hitComponent={SectionPost} />
                  </GridList>
                </GridContainer>
              </div>
            </div>
          </main>
        </InstantSearch>
        <Footer />
      </div>;
  }
}
//TODO Change CSS 
const SearchBox = ({refine, search, handleSearch,classes }) => {
  refine(search)
  return <ListItem className={classes.listItem}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} onKeyPress={event => {
          if (event.key === "Enter" && event.target.value !== null) {
            refine(event.currentTarget.value);
            handleSearch(event);
          }
        }} />
  </ListItem>;
};

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

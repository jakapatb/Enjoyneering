import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Favorite from "@material-ui/icons/Favorite";
import searchPageStyle from "assets/jss/material-kit-react/views/searchPage.jsx";
import { InstantSearch, Hits,SearchBox} from "react-instantsearch-dom";
// Sections for this page
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchListPost} from "actions/index.js";
import SectionPost from "./Sections/SectionPost";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
    const params = new URLSearchParams(this.props.history.location.search);
    const search = params.get("s");
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
  handleSubmitSearch = event => {
    if (event.key === "Enter"){
      if(event.target.value!==""){
        this.getList(this.state.type, event.target.value)
        this.setState({ search: event.target.value, searching: false });
        this.props.history.push('/search/?s=' + event.target.value)
      }
      }
      
  };

  render() {
    const { list, classes, ...rest } = this.props;
    const { search, searching} = this.state;
    return <div>
        <Header color="transparent" routes={dashboardRoutes} brand="Enjoyneering" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 400, color: "white" }} {...rest} />
        <Parallax filter className={classes.parallax} image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                  className={classes.input}
                  labelText="Search Here"
                  id="title"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleSearch,
                    onKeyPress: this.handleSubmitSearch
                  }}
                  inputProps={{
                    classes: { input: classes.resize },
                    value: search,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon className={classes.searchIcon} />
                      </InputAdornment>
                    )
                  }}
                />  
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.title}>
                  {!searching ? (
                    <h3>Result: {search}</h3>
                  ) : (
                    <h3>please press Enter</h3>
                  )}
                </div>
              </GridItem>
              {list.hasRecent && list.recent.map((post, index) => (
                  <SectionPost data={post} key={index} />
                ))}
              {/* <InstantSearch appId="Enjoyneering" apiKey="84cb8efd13a49bcd5f78ffbf5482c6f5" indexName="bestbuy">
                <header>
                  <SearchBox translations={{ placeholder: "search" }} />
                </header>
                <main>
                  <Hits hitComponent={Hit} />
                </main>
              </InstantSearch> */}
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>;
  }
}
const mapStateToProps = state => ({
    list: state.listPost,
});

const mapDispatchToProps = {
    fetchListPost,

};

const Hit=({hit})=><div>
  <div>
    <img src={hit.image}/>
    <p>{hit.title}</p>
  </div>
</div>


export default compose(
  withStyles(searchPageStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchPage);

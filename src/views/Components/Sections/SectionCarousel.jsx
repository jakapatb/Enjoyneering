import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import SectionChildCarousel from "./SectionChildCarousel.jsx";
import { connect } from "react-redux";
import { fetchListPopPost} from "actions/index.js";
class SectionCarousel extends React.Component {
  componentDidMount = () => {
    this.props.fetchListPopPost();
  }
  
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    const { list } = this.props;
    return (<GridContainer>
      <GridItem xs={12} sm={12} md={12} style={{padding:"0 0 0 0 "}}>
        <Card>
          <Carousel {...settings}>
            {list.hasPop && list.popular.map((post,index)=><SectionChildCarousel key={index} post={post}/>)}
          </Carousel>
        </Card>
      </GridItem>
    </GridContainer>);
  }
}
const mapStateToProps = (state) => ({
  list: state.listPost
})

const mapDispatchToProps = {
  fetchListPopPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCarousel);
import React from "react";
import { Link } from "react-router-dom";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import image from "assets/img/Carousel.jpg";
class SectionCarousel extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <Carousel {...settings}>
            <Link to="/landing-page?x=1">
                <div>
                  <img src={image} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4>
                  </div>
                </div>
              </Link>
              <Link to="/landing-page?x=2">
                <div>
                  <img src={image} alt="Second slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Somewhere Beyond, United States
                    </h4>
                  </div>
                </div>
              </Link>
              <Link to="/landing-page?x=3">
                <div>
                  <img src={image} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4>
                  </div>
                </div>
              </Link>
            </Carousel>
          </Card>
        </GridItem>
      </GridContainer>;
  }
}

export default SectionCarousel;
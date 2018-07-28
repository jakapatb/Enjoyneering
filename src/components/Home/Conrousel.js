import React, {Component} from 'react';
import ConrouselItem from './ConrouselItem';
class Conrousel extends Component {
  render() {
    return (<div id="topCarousel" class="carousel slide " data-ride="carousel">
      {/* Indicators */}
      <ul class="carousel-indicators">
        <li data-target="#topCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#topCarousel" data-slide="1"></li>
        <li data-target="#topCarousel" data-slide="2"></li>
      </ul>
      {/* The slideshow */}
      <div class="carousel-inner">
        {
          this.props.item.map((item, index) => {
            console.log("The current iteration is: " + index);
            console.log("The current element is: " + item);
            console.log("\n");
            return <ConrouselItem index={index} item={item}/>;
          })
        }
      </div>
      {/* Left and right controls */}
      <a class="carousel-control-prev" href="#topCarousel" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#topCarousel" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>

    </div>);
  }
}
export default Conrousel;

import Carousel from "react-multi-carousel";
import ListWidget from "./list-widget";

import React, { Component } from "react";
 
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};

export default class WidgetCarousel extends Component {
    render() {
      return (
        <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay={false}
        autoPlaySpeed={2000}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        customTransition="all .2s linear"
        dotListClass=""
        draggable={false}
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={true}
        renderDotsOutside={true}
        responsive={responsive}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        transitionDuration={500}
        >
          {this.props.widgets.map((_widget, _id) => {
            return (
              <ListWidget 
                key={_id} 
                widget={_widget}
                handleToUpdate = {this.props.handleToUpdate}/>
            );
          })}
        </Carousel>
      );
    }
  }

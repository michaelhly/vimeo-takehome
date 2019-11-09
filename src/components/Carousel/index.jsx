import React, { useEffect, useReducer, useState } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import LoadingIcon from "../../LoadingIcon";
import { windowResizeListener } from "../../helpers";

import reducer from "./carouselReducer";
import Slide from "./Slide";
import SlideNav from "./SlideNav";

const Carousel = props => {
  const { carouselAssets } = props;
  const [currIdx, dispatch] = useReducer(reducer, 0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    windowResizeListener(window, handleWindowResize);
  }, []);

  return (
    <section className="hero">
      <CarouselWrapper>
        {carouselAssets.length === 0 ? (
          <LoadingIcon />
        ) : (
          <>
            <Slide
              currSlide={carouselAssets[currIdx]}
              windowWidth={windowWidth}
            />
            <SlideNav dispatch={dispatch} totalSlides={carouselAssets.length} />
          </>
        )}
      </CarouselWrapper>
    </section>
  );
};

export default Carousel;

Carousel.defaultProps = {
  carouselAssets: []
};

Carousel.propTypes = {
  carouselAssets: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      link: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      pictures: propTypes.array.isRequired
    })
  )
};

const CarouselWrapper = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`;

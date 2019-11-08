import React, { useEffect, useReducer, useState } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import reducer from "./carouselReducer";
import LoadingIcon from "../../LoadingIcon";
import Slide from "./Slide";
import { windowResizeListener } from "../../helpers";

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
          <Slide
            currSlide={carouselAssets[currIdx]}
            windowWidth={windowWidth}
          />
        )}
      </CarouselWrapper>
    </section>
  );
};

export default Carousel;

Carousel.propTypes = {
  carouselAssets: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.string,
      propTypes.string,
      propTypes.string,
      propTypes.array
    ])
  ).isRequired
};

const CarouselWrapper = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`;

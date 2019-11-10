import React, { useReducer } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { navigationEnums } from "../../enums";
import useWindowListener from "../../hooks/windowListener";

import LoadingIcon from "../LoadingIcon";

import { reducer, setState } from "./carouselReducer";
import Slide from "./Slide";
import SlideNav from "./SlideNav";
import SlideTransition from "./SlideTransition";

const Carousel = props => {
  const { carouselAssets } = props;
  const windowWidth = useWindowListener();
  const [carouselState, dispatch] = useReducer(reducer, setState(0, false));

  const handleSlideTransition = navigation => {
    const totalSlides = carouselAssets.length;
    dispatch({ type: navigation, totalSlides });
    setTimeout(() => {
      dispatch({ type: navigationEnums.NO_MOVE, totalSlides });
    }, 500);
  };

  const currSlide = carouselAssets[carouselState.currIndex];

  return (
    <section className="hero">
      <CarouselWrapper>
        {currSlide === undefined || currSlide === null ? (
          <LoadingIcon />
        ) : (
          <>
            <SlideTransition
              animate={carouselState.animate}
              currSlideId={currSlide.id}
            >
              <Slide currSlide={currSlide} windowWidth={windowWidth} />
            </SlideTransition>
            <SlideNav transitionHandler={handleSlideTransition} />
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

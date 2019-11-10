import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

import Description from "../Description";

const Slide = props => {
  const { currSlide, windowWidth } = props;
  const MAX_TEXT_LENGTH = 100;
  const MOBILE_BREAKPOINT = 768;
  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  return (
    <>
      <Background image={currSlide.pictures[7].link} />
      <SlideContainer>
        <div
          className="columns is-vcentered is-gapless"
          style={{ height: "400px" }}
        >
          <div className="column is-two-fifths has-text-centered">
            <img alt="cover-art" src={currSlide.pictures[2].link} />
          </div>
          <div className={`column ${isMobile ? "has-text-centered" : ""}`}>
            <Description
              maxTextLength={MAX_TEXT_LENGTH}
              hideSubtextOnMobile={isMobile}
              title={currSlide.name}
              subtext={currSlide.description}
              textColor="black"
            />
            <ActionItems isMobile={isMobile} videoLink={currSlide.link} />
          </div>
        </div>
      </SlideContainer>
    </>
  );
};

export default Slide;

Slide.propTypes = {
  currSlide: propTypes.shape({
    id: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    link: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    pictures: propTypes.array.isRequired
  }).isRequired,
  windowWidth: propTypes.number.isRequired
};

const Background = styled.div`
  position: absolute;
  background-image: url(${props => props.image});
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  z-index: 1;
  opacity: 0.2;
`;

const SlideContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  padding: 30px 50px;
`;

const ActionItems = props => {
  const { isMobile, videoLink } = props;
  const styles = isMobile
    ? { justifyContent: "center", marginTop: "-1.5rem" }
    : { paddingLeft: "1.5rem" };
  return (
    <div className="field is-grouped" style={styles}>
      <p className="control">
        <a className="button" href="https://vimeo.com/errorpage">
          Buy Now
        </a>
      </p>
      <p className="control">
        <a className="button" href={videoLink}>
          Watch Trailer
        </a>
      </p>
    </div>
  );
};

ActionItems.propTypes = {
  isMobile: propTypes.bool.isRequired,
  videoLink: propTypes.string.isRequired
};

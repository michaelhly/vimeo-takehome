import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { OrientationEnums } from "../../enums";

const SlideNav = () => {
  return (
    <NavWrapper>
      <NavArrow orientation={OrientationEnums.LEFT} />
      <NavArrow orientation={OrientationEnums.RIGHT} />
    </NavWrapper>
  );
};

export default SlideNav;

const NavWrapper = styled.div`
  position: relative;
  z-index: 3;
  max-width: 100.625rem;
  height: 100%;
  pointer-events: none;
  margin: 0 3.4374rem;
`;

const ArrowLinkWrapper = styled.a`
  position: absolute;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.625rem;
  display: inline-block;
  opacity: 0.4;
  transition: opacity 0.2s ease;
  pointer-events: auto;
  ${props => props.direction}: -3.4375rem;
`;

const NavArrow = props => {
  const { orientation } = props;
  const arrowDirection =
    orientation === OrientationEnums.LEFT
      ? "fa-chevron-left"
      : "fa-chevron-right";
  const alignmentDirection =
    orientation === OrientationEnums.LEFT ? "left" : "right";
  return (
    <ArrowLinkWrapper direction={alignmentDirection}>
      <span className="icon">
        <i className={`fas ${arrowDirection}`} />
      </span>
    </ArrowLinkWrapper>
  );
};

NavArrow.propTypes = {
  orientation: propTypes.number.isRequired
};

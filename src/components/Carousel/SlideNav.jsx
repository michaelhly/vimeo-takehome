import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { OrientationEnums, navigationEnums } from "../../enums";

const SlideNav = props => {
  const { transitionHandler } = props;
  return (
    <NavWrapper>
      <NavArrow
        orientation={OrientationEnums.LEFT}
        transitionHandler={transitionHandler}
      />
      <NavArrow
        orientation={OrientationEnums.RIGHT}
        transitionHandler={transitionHandler}
      />
    </NavWrapper>
  );
};

export default SlideNav;

SlideNav.propTypes = {
  transitionHandler: propTypes.func.isRequired
};

const NavWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 3.4374rem;
  z-index: 3;
`;

const ArrowLinkWrapper = styled.a`
  position: absolute;
  top: 50%;
  padding: 0.625rem;
  ${props => props.direction}: -3.4375rem;
`;

const NavArrow = props => {
  const { orientation, transitionHandler } = props;
  const arrowDirection =
    orientation === OrientationEnums.LEFT
      ? "fa-chevron-left"
      : "fa-chevron-right";
  const alignmentDirection =
    orientation === OrientationEnums.LEFT ? "left" : "right";
  const navigation =
    orientation === OrientationEnums.LEFT
      ? navigationEnums.BACK
      : navigationEnums.NEXT;
  return (
    <ArrowLinkWrapper
      direction={alignmentDirection}
      onClick={() => {
        transitionHandler(navigation);
      }}
    >
      <span className="icon">
        <i className={`fas ${arrowDirection}`} />
      </span>
    </ArrowLinkWrapper>
  );
};

NavArrow.propTypes = {
  orientation: propTypes.number.isRequired,
  transitionHandler: propTypes.func.isRequired
};

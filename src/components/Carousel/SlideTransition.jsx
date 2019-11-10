import React from "react";
import propTypes from "prop-types";
import { Transition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";

const SlideTransition = props => {
  const { currSlideId, animate } = props;
  return (
    <TransitionGroup>
      <Transition key={currSlideId} in={animate} timeout={1000}>
        {state => (
          <TransitionAnimation state={state}>
            {props.children}
          </TransitionAnimation>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default SlideTransition;

SlideTransition.propTypes = {
  children: propTypes.node.isRequired,
  currSlideId: propTypes.string.isRequired,
  animate: propTypes.bool.isRequired
};

const TransitionAnimation = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  opacity: ${({ state }) => {
    return state === "entered" || state === "exited" ? "1" : "0";
  }};
  transition: opacity 1s ease-in-out;
`;

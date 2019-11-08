import React from "react";
import propTypes from "prop-types";

import { truncateText } from "../helpers";

const Description = props => {
  const {
    maxTextLength,
    hideSubtextOnMobile,
    subtext,
    textColor,
    title
  } = props;

  const textStyles = {
    color: `${textColor}`
  };

  return (
    <section className="section">
      <h1 className="title" style={textStyles}>
        {truncateText(title, maxTextLength)}
      </h1>
      {hideSubtextOnMobile ? (
        <></>
      ) : (
        <h2 className="subtitle" style={textStyles}>
          {truncateText(subtext, maxTextLength)}
        </h2>
      )}
    </section>
  );
};

export default Description;

Description.defaultProps = {
  maxTextLength: 500,
  hideSubtextOnMobile: false,
  textColor: "black"
};

Description.propTypes = {
  maxTextLength: propTypes.number,
  hideSubtextOnMobile: propTypes.bool,
  subtext: propTypes.string.isRequired,
  textColor: propTypes.string,
  title: propTypes.string.isRequired
};

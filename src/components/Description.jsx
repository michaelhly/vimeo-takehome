import React from "react";
import propTypes from "prop-types";

const Description = props => {
  const { subtext, textColor, title } = props;

  const textStyles = {
    color: `${textColor}`
  };

  return (
    <section className="section">
      <h1 className="title" style={textStyles}>
        {title}
      </h1>
      <h2 className="subtitle" style={textStyles}>
        {subtext}
      </h2>
    </section>
  );
};

export default Description;

Description.defaultProps = {
  subtext: true,
  textColor: true,
  title: true
};

Description.propTypes = {
  subtext: propTypes.string,
  textColor: propTypes.string,
  title: propTypes.string
};

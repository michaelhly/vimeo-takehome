import React from "react";
import propTypes from "prop-types";

const Video = props => {
  const { title, videoId } = props;
  return (
    <section className="section">
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        title={title}
        width="100%"
        height="250px"
        frameBorder="0"
      />
    </section>
  );
};

export default Video;

Video.defaultProps = {
  title: true,
  videoId: true
};

Video.propTypes = {
  title: propTypes.string,
  videoId: propTypes.string
};

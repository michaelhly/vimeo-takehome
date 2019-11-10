import React from "react";
import propTypes from "prop-types";

import { OrientationEnums } from "../enums";
import useWindowListener from "../hooks/windowListener";

import Description from "./Description";

const MediaObject = props => {
  const { orientation, subtext, textColor, title, videoId } = props;
  const windowWidth = useWindowListener();
  const MOBILE_BREAKPOINT = 768;

  return (
    <div className="columns is-vcentered is-gapless">
      {orientation === OrientationEnums.LEFT &&
      windowWidth > MOBILE_BREAKPOINT ? (
        <>
          <div className="column">
            <Video title={title} videoId={videoId} />
          </div>
          <div className="column">
            <Description
              title={title}
              subtext={subtext}
              textColor={textColor}
            />
          </div>
        </>
      ) : (
        <>
          <div className="column">
            <Description
              title={title}
              subtext={subtext}
              textColor={textColor}
            />
          </div>
          <div className="column">
            <Video videoId={videoId} />
          </div>
        </>
      )}
    </div>
  );
};

export default MediaObject;

MediaObject.defaultProps = {
  orientation: OrientationEnums.RIGHT,
  textColor: "black"
};

MediaObject.propTypes = {
  orientation: propTypes.number,
  subtext: propTypes.string.isRequired,
  textColor: propTypes.string,
  title: propTypes.string.isRequired,
  videoId: propTypes.string.isRequired
};

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
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </section>
  );
};

Video.defaultProps = {
  title: null
};

Video.propTypes = {
  title: propTypes.string,
  videoId: propTypes.string.isRequired
};

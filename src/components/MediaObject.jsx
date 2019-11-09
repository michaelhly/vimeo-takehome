import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

import { OrientationEnums } from "../enums";
import { windowResizeListener } from "../helpers";

import Description from "./Description";

const MediaObject = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { orientation, subtext, textColor, title, videoId } = props;
  const MOBILE_BREAKPOINT = 768;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    windowResizeListener(window, handleWindowResize);
  }, []);

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

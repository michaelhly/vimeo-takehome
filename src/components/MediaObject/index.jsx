import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

import { OrientationEnums } from "../../enums";
import { windowResizeListener } from "../../helpers";

import Description from "../Description";
import Video from "./Video";

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

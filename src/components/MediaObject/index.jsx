import React from "react";
import propTypes from "prop-types";

import { OrientationEnums } from "../../enums";

import Description from "./Description";
import Video from "./Video";

const MediaObject = props => {
  const { orientation, subtext, textColor, title, videoId } = props;

  return (
    <div className="columns is-vcentered is-gapless">
      {orientation === OrientationEnums.LEFT ? (
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
  orientation: true,
  subtext: true,
  textColor: true,
  title: true,
  videoId: true
};

MediaObject.propTypes = {
  orientation: propTypes.number,
  subtext: propTypes.string,
  textColor: propTypes.string,
  title: propTypes.string,
  videoId: propTypes.string
};

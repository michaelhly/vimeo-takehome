import React from "react";
import MediaObject from "./components/MediaObject";

import OrientationEnums from "./enums";
import { Primary, Secondaries } from "./videos.json";

const backgroundStyles = {
  backgroundImage: "linear-gradient(black, grey, transparent)",
  minWidth: "100%",
  marginTop: "128px",
  marginLeft: "-8px",
  marginRight: "-8px"
};

const App = () => {
  return (
    <>
      <div className="container">
        <MediaObject
          orientation={OrientationEnums.LEFT}
          textColor="black"
          title={Primary.title}
          subtext={Primary.subtext}
          videoId={Primary.videoId}
        />
      </div>
      <div className="background" style={backgroundStyles}>
        <div className="container" style={{ paddingTop: "32px" }}>
          {Secondaries.map((media, i) => {
            return (
              <MediaObject
                orientation={
                  i % 2 === 0 ? OrientationEnums.RIGHT : OrientationEnums.LEFT
                }
                textColor="white"
                title={media.title}
                subtext={media.subtext}
                videoId={media.videoId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;

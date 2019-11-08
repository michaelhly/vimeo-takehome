import React, { useState, useEffect } from "react";

import MediaObject from "./components/MediaObject";

import { OrientationEnums } from "./enums";
import { CarouselIds, PrimaryId, SecondaryIds } from "./videoIds.json";
import {
  getVideoAssetsAsync,
  getVideoAssetsBatchedAsync
} from "./vimeoClientHelpers";
import LoadingIcon from "./LoadingIcon";

const backgroundStyles = {
  backgroundImage: "linear-gradient(black, grey, transparent)",
  minWidth: "100%",
  marginTop: "128px",
  marginLeft: "-8px",
  marginRight: "-8px"
};

const App = () => {
  const [primaryVideo, setPrimaryVideo] = useState(null);
  const [secondaryVideos, setSecondaryVideos] = useState([]);
  const [carouselVideos, setCarouselVideos] = useState([]);
  useEffect(() => {
    const fetchVideoAssets = async () => {
      const primaryAssets = await getVideoAssetsAsync(PrimaryId);
      const secondaryAssets = await getVideoAssetsBatchedAsync(SecondaryIds);
      const carouselAssets = await getVideoAssetsBatchedAsync(CarouselIds);
      setCarouselVideos(carouselAssets);
      setPrimaryVideo(primaryAssets);
      setSecondaryVideos(secondaryAssets);
    };
    fetchVideoAssets();
  }, []);

  return (
    <>
      <div className="container">
        {primaryVideo === null ? (
          <LoadingIcon />
        ) : (
          <MediaObject
            orientation={OrientationEnums.LEFT}
            textColor="black"
            title={primaryVideo.name}
            subtext={primaryVideo.description}
            videoId={primaryVideo.id}
          />
        )}
      </div>
      <div className="background" style={backgroundStyles}>
        <div className="container" style={{ paddingTop: "32px" }}>
          {secondaryVideos.map((media, i) => {
            return (
              <MediaObject
                orientation={
                  i % 2 === 0 ? OrientationEnums.RIGHT : OrientationEnums.LEFT
                }
                textColor="white"
                title={media.name}
                subtext={media.description}
                videoId={media.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";

import Carousel from "./components/Carousel";
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
  const [primaryAssets, setPrimaryAssets] = useState(null);
  const [secondaryAssets, setSecondaryAssets] = useState([]);
  const [carouselAssets, setCarouselAssets] = useState([]);

  useEffect(() => {
    const fetchVideoAssets = async () => {
      const fetchedPrimaryAssets = await getVideoAssetsAsync(PrimaryId);
      const fetchedSecondaryAssets = await getVideoAssetsBatchedAsync(
        SecondaryIds
      );
      const fetchedCarouselAssets = await getVideoAssetsBatchedAsync(
        CarouselIds
      );
      setCarouselAssets(fetchedCarouselAssets);
      setPrimaryAssets(fetchedPrimaryAssets);
      setSecondaryAssets(fetchedSecondaryAssets);
    };
    fetchVideoAssets();
  }, []);

  return (
    <>
      <Carousel carouselAssets={carouselAssets} />
      <div className="container">
        {primaryAssets === null ? (
          <LoadingIcon />
        ) : (
          <MediaObject
            orientation={OrientationEnums.LEFT}
            title={primaryAssets.name}
            subtext={primaryAssets.description}
            videoId={primaryAssets.id}
          />
        )}
      </div>
      <div className="background" style={backgroundStyles}>
        <div className="container" style={{ paddingTop: "32px" }}>
          {secondaryAssets.map((media, i) => {
            return (
              <MediaObject
                key={media.name}
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

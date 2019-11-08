const Vimeo = require("vimeo").Vimeo;

const client = new Vimeo(
  process.env.REACT_APP_VIMEO_CLIENT_ID,
  process.env.REACT_APP_VIMEO_SECRET,
  process.env.REACT_APP_VIMEO_TOKEN
);

const MAX_DESCRIPTION_LENGTH = 445;

const LOREM_IPSUM_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const truncateDescription = description => {
  return description.length > MAX_DESCRIPTION_LENGTH
    ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
    : description;
};

const fetchVideoAssets = videoId => {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: `/videos/${videoId}`
      },
      (err, res) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve({
            id: videoId,
            name: res.name,
            description:
              res.description === null
                ? LOREM_IPSUM_TEXT
                : truncateDescription(res.description),
            type: res.type,
            pictures: res.pictures.sizes
          });
        }
      }
    );
  });
};

export const getVideoAssetsAsync = async videoId => {
  let assets = null;
  try {
    assets = await fetchVideoAssets(videoId);
  } catch (err) {
    console.error(err);
  } finally {
    return assets;
  }
};

export const getVideoAssetsBatchedAsync = async videoIds => {
  const promises = videoIds.map(videoId => fetchVideoAssets(videoId));
  let assets = [];
  try {
    assets = await Promise.all(promises);
  } catch (err) {
    console.error(err);
  } finally {
    return assets;
  }
};

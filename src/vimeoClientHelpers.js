/* eslint no-console: 0 */
const { Vimeo } = require("vimeo");

const client = new Vimeo(
  process.env.REACT_APP_VIMEO_CLIENT_ID,
  process.env.REACT_APP_VIMEO_SECRET,
  process.env.REACT_APP_VIMEO_TOKEN
);

const LOREM_IPSUM_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
            description:
              res.description === null ? LOREM_IPSUM_TEXT : res.description,
            link: res.link,
            name: res.name,
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
  }
  return assets;
};

export const getVideoAssetsBatchedAsync = async videoIds => {
  const promises = videoIds.map(videoId => fetchVideoAssets(videoId));
  let assets = [];
  try {
    assets = await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
  return assets;
};

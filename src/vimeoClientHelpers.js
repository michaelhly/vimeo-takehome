const Vimeo = require("vimeo").Vimeo;
const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_SECRET,
  process.env.VIMEO_TOKEN
);

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
            name: res.name,
            descript: res.description,
            type: res.type,
            link: res.link,
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

export const batchGetVideoAssetsAsync = async videoIds => {
  const promises = videoIds.map(videoId => fetchVideoAssets(videoId));
  let assets = null;
  try {
    assets = await Promise.all(promises);
  } catch (err) {
    console.error(err);
  } finally {
    return assets;
  }
};

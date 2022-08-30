const https = require("https");

const LOGIN = "";
const PASS = "";
const PREFIX = "gallery/sri";

const AUTHORIZATION = `Basic ${Buffer.from(`${LOGIN}:${PASS}`).toString(
  "base64"
)}`;
const IMAGE_URL = `https://api.cloudinary.com/v1_1/zinovik/resources/image?prefix=${PREFIX}&type=upload&max_results=500`;
const VIDEO_URL = `https://api.cloudinary.com/v1_1/zinovik/resources/video?prefix=${PREFIX}&type=upload&max_results=500`;

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization: AUTHORIZATION } }, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () =>
          resolve(JSON.parse(Buffer.concat(data).toString()))
        );
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

const getImageFilename = (url) => url.split("/").slice(-1)[0] || "";

(async () => {
  const [responseImages, responseVideo] = await Promise.all([
    request(IMAGE_URL),
    request(VIDEO_URL),
  ]);

  [...responseImages.resources, ...responseVideo.resources]
    .sort((resource1, resource2) =>
      getImageFilename(resource1.url).localeCompare(
        getImageFilename(resource2.url)
      )
    )
    .forEach((resource) =>
      console.log(`"${resource.url.replace("http", "https")}",`)
    );
  console.log(responseImages.resources.length);
  console.log(responseVideo.resources.length);
})();

const https = require("https");

const LOGIN = "";
const PASS = "";
const PREFIX = "maxhere/all-around-sri-lanka";

const AUTHORIZATION = `Basic ${Buffer.from(`${LOGIN}:${PASS}`).toString(
  "base64"
)}`;
const IMAGE_URL = `https://api.cloudinary.com/v1_1/zinovik/resources/image?prefix=${PREFIX}&type=upload&max_results=500`;
const VIDEO_URL = `https://api.cloudinary.com/v1_1/zinovik/resources/vide?prefix=${PREFIX}&type=upload&max_results=500`;

const request = () =>
  new Promise((resolve, reject) => {
    https
      .get(URL, { headers: { Authorization: AUTHORIZATION } }, (res) => {
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
  const responseImages = await request(IMAGE_URL);

  [...responseImages.resources]
    .sort((resource1, resource2) =>
      getImageFilename(resource1.url).localeCompare(
        getImageFilename(resource2.url)
      )
    )
    .forEach((resource) => console.log(resource.url));
  console.log(response.resources.length);

  const responseVideo = await request(VIDEO_URL);

  [...responseVideo.resources]
    .sort((resource1, resource2) =>
      getImageFilename(resource1.url).localeCompare(
        getImageFilename(resource2.url)
      )
    )
    .forEach((resource) => console.log(resource.url));
  console.log(response.resources.length);
})();

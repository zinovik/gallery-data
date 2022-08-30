const https = require("https");
const fs = require("fs");

const LOGIN = "";
const PASS = "";
const PREFIXES = [
  "gallery/zanzibar",
  "gallery/naliboki",
  "gallery/sakartvelo",
  "gallery/zalessie",
  "gallery/sri-lanka",
  "gallery/board-games",
];
const IMAGES_URL_FILE = "./image-urls.json";

const Authorization = `Basic ${Buffer.from(`${LOGIN}:${PASS}`).toString(
  "base64"
)}`;

const getCloudinaryUrl = (prefix, isVideo = false) =>
  `https://api.cloudinary.com/v1_1/zinovik/resources/${
    isVideo ? "video" : "image"
  }?prefix=${prefix}&type=upload&max_results=500`;

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization } }, (res) => {
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

const getPrefixUrls = async (prefix) => {
  const [responseImages, responseVideo] = await Promise.all([
    request(getCloudinaryUrl(prefix)),
    request(getCloudinaryUrl(prefix, true)),
  ]);

  return [...responseImages.resources, ...responseVideo.resources]
    .sort((resource1, resource2) =>
      getImageFilename(resource1.url).localeCompare(
        getImageFilename(resource2.url)
      )
    )
    .map((resource) => resource.url.replace("http", "https"));
};

(async () => {
  const urls = await Promise.all(
    PREFIXES.map((prefix) => getPrefixUrls(prefix))
  );

  PREFIXES.forEach((prefix, index) =>
    console.log(`${prefix}: ${urls[index].length}`)
  );

  const allUrls = urls.reduce((acc, prefixUrls) => [...acc, ...prefixUrls], []);

  fs.writeFileSync(IMAGES_URL_FILE, JSON.stringify(allUrls));
  console.log(allUrls.length);
})();

const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const API_KEY = process.argv[2];
const API_SECRET = process.argv[3];
const PREFIXES = [
  "gallery/zanzibar",
  "gallery/naliboki",
  "gallery/sakartvelo",
  "gallery/zalessie",
  "gallery/sri-lanka",
  "gallery/uzbekistan",
  "gallery/board-games",
];
const FILE_URLS_FILE = "./file-urls.json";

const Authorization = `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString(
  "base64"
)}`;

const getCloudinaryUrl = (prefix, type, nextCursor) =>
  `https://api.cloudinary.com/v1_1/zinovik/resources/${type}?prefix=${prefix}&type=upload&max_results=500${
    nextCursor ? `&next_cursor=${nextCursor}` : ""
  }`;

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

const getFilename = (url) => url.split("/").slice(-1)[0] || "";

const getCloudinaryResources = async (prefix, type) => {
  const resources = [];
  let nextCursor;

  do {
    const response = await request(getCloudinaryUrl(prefix, type, nextCursor));

    resources.push(...response.resources);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return resources;
};

const getPrefixUrls = async (prefix) => {
  const [imageResources, videoResources] = await Promise.all([
    getCloudinaryResources(prefix, "image"),
    getCloudinaryResources(prefix, "video"),
  ]);

  return [...imageResources, ...videoResources]
    .sort((resource1, resource2) =>
      getFilename(resource1.url).localeCompare(getFilename(resource2.url))
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

  console.log("Writing file...");
  fs.writeFileSync(FILE_URLS_FILE, JSON.stringify(allUrls));
  console.log(allUrls.length);

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${FILE_URLS_FILE} --write`);

  console.log("Done!");
})();

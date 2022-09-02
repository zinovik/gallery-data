const images = require("../images.json");
const imageUrls = require("../image-urls.json");
const sections = require("../sections.json");

images.forEach((image) => {
  const imageUrl = imageUrls.find((imageUrl) =>
    imageUrl.includes(image.filename)
  );
  if (!imageUrl) console.log(`Missing image url for: ${image.filename}`);

  const section = sections.find((section) => section.path === image.path);
  if (!section) console.log(`Missing section for path: ${image.path}`);
});

imageUrls.forEach((imageUrl) => {
  const image = images.find((image) => imageUrl.includes(image.filename));
  if (!image) console.log(`Missing image for: ${imageUrl}`);
});

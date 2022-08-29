const images = require("../images.json");
const imageUrls = require("../image-urls.json");

images.forEach((image) => {
  const imageUrl = imageUrls.find((imageUrl) =>
    imageUrl.includes(image.filename)
  );

  if (!imageUrl) {
    console.log(`Missing image url for: ${image.filename}`);
  }
});

imageUrls.forEach((imageUrl) => {
  const image = images.find((image) => imageUrl.includes(image.filename));

  if (!image) {
    console.log(`Missing image for: ${imageUrl}`);
  }
});

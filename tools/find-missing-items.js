const images = require("../images.json");
const imageUrls = require("../image-urls.json");
const sections = require("../sections.json");

images.forEach((image) => {
  const imageUrl = imageUrls.find((imageUrl) =>
    imageUrl.includes(image.filename)
  );
  if (!imageUrl) console.log(`Missing image url for image: ${image.filename}`);

  const section = sections.find((section) => section.path === image.path);
  if (!section)
    console.log(`Missing section for the image path: ${image.path}`);
});

imageUrls.forEach((imageUrl) => {
  const image = images.find((image) => imageUrl.includes(image.filename));
  if (!image) console.log(`Missing image for the url: ${imageUrl}`);
});

sections.forEach((section) => {
  const image = images.find((image) => image.path === section.path);
  if (!image && !section.text)
    console.log(`Missing images and text for the section: ${section.path}`);
});

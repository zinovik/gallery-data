const files = require("../files.json");
const fileUrls = require("../file-urls.json");
const sections = require("../sections.json");

files.forEach((file) => {
  if (!fileUrls.some((fileUrl) => fileUrl.includes(file.filename)))
    console.error(`ERROR: Missing file url for the file: ${file.filename}`);

  if (!sections.some((section) => section.path === file.path))
    console.error(`ERROR: Missing section for the file path: ${file.path}`);

  if (!file.description)
    console.warn(
      `WARNING: Missing file description for the file: ${file.filename}`
    );
});

fileUrls.forEach((fileUrl) => {
  if (!files.some((file) => fileUrl.includes(file.filename)))
    console.error(`ERROR: Missing file for the url: ${fileUrl}`);
});

sections.forEach((section) => {
  if (!files.some((file) => file.path === section.path) && !section.text)
    console.warn(
      `WARNING: Missing files and text for the section: ${section.path}`
    );
});

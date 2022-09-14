const files = require("../files.json");
const fileUrls = require("../file-urls.json");
const sections = require("../sections.json");

files.forEach((file) => {
  const fileUrl = fileUrls.find((fileUrl) => fileUrl.includes(file.filename));
  if (!fileUrl)
    console.error(`ERROR: Missing file url for file: ${file.filename}`);

  const section = sections.find((section) => section.path === file.path);
  if (!section)
    console.error(`ERROR: Missing section for the file path: ${file.path}`);
});

fileUrls.forEach((fileUrl) => {
  const file = files.find((file) => fileUrl.includes(file.filename));
  if (!file) console.error(`ERROR: Missing file for the url: ${fileUrl}`);
});

sections.forEach((section) => {
  const file = files.find((file) => file.path === section.path);
  if (!file && !section.text)
    console.warn(
      `WARNING: Missing files and text for the section: ${section.path}`
    );
});

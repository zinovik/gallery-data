const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const SECTIONS_TO_SORT = [
  "gallery/zanzibar",
  "gallery/naliboki",
  "gallery/sakartvelo",
  "gallery/zalessie",
  "gallery/sri-lanka",
  "gallery/uzbekistan",
];
const SECTIONS_FILE = "./sections.json";
const FILES_FILE = "./files.json";

(async () => {
  const buffers = await Promise.all([
    promisify(fs.readFile)(SECTIONS_FILE),
    promisify(fs.readFile)(FILES_FILE),
  ]);

  const [sections, files] = buffers.map((buffer) =>
    JSON.parse(buffer.toString())
  );

  const sectionPaths = sections.map((section) => section.path);

  console.log("Files before sorting:", files.length);

  const filesSorted = [...files].sort((f1, f2) =>
    SECTIONS_TO_SORT.some(
      (section) =>
        f1.path.indexOf(section) === 0 || f2.path.indexOf(section) === 0
    )
      ? sectionPaths.indexOf(f1.path) - sectionPaths.indexOf(f2.path)
      : 0
  );

  console.log("Files after sorting:", filesSorted.length);

  console.log("Writing file...");
  fs.writeFileSync(FILES_FILE, JSON.stringify(filesSorted));

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${FILES_FILE} --write`);

  console.log("Done!");
})();

const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const SECTIONS_TO_SORT_BY_SECTION = [
  "zanzibar",
  "naliboki",
  "sakartvelo",
  "zalessie",
  "sri-lanka",
];
const SECTIONS_TO_SORT_BY_FILENAME = ["uzbekistan", "board-games"];
const SECTIONS_FILE = "./sections.json";
const FILES_FILE = "./files.json";

const isEveryPathEqualsOrChildAnySectionInList = (sections, paths) =>
  paths.every((path) =>
    sections.some((section) => path.indexOf(section) === 0)
  );

(async () => {
  const buffers = await Promise.all([
    promisify(fs.readFile)(SECTIONS_FILE),
    promisify(fs.readFile)(FILES_FILE),
  ]);

  const [sections, files] = buffers.map((buffer) =>
    JSON.parse(buffer.toString())
  );

  const sectionPaths = sections.map((section) => section.path);

  const filesSorted = [...files].sort((f1, f2) => {
    if (
      isEveryPathEqualsOrChildAnySectionInList(SECTIONS_TO_SORT_BY_SECTION, [
        f1.path,
        f2.path,
      ])
    ) {
      return f1.path === f2.path
        ? (f2.order || 0) - (f1.order || 0)
        : sectionPaths.indexOf(f1.path) - sectionPaths.indexOf(f2.path);
    }

    if (
      isEveryPathEqualsOrChildAnySectionInList(SECTIONS_TO_SORT_BY_FILENAME, [
        f1.path,
        f2.path,
      ])
    ) {
      // the same root section
      if (f1.path.split("/")[0] === f2.path.split("/")[0]) {
        return f1.filename.localeCompare(f2.filename);
      }

      return sectionPaths.indexOf(f1.path) - sectionPaths.indexOf(f2.path);
    }

    return 0;
  });

  console.log("Writing file...");
  fs.writeFileSync(FILES_FILE, JSON.stringify(filesSorted));

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${FILES_FILE} --write`);

  console.log("Done!");
})();

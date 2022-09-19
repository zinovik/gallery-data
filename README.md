Main repository: https://github.com/zinovik/gallery

**SECTIONS_URL** - an array of sections:

```typescript
interface SectionInterface {
  path: string;
  title: string;
  text?: string | string[];
  order?: number;
}
```

**FILES_URL** - an array of files (images and videos):

```typescript
interface FileInterface {
  path: string;
  filename: string;
  url: string;
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
  isVertical?: boolean;
}
```

**FILE_URLS_URL** - an array of file urls:

```typescript
String[]
```

---

Tools:

- `node tools/cloudinary.js <api_key> <api_secret>` - connects cloudinary, gets all uploaded files urls and saves it to the `file-urls.json` file
- `node tools/find-missing-items.js` - checks the data errors like missing or unused urls
- `node tools/sort-files.js` - sorts files by sections

```bash
npx serve --cors
```

Main repository: https://github.com/zinovik/gallery

**SECTIONS_URL** - array of sections:

```typescript
interface SectionInterface {
  path: string;
  title: string;
  text?: string | string[];
  order?: number;
}
```

**FILES_URL** - array of files (images and videos):

```typescript
interface FileInterface {
  path: string;
  filename: string;
  url: string;
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
}
```

**FILE_URLS_URL** - array of file urls:

```typescript
String[]
```

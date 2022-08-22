Main repository: https://github.com/zinovik/gallery

Interfaces:

```typescript
interface SectionInterface {
  path: string;
  title: string;
  text?: string | string[];
  order?: number;
}
```

```typescript
interface ImageInterface {
  path: string;
  url: string;
  urlThumbnail?: string;
  description?: string;
  text?: string | string[];
  date?: string;
  order?: number;
}
```

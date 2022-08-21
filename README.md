Main repository: https://github.com/zinovik/gallery

Interfaces:

```typescript
export interface SectionInterface {
  path: string;
  title: string;
  text?: string;
  order?: number;
}
```

```typescript
export interface ImageInterface {
  path: string;
  url: string;
  urlThumbnail?: string;
  description?: string;
  text?: string;
  date?: string;
  order?: number;
}
```

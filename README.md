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
  filename: string;
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
}
```

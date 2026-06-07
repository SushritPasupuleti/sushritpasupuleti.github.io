# Reading List Feature Documentation

A complete reading list system for your portfolio that displays books with covers, descriptions, ratings, and reviews.

## Features

- ✨ **Book Grid Display**: Responsive grid layout with book cards
- 📚 **Metadata Fetching**: Automatically fetch book covers and descriptions from Open Library API
- 💾 **Build-Time Caching**: Pre-fetch all book data during `yarn build`
- 🔍 **Search & Filter**: Search by title/author/review, filter by status and tags
- ⭐ **Ratings & Reviews**: Add personal ratings and reviews to each book
- 🏷️ **Tags**: Organize books with custom tags
- 📊 **Statistics**: Display total books, reading progress, and average rating
- 🌐 **Terminal Theme**: Matches your portfolio's terminal aesthetic

## File Structure

```
web/
├── pages/
│   └── reading-list.tsx              # Main reading list page
├── src/
│   ├── components/
│   │   └── BookCard.tsx              # Individual book card component
│   ├── data/
│   │   └── books.ts                  # Book data storage
│   ├── styles/
│   │   └── BookCard.module.css       # Card styling
│   └── utils/
│       └── bookService.ts            # API utilities for fetching book data
├── styles/
│   └── ReadingList.module.css        # Reading list page styling
├── scripts/
│   └── cache-books.js                # Build-time caching script
└── public/
    └── data/
        └── books-cache.json          # Generated cache file (auto-created)
```

## Getting Started

### 1. Add Books to Your Collection

Edit [web/src/data/books.ts](./src/data/books.ts) and add books to the `BOOKS` array:

```typescript
export const BOOKS: Book[] = [
  {
    isbn13: '9780887307752',          // ISBN-13 (primary identifier)
    title: 'Measure What Matters',
    author: 'John Doerr',
    year: 2018,
    status: 'read',                   // 'read' | 'reading' | 'want-to-read'
    rating: 4.5,                      // 1-5 stars
    review: 'Excellent framework...',
    tags: ['productivity', 'business', 'goals'],
    thoughts: 'Personal thoughts about the book',
  },
  // ... more books
];
```

### 2. Book Data Structure

```typescript
interface Book {
  isbn13: string;           // Required: ISBN-13 identifier
  title: string;            // Required: Book title
  author: string;           // Required: Author name
  year?: number;            // Optional: Publication year
  rating?: number;          // Optional: 1-5 rating
  review?: string;          // Optional: Your review
  status?: 'read' | 'reading' | 'want-to-read';
  tags?: string[];          // Optional: Custom tags for organization
  thoughts?: string;        // Optional: Personal thoughts/notes
}
```

### 3. Build & Cache Book Data

When you run `yarn build`, the script automatically:
1. Fetches book metadata from Open Library API (covers, descriptions, page count)
2. Caches everything to `public/data/books-cache.json`
3. Serves cached data at build time for fast static generation

```bash
cd web
yarn build  # This runs prebuild script automatically
```

### 4. View Your Reading List

Access your reading list at:
```
http://localhost:3000/reading-list
```

## Features Explained

### Search & Filter

- **Search**: Find books by title, author, or review content
- **Status Filter**: Show only books you've read, are reading, or want to read
- **Tag Filter**: Filter by custom tags for organizing your collection

### Metadata Caching

The build process uses the Open Library API to fetch:
- 📖 Book covers (with fallback placeholder)
- 📝 Book descriptions
- 📄 Page counts
- 📅 Publication dates

**Cache Location**: `public/data/books-cache.json`

If the Open Library API is unavailable, your local book data is used as fallback.

### Book Status Indicators

- **✓ Read** (green): Books you've completed
- **◐ Reading** (cyan): Books you're currently reading
- **○ Want to Read** (orange): Books on your wishlist

## Customization

### Adding More Book Data

You can enhance the book data by:

1. **Manually**: Add `coverUrl` and `description` directly to the book object
2. **Automatically**: Let the cache script fetch it during build (recommended)
3. **From Google Books**: Modify `bookService.ts` to use Google Books API instead

### Styling

- Card styling: [web/src/styles/BookCard.module.css](./src/styles/BookCard.module.css)
- Page styling: [web/styles/ReadingList.module.css](./styles/ReadingList.module.css)
- Both use the terminal theme colors from your site

### API Sources

The default implementation uses **Open Library API** (free, no key required):
- ✅ Reliable and well-maintained
- ✅ Excellent book cover quality
- ✅ Rich metadata

Alternatives available in `bookService.ts`:
- Google Books API (requires API key)
- Your own book database
- Manual entry

## Performance

- **Build-time**: Cache generation happens once during `yarn build`
- **Runtime**: Fully static - no API calls needed for viewing
- **SSG**: Next.js static generation ensures fast page loads
- **Revalidation**: 24-hour ISR fallback for incremental updates

## Troubleshooting

### Books showing without covers

- Ensure ISBN-13 is correct (13 digits)
- Check network connection during build
- Falls back to placeholder automatically
- Add manual `coverUrl` in book data if needed

### Cache not generating

1. Check that `public/data/` directory exists
2. Verify network connection (Open Library API)
3. Check build logs for errors
4. Manual fallback uses local book data

### Want to edit book data after build?

Edit `web/src/data/books.ts` and rebuild:
```bash
yarn build
```

The cache will regenerate with updated information.

## Adding to Navigation

To link to your reading list from other pages:

```tsx
import Link from 'next/link';

<Link href="/reading-list">My Reading List</Link>
```

## Future Enhancements

Possible additions:
- [ ] Book ratings API aggregation (Goodreads, etc.)
- [ ] Reading statistics and analytics
- [ ] Export reading list (JSON, CSV, PDF)
- [ ] Integration with Goodreads API
- [ ] Book recommendations based on tags
- [ ] Reading progress tracking
- [ ] Social sharing features
- [ ] Dark/Light theme support (already matches your theme!)

## API Reference

### fetchBookMetadata(isbn13: string)

Fetches metadata from Open Library API.

```typescript
const metadata = await fetchBookMetadata('9780887307752');
// Returns: { title, author, coverUrl, description, pageCount, ... }
```

### getCoverUrl(isbn13: string, size?: 'S' | 'M' | 'L')

Get the direct cover image URL.

```typescript
const url = getCoverUrl('9780887307752', 'M');
// https://covers.openlibrary.org/b/isbn/9780887307752-M.jpg
```

## Data Privacy

- No personal data is sent to external APIs
- Only ISBN numbers are sent to Open Library
- Cache file is generated locally during build
- No tracking or analytics by default

## License & Attribution

- Book covers from [Open Library](https://openlibrary.org/) (ODP License)
- Uses [Open Library API](https://openlibrary.org/developers/api)
- All your book data is yours to keep

## Questions?

Check the source files:
- Page logic: [pages/reading-list.tsx](./pages/reading-list.tsx)
- Component: [src/components/BookCard.tsx](./src/components/BookCard.tsx)
- Services: [src/utils/bookService.ts](./src/utils/bookService.ts)
- Book data: [src/data/books.ts](./src/data/books.ts)

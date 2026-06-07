/**
 * Build-time script to cache book metadata
 * Run during `next build` to pre-fetch all book covers and descriptions
 * Saves to public/data/books-cache.json
 */

const fs = require('fs');
const path = require('path');

// Book data
const BOOKS = [
  {
    isbn13: '9780887307752',
    title: 'Measure What Matters',
    author: 'John Doerr',
    year: 2018,
    status: 'read',
    rating: 4.5,
    review: 'Excellent framework for setting goals. OKRs transform how teams align and execute.',
    tags: ['productivity', 'business', 'goals'],
  },
  {
    isbn13: '9780134685991',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    status: 'read',
    rating: 4,
    review: 'A must-read for software engineers. Timeless principles for writing maintainable code.',
    tags: ['programming', 'software-engineering', 'best-practices'],
  },
  {
    isbn13: '9780201633610',
    title: 'Design Patterns',
    author: 'Gang of Four',
    year: 1994,
    status: 'reading',
    rating: 4,
    review: 'Dense but essential. Patterns are the vocabulary of good design.',
    tags: ['programming', 'design', 'software-engineering'],
  },
  {
    isbn13: '9780262510875',
    title: 'Introduction to Algorithms',
    author: 'Cormen, Leiserson, Rivest, Stein',
    year: 2009,
    status: 'want-to-read',
    tags: ['algorithms', 'computer-science', 'reference'],
  },
  {
    isbn13: '9780135957059',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    year: 2019,
    status: 'read',
    rating: 4.5,
    review: 'Practical wisdom for developers. Each tip is actionable and valuable.',
    tags: ['programming', 'best-practices', 'career'],
  },
];

async function fetchBookMetadata(isbn13: string) {
  try {
    const response = await fetch(`https://openlibrary.org/isbn/${isbn13}.json`, {
      headers: { 'User-Agent': 'sushrit-portfolio/1.0' },
    });

    if (!response.ok) {
      console.warn(`Could not fetch data for ISBN ${isbn13}`);
      return { isbn13 };
    }

    const data = await response.json();

    return {
      isbn13,
      title: data.title || '',
      author: data.authors?.[0]?.name || '',
      description: data.description?.value || data.description || '',
      pageCount: data.number_of_pages,
      publishedDate: data.first_publish_date,
      coverUrl: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
        : undefined,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error fetching book data for ISBN ${isbn13}:`, errorMessage);
    return { isbn13 };
  }
}

async function cacheBooksData() {
  console.log('🔄 Caching book metadata...');

  const cacheDir = path.join(process.cwd(), 'public', 'data');
  const cachePath = path.join(cacheDir, 'books-cache.json');

  // Create directory if it doesn't exist
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const cachedBooks: Record<string, any> = {};

  for (const book of BOOKS) {
    try {
      console.log(`📚 Fetching metadata for: ${book.title}`);
      const metadata = await fetchBookMetadata(book.isbn13);
      cachedBooks[book.isbn13] = {
        ...book,
        ...metadata,
      };

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error fetching ${book.title}:`, error);
      cachedBooks[book.isbn13] = book;
    }
  }

  // Save to cache file
  fs.writeFileSync(cachePath, JSON.stringify(cachedBooks, null, 2));
  console.log(`✅ Cached ${Object.keys(cachedBooks).length} books to ${cachePath}`);

  return cachedBooks;
}

// Run the script
cacheBooksData().catch(console.error);

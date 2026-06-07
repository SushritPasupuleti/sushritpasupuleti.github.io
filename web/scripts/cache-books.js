/**
 * Build-time script to cache book metadata
 * Run during `next build` to pre-fetch all book covers and descriptions
 * Saves to public/data/books-cache.json
 */

const fs = require('fs');
const path = require('path');

// Import books from the data file
const booksModule = require('../src/data/books.ts');
const BOOKS = booksModule.BOOKS;

async function fetchBookMetadata(isbn13) {
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
    console.error(`Error fetching book data for ISBN ${isbn13}:`, error.message);
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

  const cachedBooks = {};

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

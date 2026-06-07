/**
 * Book service for fetching metadata from Open Library API
 * Can be called during build-time or runtime
 */

export interface BookMetadata {
  isbn13: string;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
  publishedDate?: string;
  pageCount?: number;
}

// Fetch from Open Library API (with fallback to Google Books for ASIN)
export async function fetchBookMetadata(isbn13: string): Promise<Partial<BookMetadata>> {
  try {
    // Open Library API: https://openlibrary.org/api/
    const response = await fetch(`https://openlibrary.org/isbn/${isbn13}.json`, {
      next: { revalidate: 60 * 60 * 24 }, // Cache for 24 hours
    });

    if (response.ok) {
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
    }

    // Fallback: assume it might be an ASIN and try Google Books API
    console.warn(`Could not fetch data for ISBN ${isbn13}, attempting Google Books API as fallback`);
    const googleResult = await fetchBookMetadataGoogle(isbn13);
    return googleResult.title ? googleResult : { isbn13 };
  } catch (error) {
    console.error(`Error fetching book data for ISBN ${isbn13}, trying fallback:`, error);
    // Try Google Books API as fallback for potential ASIN
    try {
      const googleResult = await fetchBookMetadataGoogle(isbn13);
      return googleResult.title ? googleResult : { isbn13 };
    } catch (fallbackError) {
      console.error(`Fallback to Google Books also failed:`, fallbackError);
      return { isbn13 };
    }
  }
}

// Batch fetch with rate limiting
export async function fetchBooksMetadata(isbns: string[], delayMs = 200): Promise<Record<string, Partial<BookMetadata>>> {
  const results: Record<string, Partial<BookMetadata>> = {};

  for (const isbn of isbns) {
    results[isbn] = await fetchBookMetadata(isbn);
    // Rate limiting to avoid API throttling
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return results;
}

// Get cover image URL
export function getCoverUrl(isbn13: string, size: 'S' | 'M' | 'L' = 'M'): string {
  // This is a fallback - actual covers are fetched from Open Library
  return `https://covers.openlibrary.org/b/isbn/${isbn13}-${size}.jpg`;
}

// Alternative: Try Google Books API as fallback
export async function fetchBookMetadataGoogle(isbn13: string): Promise<Partial<BookMetadata>> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn13}`,
      {
        next: { revalidate: 60 * 60 * 24 },
      }
    );

    if (!response.ok || response.status === 429) {
      return { isbn13 };
    }

    const data = await response.json();
    const book = data.items?.[0]?.volumeInfo;

    if (!book) {
      return { isbn13 };
    }

    return {
      isbn13,
      title: book.title || '',
      author: book.authors?.[0] || '',
      description: book.description || '',
      pageCount: book.pageCount,
      publishedDate: book.publishedDate,
      coverUrl: book.imageLinks?.thumbnail,
    };
  } catch (error) {
    console.error(`Error fetching from Google Books for ISBN ${isbn13}:`, error);
    return { isbn13 };
  }
}

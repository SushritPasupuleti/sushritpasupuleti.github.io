import type { NextPage, GetStaticProps } from 'next';
import React, { useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Navbar from '../src/components/Navbar';
import BookCard from '../src/components/BookCard';
import TerminalBoot from '../src/components/TerminalBoot';
import { useTerminalTheme } from '../src/terminal-theme';
import { FiSun, FiMoon, FiSearch, FiX } from 'react-icons/fi';
import styles from '../styles/ReadingList.module.css';
import { Book, BOOKS } from '../src/data/books';

const READING_LIST_BOOT_LINES = [
  { command: 'cd ~/library', output: ['~/library'] },
  {
    command: 'find . -name "*.epub" -o -name "*.pdf" | wc -l',
    output: ['Counting books...'],
  },
  {
    command: 'ls -S | head -20',
    output: ['Sorting by size...'],
  },
  {
    command: 'grep -r "rating" metadata/ | tail -5',
    output: ['Loading ratings...'],
  },
  {
    command: 'render --format=catalog --with-covers --with-reviews',
    output: ['Building catalog...', 'Done.'],
  },
];

interface ReadingListProps {
  books: (Book & { coverUrl?: string; description?: string })[];
}

const ReadingList: NextPage<ReadingListProps> = ({ books }) => {
  const { isDark, c, setTheme } = useTerminalTheme();
  const [booting, setBooting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleBootDone = useCallback(() => {
    setBooting(false);
  }, []);

  React.useEffect(() => {
    setBooting(true);
  }, []);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach((book) => {
      book.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [books]);

  // Get unique statuses
  const allStatuses = useMemo(() => {
    const statuses = new Set<string>();
    books.forEach((book) => {
      if (book.status) statuses.add(book.status);
    });
    return Array.from(statuses).sort();
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.review?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !selectedStatus || book.status === selectedStatus;

      const matchesTag =
        !selectedTag || (book.tags && book.tags.includes(selectedTag));

      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [books, searchQuery, selectedStatus, selectedTag]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: books.length,
      read: books.filter((b) => b.status === 'read').length,
      reading: books.filter((b) => b.status === 'reading').length,
      wantToRead: books.filter((b) => b.status === 'want-to-read').length,
      avgRating:
        books.filter((b) => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) /
        books.filter((b) => b.rating).length || 0,
    };
  }, [books]);

  return (
    <>
      {booting && (
        <TerminalBoot
          lines={READING_LIST_BOOT_LINES}
          c={c}
          onDone={handleBootDone}
          maxDuration={5000}
        />
      )}
      <Head>
        <title>Reading List - Sushrit Pasupuleti</title>
        <meta name="description" content="My personal reading list with reviews and ratings" />
        <meta property="og:title" content="Reading List - Sushrit Pasupuleti" />
        <meta
          property="og:description"
          content="My personal reading list with reviews and ratings"
        />
      </Head>

      <Navbar />

      <div className={styles.container} style={{ backgroundColor: c.bg, color: c.text }}>
        <div className={styles.header} style={{ borderColor: c.border }}>
          <div className={styles.titleSection}>
            <h1 className={styles.title} style={{ color: c.textBright }}>
              <span className={styles.prompt} style={{ color: c.green }}>~/library $</span> ls -la *.books
            </h1>
            <p className={styles.subtitle} style={{ color: c.muted }}>A catalog of books I've read, am reading, or want to read</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat} style={{ background: `rgba(0, 255, 65, ${isDark ? 0.05 : 0.02})`, borderColor: isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.2)' }}>
              <span className={styles.statLabel} style={{ color: c.muted }}>Total</span>
              <span className={styles.statValue} style={{ color: c.green }}>{stats.total}</span>
            </div>
            <div className={styles.stat} style={{ background: `rgba(0, 255, 65, ${isDark ? 0.05 : 0.02})`, borderColor: isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.2)' }}>
              <span className={styles.statLabel} style={{ color: c.muted }}>Read</span>
              <span className={styles.statValue} style={{ color: c.green }}>
                {stats.read}
              </span>
            </div>
            <div className={styles.stat} style={{ background: `rgba(0, 191, 255, ${isDark ? 0.05 : 0.02})`, borderColor: isDark ? 'rgba(0, 191, 255, 0.1)' : 'rgba(0, 85, 160, 0.2)' }}>
              <span className={styles.statLabel} style={{ color: c.muted }}>Reading</span>
              <span className={styles.statValue} style={{ color: c.cyan }}>
                {stats.reading}
              </span>
            </div>
            <div className={styles.stat} style={{ background: `rgba(255, 170, 0, ${isDark ? 0.05 : 0.02})`, borderColor: isDark ? 'rgba(255, 170, 0, 0.1)' : 'rgba(200, 130, 0, 0.2)' }}>
              <span className={styles.statLabel} style={{ color: c.muted }}>Avg Rating</span>
              <span className={styles.statValue} style={{ color: isDark ? '#ffaa00' : '#c88200' }}>
                {stats.avgRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.controls} style={{ background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)', borderColor: c.border }}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} style={{ color: c.cyan }} />
            <input
              type="text"
              placeholder="Search books by title, author, or review..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              style={{
                background: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                borderColor: c.border,
                color: c.textBright,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = c.cyan;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = c.border;
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearButton}
                style={{ color: c.muted }}
              >
                <FiX />
              </button>
            )}
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} style={{ color: c.muted }}>Status:</label>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterButton} ${!selectedStatus ? styles.active : ''}`}
                  onClick={() => setSelectedStatus(null)}
                  style={{
                    background: !selectedStatus ? (isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.15)') : (isDark ? 'rgba(0, 191, 255, 0.05)' : 'rgba(0, 85, 160, 0.08)'),
                    borderColor: !selectedStatus ? c.green : c.cyan,
                    color: !selectedStatus ? c.green : c.cyan,
                  }}
                >
                  All
                </button>
                {allStatuses.map((status) => (
                  <button
                    key={status}
                    className={`${styles.filterButton} ${selectedStatus === status ? styles.active : ''}`}
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      background: selectedStatus === status ? (isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.15)') : (isDark ? 'rgba(0, 191, 255, 0.05)' : 'rgba(0, 85, 160, 0.08)'),
                      borderColor: selectedStatus === status ? c.green : c.cyan,
                      color: selectedStatus === status ? c.green : c.cyan,
                    }}
                  >
                    {status === 'read'
                      ? '✓ Read'
                      : status === 'reading'
                        ? '◐ Reading'
                        : '○ Want to Read'}
                  </button>
                ))}
              </div>
            </div>

            {allTags.length > 0 && (
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} style={{ color: c.muted }}>Tags:</label>
                <div className={styles.filterOptions}>
                  <button
                    className={`${styles.filterButton} ${!selectedTag ? styles.active : ''}`}
                    onClick={() => setSelectedTag(null)}
                    style={{
                      background: !selectedTag ? (isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.15)') : (isDark ? 'rgba(0, 191, 255, 0.05)' : 'rgba(0, 85, 160, 0.08)'),
                      borderColor: !selectedTag ? c.green : c.cyan,
                      color: !selectedTag ? c.green : c.cyan,
                    }}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      className={`${styles.filterButton} ${selectedTag === tag ? styles.active : ''}`}
                      onClick={() => setSelectedTag(tag)}
                      style={{
                        background: selectedTag === tag ? (isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.15)') : (isDark ? 'rgba(0, 191, 255, 0.05)' : 'rgba(0, 85, 160, 0.08)'),
                        borderColor: selectedTag === tag ? c.green : c.cyan,
                        color: selectedTag === tag ? c.green : c.cyan,
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <>
            <div className={styles.resultInfo} style={{ color: c.muted, background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)', borderColor: c.cyan }}>
              Showing {filteredBooks.length} of {books.length} books
            </div>
            <div className={styles.grid}>
              {filteredBooks.map((book) => (
                <BookCard key={book.isbn13} book={book} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noResults} style={{ color: c.muted }}>
            <p>No books found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus(null);
                setSelectedTag(null);
              }}
              className={styles.resetButton}
              style={{
                background: isDark ? 'rgba(0, 255, 65, 0.1)' : 'rgba(26, 122, 46, 0.1)',
                borderColor: c.green,
                color: c.green,
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <p>
            Want to recommend a book? <Link href="/contact">Let me know!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ReadingListProps> = async () => {
  try {
    // Try to load cached book data first
    const cachePath = path.join(process.cwd(), 'public', 'data', 'books-cache.json');
    let books: (Book & { coverUrl?: string; description?: string })[] = BOOKS;

    if (fs.existsSync(cachePath)) {
      const cachedData = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      books = Object.values(cachedData) as typeof books;
      console.log('✅ Loaded cached book data');
    } else {
      console.log('⚠️  Using local book data (cache not found)');
    }

    return {
      props: {
        books,
      },
    };
  } catch (error) {
    console.error('Error loading books:', error);
    return {
      props: {
        books: BOOKS,
      },
    };
  }
};

export default ReadingList;

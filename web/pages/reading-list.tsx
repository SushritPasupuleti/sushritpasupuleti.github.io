import type { NextPage, GetStaticProps } from 'next';
import React, { useState, useMemo, useCallback, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Navbar from '../src/components/Navbar';
import BookCard from '../src/components/BookCard';
import TerminalBoot from '../src/components/TerminalBoot';
import TmuxPane from '../src/components/TmuxPane';
import FloatingBlogNav from '../src/components/FloatingBlogNav';
import { useTerminalTheme, mono } from '../src/terminal-theme';
import { FiSun, FiMoon } from 'react-icons/fi';
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Badges for TmuxPane
  const filterBadges = useMemo(() => {
    const b: { label: string; color: 'green' | 'cyan' }[] = [];
    if (selectedStatus) b.push({ label: selectedStatus, color: 'green' });
    if (selectedTag) b.push({ label: `#${selectedTag}`, color: 'cyan' });
    if (searchQuery) b.push({ label: 'query', color: 'cyan' });
    return b;
  }, [selectedStatus, selectedTag, searchQuery]);

  const filterForceOpen = !!(selectedStatus || selectedTag || searchQuery);

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
      <FloatingBlogNav />

      <div
        className="terminal-container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          paddingTop: '4.5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingBottom: '2rem',
          fontFamily: mono,
          color: c.text,
          minHeight: '100vh',
          background: c.bg,
        }}
      >
        {/* Terminal window bar */}
        <div
          style={{
            background: c.titleBar,
            border: `1px solid ${c.border}`,
            borderBottom: 'none',
            borderRadius: '6px 6px 0 0',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <span style={{ marginLeft: '1rem', color: c.muted, fontSize: '0.75rem', flex: 1 }}>
            ~/library
          </span>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{
              background: 'none',
              border: `1px solid ${c.border}`,
              borderRadius: '2px',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              color: c.muted,
              fontSize: '0.75rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = c.green;
              (e.currentTarget as HTMLButtonElement).style.borderColor = c.green;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = c.muted;
              (e.currentTarget as HTMLButtonElement).style.borderColor = c.border;
            }}
          >
            {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
        </div>

        {/* Terminal body */}
        <div
          style={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: '0 0 6px 6px',
            padding: '1.5rem',
          }}
        >
          {/* Breadcrumb as terminal path */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: c.green }}>guest@sushrit</span>
            <span style={{ color: c.muted }}>:</span>
            <span style={{ color: c.cyan }}>~/library</span>
            <span style={{ color: c.muted }}> $ </span>
            <span style={{ color: c.textBright }}>ls -la books</span>
          </div>

          {/* Header section */}
          <div style={{ marginBottom: '2rem' }}>
            <pre
              style={{
                color: c.green,
                fontSize: '0.7rem',
                lineHeight: 1.2,
                margin: '0 0 0.75rem 0',
                whiteSpace: 'pre',
                overflowX: 'auto',
                letterSpacing: '0.05em',
              }}
            >{`
 ___  ___  ___  _   _ ___
| _ )/ _ \\/ _ \\| |/ |/ __|
| _ \\ (_) \ (_)||   < \\__ \\
|___/\\___/\\___/|_|\\_\\|___/
`}</pre>
            <p
              style={{
                color: c.muted,
                fontSize: '0.8rem',
                margin: '0.5rem 0 0 0',
                borderBottom: `1px dashed ${c.border}`,
                paddingBottom: '1rem',
              }}
            >
              <span style={{ color: c.green }}>{'//'} </span>
              {stats.read} read · {stats.reading} in progress · {stats.wantToRead} queued &mdash; {books.length} total
            </p>
          </div>
          {/* Stats */}
          <div style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: c.titleBar, border: `1px solid ${c.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.75rem', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: c.green }}>{stats.total}</div>
            </div>
            <div style={{ padding: '1rem', background: c.titleBar, border: `1px solid ${c.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.75rem', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Read</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: c.green }}>{stats.read}</div>
            </div>
            <div style={{ padding: '1rem', background: c.titleBar, border: `1px solid ${c.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.75rem', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Reading</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: c.cyan }}>{stats.reading}</div>
            </div>
            <div style={{ padding: '1rem', background: c.titleBar, border: `1px solid ${c.border}`, borderRadius: '2px' }}>
              <div style={{ fontSize: '0.75rem', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Avg Rating</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: c.cyan }}>{stats.avgRating.toFixed(1)}</div>
            </div>
          </div>

          {/* Search & Filters — TmuxPane matching blog search */}
          <TmuxPane
            c={c}
            isDark={isDark}
            title="search"
            subtitle="filter"
            defaultOpen={true}
            forceOpen={filterForceOpen}
            badges={filterBadges}
          >
            {/* grep-style search input */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', cursor: 'text', flexWrap: 'wrap', gap: '0' }}
                onClick={() => inputRef.current?.focus()}
              >
                <span style={{ color: c.green, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>guest@sushrit</span>
                <span style={{ color: c.muted, flexShrink: 0 }}>:</span>
                <span style={{ color: c.cyan, flexShrink: 0 }}>~/library</span>
                <span style={{ color: c.muted, flexShrink: 0 }}> $ grep -i &quot;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="search books..."
                  spellCheck={false}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: c.textBright,
                    fontFamily: mono,
                    fontSize: '0.85rem',
                    flex: 1,
                    minWidth: '6rem',
                    padding: 0,
                    caretColor: c.green,
                  }}
                />
                <span style={{ color: c.muted, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flexShrink: 0 }}>&quot; ./books/*</span>
              </div>
            </div>

            {/* Status divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                margin: '0.25rem 0 0.6rem',
                fontSize: '0.65rem',
                color: c.dim,
              }}
            >
              <div style={{ flex: 1, height: '1px', background: c.border }} />
              <span>status</span>
              <div style={{ flex: 1, height: '1px', background: c.border }} />
            </div>

            {/* Status filter — blog-exact button style */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.6rem' }}>
              {[{ value: null, label: 'all' }, { value: 'read', label: '✓ read' }, { value: 'reading', label: '◐ reading' }, { value: 'want-to-read', label: '○ want to read' }].map(({ value, label }) => {
                const isActive = selectedStatus === value;
                return (
                  <button
                    key={String(value)}
                    onClick={() => setSelectedStatus(value)}
                    style={{
                      background: isActive ? c.green : c.tagBg,
                      color: isActive ? (isDark ? '#0a0a0a' : '#ffffff') : c.green,
                      border: `1px solid ${isActive ? c.green : c.tagBorder}`,
                      borderRadius: '2px',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.7rem',
                      fontFamily: mono,
                      cursor: 'pointer',
                      transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Tags divider */}
            {allTags.length > 0 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    margin: '0.25rem 0 0.6rem',
                    fontSize: '0.65rem',
                    color: c.dim,
                  }}
                >
                  <div style={{ flex: 1, height: '1px', background: c.border }} />
                  <span>tags</span>
                  <div style={{ flex: 1, height: '1px', background: c.border }} />
                </div>

                {/* Tag filter */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <button
                    onClick={() => setSelectedTag(null)}
                    style={{
                      background: !selectedTag ? c.green : c.tagBg,
                      color: !selectedTag ? (isDark ? '#0a0a0a' : '#ffffff') : c.green,
                      border: `1px solid ${!selectedTag ? c.green : c.tagBorder}`,
                      borderRadius: '2px',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.7rem',
                      fontFamily: mono,
                      cursor: 'pointer',
                      transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                    }}
                  >
                    all
                  </button>
                  {allTags.map((tag) => {
                    const isActive = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isActive ? null : tag)}
                        style={{
                          background: isActive ? c.green : c.tagBg,
                          color: isActive ? (isDark ? '#0a0a0a' : '#ffffff') : c.green,
                          border: `1px solid ${isActive ? c.green : c.tagBorder}`,
                          borderRadius: '2px',
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.7rem',
                          fontFamily: mono,
                          cursor: 'pointer',
                          transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                        }}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </TmuxPane>

          {/* Results */}
          <div style={{ marginTop: '1rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: c.muted }}>
            <span style={{ color: c.green }}>$ </span>
            <span>ls -la</span>
            <span style={{ color: c.dim }}> | </span>
            <span style={{ color: c.textBright }}>{filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}</span>
            {filteredBooks.length !== books.length && (
              <span style={{ color: c.dim }}> (filtered from {books.length})</span>
            )}
          </div>

          {filteredBooks.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {filteredBooks.map((book, idx) => (
                <BookCard key={book.isbn13} book={book} index={idx} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <p style={{ color: c.muted, fontSize: '0.85rem', fontFamily: mono }}>
                <span style={{ color: c.green }}>$</span> No matching books found.
              </p>
              <p style={{ color: c.dim, fontSize: '0.75rem', fontFamily: mono, marginTop: '0.25rem', marginBottom: '1rem' }}>
                Try a different query or clear the filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedStatus(null); setSelectedTag(null); }}
                style={{
                  background: `${c.green}12`,
                  border: `1px solid ${c.green}`,
                  borderRadius: '2px',
                  color: c.green,
                  cursor: 'pointer',
                  fontFamily: mono,
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${c.green}25`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = `${c.green}12`)}
              >
                clear filters
              </button>
            </div>
          )}

          {/* Footer */}
          {/* <div style={{ paddingTop: '1.5rem', borderTop: `1px dashed ${c.border}`, fontSize: '0.85rem', color: c.muted }}>
            <p style={{ margin: 0, marginBottom: '0.5rem' }}>Want to recommend a book?</p>
            <Link
              href="/contact"
              style={{
                color: c.cyan,
                textDecoration: 'underline',
                textDecorationStyle: 'dashed',
              }}
            >
              Let me know!
            </Link>
          </div> */}
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

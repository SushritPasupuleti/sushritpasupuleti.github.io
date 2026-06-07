import React, { useState } from 'react';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { Book } from '../data/books';
import { useTerminalTheme, mono } from '../terminal-theme';

interface BookCardProps {
  book: Book & { coverUrl?: string; description?: string };
  onReviewEdit?: (book: Book) => void;
  index?: number;
}

const STATUS_COLOR_MAP: Record<string, string> = {};
const STATUS_LABEL: Record<string, string> = {
  'read': '✓ read',
  'reading': '◐ reading',
  'want-to-read': '○ want to read',
};

const BookCard: React.FC<BookCardProps> = ({ book, onReviewEdit, index }) => {
  const { isDark, c } = useTerminalTheme();
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const openLibraryUrl = `https://openlibrary.org/isbn/${book.isbn13}`;

  const statusColor =
    book.status === 'read' ? c.green :
    book.status === 'reading' ? c.cyan :
    book.status === 'want-to-read' ? (isDark ? '#ffaa00' : '#c88200') :
    c.muted;

  const statusLabel = STATUS_LABEL[book.status || ''] || book.status || '—';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? c.green : c.border}`,
        borderRadius: '2px',
        background: c.surface,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: mono,
        transition: 'border-color 0.2s',
      }}
    >
      {/* TuiBox-style title bar: ┌─── [01] title ─── badge ─ link */}
      <div
        style={{
          borderBottom: `1px solid ${hovered ? c.green : c.border}`,
          padding: '0.3rem 0.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: c.titleBar,
          fontSize: '0.75rem',
          transition: 'border-color 0.2s',
          gap: '0.5rem',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', minWidth: 0, overflow: 'hidden' }}>
          <span style={{ color: c.dim, flexShrink: 0 }}>┌───</span>
          {index !== undefined && (
            <span style={{ color: c.dim, flexShrink: 0 }}>
              [{String(index + 1).padStart(2, '0')}]
            </span>
          )}
          <span
            style={{
              color: c.green,
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={book.title}
          >
            {book.title}
          </span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span
            style={{
              color: statusColor,
              fontSize: '0.68rem',
              padding: '0.05rem 0.4rem',
              background: `${statusColor}18`,
              whiteSpace: 'nowrap',
            }}
          >
            {statusLabel}
          </span>
          <a
            href={openLibraryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on Open Library"
            onClick={(e) => e.stopPropagation()}
            style={{ color: c.dim, transition: 'color 0.15s', lineHeight: 1, display: 'flex' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = c.cyan)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = c.dim)}
          >
            <FiExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Body: cover + metadata */}
      <div style={{ padding: '0.75rem', display: 'flex', gap: '0.75rem', flex: 1 }}>
        {/* Cover image column */}
        <div style={{ flexShrink: 0, width: 68, alignSelf: 'flex-start' }}>
          {book.coverUrl && !imgError ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              width={68}
              height={102}
              onError={() => setImgError(true)}
              style={{
                display: 'block',
                border: `1px solid ${c.border}`,
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: 68,
                aspectRatio: '2/3',
                border: `1px dashed ${c.border}`,
                background: c.titleBar,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: c.dim,
                fontSize: '1.25rem',
              }}
            >
              📖
            </div>
          )}
        </div>

        {/* Right metadata column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {/* Author + year */}
          <div>
            <p
              style={{
                margin: 0,
                fontSize: '0.8rem',
                color: c.textBright,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {book.author}
            </p>
            {book.year && (
              <span style={{ color: c.dim, fontSize: '0.7rem' }}>{book.year}</span>
            )}
          </div>

          {/* Rating */}
          {book.rating && (
            <div
              style={{
                color: c.green,
                fontSize: '0.75rem',
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'center',
              }}
            >
              <span>
                {'★'.repeat(Math.floor(book.rating))}
                {book.rating % 1 !== 0 ? '½' : ''}
              </span>
              <span style={{ color: c.dim, fontSize: '0.67rem' }}>({book.rating}/5)</span>
            </div>
          )}

          {/* Tags — blog-exact styling */}
          {book.tags && book.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.1rem' }}>
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.1rem 0.35rem',
                    background: c.tagBg,
                    border: `1px solid ${c.tagBorder}`,
                    borderRadius: '1px',
                    fontSize: '0.67rem',
                    color: c.green,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review / thoughts — TuiBlockquote pattern */}
      {(book.review || book.thoughts) && (
        <div
          style={{
            padding: '0 0.75rem 0.75rem',
            borderTop: `1px dashed ${c.border}`,
            marginTop: 'auto',
            paddingTop: '0.6rem',
          }}
        >
          {book.review && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: 1.65,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  color: c.cyan,
                  userSelect: 'none',
                  fontSize: '0.68rem',
                  lineHeight: '1.4',
                }}
              >
                <span>{'/*'}</span>
                <div
                  style={{
                    width: '1px',
                    flex: 1,
                    minHeight: '0.5rem',
                    background: c.cyan,
                    opacity: 0.4,
                  }}
                />
                <span>{'*/'}</span>
              </div>
              <div style={{ color: c.muted, flex: 1, minWidth: 0 }}>{book.review}</div>
            </div>
          )}
          {book.thoughts && !book.review && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: 1.65,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  color: c.green,
                  userSelect: 'none',
                  fontSize: '0.68rem',
                  lineHeight: '1.4',
                }}
              >
                <span>{'/*'}</span>
                <div
                  style={{
                    width: '1px',
                    flex: 1,
                    minHeight: '0.5rem',
                    background: c.green,
                    opacity: 0.4,
                  }}
                />
                <span>{'*/'}</span>
              </div>
              <div style={{ color: c.muted, flex: 1, minWidth: 0 }}>{book.thoughts}</div>
            </div>
          )}
        </div>
      )}

      {/* Edit button */}
      {onReviewEdit && (
        <div style={{ padding: '0 0.75rem 0.75rem' }}>
          <button
            onClick={() => onReviewEdit(book)}
            style={{
              width: '100%',
              padding: '0.35rem',
              background: `${c.green}12`,
              border: `1px solid ${c.green}`,
              borderRadius: '2px',
              color: c.green,
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: '0.72rem',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = `${c.green}25`)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = `${c.green}12`)
            }
          >
            ✎ edit review
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;

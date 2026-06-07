import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { Book } from '../data/books';
import { useTerminalTheme } from '../terminal-theme';
import styles from '../styles/BookCard.module.css';

interface BookCardProps {
  book: Book & { coverUrl?: string; description?: string };
  onReviewEdit?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onReviewEdit }) => {
  const { isDark, c } = useTerminalTheme();
  const openLibraryUrl = `https://openlibrary.org/isbn/${book.isbn13}`;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'read':
        return c.green;
      case 'reading':
        return c.cyan;
      case 'want-to-read':
        return isDark ? '#ffaa00' : '#c88200';
      default:
        return c.muted;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'read':
        return '✓ Read';
      case 'reading':
        return '◐ Reading';
      case 'want-to-read':
        return '○ Want to Read';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className={styles.card} style={{ background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)', borderColor: c.border }}>
      <div className={styles.coverContainer}>
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`${book.title} cover`}
            width={180}
            height={280}
            className={styles.cover}
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='280'%3E%3Crect fill='${isDark ? '%23222' : '%23ddd'}'/%3E%3C/svg%3E`;
            }}
          />
        ) : (
          <div className={styles.coverPlaceholder} style={{ background: isDark ? '#222' : '#ddd' }}>
            <div className={styles.placeholderText} style={{ color: isDark ? '#666' : '#999' }}>{book.title}</div>
          </div>
        )}
        <div className={styles.statusBadge} style={{ borderColor: getStatusColor(book.status) }}>
          {getStatusLabel(book.status)}
        </div>
        <a
          href={openLibraryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookLink}
          title="View on Open Library"
          style={{ background: isDark ? 'rgba(0, 191, 255, 0.1)' : 'rgba(0, 85, 160, 0.1)', borderColor: c.cyan, color: c.cyan }}
        >
          <FiExternalLink size={14} />
        </a>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} style={{ color: c.textBright }}>{book.title}</h3>
        <p className={styles.author} style={{ color: c.muted }}>{book.author}</p>

        {book.year && <p className={styles.year} style={{ color: c.dim }}>{book.year}</p>}

        {book.rating && (
          <div className={styles.rating} style={{ color: c.green }}>
            {'★'.repeat(Math.floor(book.rating))}
            {book.rating % 1 !== 0 && '½'}
            <span className={styles.ratingValue}>{book.rating}/5</span>
          </div>
        )}

        {book.review && (
          <div className={styles.reviewBox} style={{ background: isDark ? 'rgba(0, 191, 255, 0.05)' : 'rgba(0, 85, 160, 0.05)', borderColor: isDark ? 'rgba(0, 191, 255, 0.2)' : 'rgba(0, 85, 160, 0.2)' }}>
            <p className={styles.reviewLabel} style={{ color: c.cyan }}>Review:</p>
            <p className={styles.reviewText} style={{ color: c.text }}>{book.review}</p>
          </div>
        )}

        {book.thoughts && (
          <div className={styles.thoughtsBox} style={{ background: isDark ? 'rgba(0, 255, 65, 0.05)' : 'rgba(26, 122, 46, 0.05)', borderColor: isDark ? 'rgba(0, 255, 65, 0.2)' : 'rgba(26, 122, 46, 0.2)' }}>
            <p className={styles.thoughtsLabel} style={{ color: c.green }}>Thoughts:</p>
            <p className={styles.thoughtsText} style={{ color: c.text }}>{book.thoughts}</p>
          </div>
        )}

        {book.tags && book.tags.length > 0 && (
          <div className={styles.tags}>
            {book.tags.map((tag) => (
              <span key={tag} className={styles.tag} style={{ color: c.cyan, borderColor: isDark ? 'rgba(0, 191, 255, 0.3)' : 'rgba(0, 85, 160, 0.3)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {onReviewEdit && (
          <button className={styles.editButton} onClick={() => onReviewEdit(book)}>
            ✎ Edit Review
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;

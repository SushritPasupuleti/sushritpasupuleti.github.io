import React, { useState } from 'react';
import Link from 'next/link';
import { FiX, FiBook } from 'react-icons/fi';
import { useTerminalTheme, mono } from '../terminal-theme';
import styles from '../styles/ReadingListModal.module.css';

interface ReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadingListModal: React.FC<ReadingListModalProps> = ({ isOpen, onClose }) => {
  const { isDark, c } = useTerminalTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        style={{
          backgroundColor: isDark
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
        }}
      />

      {/* Modal */}
      <div
        className={styles.modal}
        style={{
          backgroundColor: isDark ? '#0a0a0a' : '#f5f5f0',
          borderColor: c.border,
          fontFamily: mono,
        }}
      >
        {/* Modal Header */}
        <div
          className={styles.header}
          style={{
            background: c.titleBar,
            borderBottomColor: c.border,
            color: c.text,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: c.muted }}>
              ~/library
            </span>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            style={{
              color: c.muted,
              border: `1px solid ${c.border}`,
              background: 'transparent',
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
            <FiX size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          className={styles.content}
          style={{
            borderColor: c.border,
            color: c.text,
          }}
        >
          <div className={styles.icon} style={{ color: c.cyan }}>
            <FiBook size={32} />
          </div>

          <h2 className={styles.title} style={{ color: c.textBright }}>
            Reading List
          </h2>

          <p className={styles.description} style={{ color: c.text }}>
            Explore my personal collection of books—what I&apos;ve read, what I&apos;m currently reading, and
            what&apos;s on my wishlist.
          </p>

          <Link href="/reading-list" onClick={onClose}>
            <button
              className={styles.actionButton}
              style={{
                background: `rgba(0, 255, 65, 0.1)`,
                border: `1px solid ${c.green}`,
                color: c.green,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `rgba(0, 255, 65, 0.2)`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 10px rgba(0, 255, 65, 0.2)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `rgba(0, 255, 65, 0.1)`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              View Reading List →
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div
          className={styles.footer}
          style={{
            borderTopColor: c.border,
            color: c.muted,
            fontSize: '0.75rem',
          }}
        >
          <p>📚 Browse by status • ⭐ View ratings • 🏷️ Filter by tags</p>
        </div>
      </div>
    </>
  );
};

export default ReadingListModal;

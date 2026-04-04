import React from "react";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebook, FaReddit } from "react-icons/fa";

interface ShareSheetProps {
  url: string;
  title?: string;
  variant?: "cta" | "icons";
}

const socialLinks = [
  {
    name: "Twitter",
    icon: <FaTwitter size={16} />,
    getUrl: (url: string, title?: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={16} />,
    getUrl: (url: string, title?: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}`,
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={16} />,
    getUrl: (url: string, title?: string) => `https://wa.me/?text=${encodeURIComponent(title ? title + " " : "")}${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: <FaFacebook size={16} />,
    getUrl: (url: string, title?: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Reddit",
    icon: <FaReddit size={16} />,
    getUrl: (url: string, title?: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}`,
  },
];

const ShareSheet: React.FC<ShareSheetProps> = ({ url, title, variant = "cta" }) => {
  if (variant === "icons") {
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#555", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>share:</span>
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.getUrl(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            style={{
              color: "#666",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              border: "1px solid #2a2a2a",
              borderRadius: "2px",
              background: "transparent",
              transition: "all 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00ff41";
              (e.currentTarget as HTMLAnchorElement).style.color = "#00ff41";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLAnchorElement).style.color = "#666";
            }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  }
  return (
    <div style={{
      border: "1px dashed #2a2a2a",
      padding: "1.25rem",
      marginTop: "1.5rem",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ color: "#555", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
        ┌─── share ────────────────────────────────────
      </div>
      <p style={{ color: "#00ff41", fontSize: "0.85rem", margin: "0 0 0.25rem 0", fontWeight: 600 }}>
        {"// Enjoyed this post?"}
      </p>
      <p style={{ color: "#888", fontSize: "0.8rem", margin: "0 0 1rem 0" }}>
        Help others discover it by sharing on your favorite platform.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.getUrl(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            style={{
              color: "#888",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.75rem",
              border: "1px solid #2a2a2a",
              borderRadius: "2px",
              background: "transparent",
              fontSize: "0.75rem",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00ff41";
              (e.currentTarget as HTMLAnchorElement).style.color = "#00ff41";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLAnchorElement).style.color = "#888";
            }}
          >
            {link.icon} {link.name}
          </a>
        ))}
      </div>
      <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.75rem" }}>
        └──────────────────────────────────────────────
      </div>
    </div>
  );
};

export default ShareSheet;

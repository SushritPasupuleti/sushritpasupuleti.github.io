import * as React from "react";
import {
  BsGithub,
  BsYoutube,
  BsMedium,
  BsLinkedin,
} from "react-icons/bs";
import { SiBlogger } from "react-icons/si";
import { useTerminalTheme, mono } from "../../terminal-theme";

const socialLinks = [
  { href: "https://github.com/SushritPasupuleti", icon: BsGithub, label: "GitHub" },
  { href: "https://www.youtube.com/channel/UCUDlGMaGAQctgQJTRoBHgAw", icon: BsYoutube, label: "YouTube" },
  { href: "https://medium.com/@sushrit.pk21", icon: BsMedium, label: "Medium" },
  { href: "https://sushritpasupuleti.blogspot.com/", icon: SiBlogger, label: "Blog" },
  { href: "https://www.linkedin.com/in/sushritpasupuleti/", icon: BsLinkedin, label: "LinkedIn" },
];

const Hero = () => {
  const { c } = useTerminalTheme();

  return (
    <div>
      {/* Name + title */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ color: c.dim, fontSize: "0.75rem", marginBottom: "0.5rem" }}>
          ┌─── whoami ──────────────────────────────────
        </div>
        <h1 style={{
          color: c.green,
          fontSize: "1.4rem",
          fontWeight: 700,
          margin: "0 0 0.5rem 0",
          fontFamily: mono,
          lineHeight: 1.3,
        }}>
          Sushrit Pasupuleti
        </h1>
        <p style={{ color: c.muted, fontSize: "0.85rem", fontFamily: mono, margin: "0.25rem 0" }}>
          Technical Solution Manager @ClaimShark (now known as Lyric) | Entrepreneur | TedX Speaker | Blogger
        </p>
        <div style={{ color: c.dim, fontSize: "0.75rem", marginTop: "0.5rem" }}>
          └──────────────────────────────────────────────
        </div>
      </div>

      {/* Bio */}
      <blockquote style={{
        borderLeft: `3px solid ${c.green}`,
        marginLeft: 0,
        paddingLeft: "1rem",
        color: c.text,
        fontFamily: mono,
        fontSize: "0.85rem",
        lineHeight: 1.8,
        margin: "1rem 0",
      }}>
        A technical and business-focused solo entrepreneur with 7+ years of
        experience building, managing, and scaling products. Quick to learn,
        adapt, and innovate to ensure product success.
      </blockquote>

      {/* Key Achievements */}
      <div style={{ margin: "1.25rem 0" }}>
        <h3 style={{ color: c.green, fontFamily: mono, fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.5rem 0" }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>Key Achievements
        </h3>
        <ul style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.5rem", margin: 0 }}>
          <li>Shipped 4+ enterprise-grade apps and websites with limited resources.</li>
          <li>Built and scaled <strong style={{ color: c.textBright }}>skillShack();</strong>, a global hub for programmers, reaching users in 130+ countries.</li>
          <li>Part of the Microsoft for Startups Programme.</li>
          <li>Frequent speaker at webinars and seminars, including a TedX talk at age 17.</li>
        </ul>
      </div>

      {/* Skills and Experience */}
      <div style={{ margin: "1.25rem 0" }}>
        <h3 style={{ color: c.green, fontFamily: mono, fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.5rem 0" }}>
          <span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>Skills and Experience
        </h3>
        <ul style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.5rem", margin: 0 }}>
          <li>Product development, software engineering, DevOps, machine learning, data analysis, big data, system design.</li>
          <li>User research, onboarding, feedback incorporation, agile development, digital publishing, writing, video production.</li>
          <li>Graphic design, sales, marketing, webinars, motivational speaking.</li>
        </ul>
      </div>

      <p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, margin: "1rem 0" }}>
        I regularly participate in webinars to educate and motivate peers
        about starting their software journeys and entrepreneurship, while
        continuously upskilling in software development and product management.
      </p>

      <div style={{ borderTop: `1px dashed ${c.border}`, margin: "1.25rem 0" }} />

      {/* Startup */}
      <p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, margin: "0.5rem 0" }}>
        Currently building my startup{" "}
        <a href="https://www.skillshack.dev/" rel="noopener noreferrer" target="_blank"
          style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
          {"skillShack(⚡);"}
        </a>
      </p>
      <p style={{ color: c.muted, fontFamily: mono, fontSize: "0.8rem", lineHeight: 1.8, margin: "0.5rem 0" }}>
        skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!
      </p>

      <div style={{ borderTop: `1px dashed ${c.border}`, margin: "1.25rem 0" }} />

      {/* Contact info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontFamily: mono, fontSize: "0.85rem" }}>
        <div>
          <span style={{ color: c.green }}>dob</span>
          <span style={{ color: c.muted }}>=</span>
          <span style={{ color: c.textBright }}>&quot;Apr 21, 1999&quot;</span>
        </div>
        <div>
          <span style={{ color: c.green }}>email</span>
          <span style={{ color: c.muted }}>=</span>
          <a href="mailto:sushrit@skillshack.dev" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
            &quot;sushrit@skillshack.dev&quot;
          </a>
        </div>
        <div>
          <span style={{ color: c.green }}>phone</span>
          <span style={{ color: c.muted }}>=</span>
          <a href="tel:+919182362040" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
            &quot;+91 9182362040&quot;
          </a>
        </div>
        <div>
          <span style={{ color: c.green }}>role</span>
          <span style={{ color: c.muted }}>=</span>
          <span style={{ color: c.textBright }}>&quot;CEO &amp; CTO&quot;</span>
          <span style={{ color: c.muted }}> @ </span>
          <a href="https://www.skillshack.dev/" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
            Braggi Solutions
          </a>
        </div>
      </div>

      <div style={{ borderTop: `1px dashed ${c.border}`, margin: "1.25rem 0" }} />

      {/* Social links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: c.muted,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.8rem",
              fontFamily: mono,
              textDecoration: "none",
              border: `1px solid ${c.border}`,
              padding: "0.3rem 0.6rem",
              borderRadius: "3px",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = c.green;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = c.green;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = c.muted;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border;
            }}
          >
            <s.icon size={16} />
            {s.label}
          </a>
        ))}
      </div>

      {/* Knowledge hub */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <a
          href="https://sushritpasupuleti.github.io/personal-docs/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: c.green,
            fontFamily: mono,
            fontSize: "0.85rem",
            border: `1px solid ${c.green}`,
            padding: "0.4rem 0.8rem",
            borderRadius: "3px",
            textDecoration: "none",
            transition: "background 0.15s",
          }}
        >
          📚 My Knowledge Hub
        </a>
      </div>
    </div>
  );
};

export default Hero;

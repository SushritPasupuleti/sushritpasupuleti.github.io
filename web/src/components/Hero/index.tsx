import * as React from "react";
import {
  BsGithub,
  BsYoutube,
  BsMedium,
  BsLinkedin,
} from "react-icons/bs";
import { SiBlogger } from "react-icons/si";
import { useTerminalTheme, mono } from "../../terminal-theme";
import TerminalLine from "../TerminalLine";
import TuiBlockquote from "../TuiBlockquote";
import TuiTree from "../TuiTree";
import TuiBox from "../TuiBox";

const socialLinks = [
  { href: "https://github.com/SushritPasupuleti", icon: BsGithub, label: "GitHub" },
  { href: "https://www.youtube.com/channel/UCUDlGMaGAQctgQJTRoBHgAw", icon: BsYoutube, label: "YouTube" },
  { href: "https://medium.com/@sushrit.pk21", icon: BsMedium, label: "Medium" },
  { href: "https://sushritpasupuleti.blogspot.com/", icon: SiBlogger, label: "Blog" },
  { href: "https://www.linkedin.com/in/sushritpasupuleti/", icon: BsLinkedin, label: "LinkedIn" },
];

const Hero = () => {
  const { c, isDark } = useTerminalTheme();

  return (
    <div>
      {/* Name + title */}
      <div style={{ marginBottom: "1rem" }}>
        <TerminalLine variant="open" label="whoami" color={c.dim} />
        <h1 style={{
          color: c.green,
          fontSize: "1.4rem",
          fontWeight: 700,
          margin: "0 0 0.5rem 0",
          fontFamily: mono,
          lineHeight: 1.3,
        }}>
          Sushrit Pasupuleti
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 400,
            marginLeft: "0.75rem",
            padding: "0.1rem 0.5rem",
            background: isDark ? "rgba(0,255,65,0.12)" : "rgba(26,122,46,0.1)",
            color: c.green,
            verticalAlign: "middle",
          }}>● ONLINE</span>
        </h1>
        <p style={{ color: c.muted, fontSize: "0.85rem", fontFamily: mono, margin: "0.25rem 0" }}>
          Senior Manager @ClaimShark (now known as Lyric) | Entrepreneur | TedX Speaker | Blogger
        </p>
        <TerminalLine variant="close" color={c.dim} />
      </div>

      {/* Bio */}
      <TuiBlockquote color={c.text} borderColor={c.green} dimColor={c.dim}>
        A technical and business-focused solo entrepreneur with 7+ years of
        experience building, managing, and scaling products. Quick to learn,
        adapt, and innovate to ensure product success.
      </TuiBlockquote>

      {/* Key Achievements */}
      <TuiBox c={c} title="Key Achievements" badge="4 entries" badgeColor={c.green}>
        <TuiTree c={c} items={[
          <>Shipped 4+ enterprise-grade apps and websites with limited resources.</>,
          <>Built and scaled <strong style={{ color: c.textBright }}>skillShack();</strong>, a global hub for programmers, reaching users in 130+ countries.</>,
          <>Part of the Microsoft for Startups Programme.</>,
          <>Frequent speaker at webinars and seminars, including a TedX talk at age 17.</>,
        ]} />
      </TuiBox>

      {/* Skills and Experience */}
      <TuiBox c={c} title="Skills & Experience" badge="3 categories" badgeColor={c.cyan}>
        <TuiTree c={c} items={[
          <>Product development, software engineering, DevOps, machine learning, data analysis, big data, system design.</>,
          <>User research, onboarding, feedback incorporation, agile development, digital publishing, writing, video production.</>,
          <>Graphic design, sales, marketing, webinars, motivational speaking.</>,
        ]} />
      </TuiBox>

      <p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, margin: "1rem 0" }}>
        I regularly participate in webinars to educate and motivate peers
        about starting their software journeys and entrepreneurship, while
        continuously upskilling in software development and product management.
      </p>

      <div style={{ borderTop: `1px dashed ${c.border}`, margin: "1.25rem 0" }} />

      {/* Startup */}
      <TuiBox c={c} title="Current Venture" badge="ACTIVE" badgeColor={c.green}>
        <p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, margin: "0 0 0.5rem 0" }}>
          Currently building my startup{" "}
          <a href="https://www.skillshack.dev/" rel="noopener noreferrer" target="_blank"
            style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
            {"skillShack(⚡);"}
          </a>
        </p>
        <p style={{ color: c.muted, fontFamily: mono, fontSize: "0.8rem", lineHeight: 1.8, margin: 0 }}>
          skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!
        </p>
      </TuiBox>

      {/* Contact info as env vars */}
      <TuiBox c={c} title="env" badge="~/.profile">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontFamily: mono, fontSize: "0.85rem" }}>
          <div>
            <span style={{ color: c.dim }}>export </span>
            <span style={{ color: c.green }}>DOB</span>
            <span style={{ color: c.muted }}>=</span>
            <span style={{ color: c.textBright }}>&quot;Apr 21, 1999&quot;</span>
          </div>
          <div>
            <span style={{ color: c.dim }}>export </span>
            <span style={{ color: c.green }}>EMAIL</span>
            <span style={{ color: c.muted }}>=</span>
            <a href="mailto:sushrit@skillshack.dev" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed", wordBreak: "break-all" }}>
              &quot;sushrit@skillshack.dev&quot;
            </a>
          </div>
          <div>
            <span style={{ color: c.dim }}>export </span>
            <span style={{ color: c.green }}>PHONE</span>
            <span style={{ color: c.muted }}>=</span>
            <a href="tel:+919182362040" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
              &quot;+91 9182362040&quot;
            </a>
          </div>
          <div>
            <span style={{ color: c.dim }}>export </span>
            <span style={{ color: c.green }}>ROLE</span>
            <span style={{ color: c.muted }}>=</span>
            <span style={{ color: c.textBright }}>&quot;Founder @ </span>
            <a href="https://www.skillshack.dev/" style={{ color: c.cyan, textDecoration: "underline", textDecorationStyle: "dashed" }}>
              Braggi Solutions
            </a>
            <span style={{ color: c.textBright }}>&quot;</span>
          </div>
        </div>
      </TuiBox>

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

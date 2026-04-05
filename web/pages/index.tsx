import type { NextPage } from 'next'
import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '../src/components/Hero';
import TedxSection from '../src/components/Sections/TedX';
import SkillsSection from '../src/components/Sections/Skills';
import ToolsSection from '../src/components/Sections/Tools';
import WorkExperienceSection from '../src/components/Sections/WorkExperience';
import ProjectsSection from '../src/components/Sections/Projects';
import VideosSection from '../src/components/Sections/Videos';
import BlogsSection from '../src/components/Sections/Blogs';
import HomeSEO from '../src/components/SEO';
import ExtraSection from '../src/components/Sections/Extra';
import CertificatesSection from '../src/components/Sections/Certificates';
import Navbar from '../src/components/Navbar';
import TableOfContents from '../src/components/TableOfContents';
import FloatingTocNav from '../src/components/FloatingTocNav';
import TerminalBoot from '../src/components/TerminalBoot';
import { useTerminalTheme, mono } from '../src/terminal-theme';
import { FiSun, FiMoon } from 'react-icons/fi';

const HOME_BOOT_LINES = [
	{ command: "ssh guest@sushrit-pasupuleti.dev", output: ["Connection established."] },
	{ command: "whoami", output: ["guest — welcome to sushrit's terminal"] },
	{ command: "cat /etc/motd", output: ["Last login: " + new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })] },
	{ command: "ls ~/resume/", output: ["skills/  tools/  experience/  projects/  certificates/  blogs/  videos/"] },
	{ command: "cat resume.md", output: ["Parsing frontmatter...", "Loading sections..."] },
	{ command: "source ~/.terminal-theme", output: ["Theme loaded."] },
	{ command: "render --format=terminal --sections=all", output: ["Rendering 10 sections...", "Done. Enjoy your stay!"] },
];

const Home: NextPage = () => {
	const { isDark, c, setTheme } = useTerminalTheme();
	const [booting, setBooting] = useState(true);

	const handleBootDone = useCallback(() => {
		setBooting(false);
	}, []);

	return (
		<>
			{booting && <TerminalBoot lines={HOME_BOOT_LINES} c={c} onDone={handleBootDone} maxDuration={6000} />}
			<HomeSEO />
			<Head>
				<title>Sushrit Pasupuleti - Resume</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<FloatingTocNav />
			<div
				className="terminal-container"
				style={{
					maxWidth: "900px",
					margin: "0 auto",
					paddingTop: "4.5rem",
					paddingLeft: "1.5rem",
					paddingRight: "1.5rem",
					paddingBottom: "2rem",
					fontFamily: mono,
					color: c.text,
					minHeight: "100vh",
				}}
			>
				{/* Terminal window bar */}
				<div
					style={{
						background: c.titleBar,
						border: `1px solid ${c.border}`,
						borderBottom: "none",
						borderRadius: "6px 6px 0 0",
						padding: "0.5rem 1rem",
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
					}}
				>
					<span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
					<span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
					<span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
					<span style={{ marginLeft: "1rem", color: c.muted, fontSize: "0.75rem", flex: 1 }}>
						~/sushrit-pasupuleti
					</span>
					<button
						onClick={() => setTheme(isDark ? "light" : "dark")}
						aria-label="Toggle theme"
						style={{
							background: "transparent",
							border: `1px solid ${c.border}`,
							borderRadius: "3px",
							cursor: "pointer",
							padding: "0.25rem 0.4rem",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							color: c.muted,
							transition: "color 0.15s, border-color 0.15s",
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
						borderRadius: "0 0 6px 6px",
						padding: "1.5rem",
					}}
				>
					{/* Breadcrumb */}
					<div style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
						<span style={{ color: c.green }}>guest@sushrit</span>
						<span style={{ color: c.muted }}>:</span>
						<span style={{ color: c.cyan }}>~</span>
						<span style={{ color: c.muted }}> $ </span>
						<span style={{ color: c.textBright }}>cat resume.md</span>
					</div>

					{/* Header ASCII */}
					<pre style={{
						color: c.green,
						fontSize: "0.55rem",
						lineHeight: 1.2,
						margin: 0,
						whiteSpace: "pre",
						overflowX: "auto",
						marginBottom: "1rem",
					}}>
{`
 ____  _   _ ____  _   _ ____  ___ _____
/ ___|| | | / ___|| | | |  _ \\|_ _|_   _|
\\___ \\| | | \\___ \\| |_| | |_) || |  | |
 ___) | |_| |___) |  _  |  _ < | |  | |
|____/ \\___/|____/|_| |_|_| \\_\\___|  |_|
`}
					</pre>

					<div style={{ borderTop: `1px dashed ${c.border}`, margin: "1rem 0" }} />

					<header id="hero">
						<Hero />
					</header>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<TableOfContents />
					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />

					<section id="tedx"><TedxSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="skills"><SkillsSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="tools"><ToolsSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="experience"><WorkExperienceSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="projects"><ProjectsSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="certificates"><CertificatesSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="extra"><ExtraSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="blogs"><BlogsSection /></section>

					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0" }} />
					<section id="videos"><VideosSection /></section>

					{/* Footer */}
					<div style={{ borderTop: `1px dashed ${c.separator}`, margin: "2rem 0 1rem" }} />
					<div style={{ fontSize: "0.8rem", color: c.muted, textAlign: "center" }}>
						<span style={{ color: c.green }}>{"// "}</span>
						Copyright &copy; {new Date().getFullYear()} Sushrit Pasupuleti. All rights reserved.
					</div>

					{/* Terminal prompt at bottom */}
					<div style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
						<span style={{ color: c.green }}>guest@sushrit</span>
						<span style={{ color: c.muted }}>:</span>
						<span style={{ color: c.cyan }}>~</span>
						<span style={{ color: c.muted }}> $ </span>
						<span className="terminal-cursor" style={{ color: c.text }}></span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home

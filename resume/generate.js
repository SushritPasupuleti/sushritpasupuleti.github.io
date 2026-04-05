#!/usr/bin/env node
// generate.js — Reads data from web/src/components/Sections/* and generates resume.tex
// Usage: node generate.js
'use strict';

const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, '..', 'web', 'src', 'components', 'Sections');
const OUTPUT_FILE = path.join(__dirname, 'resume.tex');

// ═══════════════════════════════════════════════════════════
// Hardcoded sections (not sourced from web/src/components).
// Edit these directly as needed.
// ═══════════════════════════════════════════════════════════

const CONTACT = {
	name: 'Sushrit Pasupuleti',
	location: 'Hyderabad, Telangana, India',
	portfolio: 'https://sushritpasupuleti.github.io/',
	linkedin: 'https://www.linkedin.com/in/sushritpasupuleti',
	github: 'https://github.com/SushritPasupuleti',
	emails: ['sushrit.pk21@gmail.com', 'sushrit@skillshack.dev'],
	phone: '+919182362040',
};

const SUMMARY = {
	headline: 'Senior Manager @ClaimShark (now known as Lyric) | Entrepreneur | TedX Speaker | Blogger',
	text: 'A technical and business-focused solo entrepreneur with 7+ years of experience building, managing, and scaling products. Quick to learn, adapt, and innovate to ensure product success.',
	achievements: [
		'Shipped 4+ enterprise-grade apps and websites with limited resources.',
		'Built and scaled skillShack();, a global hub for programmers, reaching users in 130+ countries.',
		'Part of the Microsoft for Startups Programme.',
		'Frequent speaker at webinars and seminars, including a TedX talk at age 17.',
	],
	skillsSummary: [
		'Product development, software engineering, DevOps, machine learning, data analysis, big data, system design.',
		'User research, onboarding, feedback incorporation, agile development, digital publishing, writing, video production.',
		'Graphic design, sales, marketing, webinars, motivational speaking.',
	],
	closing: 'I regularly participate in webinars to educate and motivate peers about starting their software journeys and entrepreneurship, while continuously upskilling in software development and product management.',
	currentProject: 'Currently building my startup skillShack();, which is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!',
};

const EDUCATION = [
	{ institution: 'Sreyas Institute of Engineering and Technology', location: 'Hyderabad, Telangana, India', degree: 'Bachelor of Computer Science', dates: '2017 -- 2021' },
	{ institution: 'DAV Public School', location: 'Hyderabad, Telangana, India', degree: 'XII Grade', dates: '2015 -- 2017' },
	{ institution: 'Bolton', location: 'Hyderabad, Telangana, India', degree: 'X Grade', dates: '2015' },
];

// ═══════════════════════════════════════════════════════════
// Data Extraction — parses TSX files to pull out JS arrays
// ═══════════════════════════════════════════════════════════

function readSection(name) {
	const filePath = path.join(SECTIONS_DIR, name, 'index.tsx');
	try { return fs.readFileSync(filePath, 'utf-8'); }
	catch (e) { console.error(`Could not read ${name}/index.tsx: ${e.message}`); return ''; }
}

function extractConst(source, varName) {
	const re = new RegExp(`const\\s+${varName}[^=]*=\\s*`);
	const m = source.match(re);
	if (!m) { console.warn(`  Warning: ${varName} not found`); return null; }

	const valStart = m.index + m[0].length;
	let i = valStart, depth = 0;

	while (i < source.length) {
		const ch = source[i];
		// skip single-line comment
		if (ch === '/' && source[i + 1] === '/') { while (i < source.length && source[i] !== '\n') i++; continue; }
		// skip multi-line comment
		if (ch === '/' && source[i + 1] === '*') { i += 2; while (i < source.length - 1 && !(source[i] === '*' && source[i + 1] === '/')) i++; i += 2; continue; }
		// skip string literal
		if (ch === "'" || ch === '"') { const q = ch; i++; while (i < source.length && source[i] !== q) { if (source[i] === '\\') i++; i++; } i++; continue; }
		// skip template literal
		if (ch === '`') { i++; while (i < source.length && source[i] !== '`') { if (source[i] === '\\') i++; i++; } i++; continue; }
		// track all bracket types
		if (ch === '[' || ch === '{' || ch === '(') depth++;
		if (ch === ']' || ch === '}' || ch === ')') {
			depth--;
			if (depth === 0) {
				const literal = source.substring(valStart, i + 1);
				try { return new Function('return ' + literal)(); }
				catch (e) { console.error(`  Error evaluating ${varName}: ${e.message}`); return null; }
			}
		}
		i++;
	}
	console.warn(`  Warning: no matching bracket for ${varName}`);
	return null;
}

// ═══════════════════════════════════════════════════════════
// LaTeX Helpers
// ═══════════════════════════════════════════════════════════

function esc(str) {
	if (!str) return '';
	return String(str)
		.replace(/\\/g, '\x00BS\x00')
		.replace(/&/g, '\\&')
		.replace(/%/g, '\\%')
		.replace(/\$/g, '\\$')
		.replace(/#/g, '\\#')
		.replace(/_/g, '\\_')
		.replace(/\{/g, '\\{')
		.replace(/\}/g, '\\}')
		.replace(/~/g, '\\textasciitilde{}')
		.replace(/\^/g, '\\textasciicircum{}')
		.replace(/\x00BS\x00/g, '\\textbackslash{}')
		// strip emojis LaTeX can't render
		.replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
		.replace(/[\u{2600}-\u{26FF}]/gu, '')
		.replace(/[\u{2700}-\u{27BF}]/gu, '')
		.replace(/\uFE0F/g, '')
		// collapse whitespace from template literals
		.replace(/\s+/g, ' ')
		.trim();
}

function indent(n) { return '  '.repeat(n); }

// ═══════════════════════════════════════════════════════════
// Section Generators
// ═══════════════════════════════════════════════════════════

function genPreamble() {
	return `%------------PACKAGES----------------
% AUTO-GENERATED by resume/generate.js — do not edit by hand.
% Source of truth: web/src/components/Sections/*/index.tsx
\\documentclass[a4paper,11pt]{article}

\\usepackage{verbatim}
\\usepackage{titlesec}
\\usepackage{color}
\\usepackage{enumitem}
\\usepackage{fancyhdr}
\\usepackage{tabularx}
\\usepackage{latexsym}
\\usepackage{marvosym}
\\usepackage[empty]{fullpage}
\\usepackage[hidelinks]{hyperref}
\\usepackage[normalem]{ulem}
\\usepackage[english]{babel}

\\input glyphtounicode
\\pdfgentounicode=1

\\usepackage[default]{sourcesanspro}
\\urlstyle{same}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0in}
\\renewcommand{\\footrulewidth}{0in}
\\setlength{\\tabcolsep}{0in}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\topmargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\textheight}{1.0in}

\\raggedbottom{}
\\raggedright{}

\\titleformat{\\section}
  {\\scshape\\large}{}
    {0em}{\\color{blue}}[\\color{black}\\titlerule\\vspace{0pt}]

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand{\\ULdepth}{2pt}

\\newcommand{\\resumeItem}[1]{\\item\\large{#1}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[rightmargin=0.11in]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}}

\\newcommand{\\resumeSectionType}[3]{
  \\item\\begin{tabular*}{0.96\\textwidth}[t]{
    p{0.15\\linewidth}p{0.02\\linewidth}p{0.81\\linewidth}
  }
    \\textbf{#1} & #2 & #3
  \\end{tabular*}\\vspace{-2pt}
}

\\newcommand{\\resumeTrioHeading}[3]{
  \\item\\large{
    \\begin{tabular*}{0.96\\textwidth}[t]{
      l@{\\extracolsep{\\fill}}c@{\\extracolsep{\\fill}}r
    }
      \\textbf{#1} & \\textit{#2} & #3
    \\end{tabular*}
  }
}

\\newcommand{\\resumeQuadHeading}[4]{
  \\item
  \\begin{tabular*}{0.96\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{\\large#3} & \\textit{\\large #4} \\\\
  \\end{tabular*}
}

\\newcommand{\\resumeQuadHeadingChild}[2]{
  \\item
  \\begin{tabular*}{0.96\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{\\large#1} & {\\large#2} \\\\
  \\end{tabular*}
}

\\newcommand{\\resumeHeadingListStart}{
  \\begin{itemize}[leftmargin=0.15in, label={}]
}
\\newcommand{\\resumeHeadingListEnd}{\\end{itemize}}`;
}

function genContact() {
	const c = CONTACT;
	const emails = c.emails.map(e => `\\href{mailto:${e}}{\\uline{${esc(e)}}}`).join(' or ');
	return `
%-----------CONTACT DETAILS------------------
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\Huge ${esc(c.name)} \\vspace{2pt}} & \\\\
  Location: ${esc(c.location)} \\\\
  \\href{${c.portfolio}}{\\uline{Portfolio}} $|$
  \\href{${c.linkedin}}{\\uline{LinkedIn}} $|$
  \\href{${c.github}}{\\uline{GitHub}} $|$
  Email: ${emails} $|$
  Mobile: \\href{tel:${c.phone}}{\\uline{${esc(c.phone)}}} \\\\
\\end{tabular*}`;
}

function genSummary() {
	const s = SUMMARY;
	const achievements = s.achievements.map(a => `  \\item ${esc(a)}`).join('\n');
	const skills = s.skillsSummary.map(sk => `  \\item ${esc(sk)}`).join('\n');
	return `
%-----------SUMMARY--------------------------
\\section{\\LARGE{${esc(s.headline)}}}
\\large{

\\vspace{0.5em}

${esc(s.text)}

\\vspace{0.5em}

\\textbf{Key Achievements:}
\\begin{itemize}[leftmargin=0.15in]
${achievements}
\\end{itemize}

\\vspace{0.5em}

\\textbf{Skills and Experience:}
\\begin{itemize}[leftmargin=0.15in]
${skills}
\\end{itemize}

\\vspace{0.5em}

${esc(s.closing)}
}

\\vspace{1em}

\\large{
${esc(s.currentProject)}
}`;
}

function genSkills(skillsSource, toolsSource) {
	const skillMap = [
		{ label: 'Frontend', varName: 'frontendSkills', source: skillsSource },
		{ label: 'Backend', varName: 'backendSkills', source: skillsSource },
		{ label: 'Databases', varName: 'databaseSkills', source: skillsSource },
		{ label: 'ML/AI/Data-Science', varName: 'mlSkills', source: skillsSource },
		{ label: 'DevOps', varName: 'devopsSkills', source: skillsSource },
		{ label: 'Testing', varName: 'testingSkills', source: skillsSource },
		{ label: 'Project-Management', varName: 'toolsPM', source: toolsSource },
		{ label: 'Misc', varName: 'miscSkills', source: skillsSource },
		{ label: 'Tools', varName: 'tools', source: toolsSource },
	];

	const rows = [];
	for (const { label, varName, source } of skillMap) {
		const arr = extractConst(source, varName);
		if (!arr || !arr.length) { console.warn(`  Skipping skill row: ${label}`); continue; }
		const items = arr.filter(s => s && s !== 'And More...').map(s => esc(String(s))).join(', ');
		rows.push(`    \\resumeSectionType{${esc(label)}}{:}{${items}}`);
	}

	return `
%--------------SKILLS------------------------
\\section{\\LARGE{Technical Skills}}
  \\resumeHeadingListStart{}
${rows.join('\n')}
  \\resumeHeadingListEnd{}`;
}

function genExperience(source) {
	const data = extractConst(source, 'workExperience');
	if (!data || !data.length) return '\n% Experience: no data found\n';

	// Group consecutive entries by organization
	const groups = [];
	let cur = null;
	for (const entry of data) {
		if (!cur || cur.org !== entry.organization) {
			cur = { org: entry.organization, entries: [entry] };
			groups.push(cur);
		} else {
			cur.entries.push(entry);
		}
	}

	const blocks = groups.map(group => {
		const headings = group.entries.map(entry => {
			const loc = entry.location ? esc(entry.location) : '';
			const dateRange = `${esc(entry.start)} -- ${esc(entry.end)}`;
			let block = `  \\resumeQuadHeading{${esc(entry.position)}}{${dateRange}}\n`;
			block += `  {${esc(entry.organization)}}{${loc}}`;
			if (entry.keywords && entry.keywords.length) {
				block += '\n    \\resumeItemListStart{}';
				for (const kw of entry.keywords) {
					block += `\n      \\resumeItem{${esc(kw)}}`;
				}
				block += '\n    \\resumeItemListEnd{}';
			}
			return block;
		}).join('\n');
		return `\\resumeHeadingListStart{}\n${headings}\n\\resumeHeadingListEnd{}`;
	}).join('\n\n');

	return `
%-----------EXPERIENCE-----------------------
\\section{\\LARGE{Experience}}
${blocks}`;
}

function genEducation() {
	const blocks = EDUCATION.map(ed => {
		return `\\resumeHeadingListStart{}
    \\resumeQuadHeading{${esc(ed.institution)}}{${esc(ed.location)}}
    {${esc(ed.degree)}}{${ed.dates}}
  \\resumeHeadingListEnd{}`;
	}).join('\n  ');

	return `
%-----------EDUCATION-------------------------
\\section{\\LARGE{Education}}
  ${blocks}`;
}

function genProjects(source) {
	const data = extractConst(source, 'projectsList');
	if (!data || !data.length) return '\n% Projects: no data found\n';

	const blocks = data.map(proj => {
		const name = esc(proj.product);
		const nameLatex = proj.link
			? `\\href{${proj.link}}{\\uline{${name}}}`
			: `{\\uline{${name}}}`;
		const dateRange = `${esc(proj.start)} -- ${esc(proj.end)}`;
		const desc = esc(proj.description);
		const tags = (proj.tags || []).map(t => esc(String(t))).join(', ');

		let items = '';
		if (desc) items += `\n\t\t\\large{${desc}}`;
		if (tags) items += `\n\t\t\\resumeItem{Stack: \\textbf{${tags}}}`;
		if (proj.keywords) {
			for (const kw of proj.keywords) {
				items += `\n\t\t\\resumeItem{${esc(kw)}}`;
			}
		}

		return `  \\resumeHeadingListStart{}
  \\resumeQuadHeading{${nameLatex}}{${dateRange}}
  {${esc(proj.position)}}{}
      \\resumeItemListStart{}${items}
      \\resumeItemListEnd{}
  \\resumeHeadingListEnd{}`;
	}).join('\n\n');

	return `
%-----------PROJECTS--------------------------
\\section{\\LARGE{Projects}}
${blocks}`;
}

function genCertifications(source) {
	const data = extractConst(source, 'coursesList');
	if (!data || !data.length) return '\n% Certifications: no data found\n';

	const items = data.map(cert => {
		const name = esc(cert.title);
		const desc = esc(cert.description);
		const link = cert.originalUrl || cert.url || '';
		if (link) {
			return `    \\resumeItem{\\href{${link}}{\\uline{${name}}} - ${desc}}`;
		}
		return `    \\resumeItem{\\textbf{${name}} - ${desc}}`;
	}).join('\n');

	return `
%----------------CERTIFICATIONS--------------
\\section{\\LARGE{Certifications}}
  \\large{I usually teach myself things online over first-party Docs or FreeCodeCamp and avoid taking courses so that I can move at my pace. Sometimes however if a course is really good and worth the time I do get into it, like the ones below.}
  \\resumeItemListStart{}
${items}
  \\resumeItemListEnd{}`;
}

function genAccomplishments(source) {
	const data = extractConst(source, 'extra');
	if (!data || !data.length) return '\n% Accomplishments: no data found\n';

	const items = data.map(item => `\\resumeItem{${esc(item)}}`).join('\n');

	return `
%-----------------Accomplishments------------
\\section{\\LARGE{Accomplishments/Brags/Hobbies}}
\\large{Cool things I've done and things I like to do in my free time!}
\\resumeItemListStart{}
${items}
\\resumeItemListEnd{}`;
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════

function main() {
	console.log('Reading section data from web/src/components/Sections/ ...');

	const skillsSource = readSection('Skills');
	const toolsSource = readSection('Tools');
	const workSource = readSection('WorkExperience');
	const projectsSource = readSection('Projects');
	const certsSource = readSection('Certificates');
	const extraSource = readSection('Extra');

	console.log('Generating LaTeX ...');

	const parts = [
		genPreamble(),
		'\n\n%__________________RESUME____________________\n\\begin{document}\n',
		genContact(),
		genSummary(),
		genSkills(skillsSource, toolsSource),
		genExperience(workSource),
		genEducation(),
		genProjects(projectsSource),
		genCertifications(certsSource),
		genAccomplishments(extraSource),
		'\n\n\\end{document}\n',
	];

	const tex = parts.join('\n');
	fs.writeFileSync(OUTPUT_FILE, tex, 'utf-8');
	console.log(`Written to ${OUTPUT_FILE} (${tex.length} bytes)`);
}

main();

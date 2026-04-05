import React, { useState } from "react";
import { MdDevicesOther } from "react-icons/md";
import { GoServer, GoDatabase } from "react-icons/go";
import { VscServerProcess } from "react-icons/vsc"
import { TbRobot } from "react-icons/tb";
import { BiTestTube } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import SkillsList from './SkillsList';
import SkillKeywords from './Keywords';
import TmuxPane from "../../TmuxPane";
import TuiSectionHeader from "../../TuiSectionHeader";
import { useTerminalTheme, mono } from "../../../terminal-theme";

const frontendSkills: Array<String> = [
	'ReactJS', 'NextJs', 'React Native', 'React Native Web', 'React Native Expo',
	'Flutter', 'GatsbyJS', 'AngularJS', 'materialize-css', 'Bootstrap',
	'tailwindcss', 'jinja2', 'HTMX', 'AlpineJS', 'HTML', 'CSS', 'SASS',
	'JavaScript', 'TypeScript', 'Dart',
]

const backendSkills: Array<String> = [
	'Axum', 'ExpressJS', 'FastAPI', 'Chi', 'ASP.NET Core', 'Django', 'Flask',
	'Fiber', 'Gin', 'Sanic', 'NodeJS', 'Rust', 'JavaScript', 'TypeScript', 'Dart', 'Go',
]

const databaseSkills: Array<String> = [
	'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', "Neo4J",
	'Firebase (Firestore)', 'Sequelize', 'Mongoose', 'Prisma',
	'Entity Framework', 'SQLAlchemy', 'sqlx', 'Drizzle ORM', 'DjangoORM', 'Gorm', 'Kysley',
]

const testingSkills: Array<String> = [
	'Jest', 'supertest', 'cypress', 'playwright', 'XUnit',
]

const devopsSkills: Array<String> = [
	'AWS (EC2, RDS, S3, ELB, Amplify, Fargate, Lambda, SQS, ECS)',
	'Azure App (Service, Functions, Docker Functions, Database)',
	'Terraform', 'AWS CDK', 'Docker', 'Kubernetes', 'Netlify', 'Vercel',
	'GitHub Actions', 'Self Hosting via Proxmox (LXCs and Docker)',
]

const mlSkills: Array<String> = [
	'Pytorch', 'Langchain', 'Keras', 'Apache Spark', 'Apache Airflow',
	'TensorFlow', 'TensorFlowJS', 'TFLearn', 'scikit-learn', 'Pandas',
	'Numpy', 'Matplotlib', 'd3js', "dbt", "Apache Airflow",
]

const pmSkills: Array<String> = [
	'Highly skilled in Agile Product Management, and business processes.',
	'Experience Leading/Mentoring distributed and cross-functional teams.',
	'Business Analytics and Agile Methodologies.',
	'Defining User Stories, Work Delegation, Sprint Planning and Mentoring.',
	'Strong Technical Background and business acumen.',
	'Experience delivering on time and within scope, with good Risk Mitigation.',
	'Exhaustive experience with: Jira, Asana, GitHub Projects, n8n for Automation, GSuite, Office 365.',
]

const miscSkills: Array<String> = [
	'WebSockets', 'WebRTC', 'gRPC', 'ActivityPub', "Socket.IO", 'SignalR',
	"material-ui", "react-native-paper", "React NativeBase", "RNUILib",
	"React-Redux", "Redux-Form", "Formik", "React Hook Form", "Redux Toolkit",
	"React-Query", "React-Router", "PassportJS", "OAuth", "Adaptive Cards",
	"GraphQL", "Hasura", "Apollo", "Mongoose", "Chart.js", "ApexCharts.js",
	"Sequelize", "Gorm", "turborepo", "nx", "react-admin", "Google Analytics",
	"Webhooks", "OpenAI API", "Puppeteer", "Arduino",
]

const keywords: Array<String> = [
	"Product Management", "Full Stack Dev", "Cross-platform Dev", "tech", "app dev", "ml", "AI", "hybrid apps", "linux", "chatbots", "MERN Stack", "JAM Stack", ".NET Core", "monorepos", "self hosting", "neovim", "Embedded Systems", "IoT"
];

const skillCategories = [
	{ title: "Project Management", subtitle: "From kick-off to delivery", icon: "📋", skills: pmSkills },
	{ title: "Back-end", subtitle: "API Servers, Serverless, and Microservices", icon: "⚙️", skills: backendSkills },
	{ title: "Front-end", subtitle: "Web, Mobile, Native and Cross-platform", icon: "🖥️", skills: frontendSkills },
	{ title: "Databases", subtitle: "Databases, ORMs etc.", icon: "🗄️", skills: databaseSkills },
	{ title: "Testing", subtitle: "Unit, Integration, and E2E", icon: "🧪", skills: testingSkills },
	{ title: "DevOps", subtitle: "CI/CD, Docker, and more", icon: "🚀", skills: devopsSkills },
	{ title: "Machine Learning & Data Science", subtitle: "From NLP, NLU to everything else that's ML", icon: "🤖", skills: mlSkills },
	{ title: "Other Frameworks & Technologies", subtitle: "Sprinkled on top of the above!", icon: "💻", skills: miscSkills },
];

function SkillCategory({ title, subtitle, icon, skills, c, isDark, open, onToggle }: { title: string; subtitle: string; icon: string; skills: Array<String>; c: any; isDark: boolean; open: boolean; onToggle: (open: boolean) => void }) {
	return (
		<TmuxPane
			c={c}
			isDark={isDark}
			title={`${icon} ${title}`}
			subtitle={subtitle}
			controlledOpen={open}
			onToggle={onToggle}
			badges={[{ label: `${skills.length} items`, color: "green" }]}
		>
			<SkillsList skills={skills} />
		</TmuxPane>
	);
}

export default function Skills() {
	const { c, isDark } = useTerminalTheme();
	const [openMap, setOpenMap] = React.useState<Record<string, boolean>>(() => {
		const map: Record<string, boolean> = {};
		skillCategories.forEach((cat, idx) => { map[cat.title] = idx < 2; });
		return map;
	});

	const allOpen = skillCategories.every((cat) => openMap[cat.title]);
	const allClosed = skillCategories.every((cat) => !openMap[cat.title]);

	const expandAll = () => {
		const map: Record<string, boolean> = {};
		skillCategories.forEach((cat) => { map[cat.title] = true; });
		setOpenMap(map);
	};

	const collapseAll = () => {
		const map: Record<string, boolean> = {};
		skillCategories.forEach((cat) => { map[cat.title] = false; });
		setOpenMap(map);
	};

	return (
		<div>
			<TuiSectionHeader c={c} command="apt list --installed" output={`${skillCategories.length} categories, ${skillCategories.reduce((s, cat) => s + cat.skills.length, 0)} packages`} />
			<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
				<div style={{ display: "flex", gap: "0.35rem" }}>
					<button
						onClick={expandAll}
						disabled={allOpen}
						style={{
							background: "transparent",
							border: `1px solid ${allOpen ? c.border : c.green}`,
							borderRadius: "2px",
							color: allOpen ? c.dim : c.green,
							fontFamily: mono,
							fontSize: "0.7rem",
							cursor: allOpen ? "default" : "pointer",
							padding: "0.15rem 0.5rem",
							transition: "all 0.15s",
							opacity: allOpen ? 0.5 : 1,
						}}
					>
						[+] expand all
					</button>
					<button
						onClick={collapseAll}
						disabled={allClosed}
						style={{
							background: "transparent",
							border: `1px solid ${allClosed ? c.border : c.green}`,
							borderRadius: "2px",
							color: allClosed ? c.dim : c.green,
							fontFamily: mono,
							fontSize: "0.7rem",
							cursor: allClosed ? "default" : "pointer",
							padding: "0.15rem 0.5rem",
							transition: "all 0.15s",
							opacity: allClosed ? 0.5 : 1,
						}}
					>
						[-] collapse all
					</button>
				</div>
			</div>
			<div style={{ marginBottom: "1rem" }}>
				<SkillKeywords skills={keywords} />
			</div>
			{skillCategories.map((cat) => (
				<SkillCategory
					key={cat.title}
					{...cat}
					c={c}
					isDark={isDark}
					open={openMap[cat.title] ?? false}
					onToggle={(isOpen) => setOpenMap((prev) => ({ ...prev, [cat.title]: isOpen }))}
				/>
			))}
		</div>
	);
}


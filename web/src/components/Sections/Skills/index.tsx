import React, { useState } from "react";
import { MdDevicesOther } from "react-icons/md";
import { GoServer, GoDatabase } from "react-icons/go";
import { VscServerProcess } from "react-icons/vsc"
import { TbRobot } from "react-icons/tb";
import { BiTestTube } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import SkillsList from './SkillsList';
import SkillKeywords from './Keywords';
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

function SkillCategory({ title, subtitle, icon, skills, c }: { title: string; subtitle: string; icon: string; skills: Array<String>; c: any }) {
	const [open, setOpen] = useState(true);
	return (
		<div style={{ marginBottom: "1rem", border: `1px solid ${c.border}`, borderRadius: "4px" }}>
			<div
				onClick={() => setOpen(!open)}
				style={{
					padding: "0.5rem 0.75rem",
					background: c.titleBar,
					cursor: "pointer",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderRadius: open ? "4px 4px 0 0" : "4px",
				}}
			>
				<div>
					<span style={{ marginRight: "0.5rem" }}>{icon}</span>
					<span style={{ color: c.green, fontFamily: mono, fontSize: "0.9rem", fontWeight: 600 }}>{title}</span>
					<span style={{ color: c.muted, fontFamily: mono, fontSize: "0.75rem", marginLeft: "0.75rem" }}>{subtitle}</span>
				</div>
				<span style={{ color: c.dim, fontFamily: mono, fontSize: "0.8rem" }}>{open ? "[-]" : "[+]"}</span>
			</div>
			{open && (
				<div style={{ padding: "0.75rem" }}>
					<SkillsList skills={skills} />
				</div>
			)}
		</div>
	);
}

export default function Skills() {
	const { c } = useTerminalTheme();
	return (
		<div>
			<h2 style={{ color: c.green, fontFamily: mono, fontSize: "1.15rem", fontWeight: 600, margin: "0 0 0.5rem 0" }}>
				<span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>Skills &amp; Technologies
			</h2>
			<div style={{ marginBottom: "1rem" }}>
				<SkillKeywords skills={keywords} />
			</div>
			{skillCategories.map((cat) => (
				<SkillCategory key={cat.title} {...cat} c={c} />
			))}
		</div>
	);
}


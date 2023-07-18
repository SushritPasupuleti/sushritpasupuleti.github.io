import { Collapse, Text, Grid, Avatar, Link, Spacer, Table, Col, Row, User } from "@nextui-org/react";
import { MdDevicesOther } from "react-icons/md";
import { GoServer, GoDatabase } from "react-icons/go";
import { VscServerProcess } from "react-icons/vsc"
import { TbRobot } from "react-icons/tb";
import { Work } from 'react-iconly';
import { BiTestTube } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import SkillsList from './SkillsList';
import SkillKeywords from './Keywords';

const frontendSkills: Array<String> = [
	'ReactJS',
	'NextJs',
	'React Native',
	'React Native Web',
	'React Native Expo',
	'Flutter',
	'GatsbyJS',
	'AngularJS',
	'materialize-css',
	'Bootstrap',
	'tailwindcss',
	'jinja2',
	'HTML',
	'CSS',
	'SASS',
	'JavaScript',
	'TypeScript',
	'Dart',
]

const backendSkills: Array<String> = [
	'Axum',
	'ExpressJS',
	'FastAPI',
	'ASP.NET Core',
	'Django',
	'Flask',
	'Sanic',
	'Gin',
	'NodeJS',
	'Rust',
	'JavaScript',
	'TypeScript',
	'Dart',
	'Go',
]

const databaseSkills: Array<String> = [
	'PostgreSQL',
	'MySQL',
	'SQLite',
	'MongoDB',
	'Redis',
	"Neo4J",
	'Firebase (Firestore)',
	'Sequelize',
	'Mongoose',
	'Prisma',
	'Entity Framework',
	'SQLAlchemy',
	'sqlx',
	'DjangoORM',
	'Gorm',
	'Kysley',
]

const testingSkills: Array<String> = [
	'Jest',
	'supertest',
	'cypress',
	'playwright',
	'XUnit',
]

const devopsSkills: Array<String> = [
	'AWS (EC2, RDS, S3, ELB, Amplify, Fargate, Lambda, SQS, ECS)',
	'Azure App Service, Functions, Docker Functions, Database)',
	'Terraform',
	'AWS CDK',
	'Docker',
	'Kubernetes',
	'Netlify',
	'Vercel',
	'GitHub Actions',
	'Self Hosting via Proxmox (LXCs and Docker)',
]

const mlSkills: Array<String> = [
	'TensorFlow',
	'TensorFlowJS',
	'Pytorch',
	'Keras',
	'TFLearn',
	'scikit-learn',
	'Pandas',
	'Numpy',
	'Matplotlib',
	'd3js',
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
	'SignalR',
	'WebSockets',
	'WebRTC',
	'gRPC',
	'ActivityPub',
	"Socket.IO",
	"material-ui",
	"react-native-paper",
	"React NativeBase",
	"RNUILib",
	"React-Redux",
	"Redux-Form",
	"Formik",
	"React Hook Form",
	"Redux Toolkit",
	"React-Query",
	"React-Router",
	"PassportJS",
	"OAuth",
	"Adaptive Cards",
	"GraphQL",
	"Hasura",
	"Apollo",
	"Mongoose",
	"Chart.js",
	"ApexCharts.js",
	"Sequelize",
	"Gorm",
	"turborepo",
	"nx",
	"react-admin",
	"Google Analytics",
	"Webhooks",
	"OpenAI API",
	"Puppeteer",
	"Apache Airflow",
	"Arduino",
]

const keywords: Array<String> = [
	"Product Management", "Full Stack Dev", "Cross-platform Dev", "tech", "app dev", "ml", "AI", "hybrid apps", "linux", "chatbots", "MERN Stack", "JAM Stack", ".NET Core", "monorepos", "self hosting", "neovim", "Embedded Systems", "IoT",
];

export default function Skills() {
	return (
		<div style={{
			// display: 'flex',
			// flexDirection: 'column',
			// alignItems: 'center',
		}}>
			<Text h1>
				{`
				Skills & Technologies
				`}
			</Text>
			<div>
				<SkillKeywords skills={keywords} />
			</div>
			<Spacer y={1} />
			<Grid.Container gap={2}
				style={{
					justifyContent: 'center',
				}}
			>
				<Grid>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Project Management</Text>}
						subtitle={`From kick-off to delivery`}
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<Work set="bold" primaryColor="white" size={24} />
								}
							/>
						}
					>
						<SkillsList skills={pmSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Front-end</Text>}
						subtitle="Web, Mobile, Native and Cross-platform"
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<MdDevicesOther size={24} />
								}
							/>
						}
					>
						<SkillsList skills={frontendSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Back-end</Text>}
						subtitle="API Servers, Serverless, and Microservices"
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<GoServer size={24} />
								}
							/>
						}
					>
						<SkillsList skills={backendSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Databases</Text>}
						subtitle="Databases, ORMs etc."
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<GoDatabase size={24} />
								}
							/>
						}
					>
						<SkillsList skills={databaseSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Testing</Text>}
						subtitle="Unit, Integration, and E2E"
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<BiTestTube size={24} />
								}
							/>
						}
					>
						<SkillsList skills={testingSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>DevOps</Text>}
						subtitle="CI/CD, Docker, and more"
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<VscServerProcess size={24} />
								}
							/>
						}
					>
						<SkillsList skills={devopsSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Machine Learning & Data Science</Text>}
						subtitle={`From NLP, NLU to everything else that's ML`}
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<TbRobot size={24} />
								}
							/>
						}
					>
						<SkillsList skills={mlSkills} />
					</Collapse>
					<Collapse
						shadow
						style={{
							marginBottom: '1rem',
						}}
						title={<Text h4>Other Frameworks & Technologies</Text>}
						subtitle={`Sprinkled on top of the above!`}
						expanded={true}
						contentLeft={
							<Avatar
								color="primary"
								bordered
								icon={
									<BsCodeSlash size={24} />
								}
							/>
						}
					>
						<SkillsList skills={miscSkills} />
					</Collapse>
				</Grid>
			</Grid.Container>
		</div>
	);
}


import { Collapse, Text, Grid, Avatar, Link, Spacer, Table, Col, Row, User } from "@nextui-org/react";
import { MdDevicesOther } from "react-icons/md";
import { GoServer, GoDatabase } from "react-icons/go";
import { VscServerProcess } from "react-icons/vsc"
import { TbRobot } from "react-icons/tb";
import { Work } from 'react-iconly';
import { BiTestTube } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import SkillsList from './SkillsList';

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
	'ExpressJS',
	'FastAPI',
	'Django',
	'Flask',
	'Sanic',
	'Gin',
	'NodeJS',
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
	'Firebase',
	'Sequelize',
	'Mongoose',
	'SQLAlchemy',
	'DjangoORM',
	'Gorm',
]

const testingSkills: Array<String> = [
	'Jest',
	'supertest',
	'cypress',
	'supertest'
]

const devopsSkills: Array<String> = [
	'AWS',
	'Azure',
	'Docker',
	'Kubernetes',
	'Netlify',
	'Vercel',
	'GitHub Actions',
	'Self Hosting via Proxmox',
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
	'Asana',
	'Jira',
	'GitHub',
	'n8n for Automation',
	'GSuite',
]

const miscSkills: Array<String> = [
	"material-ui",
	"react-native-paper",
	"React NativeBase",
	"RNUILib",
	"Socket.IO",
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
	"Apache Airflow"
]

export default function Skills() {
	return (
		<>
			<Text h1>
				{`
				Skills & Technologies
				`}
			</Text>
			<Spacer y={1} />
			<Grid.Container gap={2}>
				<Grid>
					<Collapse
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
		</>
	);
}


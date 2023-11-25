import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer, Row, Col } from "@nextui-org/react";
import ProjectsList from './ProjectsList';
import { Send } from "react-iconly";

const projectsList: any = [
	{
		product: 'skillShack(⚡️);',
		position: 'Solo Founder & Product',
		description: `skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups! It is also a part of Microsoft for Startups`,
		keywords: [
			'Scaled to users from over 130+ countries.',
			'Handled user studies and user research.',
			'Utilised Google Analytics to track user behaviour, and prioritise features and bug fixes.',
			'Product Management',
			'NextJS based SEO Optimized Website (included support for Open Graph Protocol and JSON+LD).',
			'GitHub Integration for users to showcase their Open Source Projects along with Code.',
			'Monaco Editor Integration (Same Editor serves as the base for Visual Studio Code).',
			'Puppeteer Based Screenshot Pipeline for Generating Certificates and Open Graph Images.',
			'React-Redux Integration for State Management.',
			'AWS Deployment Using: (EC2, RDS, S3, ELB)',
			'Azure Deployment Using: (App Service, Functions, Docker Functions, Database)',
			'Fully managed GitHub Actions for Seamless CI/CD along with Staging Environments.',
			'Dynamic code base to deploy to either AWS or Azure depending on Environment Configuration provided.',
		],
		tags: [
			'ReactJS',
			'React-Redux',
			'Redux',
			'TensorFlow',
			'AWS',
			'Azure',
			'ExpressJS',
			'NodeJS',
			'GitHub',
			'GitHub Actions',
			'PostgreSQL',
			'NextJS',
			'Docker'
		],
		start: 'Feb 2021',
		end: 'Present',
		link: 'https://skillshack.dev/',
		linkText: 'See Live',
		images: [
			"assets/P10.png",
			"assets/P17.png",
		],
		highlightImage: "assets/startups_wordmark_purple.png"
	},
	{
		product: 'Braggi Election Management System (2.0)',
		position: 'Solo Founder & Product',
		description: `Braggi Election Management System is built for those contesting in elections. It aims to help leaders better manage their party workers to ensure faster reach and acquisition of voters. Also since it's me, under the hood there's some fancy AI magic happening too!

			After undergoing a major rewrite and taking the learnings from the success of the previous iteration, this is now capable of handling Country-wide voter data as well as multiple national parties from a single platform.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management using Jira and Confluence',
			'Currently handling a database with 300K+ rows',
			'Fault tolerant and scalable architecture with Failover and Load Balancing',
			'PERN (Postgres Express React NodeJS) Stack + React Native via Expo',
			'AWS (EC2, SQS, Lambda, RDS), GitHub Actions for CI/CD',
			'Full TypeScript Monorepo (via Turborepo) with 90% code sharing between web and mobile platforms',
			'Infrastructure as Code using Terraform',
		],
		start: 'August 2022',
		end: 'Present',
		tags: [
			'ReactJS',
			'NextJS',
			'React-Redux',
			'Redux',
			'ExpressJS',
			'Expo',
			'NodeJS',
			'GitHub',
			'GitHub Actions',
			'PostgreSQL',
			'Sequelize',
			'Docker',
			'TypeScript',
			'AWS Lambda',
			'AWS SQS',
			'AWS S3',
			'AWS RDS',
			'AWS EC2',
			'Terraform',
			'Turborepo',
			'Jira',
			'Confluence',
		],
		images: [
			"assets/P18.webp",
			"assets/P19.png",
			"assets/P20.png",
			"assets/P21.webp",
			"assets/P22.png",
		],
	},
	{
		product: 'Stealth Project',
		position: 'Solo Founder & Product',
		description: `A stealth project that I am currently working on in parallel with my other projects, It is in the Health & Fitness domain. This is a project that I am very excited about.`,
		keywords: [
			'Lead Developer',
			'Handling user studies and user research.',
			'Building new features and made bug fixes based on user feedback.',
			'Product Management',
			'Currently in stealth mode',
			'Go Backend built on Go-chi, PostgreSQL, Redis, and Docker and Kubernetes for deployment',
			'Infrastructure as Code using Terraform',
			'AWS (EC2, SQS, Lambda, RDS), GitHub Actions for CI/CD',
			'Pytorch based Machine Learning Pipeline',
		],
		start: 'August 2023',
		end: 'Present',
		tags: [
			"Go",
			"Go-chi",
			"PostgreSQL",
			"Redis",
			"Docker",
			"Kubernetes",
			"Python",
			"Pytorch",
			"Terraform",
			'AWS Lambda',
			'AWS SQS',
			'AWS S3',
			'AWS RDS',
			'AWS EC2',
			"GitHub",
			"GitHub Actions",
		],
	},
	{
		product: 'Full Rust ActivityPub Server Implementation',
		position: 'Solo Founder & Product',
		description: `A full ActivityPub Server Implementation built in Rust, without any external dependencies. the ActivityPub protocol is a W3C standard, this allows for interoperability with other ActivityPub implementations such as Mastodon, Pleroma, Pixelfed, etc. This repo could be used to bootstrap a basic ActivityPub platform that could sync with the previously mention services as well.`,
		keywords: [
			'Lead Developer',
			'Rust Backend built on Axum, PostgreSQL database, with SQLx as the Query Builder',
			'Aims to be 100% compatible with the ActivityPub implementation used by Mastodon and W3C standards',
			'Currently in development',
			'Open Source',
		],
		start: 'April 2023',
		end: 'Present',
		link: 'https://github.com/SushritPasupuleti/Rusty-Activity-Pub',
		linkText: 'See on GitHub',
		tags: [
			"Rust",
			"SQLx",
			"Axum",
			"PostgreSQL",
			"ActivityPub",
			"GitHub",
			"GitHub Actions",
		],
	},
	{
		product: 'Braggi Election Management System - MeeVote',
		position: 'Solo Founder & Product',
		description: `This was the first project that I built, which was out of my domain, the platform "MeeVote", is an Election Management System, built for those contesting in elections. MeeVote aims to help leaders better manage their party workers to ensure faster reach and acquisition of voters. Also since it's me, under the hood there's some fancy AI magic happening too!

			This is currently under going a major rewrite for Country-wide deployment and support for multiple national parties.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management',
			'Maintaining this Project to this day',
			'MERN Stack + React Native w/ React Bootstrap',
			'AWS (EC2), GitHub Actions for CI/CD',
			'Currently Rebuilding the Application to scale to Nation-Party Level for more minute control capable of handling Country-wide voter data.',
			'2.0 Stack: AWS (Fargate, ELB, RDS) with React Native (Expo) Monorepo that houses Mobile and Web (NextJS) Platforms with 90% code sharing',
		],
		start: 'March 2017',
		end: 'August 2022',
		tags: [
			'ReactJS',
			'NextJS',
			'React-Redux',
			'Redux',
			'AWS',
			'ExpressJS',
			'NodeJS',
			'GitHub',
			'GitHub Actions',
			'MongoDB',
			'PostgreSQL',
			'Docker'
		],
		images: [
			"assets/P7.png",
			// "assets/P11.png",
			"assets/P12.png",
			"assets/P13.png",
		],
	},
	{
		product: 'Braggi Shopping & Medical Slots',
		position: 'Solo Founder & Product',
		description: `During the lockdown, marketing is difficult, and getting work done remotely has been equally difficult, so I started working on a new project. Braggi's Shopping Slots platform took 2 weeks to build, it allows it's users to book a slot to shop at their local grocery store, the platform handles queues and allows shop owners to decide how many people they can accomodate on an hourly basis at their store, while ensuring that social distancing is followed. This was a fun project, because I deployed it much more quickly than anything before, while constantly working with the changing situations due to the pandemic, it's helped me greatly with my ability to understand the market as a whole and it's needs during times like these.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Identified gap in the market for hospital slot reservation and refactored the project for it',
			'Product Management',
			'Maintaining this Project to this day'
		],
		start: 'March 2020',
		end: 'January 2021',
		tags: [
			'ReactJS',
			'React-Redux',
			'Redux',
			'AWS',
			'ExpressJS',
			'NodeJS',
			'GitHub',
			'GitHub Actions',
			'MongoDB',
			'Docker'
		],
		images: [
			"assets/P6.png",
			"assets/P8.png",
			"assets/P9.png",
		]
	},
	{
		product: 'Braggi Chatbot Platform',
		position: 'Solo Founder & Product',
		description: `Built a production quality chatbot service paired with cross-platform apps build on React and Flutter.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Iterated through multiple versions & implementations of the product over the years to ensure that it was stable and reliable.',
			'Product Management',
			'Maintaining this Project to this day',
			'Machine learning and Natural Language Processing Pipeline development',
			'Handing training and testing of the chatbot',
			'Open Sourced a community version',
		],
		start: 'March 2015',
		end: 'March 2017',
		tags: [
			'ReactJS',
			'React-Redux',
			'Redux',
			'AWS',
			'ExpressJS',
			'NodeJS',
			'GitHub',
			'GitHub Actions',
			'MongoDB',
			'Docker',
			'TensoFlow',
			'WPF',
			'WinForms',
			'Flutter',
		],
		images: [
			"assets/video-bg2.png",
			"assets/P3.jpg",
			"assets/P4.png",
		],
	},
	{
		product: 'Tesla+ Smart Electric Meter',
		position: 'Product',
		description: `A smart electric meter add-on that connects to a standard electric meter and reports all usage metrics to a local hub which makes the data available via a mobile app and also to administration. Qualified for the CBSE National Science Fair's National level with this project!`,
		keywords: [
			'Handled user studies and user research.',
			'Identified a gap in the market for lack of alternatives to paper bills and lack of accessibility to meter-readings',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management',
		],
		start: 'March 2015',
		end: 'September 2015',
		tags: [
			'ReactJS',
			'Arduino',
		],
		images: [
			"assets/P1.PNG",
		],
	}
]

function Projects() {

	return (
		<div>
			<Text h1>
				{`
					Projects
				`}
			</Text>
			<Spacer y={1} />

			<Text>
				<b>Note: </b>
				{`I work on a lot of projects, and listing all of them here would make this page too long. So if you're interested in seeing more of my work, check out my GitHub profile.`}
			</Text>
			<Spacer y={1} />
			<Text>
				{`The most recent repositories should show you where most of my efforts are going, as well as my experiments with new languages/technologies. Some repositories may also be private, as such, feel free to contact me to learn more!`}
			</Text>
			<Spacer y={1} />
			<a href={`https://github.com/SushritPasupuleti?tab=repositories`}>
				<Button shadow auto rounded color="secondary"
					iconRight={
						<Send set="bold" primaryColor="white" />
					}
				>
					<Text
						css={{ color: "inherit" }}
						size={12}
						weight="bold"
						transform="uppercase"
					>
						Visit GitHub
					</Text>
				</Button>
			</a>
			<Spacer y={1} />
			<Card.Divider />
			<Spacer y={1} />
			<ProjectsList projectsList={projectsList} />
		</div>
	)
}

export default Projects

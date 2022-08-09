import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import ProjectsList from './ProjectsList';

const projectsList: any = [
	{
		product: 'skillShack(⚡️);',
		position: 'Solo Founder & Product',
		description: `skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups! It is also a part of Microsoft for Startups`,
		keywords: [
			'Scaled to users from over 130+ countries.',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
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
	},
	{
		product: 'Braggi Shopping Slots',
		position: 'Solo Founder & Product',
		description: `During the lockdown, marketing is difficult, and getting work done remotely has been equally difficult, so I started working on a new project. Braggi's Shopping Slots platform took 2 weeks to build, it allows it's users to book a slot to shop at their local grocery store, the platform handles queues and allows shop owners to decide how many people they can accomodate on an hourly basis at their store, while ensuring that social distancing is followed. This was a fun project, because I deployed it much more quickly than anything before, while constantly working with the changing situations due to the pandemic, it's helped me greatly with my ability to understand the market as a whole and it's needs during times like these.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management',
			'Maintaing this Project to this day'
		],
		start: 'March 2020',
		end: 'Present',
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
	},
	{
		product: 'Braggi Election Management System - MeeVote',
		position: 'Solo Founder & Product',
		description: `This was the first project that I built, which was out of my domain, the platform "MeeVote", is an Election Management System, built for those contesting in elections. MeeVote aims to help leaders better manage their party workers to ensure faster reach and acquisition of voters. Also since it's me, under the hood there's some fancy AI magic happening too!`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management',
			'Maintaing this Project to this day'
		],
		start: 'March 2017',
		end: 'Present',
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

	},
	{
		product: 'Braggi Chatbot Platform',
		position: 'Solo Founder & Product',
		description: `Built a production quality chatbot service paired with cross-platform apps build on React and Flutter.`,
		keywords: [
			'Lead Developer',
			'Handled user studies and user research.',
			'Build new features and made bug fixes based on user feedback.',
			'Product Management',
			'Maintaing this Project to this day',
			'Machine learning and Natural Language Processing Pipeline development',
			'Handing training and testing of the chatbot',
			'Open Sourced a community version',
		],
		start: 'March 2015',
		end: 'Present',
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
			<ProjectsList projectsList={projectsList} />
		</div>
	)
}

export default Projects

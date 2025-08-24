import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import WorkExperienceList from './WorkExperience';

const workExperience: any = [
	{
		organization: 'Braggi Solutions',
		position: 'Solo Founder & Product',
		description: `Built, deployed, scaled and managed numerous projects for numerous clients and self.
				Projects listed below ⬇️`,
		keywords: [
			'Product Management with Agile Principles',
			'Lead a cross-functional team remotely and in-office.',
			'Design, Maintain, Manage and Own the Product Backlog, Roadmap, Release Planning).',
			'Define Product Deliverables and Milestones, User Stories and requirements.',
			'Collaborate with Clients and Business Stakeholders to identify solutions, business needs and trends.',
			'Define and share the Release/Iteration vision and goals for Engineering teams and stakeholders.',
			'Represent the customer to the team and answer questions/provide guidance and mentorship.',
			'Foster professional relationships with stakeholders and opened dialogues for further collaborations and ventures as well as renewal of projects.',
			'Fullstack Development',
			'Developed and implemented complex multi-platform/cross-platform solutions for various clients and self.',
			'Proposed technical feasibility of solutions for new functional designs.',
			'Ensured network, system, data integrity and reliability throughout, and across maintenance and upgrades.',
			'Provided continuous maintenance and bug fixes.',
			'Business Development',
			'Software Engineering',
			'Applied Machine Learning and Data Science principles as part of various requirements as well as for overall product management (QA, surveys and feedback analysis/trends).',
			'Chatbot Design and Development',
			'UI/UX + Graphic Design',
			'Graphic Design',
			'Marketing and Outreach (Produced YouTube Videos and Blogs detailed below)'
		],
		start: 'Jun 2014',
		end: 'Present',
	},
	{
		organization: 'ClaimShark',
		position: 'Technical Solutions Manager',
		description: `Led technical solution design and implementation for enterprise clients, focusing on AI/ML and scalable systems.`,
		keywords: [
			'Architected and developed scalable systems using Go, Rust, and Python.',
			'Oversaw full-stack development and system architecture for mission-critical applications.',
			'Collaborated with cross-functional teams to deliver robust solutions.',
			'Skills: Artificial Intelligence, Machine Learning, Go, Rust, Python, System Architecture, Technical Solution Design, Full-Stack Development'
		],
		start: 'May 2025',
		end: 'Present',
		location: 'Telangana, India'
	},
	{
		organization: 'ClaimShark',
		position: 'Senior Principal Architect - Technical',
		description: `Drove technical strategy and architecture for core products in a hybrid environment.`,
		keywords: [
			'Designed and implemented AI/ML pipelines and full-stack solutions using Go, Rust, Python, Node.js.',
			'Worked in a hybrid environment, collaborating with teams in Hyderabad.',
			'Skills: Artificial Intelligence, Machine Learning, Full-Stack Development, Go, Rust, Python, Node.js, System Architecture'
		],
		start: 'Apr 2024',
		end: 'Jun 2025',
		location: 'Hyderabad, Telangana, India (Hybrid)'
	}
]

function WorkExperience() {

	return (
		<div>
			<Text h1>
				{`
					Work Experience
				`}
			</Text>
			<Spacer y={1} />
			<WorkExperienceList workExperienceList={workExperience} />
		</div>
	)
}

export default WorkExperience

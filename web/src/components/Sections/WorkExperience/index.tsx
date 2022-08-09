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
			'Fullstack Development',
			'Product Management',
			'Business Development',
			'Software Engineering',
			'Machine Learning and Data Science',
			'Chatbot Design and Development',
			'UI/UX Design',
			'Graphic Design',
		],
		start: 'Jun 2014',
		end: 'Present',
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

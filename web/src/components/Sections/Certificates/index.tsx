import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import CertificatesList from './certificatesList';
import { Play } from "react-iconly";
import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin } from "react-icons/bs";

const coursesList: any = [
	{
		title: 'Google Project Management',
		description: 'Took sometime out after my graduation to standarize my project management skills. This course was a great help in that regard.',
		url: 'assets/GooglePMCert.pdf',
		originalUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/HYKASZDT4AXM',
	},
];

function Certificates() {
	return (
		<div>
			<Text h1>
				{`
					My Certificates
				`}
			</Text>
			<Text>
				{`I usually teach myself thing online over first-party Docs or FreeCodeCamp and avoid taking courses so that I can move at my pace. Sometimes however if a course is really good and worth the time I do get into it, like the ones below.`}
			</Text>
			<Spacer y={1} />
			<CertificatesList certificates={coursesList} />
		</div>
	)
}

export default Certificates

import * as React from 'react'
import CertificatesList from './certificatesList';
import { useTerminalTheme, mono } from "../../../terminal-theme";

const coursesList: any = [
	{
		title: 'Google Project Management',
		description: 'Took sometime out after my graduation to standarize my project management skills. This course was a great help in that regard.',
		url: 'assets/GooglePMCert.pdf',
		originalUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/HYKASZDT4AXM',
	},
];

function Certificates() {
	const { c } = useTerminalTheme();
	return (
		<div>
			<h2 style={{ color: c.green, fontFamily: mono, fontSize: "1.15rem", fontWeight: 600, margin: "0 0 0.5rem 0" }}>
				<span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>My Certificates
			</h2>
			<p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", margin: "0 0 0.75rem 0" }}>
				I usually teach myself things online over first-party Docs or FreeCodeCamp and avoid taking courses so that I can move at my pace. Sometimes however if a course is really good and worth the time I do get into it, like the ones below.
			</p>
			<CertificatesList certificates={coursesList} />
		</div>
	)
}

export default Certificates

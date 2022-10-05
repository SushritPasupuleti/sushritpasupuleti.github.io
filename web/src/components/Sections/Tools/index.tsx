import { Collapse, Text, Grid, Avatar, Link, Spacer, Table, Col, Row, User, Button } from "@nextui-org/react";
import SkillKeywords from "../Skills/Keywords";
import { Send, Setting } from "react-iconly";

const tools: Array<String> = [
	"Neovim",
	"tmux",
	"lazygit",
	"ranger",
	"proxmox",
	"pgAdmin",
	"Postman",
	"iTerm2",
	"zsh",
	"And More..."
];

const toolsPM: Array<String> = [
	"Jira",
	"Confluence",
	"Asana",
	"Slack w/ Webhooks",
	"GSuite",
	"Office 365",
	"GitHub Actions",
	"And More..."
]

export default function Tools() {
	return (
		<div>
			<Text h1>
				{`
			Tools I Use
			`}
				<Spacer y={0.5} />
			</Text>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text h3>
					Editors, Terminals, Servers, and More
				</Text>
				<Spacer y={0.5} />
				<SkillKeywords skills={tools} />
				<Spacer y={1.5} />
				<Text h3>
					Productivity & Product Management
				</Text>
				<Spacer y={0.5} />
				<SkillKeywords skills={toolsPM} />
				<a href="https://github.com/SushritPasupuleti/My-DevTools">
					<Button
						shadow
						auto
						style={{
							marginTop: "1rem",
							width: "auto",
							// alignSelf: "start",
							// marginLeft: "1rem",
						}}
						iconRight={
							<Setting set="bold" primaryColor="white" />
						}
					>
						See my complete tool config on GitHub
					</Button>
				</a>
			</div>
		</div>
	)
}

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
	"And More..."
];

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
				<SkillKeywords skills={tools} />
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

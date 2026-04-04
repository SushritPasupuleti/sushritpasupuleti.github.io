import SkillKeywords from "../Skills/Keywords";
import { BsGithub } from "react-icons/bs";
import { useTerminalTheme, mono } from "../../../terminal-theme";

const tools: Array<String> = [
	"NixOS", "Neovim", "tmux", "lazygit", "ranger", "proxmox",
	"pgAdmin", "Postman", "fish", "kitty", "And More..."
];

const toolsPM: Array<String> = [
	"Jira", "Confluence", "Asana", "Slack w/ Webhooks",
	"GSuite", "Office 365", "GitHub Actions", "And More..."
];

export default function Tools() {
	const { c } = useTerminalTheme();
	const linkStyle: React.CSSProperties = {
		color: c.cyan,
		fontFamily: mono,
		fontSize: "0.85rem",
		border: `1px solid ${c.border}`,
		padding: "0.35rem 0.75rem",
		borderRadius: "3px",
		textDecoration: "none",
		display: "inline-flex",
		alignItems: "center",
		gap: "0.4rem",
		marginRight: "0.75rem",
		marginTop: "0.75rem",
	};
	return (
		<div>
			<h2 style={{ color: c.green, fontFamily: mono, fontSize: "1.15rem", fontWeight: 600, margin: "0 0 0.75rem 0" }}>
				<span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>Tools I Use
			</h2>
			<h4 style={{ color: c.textBright, fontFamily: mono, fontSize: "0.9rem", fontWeight: 400, margin: "0 0 0.5rem 0" }}>
				OS, Editors, Terminals, Servers, and More
			</h4>
			<SkillKeywords skills={tools} />
			<h4 style={{ color: c.textBright, fontFamily: mono, fontSize: "0.9rem", fontWeight: 400, margin: "1.25rem 0 0.5rem 0" }}>
				Productivity &amp; Product Management
			</h4>
			<SkillKeywords skills={toolsPM} />
			<div style={{ marginTop: "1rem" }}>
				<a href="https://github.com/SushritPasupuleti/dots" style={linkStyle}>
					<BsGithub /> View Dotfiles on GitHub
				</a>
				<a href="https://sushritpasupuleti.github.io/personal-docs/" style={linkStyle}>
					📄 My Personal Docs
				</a>
			</div>
		</div>
	);
}

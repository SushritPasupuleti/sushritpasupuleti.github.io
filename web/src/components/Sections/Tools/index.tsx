import SkillKeywords from "../Skills/Keywords";
import { BsGithub } from "react-icons/bs";
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiSectionHeader from "../../TuiSectionHeader";
import TuiBox from "../../TuiBox";

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
			<TuiSectionHeader c={c} command="neofetch --tools" output={`${tools.length + toolsPM.length} packages loaded`} />
			<TuiBox c={c} title="Dev Environment" badge={`${tools.length} tools`} badgeColor={c.green}>
				<SkillKeywords skills={tools} />
			</TuiBox>
			<TuiBox c={c} title="Productivity & PM" badge={`${toolsPM.length} tools`} badgeColor={c.cyan}>
				<SkillKeywords skills={toolsPM} />
			</TuiBox>
			<div style={{ marginTop: "0.5rem" }}>
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

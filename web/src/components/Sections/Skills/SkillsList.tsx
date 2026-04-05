import { useTerminalTheme, mono } from "../../../terminal-theme";

const Skills: React.FC<{ skills: Array<String>; variant?: "auto" | "chips" | "list" }> = ({ skills, variant = "auto" }) => {
	const { c, isDark } = useTerminalTheme();

	// Auto-detect: if average item length > 50, use list; otherwise chips
	const resolved = variant === "auto"
		? (skills.reduce((sum, s) => sum + s.length, 0) / skills.length > 50 ? "list" : "chips")
		: variant;

	if (resolved === "chips") {
		return (
			<div style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "0.35rem",
			}}>
				{skills.map((skill, index) => (
					<span
						key={index}
						style={{
							color: c.green,
							fontSize: "0.78rem",
							fontFamily: mono,
							border: `1px solid ${c.tagBorder || c.border}`,
							padding: "0.2rem 0.55rem",
							borderRadius: "2px",
							background: c.tagBg || "transparent",
							transition: "all 0.15s",
							cursor: "default",
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLSpanElement).style.background = isDark ? "rgba(0,255,65,0.15)" : "rgba(26,122,46,0.12)";
							(e.currentTarget as HTMLSpanElement).style.borderColor = c.green;
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLSpanElement).style.background = c.tagBg || "transparent";
							(e.currentTarget as HTMLSpanElement).style.borderColor = c.tagBorder || c.border;
						}}
					>
						{skill}
					</span>
				))}
			</div>
		);
	}

	return (
		<ul style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.25rem", margin: 0, listStyle: "none" }}>
			{skills.map((skill, index) => (
				<li key={index} style={{ marginBottom: "0.3rem", position: "relative", paddingLeft: "0.25rem" }}>
					<span style={{ color: c.green, position: "absolute", left: "-1.25rem" }}>&#8250;</span>
					{skill}
				</li>
			))}
		</ul>
	);
}

export default Skills;

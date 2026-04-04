import { useTerminalTheme, mono } from "../../../terminal-theme";

const WorkExperience: React.FC<any> = (props) => {
	const { c } = useTerminalTheme();
	return (
		<div style={{ marginBottom: "1.5rem", border: `1px solid ${c.border}`, borderRadius: "4px", padding: "0.75rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
				<div>
					<span style={{ color: c.green, fontFamily: mono, fontSize: "1rem", fontWeight: 600 }}>
						{props.workExperience.organization}
					</span>
					<span style={{ color: c.cyan, fontFamily: mono, fontSize: "0.85rem", marginLeft: "0.75rem" }}>
						{props.workExperience.position}
					</span>
				</div>
				<span style={{ color: c.muted, fontFamily: mono, fontSize: "0.8rem" }}>
					{props.workExperience.start} → {props.workExperience.end}
				</span>
			</div>
			<blockquote style={{
				borderLeft: `2px solid ${c.green}`,
				margin: "0.75rem 0",
				padding: "0.4rem 0.75rem",
				color: c.text,
				fontFamily: mono,
				fontSize: "0.85rem",
			}}>
				{props.workExperience.description}
			</blockquote>
			<ul style={{ margin: 0, paddingLeft: "1.25rem", color: c.text, fontFamily: mono, fontSize: "0.8rem", lineHeight: 1.7 }}>
				{props.workExperience.keywords.map((keyword: string, index: number) => (
					<li key={index}>{keyword}</li>
				))}
			</ul>
		</div>
	)
}

const WorkExperienceList: React.FC<any> = (props) => {
	return (
		<div>
			{props.workExperienceList.map((workExperience: any, index: number) => (
				<WorkExperience key={index} workExperience={workExperience} />
			))}
		</div>
	)
}

export default WorkExperienceList;

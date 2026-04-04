import { useTerminalTheme, mono } from "../../../terminal-theme";

const Skills: React.FC<any> = (props) => {
	const { c } = useTerminalTheme();
	return (
		<ul style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.5rem", margin: 0 }}>
			{
				props.skills.map((skill: String, index: number) => {
					return (
						<li key={index} style={{ marginBottom: "0.2rem" }}>
							{skill}
						</li>
					)
				})
			}
		</ul>
	)
}

export default Skills;

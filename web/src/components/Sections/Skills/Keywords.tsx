import { useTerminalTheme, mono } from "../../../terminal-theme";

const SkillKeywords: React.FC<any> = (props) => {
	const { c } = useTerminalTheme();
	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.4rem',
			justifyContent: 'center',
		}}>
			{
				props.skills.map((skill: String, index: number) => {
					return (
						<span
							key={index}
							style={{
								color: c.green,
								fontSize: "0.75rem",
								fontFamily: mono,
								border: `1px solid ${c.tagBorder || c.border}`,
								padding: "0.15rem 0.5rem",
								borderRadius: "2px",
								background: c.tagBg || "transparent",
							}}
						>
							#{skill}
						</span>
					)
				})
			}
		</div>
	)
}

export default SkillKeywords;

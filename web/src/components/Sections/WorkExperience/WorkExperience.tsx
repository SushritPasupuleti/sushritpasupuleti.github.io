import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBlockquote from "../../TuiBlockquote";
import TuiBox from "../../TuiBox";
import TuiTree from "../../TuiTree";

const WorkExperience: React.FC<any> = (props) => {
	const { c } = useTerminalTheme();
	const we = props.workExperience;
	return (
		<TuiBox
			c={c}
			title={we.organization}
			badge={`${we.start} → ${we.end}`}
			badgeColor={c.muted}
		>
			<div style={{ marginBottom: "0.5rem" }}>
				<span style={{ color: c.cyan, fontFamily: mono, fontSize: "0.85rem" }}>
					{we.position}
				</span>
				{we.location && (
					<span style={{ color: c.dim, fontFamily: mono, fontSize: "0.75rem", marginLeft: "0.75rem" }}>
						📍 {we.location}
					</span>
				)}
			</div>
			<TuiBlockquote color={c.text} borderColor={c.green} dimColor={c.dim} style={{ margin: "0.5rem 0" }}>
				{we.description}
			</TuiBlockquote>
			<TuiTree c={c} items={we.keywords.map((kw: string) => kw)} />
		</TuiBox>
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

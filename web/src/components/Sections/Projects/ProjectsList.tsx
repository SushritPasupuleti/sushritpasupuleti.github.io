import * as React from "react";
import Image from "next/image";
import Tags from "../Skills/Keywords";
import ImagePopup from "./ImagePopup";
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBlockquote from "../../TuiBlockquote";
import TuiBox from "../../TuiBox";
import TuiTree from "../../TuiTree";

const Project = (props: any) => {
	const [popupVisible, setPopupVisible] = React.useState(false);
	const [popupImg, setPopupImg] = React.useState<string | null>(null);
	const { c, isDark } = useTerminalTheme();
	const p = props.projectInfo;
	const linkStyle: React.CSSProperties = {
		color: c.cyan,
		fontFamily: mono,
		fontSize: "0.8rem",
		border: `1px solid ${c.border}`,
		padding: "0.3rem 0.6rem",
		borderRadius: "3px",
		textDecoration: "none",
		display: "inline-flex",
		alignItems: "center",
		gap: "0.3rem",
	};
	return (
		<TuiBox
			c={c}
			title={p.product}
			badge={p.start ? `${p.start} → ${p.end}` : undefined}
			badgeColor={c.muted}
		>
			<div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
				<span style={{ color: c.cyan, fontFamily: mono, fontSize: "0.8rem" }}>
					{p.position}
				</span>
				{p.link && (
					<a href={p.link} style={linkStyle}>
						▶ {p.linkText}
					</a>
				)}
			</div>
			<TuiBlockquote color={c.text} borderColor={c.green} dimColor={c.dim} style={{ margin: "0.5rem 0" }}>
				{p.description}
			</TuiBlockquote>
			{p.highlightImage && (
				<div style={{ padding: "0.75rem 0" }}>
					<div style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", background: "transparent" }}>
						<Image
							src={p.highlightImage}
							alt={p.product}
							fill
							style={{ objectFit: "contain", borderRadius: "4px", cursor: "pointer" }}
							onClick={() => { setPopupImg(p.highlightImage); setPopupVisible(true); }}
						/>
					</div>
				</div>
			)}
			<Tags skills={p.tags} />
			<div style={{ marginTop: "0.5rem" }}>
				<TuiTree c={c} items={p.keywords.map((kw: string) => kw)} />
			</div>
			{p.images && p.images.length > 0 && (
				<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
					{p.images.map((img: string, index: number) => (
						<div key={index} style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", border: `1px solid ${c.border}`, borderRadius: "2px", overflow: "hidden" }}>
							<Image
								src={img}
								alt={p.product}
								fill
								style={{ objectFit: "contain", cursor: "pointer" }}
								onClick={() => { setPopupImg(img); setPopupVisible(true); }}
							/>
						</div>
					))}
				</div>
			)}
			<ImagePopup visible={popupVisible} setVisible={setPopupVisible} img={popupImg || ""} />
		</TuiBox>
	);
}

const ProjectList = (props: any) => {
	return (
		<div>
			{props.projectsList.map((projectInfo: any, index: number) => (
				<Project key={index} projectInfo={projectInfo} />
			))}
		</div>
	);
}

export default ProjectList;

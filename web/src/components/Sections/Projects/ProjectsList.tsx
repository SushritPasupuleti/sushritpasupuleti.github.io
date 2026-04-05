import * as React from "react";
import Image from "next/image";
import Tags from "../Skills/Keywords";
import ImagePopup from "./ImagePopup";
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBlockquote from "../../TuiBlockquote";

const Project = (props: any) => {
	const [popupVisible, setPopupVisible] = React.useState(false);
	const [popupImg, setPopupImg] = React.useState<string | null>(null);
	const { c } = useTerminalTheme();
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
		<div style={{ marginBottom: "1.5rem", border: `1px solid ${c.border}`, borderRadius: "4px", padding: "0.75rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
				<div>
					<span style={{ color: c.green, fontFamily: mono, fontSize: "1rem", fontWeight: 600 }}>
						{props.projectInfo.product}
					</span>
					<span style={{ color: c.cyan, fontFamily: mono, fontSize: "0.8rem", marginLeft: "0.75rem" }}>
						{props.projectInfo.position}
					</span>
				</div>
				{props.projectInfo.start && (
					<span style={{ color: c.muted, fontFamily: mono, fontSize: "0.75rem" }}>
						{props.projectInfo.start} → {props.projectInfo.end}
					</span>
				)}
			</div>
			<TuiBlockquote color={c.text} borderColor={c.green} dimColor={c.dim} style={{ margin: "0.75rem 0" }}>
				{props.projectInfo.description}
			</TuiBlockquote>
			{props.projectInfo.highlightImage && (
				<div style={{ padding: "1rem 0" }}>
					<div style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", background: "transparent" }}>
						<Image
							src={props.projectInfo.highlightImage}
							alt={props.projectInfo.product}
							fill
							style={{ objectFit: "contain", borderRadius: "4px", cursor: "pointer" }}
							onClick={() => { setPopupImg(props.projectInfo.highlightImage); setPopupVisible(true); }}
						/>
					</div>
				</div>
			)}
			<Tags skills={props.projectInfo.tags} />
			<ul style={{ margin: "0.5rem 0", paddingLeft: "1.25rem", color: c.text, fontFamily: mono, fontSize: "0.8rem", lineHeight: 1.7 }}>
				{props.projectInfo.keywords.map((keyword: string, index: number) => (
					<li key={index}>{keyword}</li>
				))}
			</ul>
			{props.projectInfo.images && props.projectInfo.images.length > 0 && (
				<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
					{props.projectInfo.images.map((img: string, index: number) => (
						<div key={index} style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", border: `1px solid ${c.border}`, borderRadius: "4px", overflow: "hidden" }}>
							<Image
								src={img}
								alt={props.projectInfo.product}
								fill
								style={{ objectFit: "contain", cursor: "pointer" }}
								onClick={() => { setPopupImg(img); setPopupVisible(true); }}
							/>
						</div>
					))}
				</div>
			)}
			{props.projectInfo.link && (
				<div style={{ marginTop: "0.75rem" }}>
					<a href={props.projectInfo.link} style={linkStyle}>
						▶ {props.projectInfo.linkText}
					</a>
				</div>
			)}
			<ImagePopup visible={popupVisible} setVisible={setPopupVisible} img={popupImg || ""} />
		</div>
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

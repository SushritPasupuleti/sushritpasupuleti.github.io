import * as React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Send } from "react-iconly";
import Tags from "../Skills/Keywords";
import ImagePopup from "./ImagePopup";
const Project = (props: any) => {
	const [popupVisible, setPopupVisible] = React.useState(false);
	const [popupImg, setPopupImg] = React.useState<string | null>(null);
	return (
		<div style={{ marginBottom: "2rem" }}>
			{/* All content wrapped in a single parent div */}
			<div>
				<div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
					<div>
						<h2>{props.projectInfo.product}</h2>
						<h4>{props.projectInfo.position}</h4>
						<div>{props.projectInfo.date}</div>
					</div>
					<div>
						<div>{props.projectInfo.company}</div>
					</div>
				</div>
				<blockquote style={{ margin: "1rem 0" }}>{props.projectInfo.description}</blockquote>
				{props.projectInfo.highlightImage && (
					<div style={{ padding: "2rem", marginTop: "-2rem", marginBottom: "-2rem" }}>
						<div style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", background: "transparent" }}>
							<Image
								src={props.projectInfo.highlightImage}
								alt={props.projectInfo.product}
								fill
								style={{ objectFit: "contain", borderRadius: "8px", cursor: "pointer", background: "transparent" }}
								onClick={() => { setPopupImg(props.projectInfo.highlightImage); setPopupVisible(true); }}
							/>
						</div>
					</div>
				)}
				<Tags skills={props.projectInfo.tags} />
				<div style={{ padding: "1rem", paddingTop: 0 }}>
					{props.projectInfo.keywords.length > 0 && props.projectInfo.keywords.map((keyword: string, index: number) => (
						<li key={index}>{keyword}</li>
					))}
				</div>
				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					{props.projectInfo.images && props.projectInfo.images.length > 0 && props.projectInfo.images.map((img: string, index: number) => (
						<div key={index} style={{ position: "relative", width: "220px", height: "140px", display: "inline-block", marginRight: "0.5rem", background: "transparent" }}>
							<Image
								src={img}
								alt={props.projectInfo.product}
								fill
								style={{ objectFit: "contain", borderRadius: "8px", cursor: "pointer", background: "transparent" }}
								onClick={() => { setPopupImg(img); setPopupVisible(true); }}
							/>
						</div>
					))}
				</div>
				<div style={{ marginTop: "1rem" }}>
					{props.projectInfo.link && (
						<a href={props.projectInfo.link}>
							<Button
								style={{ marginLeft: "1rem" }}
								auto
								color="secondary"
								shadow
								icon={<Send set="bold" primaryColor="white" />}
							>
								{props.projectInfo.linkText}
							</Button>
						</a>
					)}
				</div>
				<ImagePopup visible={popupVisible} setVisible={setPopupVisible} img={popupImg || ""} />
			</div>
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

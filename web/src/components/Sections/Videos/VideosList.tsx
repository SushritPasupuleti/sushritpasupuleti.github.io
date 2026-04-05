import { BsYoutube } from "react-icons/bs";
import Image from "next/image";
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBox from "../../TuiBox";

const VideoItem = (props: { title: string; description: string; url: string; thumbnail: string; index: number }) => {
	const { c } = useTerminalTheme();
	return (
		<TuiBox c={c} title={`[${String(props.index + 1).padStart(2, "0")}] ${props.title}`}>
			<div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
				<div style={{
					position: "relative",
					width: "200px",
					height: "120px",
					flexShrink: 0,
					border: `1px solid ${c.border}`,
					borderRadius: "2px",
					overflow: "hidden",
				}}>
					<Image
						src={props.thumbnail}
						alt={props.title}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div style={{ flex: 1, minWidth: "200px" }}>
					<p style={{ color: c.text, fontFamily: mono, fontSize: "0.8rem", margin: "0 0 0.5rem 0", lineHeight: 1.6 }}>
						{props.description}
					</p>
					{props.url && (
						<a
							href={props.url}
							target="_blank"
							rel="noopener noreferrer"
							style={{
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
							}}
						>
							<BsYoutube /> Watch Now →
						</a>
					)}
				</div>
			</div>
		</TuiBox>
	);
};

const VideosList = (props: any) => (
	<div>
		{props.videos.map((video: any, index: number) => (
			<VideoItem key={index} {...video} index={index} />
		))}
	</div>
);

export default VideosList;

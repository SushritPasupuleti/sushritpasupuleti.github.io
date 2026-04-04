import { BsYoutube } from "react-icons/bs";
import Image from "next/image";
import { useTerminalTheme, mono } from "../../../terminal-theme";

const VideoItem = (props: any) => {
	const { c } = useTerminalTheme();
	return (
		<div style={{ marginBottom: "1.25rem", border: `1px solid ${c.border}`, borderRadius: "4px", overflow: "hidden" }}>
			<div style={{ position: "relative", width: "100%", height: "220px" }}>
				<Image
					src={props.thumbnail}
					alt={props.title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div style={{ padding: "0.75rem" }}>
				<h3 style={{ color: c.green, fontFamily: mono, fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.4rem 0" }}>
					{props.title}
				</h3>
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
						<BsYoutube /> Watch Now
					</a>
				)}
			</div>
		</div>
	);
};

const VideosList = (props: any) => (
	<div>
		{props.videos.map((video: any, index: number) => (
			<VideoItem key={index} {...video} />
		))}
	</div>
);

export default VideosList;

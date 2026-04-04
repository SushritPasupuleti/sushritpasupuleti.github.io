import Image from "next/image";
import { BsMedium } from "react-icons/bs";
import { useTerminalTheme, mono } from "../../../terminal-theme";

const BlogItem = (props: any) => {
	const { c } = useTerminalTheme();
	return (
		<div style={{ border: `1px solid ${c.border}`, borderRadius: "4px", overflow: "hidden" }}>
			<div style={{ position: "relative", width: "100%", height: "180px" }}>
				<Image
					src={props.thumbnail}
					alt={props.title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div style={{ padding: "0.75rem" }}>
				<h4 style={{ color: c.green, fontFamily: mono, fontSize: "0.9rem", fontWeight: 600, margin: "0 0 0.4rem 0" }}>
					{props.title}
				</h4>
				<p style={{ color: c.text, fontFamily: mono, fontSize: "0.8rem", margin: "0 0 0.5rem 0", lineHeight: 1.6 }}>
					{props.description}
				</p>
				<a
					href={props.url}
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
					<BsMedium /> Read Now
				</a>
			</div>
		</div>
	);
};

const BlogsList = (props: any) => (
	<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
		{props.blogs.map((blog: any, index: number) => (
			<div style={{ flex: "1 1 45%", minWidth: "300px" }} key={index}>
				<BlogItem {...blog} />
			</div>
		))}
	</div>
);

export default BlogsList;

import Image from "next/image";
import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin } from "react-icons/bs";
import { Card, Button } from "@nextui-org/react";

const BlogItem = (props: any) => (
	<div style={{ width: "100%", height: "auto", position: "relative" }}>
		<Card style={{ width: "100%", height: "auto", position: "relative" }}>
			<div style={{ position: "absolute", zIndex: 1, top: 5 }} />
			<div style={{ padding: 0 }}>
				<div style={{ position: "relative", width: "100%", height: "180px" }}>
					<Image
						src={props.thumbnail}
						alt={props.title}
						layout="fill"
						objectFit="cover"
						style={{ borderRadius: "8px" }}
					/>
				</div>
			</div>
			<div
				style={{
					position: "absolute",
					background: "rgba(255,255,255,0.4)",
					borderTop: "1px solid rgba(255,255,255,0.2)",
					bottom: 0,
					zIndex: 1,
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0.5rem 1rem"
				}}
			>
				<span style={{ fontWeight: "bold", color: "#000" }}>{props.title}</span>
				<a href={props.url} style={{ textDecoration: "none" }}>
					<Button flat auto rounded color="secondary"
						iconRight={
							<BsMedium style={{ height: "1.5rem", width: "1.5rem" }} />
						}
					>
						<span style={{ color: "inherit", fontSize: 12, fontWeight: "bold", textTransform: "uppercase" }}>
							Read Now
						</span>
					</Button>
				</a>
			</div>
		</Card>
		<blockquote style={{ marginTop: "1rem" }}>
			{props.description}
		</blockquote>
	</div>
);

const BlogsList = (props: any) => (
	<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
		{
			props.blogs.map((blog: any, index: number) => (
				<div style={{ flex: "1 1 45%", minWidth: "300px" }} key={index}>
					<BlogItem {...blog} />
				</div>
			))
		}
	</div>
);

export default BlogsList;

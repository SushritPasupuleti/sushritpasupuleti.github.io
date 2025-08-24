import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import { BsYoutube } from "react-icons/bs";
import Image from "next/image";
import { Play } from "react-iconly";

const VideoItem = (props: any) => (
	<Card css={{ w: "100%", marginBottom: "2rem" }}>
		<Card.Body css={{ padding: 0 }}>
			<div style={{ position: "relative", width: "100%", height: "220px" }}>
				<Image
					src={props.thumbnail}
					alt={props.title}
					layout="fill"
					objectFit="cover"
					style={{ borderRadius: "8px 8px 0 0" }}
				/>
			</div>
		</Card.Body>
		<Card.Header>
			<Text h3>{props.title}</Text>
		</Card.Header>
		<Card.Body>
			<Text>{props.description}</Text>
		</Card.Body>
		{props.url && (
			<Card.Footer>
				<Button
					as="a"
					href={props.url}
					target="_blank"
					rel="noopener noreferrer"
					auto
					color="error"
					icon={<BsYoutube style={{ marginRight: "0.5rem", width: "1.2em", height: "1.2em" }} />}
				>
					Watch Now
				</Button>
			</Card.Footer>
		)}
	</Card>
);

const VideosList = (props: any) => (
	<div>
		{props.videos.map((video: any, index: number) => (
			<VideoItem key={index} {...video} />
		))}
	</div>
);

export default VideosList;

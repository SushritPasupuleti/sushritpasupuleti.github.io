import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin } from "react-icons/bs";
import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import { Play } from "react-iconly";

const BlogItem = (props: any) => (
	<div>
		<Card css={{ w: "100%", h: "auto" }}>
			<Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
			</Card.Header>
			<Card.Body css={{ p: 0 }}>
				<img src={props.thumbnail} alt={props.title} />

			</Card.Body>
			<Card.Footer
				isBlurred
				css={{
					position: "absolute",
					bgBlur: "#ffffff66",
					borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
					bottom: 0,
					zIndex: 1,
				}}
			>
				<Row>
					<Col>
						<Text h6 color="#000">
							{props.title}
						</Text>
					</Col>
					<Col>
						<Row justify="flex-end">
							<a href={props.url}>
								<Button flat auto rounded color="secondary"
									iconRight={
										<BsMedium style={{
											height: "1.5rem",
											width: "1.5rem",
										}} />
									}
								>
									<Text
										css={{ color: "inherit" }}
										size={12}
										weight="bold"
										transform="uppercase"
									>
										Read Now
									</Text>
								</Button>
							</a>
						</Row>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
		<Text blockquote
			css={{
				marginTop: "1rem",
			}}
		>
			{
				props.description
			}
		</Text>
	</div>
);

const BlogsList = (props: any) => (
	<div>
		<Grid.Container gap={2} justify="flex-start">
			{
				props.blogs.map((blog: any, index: number) => (
					<Grid
						// xs={6}
						sm={6}
						key={index}>
						<BlogItem {...blog} />
					</Grid>
				))
			}
		</Grid.Container>
	</div>
);

export default BlogsList;

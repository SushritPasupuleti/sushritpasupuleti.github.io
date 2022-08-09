import { Card, Col, Row, Button, Text, Spacer } from "@nextui-org/react";
import { Play } from "react-iconly";

const TedX = (props: any) => (
	<>
		<Text h1
			css={{
				textGradient: "45deg, $yellow600 -20%, $red600 100%",
			}}
		>
			Featured
		</Text>
		<Text h1>
			My TEDx Talk
		</Text>
		<Spacer y={1} />
		<Card css={{ w: "100%", h: "auto" }}>
			<Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
				{/*<Col>
				<Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
					New
				</Text>
				<Text h3 color="white">
					Acme camera
				</Text>
			</Col>
			*/}
			</Card.Header>
			<Card.Body css={{ p: 0 }}>
				<img src={"assets/video-bg.jpg"} alt="TedX Video - The Big Transition" />

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
							The Big Transition From Ants to Skynet @TedxSreyasInstitute
						</Text>
					</Col>
					<Col>
						<Row justify="flex-end">
							<a href="https://www.youtube.com/watch?v=0XXque5QdHg">
								<Button flat auto rounded color="secondary"
									iconRight={
										<Play set="bold" primaryColor="blueviolet" />
									}
								>
									<Text
										css={{ color: "inherit" }}
										size={12}
										weight="bold"
										transform="uppercase"
									>
										Watch Now
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
				`
			Everyone's watched The Terminator and similar movies where AI enslaves
			humanity or determines our existence to be what remains in it's way towards a 'perfect'
			world. With the truck loads of AI enabled products flooding the
			market every second, the paranoia has been higher than ever.. but is it really that
			scary as the movies show it to be ? Well here are my views on the 'Terminator fears'.

				`
			}
		</Text>
	</>
);

export default TedX;

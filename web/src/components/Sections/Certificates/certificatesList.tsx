import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import { Paper } from "react-iconly";

const CertificateItem = (props: any) => (
	<div>
		<Card css={{ w: "100%", h: "auto" }}>
			<Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
			</Card.Header>
			<Card.Body css={{ p: 0 }}>
				<embed src={props.url} type="application/pdf" width="100%" height="600px" />
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
							<a href={props.originalUrl}>
								<Button flat auto rounded color="secondary"
									iconRight={
										<Paper set="bold" primaryColor="blueviolet" />
									}
								>
									<Text
										css={{ color: "inherit" }}
										size={12}
										weight="bold"
										transform="uppercase"
									>
										View Certificate
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

const CertificatesList = (props: any) => (
	<div>
		<Grid.Container gap={2} justify="flex-start">
			{
				props.certificates.map((certificate: any, index: number) => (
					<Grid
						// xs={6}
						sm={6}
						key={index}>
						<CertificateItem {...certificate} />
					</Grid>
				))
			}
		</Grid.Container>
	</div>
);

export default CertificatesList;

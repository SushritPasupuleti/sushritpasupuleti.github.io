import * as React from "react";
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import { Download } from "react-iconly";
import { useMediaQuery } from "../../../src/hooks/useMediaQuery";
// import heroImg from '../../../public/assets/hero-2.jpg';
import Image from "next/image";
// import Image from '../../../src/components/Image';
import {
	BsTwitter,
	BsGithub,
	BsYoutube,
	BsMedium,
	BsFacebook,
	BsLinkedin,
	BsWhatsapp,
} from "react-icons/bs";
import { SiBlogger } from "react-icons/si";
import { Paper } from "react-iconly";
import Navbar from "../Navbar";

const Hero = (props: any) => {
	const isMobile = useMediaQuery(650);

	return (
		<div style={{ maxWidth: "1280px", padding: isMobile ? "1rem" : "2rem" }}>
			<Navbar isMobile={isMobile} />
			{/* Main content */}
			<div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? "1.5rem" : "3rem", marginBottom: "2rem" }}>
				<div style={{ flex: 1 }}>
					<Text
						h1
						css={{
							textGradient: "45deg, $purple600 20%, $blue600 50%",
							whiteSpace: "nowrap",
						}}
					>
						Sushrit Pasupuleti
					</Text>
					<Text blockquote>
						Product Manager | Fullstack Unicorn | Coder | Blogger | Speaker |
						Sketcher | Entrepreneur... err 🤔 and more 🙃
					</Text>
				</div>
			</div>
			<Grid.Container gap={2}>
				<Grid xs>
					<div>
						<Text
							style={{
								marginBottom: "0.5rem",
							}}
							weight="semibold"
							blockquote
						>
							{
								"Hey there, it's Sushrit, a technical and business-focused solo entrepreneur who has been building, managing, and scaling products for 7 years now. I’m quick to learn, adapt, innovate, and get scrappy when needed to ensure the product and I evolve as we should. I have extensive experience building and deploying highly performant applications/platforms which scale with ease."
							}
						</Text>
						<Spacer />
						<Text
							style={{
								marginBottom: "0.5rem",
							}}
							weight="semibold"
							// em
						>
							Currently building my startup{" "}
							<a
								href="https://www.skillshack.dev/"
								rel="noopener noreferrer"
								target="_blank"
							>
								{"skillShack(⚡);"}
							</a>
						</Text>
						<Text
							style={{
								marginBottom: "0.5rem",
							}}
							weight="semibold"
						>
							{
								"skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!"
							}
						</Text>
						<br />
						<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
							<div>
								<Text weight="semibold">Date of Birth</Text>
								<Text>Apr 21, 1999</Text>
							</div>
							<div>
								<Text weight="semibold">E-mail</Text>
								<Text>
									<a href="mailto:sushrit@skillshack.dev">sushrit@skillshack.dev</a>
								</Text>
							</div>
							<div>
								<Text weight="semibold">Phone</Text>
								<Text>
									<a href="tel:+919182362040">+91 9182362040</a>
								</Text>
							</div>
							<div>
								<Text weight="semibold">CEO & CTO</Text>
								<Text>
									<a href="https://www.skillshack.dev/">Braggi Solutions</a>
								</Text>
							</div>
						</div>
					</div>
				</Grid>
				{/* <Grid xs={0} md>
					<div>
						<Card>
							<Card.Body css={{ padding: 0 }}>
								<div style={{ position: "relative", width: "100%", height: "220px" }}>
									<Image
										src="/assets/hero-2.jpg"
										alt="Sushrit Pasupuleti"
										layout="fill"
										objectFit="cover"
										style={{ borderRadius: "8px" }}
									/>
								</div>
							</Card.Body>
						</Card>
					</div>
				</Grid> */}
			</Grid.Container>
			{/* <Grid xs md={0}>
				<div>
					<Card
						style={
							{
								// display: !isMobile ? 'none' : 'block',
							}
						}
					>
						<Card.Body css={{ padding: 0 }}>
							<div style={{ position: "relative", width: "100%", height: "220px" }}>
								<Image
									src="/assets/hero-2.jpg"
									alt="Sushrit Pasupuleti"
									layout="fill"
									objectFit="cover"
									style={{ borderRadius: "8px" }}
								/>
							</div>
						</Card.Body>
					</Card>
				</div>
			</Grid> */}
			<Grid.Container
				// display="flex"
				justify="center"
				alignItems="center"
				css={
					{
						// margin: '1rem',
					}
				}
				gap={2}
			>
				{/*
				<Grid>
					<a href="https://twitter.com/sushrit_lawliet">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsTwitter style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
			*/}
				<Grid>
					<a href="https://github.com/SushritPasupuleti">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsGithub
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://www.youtube.com/channel/UCUDlGMaGAQctgQJTRoBHgAw">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsYoutube
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://medium.com/@sushrit.pk21">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsMedium
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://sushritpasupuleti.blogspot.com/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<SiBlogger
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://www.linkedin.com/in/sushritpasupuleti/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsLinkedin
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				{/*
				<Grid>
					<a href="https://www.facebook.com/SushritLawliet/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsFacebook
									style={{
										height: "1.5rem",
										width: "1.5rem",
									}}
								/>
							}
						></Button>
					</a>
				</Grid>
				*/}
			</Grid.Container>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					// padding: '1rem',
				}}
			>
				<a href="https://sushritpasupuleti.github.io/personal-docs/">
					<Button
						shadow
						auto
						style={{
							marginTop: "1rem",
							width: "auto",
							// alignSelf: "start",
							// marginLeft: "1rem",
						}}
						iconRight={<Paper set="bold" primaryColor="white" />}
					>
						My Knowledge Hub
					</Button>
				</a>
			</div>
		</div>
	);
};

export default Hero;

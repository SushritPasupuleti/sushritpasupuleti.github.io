import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import { Download } from "react-iconly";
import { useMediaQuery } from '../../../src/hooks/useMediaQuery';
// import heroImg from '../../../public/assets/hero-2.jpg';
import Image from 'next/image';
// import Image from '../../../src/components/Image';
import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { SiBlogger } from "react-icons/si";

const Hero = (props: any) => {
	const isMobile = useMediaQuery(650);

	return (
		<div
			style={{
				maxWidth: '1280px',
			}}
		>
			<Grid.Container gap={2} justify="center">
				<Grid xs>
					<div>
						<Text
							h1
							css={{
								textGradient: "45deg, $purple600 20%, $blue600 50%",
							}}
						>
							Sushrit Pasupuleti
						</Text>
						<Text blockquote>
							Fullstack Unicorn | Coder | Blogger | Speaker | Sketcher | Entrepreneur... err 🤔 and more 🙃
						</Text>
					</div>
				</Grid>
				<Grid xs
					alignItems="center"
					justify={isMobile ? "flex-start" : "flex-end"}
				>
					<a href="https://skillshack.dev/generators/user-resume?user_name=sushrit_lawliet">
						<Button shadow color="primary" auto
							icon={
								<Download set="bold" primaryColor="white" />
							}
						>
							Download My Resume
						</Button>
					</a>
					<a href="https://wa.me/919182362040">
						<Button shadow color="success" auto
							icon={
								<BsWhatsapp style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}
							style={{
								marginLeft: '0.5rem',
							}}
						>
							{`Let's Talk`}
						</Button>
					</a>
				</Grid>
			</Grid.Container>
			<Grid.Container gap={2}>
				<Grid xs>
					<div>
						<Text
							style={{
								marginBottom: '0.5rem',
							}}
							weight="semibold"
							blockquote
						>
							{"Hey there, it's Sushrit, a technical and business-focused solo entrepreneur who has been building, managing, and scaling products for 7 years now. I’m quick to learn, adapt, innovate, and get scrappy when needed to ensure the product and I evolve as we should."}
						</Text>
						<Spacer />
						<Text
							style={{
								marginBottom: '0.5rem',
							}}
							weight="semibold"
						// em
						>
							Currently building my startup <a href="https://www.skillshack.dev/"
								rel="noopener noreferrer"
								target="_blank">
								{"skillShack(⚡);"}
							</a>
						</Text>
						<Text

							style={{
								marginBottom: '0.5rem',
							}}
							weight="semibold"
						>
							{"skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!"}
						</Text>
						<br />
						<Table>
							<Table.Header>
								<Table.Column>
									Basic Information
								</Table.Column>
								<Table.Column>
								</Table.Column>
							</Table.Header>
							<Table.Body>
								<Table.Row key="1">
									<Table.Cell>
										<Text weight="semibold">
											Date of Birth
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Text>
											Apr 21, 1999
										</Text>
									</Table.Cell>
								</Table.Row>
								<Table.Row key="2">
									<Table.Cell>
										<Text weight="semibold">
											E-mail
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Text>
											<a href="mailto:sushrit@skillshack.dev">
												sushrit@skillshack.dev
											</a>
										</Text>
									</Table.Cell>
								</Table.Row>
								<Table.Row key="3">
									<Table.Cell>
										<Text weight="semibold">
											Phone
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Text>
											<a href="tel:+919182362040">
												+91 9182362040
											</a>
										</Text>
									</Table.Cell>
								</Table.Row>
								<Table.Row key="4">
									<Table.Cell>
										<Text weight="semibold">
											CEO & CTO
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Text>
											<a href="https://www.skillshack.dev/">
												Braggi Solutions
											</a>
										</Text>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</div>
				</Grid>
				<Grid xs={0} md>
					<div>
						<Card>
							<Card.Body css={{ p: 0 }}>
								<img src={"assets/hero-2.jpg"} alt="Sushrit Pasupuleti" />
							</Card.Body>
						</Card>
					</div>
				</Grid>
			</Grid.Container>
			<Grid xs md={0}>
				<div>
					<Card
						style={{
							// display: !isMobile ? 'none' : 'block',
						}}
					>
						<Card.Body css={{ p: 0 }}>
							<img src={"assets/hero-2.jpg"} alt="Sushrit Pasupuleti" />
						</Card.Body>
					</Card>
				</div>
			</Grid>
			<Grid.Container
				// display="flex"
				justify="center"
				alignItems="center"
				css={{
					// margin: '1rem',
				}}
				gap={2}
			>
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
				<Grid>
					<a href="https://github.com/SushritPasupuleti">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsGithub style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://www.youtube.com/channel/UCUDlGMaGAQctgQJTRoBHgAw">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsYoutube style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://medium.com/@sushrit.pk21">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsMedium style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://sushritpasupuleti.blogspot.com/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<SiBlogger style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://www.linkedin.com/in/sushritpasupuleti/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsLinkedin style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
				<Grid>
					<a href="https://www.facebook.com/SushritLawliet/">
						<Button
							auto
							light
							// size="lg"
							icon={
								<BsFacebook style={{
									height: '1.5rem',
									width: '1.5rem',
								}} />
							}>
						</Button>
					</a>
				</Grid>
			</Grid.Container>
		</div >
	)
}

export default Hero;

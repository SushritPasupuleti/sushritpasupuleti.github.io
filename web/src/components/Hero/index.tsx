import * as React from 'react'
import { Grid, Card, Text, Button } from "@nextui-org/react";

const Hero = (props: any) => {
	return (
		<div>
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
						<Text h4>Fullstack Unicorn | Coder | Blogger | Speaker | Sketcher | Entrepreneur... err 🤔 Student and more 🙃</Text>
					</div>
				</Grid>
				<Grid xs>
					<Button shadow color="primary" auto>
						Download My Resume
					</Button>
				</Grid>
			</Grid.Container>
		</div>
	)
}

export default Hero;

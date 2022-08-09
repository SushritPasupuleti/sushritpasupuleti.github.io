import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import VideosList from './VideosList';
import { Play } from "react-iconly";
import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin } from "react-icons/bs";

const videosList: any = [
	{
		title: 'From Project To Product - The Complete Guide To Practical Programming - Webinar for KL University',
		description: 'In this Webinar hosted by KL University, I decided to talk about what I feel is the right way one can go about to get started with programming, and why it is more essential now than ever to learn it,  and learn it the right way.',
		url: 'https://www.youtube.com/watch?v=l673uNfDLX8',
		thumbnail: 'assets/P14.png',
	},
	{
		title: 'The Complete Guide to Coding During the Lockdown (Webinar)',
		description: `An interactive session that breaksdown the fundamentals of programming and finding motivation to learn after choosing the right language/framework for the job.
		`,
		url: 'https://youtu.be/pDNfLGBYAw0',
		thumbnail: 'https://img.youtube.com/vi/pDNfLGBYAw0/hqdefault.jpg',
	},
	{
		title: 'skillShack(⚡); Landing Page Reveal 2022',
		description: 'skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!',
		url: 'https://youtu.be/KJOQh_9pNhc',
		thumbnail: 'assets/P17.png',
	},
	{
		title: 'Braggi Shopping Slots Walkthrough',
		description: 'A walkthrough of the Braggi Shopping Slots application',
		url: 'https://youtu.be/CqBhgiBTb7M',
		thumbnail: 'assets/video-bg1.png',
	},
	{
		title: 'Braggi Shopping Slots (Store Owner) Walkthrough',
		description: `A walkthrough of the Braggi Shopping Slots application from the Store Owner's POV`,
		url: 'https://youtu.be/Nv-BaqGX3lE',
		thumbnail: 'assets/video-bg1.png',
	},
	{
		title: `SAM(Smart Assistance and Management) Personal Assistant for Windows | Trailer`,
		description: `A short video I made to show off the first iteration of Braggi for PC; SAM Personal Assistant for Windows application`,
		url: 'https://youtu.be/Ouc1A_DY88w',
		thumbnail: 'assets/video-bg2.png',
	},
	{
		title: `Auto Restart Your Node Apps After Making Changes! - Nodemon Showcase`,
		description: `Showcasing Nodemon and how I use it to build Node Apps.`,
		url: 'https://youtu.be/JewzZROAho8',
		thumbnail: 'assets/P15.png',
	},
	{
		title: `Code on Your Smartphone/Old PC like a Pro! | Google Colab Showcase`,
		description: `Showcasing Google Colab and how you can develop python web applications on it with ngrok.`,
		url: 'https://youtu.be/ALM1R7SQUso',
		thumbnail: 'assets/P16.png',
	},
];

function Videos() {
	return (
		<div>
			<Text h1>
				{`
					Videos
				`}
			</Text>
			<Text>
				{`Some of the videos I have made.`}
			</Text>
			<a href="https://www.youtube.com/channel/UCUDlGMaGAQctgQJTRoBHgAw">
				<Button
					auto
					shadow
					// size="lg"
					color="error"
					style={{
						marginLeft: '1rem',
						marginTop: '1rem',
					}}
					icon={
						<BsYoutube style={{
							height: '1.5rem',
							width: '1.5rem',
						}} />
					}>
					Check out all my videos on YouTube
				</Button>
			</a>
			<Spacer y={1} />
			<VideosList videos={videosList} />
		</div>
	)
}

export default Videos

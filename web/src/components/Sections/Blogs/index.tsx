import * as React from 'react'
import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import BlogsList from './BlogsList';
import { Play } from "react-iconly";
import { BsTwitter, BsGithub, BsYoutube, BsMedium, BsFacebook, BsLinkedin } from "react-icons/bs";

const blogList: any = [
	{
		title: 'How I built my Startup as a solo developer',
		description: 'This article will detail my journey from a Full Stack Engineer to Startup founder over the course of 10 months. Throughout this article I’ll explain the rationale behind choosing each part of my stack and how it played out in the end.',
		url: 'https://medium.com/@sushrit.pk21/how-i-built-my-startup-as-a-solo-developer-8561bf7eebde',
		thumbnail: 'https://miro.medium.com/max/1400/1*VfX9D92O5onZsL7QOyjxuw.gif',
	},
	{
		title: 'Learn & use these 2 languages for 90% of your career and never look back',
		description: `This article will detail my beliefs on why for most people out there learning these 2 languages would be sufficient, and how you can dive deeper and deeper into them to cater to all your needs. Be it portfolio buidling, your next startup product, these 2 will have you covered. You can basically build a fullstack application by the end of this article by following the resources mentioned.`,
		url: 'https://medium.com/@sushrit.pk21/learn-use-these-2-languages-for-90-of-your-career-and-never-look-back-7ff843b1c229',
		thumbnail: 'https://miro.medium.com/max/1400/1*zXLl7IPt8lxhkTxndxNceQ.jpeg',
	},
	{
		title: 'ChatGPT, Copilot and the future of Coding Interviews — A Technical Founder’s Perspective',
		description: `This article will talk about how OpenAI’s ChatGPT and GitHub Copilot are going to change the way we interview, and why it’s a good thing.`,
		url: 'https://medium.com/@sushrit.pk21/chatgpt-copilot-and-the-future-of-coding-interviews-a-technical-founders-perspective-8628c7102a9b',
		thumbnail: 'https://miro.medium.com/max/640/1*_VBzZYI4FKBF_XPqoOR76g.gif',
	},
	{
		title: 'Using ChatGPT to fully plan a Realtime Dashboard App (Architecture, Stack, Implementation and Deployment as a Technical Founder)',
		description: `This article continues my series on working with ChatGPT, and just seeing for myself how far I can push it, and what a 2.0 could do better. This time, I’m going to look at it from the perspective of a Product Manager.`,
		url: 'https://medium.com/@sushrit.pk21/using-chatgpt-to-fully-plan-a-realtime-dashboard-app-architecture-stack-implementation-and-16e322c0a2ec',
		thumbnail: 'https://miro.medium.com/max/640/0*eqakU-b6284U_48D.webp',
	},
	{
		title: 'Featured on Towards Data Science - How to Build Software like Tony Stark',
		description: 'This article will walk you through a process in which you can either get started with projects and break the cycle of just learning endlessly or change your ways and improve your workflow and efficiency while coding, so that you can stop feeling that this ain’t your thing and decide to learn Excel instead. We’ll do this by drawing inspiration from Tony Stark AKA Iron Man and how he builds things. I’ll also share some tips I follow personally to always be at 100%.',
		url: 'https://towardsdatascience.com/how-to-build-software-like-tony-stark-95484a2d2173',
		thumbnail: 'https://miro.medium.com/max/1000/1*OQpR_iCx9BFvUlL8sYyKag.gif',
	},
	{
		title: 'How, When, and Why you should switch from Vercel to a different Hosting Provider (Especially for Next.js)',
		description: 'This article aims to be a one stop research point for those looking/considering to deploy their Apps off Vercel and why that may be the most important decision you make, provided you do it at the right time. If you are a hobbyist or someone just building projects for your portfolio you are completely fine and are going to be happy with Vercel.',
		url: 'https://medium.com/@sushrit.pk21/how-when-and-why-you-should-switch-from-vercel-to-a-different-hosting-provider-especially-for-8ba25e439788',
		thumbnail: 'https://miro.medium.com/max/800/1*7tBvX3XNlTcPn0QqvO6OWA.gif',
	},
	{
		title: 'Read this if you have an infinite scroll feed on your website with poor SEO performance',
		description: `This article will detail how infinite scrolling feeds (like the kind on Twitter, Instagram etc) are bad for your SEO if not accounted for properly. I will refer to my thought processes and considerations as I worked to fix the same on my Startup skillShack(⚡️);`,
		url: 'https://medium.com/@sushrit.pk21/read-this-if-you-have-an-infinite-scroll-feed-on-your-website-with-poor-seo-performance-3a4ac99f051',
		thumbnail: 'https://miro.medium.com/max/1400/1*fFcyMiZZqAjCmTUisiDqQA.jpeg',
	},
	{
		title: `A Practical Beginner’s Guide to Machine Learning`,
		description: `This article will try to cover in detail, the workings of simple Neural Networks. While also giving you a look at the inner magic that makes them do what they can. I’ll try to minimize the usage of math wherever I can to make things less complex for those without a strong math background. Give this article a read from the start, even if you know the basics, as it’ll get you acquainted with the approach I’ve decided to take with this article. Every bit of it is as important as the code in the end. Happy Learning`,
		url: 'https://towardsdatascience.com/a-practical-beginners-guide-to-machine-learning-dcc9cf5c692b',
		thumbnail: 'https://miro.medium.com/max/550/0*iGD65eqN9xIu1Ev7.gif',
	},
	{
		title: `What Engineering colleges should learn/copy from Medical colleges`,
		description: `Let’s compare Medical Colleges to Engineering ones (this article takes a look at the system as it is in India, but could apply to a lot of other places too).`,
		url: 'https://medium.com/@sushrit.pk21/what-engineering-colleges-should-learn-copy-from-medical-colleges-61eef76f7af',
		thumbnail: 'https://miro.medium.com/max/1400/1*rrhbMdCk9BmM0WEknlRJZQ.jpeg',
	},
];

function Videos() {
	return (
		<div>
			<Text h1>
				{`
					Blogs
				`}
			</Text>
			<Text>
				{`Some of the Blogs I have published. Together they make up for over 150K+ views.`}
			</Text>
			<a href="https://medium.com/@sushrit.pk21">
				<Button
					auto
					shadow
					// size="lg"
					color="success"
					style={{
						marginLeft: '1rem',
						marginTop: '1rem',
					}}
					icon={
						<BsMedium style={{
							height: '1.5rem',
							width: '1.5rem',
						}} />
					}>
					Check out all my Blogs
				</Button>
			</a>
			<Spacer y={1} />
			<BlogsList blogs={blogList} />
		</div>
	)
}

export default Videos

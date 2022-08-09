import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
	Container,
	Button,
	Input,
	Spacer,
	Text,
	Link
} from '@nextui-org/react';
import Hero from '../src/components/Hero';
import TedxSection from '../src/components/Sections/TedX';
import SkillsSection from '../src/components/Sections/Skills';
import ToolsSection from '../src/components/Sections/Tools';
import WorkExperienceSection from '../src/components/Sections/WorkExperience';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Sushrit Pasupuleti - Resume</title>
				<meta
					name="description"
					content="Fullstack Unicorn | Coder | Blogger | Speaker | Sketcher | Entrepreneur... err 🤔 Student and more 🙃
"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container
				as="main"
				display="flex"
				direction="column"
				justify="center"
				alignItems="center"
			// style={{ height: '100vh' }}
			>
				<Spacer />
				<header>
					<Hero />
				</header>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<TedxSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<SkillsSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<ToolsSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<WorkExperienceSection />
				</section>
				<Spacer y={3} />
			</Container>
		</div>
	)
}

export default Home

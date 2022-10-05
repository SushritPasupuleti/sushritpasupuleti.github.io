import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
	Container,
	Button,
	Input,
	Spacer,
	Text,
	Card,
	Link
} from '@nextui-org/react';
import Hero from '../src/components/Hero';
import TedxSection from '../src/components/Sections/TedX';
import SkillsSection from '../src/components/Sections/Skills';
import ToolsSection from '../src/components/Sections/Tools';
import WorkExperienceSection from '../src/components/Sections/WorkExperience';
import ProjectsSection from '../src/components/Sections/Projects';
import VideosSection from '../src/components/Sections/Videos';
import BlogsSection from '../src/components/Sections/Blogs';
import HomeSEO from '../src/components/SEO';
import ExtraSection from '../src/components/Sections/Extra';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<HomeSEO />
			<Head>
				<title>Sushrit Pasupuleti - Resume</title>
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
				<section style={{
					maxWidth: '1000px',
				}}>
					<TedxSection />
				</section>
				<Spacer y={3} />
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
				<section style={{
					maxWidth: '1000px',
				}}>
					<ProjectsSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<ExtraSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<BlogsSection />
				</section>
				<Spacer y={3} />
				<section style={{
					maxWidth: '1000px',
				}}>
					<VideosSection />
				</section>
				<Spacer y={3} />
				<Card.Divider style={{
					width: '100%',
				}} />
				<footer>
					<Spacer y={1} />
					<Text>
						Copyright &copy; {new Date().getFullYear()} Sushrit Pasupuleti. All rights reserved.
					</Text>
					<Spacer y={1} />
				</footer>
			</Container>
		</div>
	)
}

export default Home

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

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>NextUI | Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app and using NextUI as a react UI library"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container
				as="main"
				display="flex"
				direction="column"
				justify="center"
				alignItems="center"
				style={{ height: '100vh' }}
			>
				<Spacer />
				<Hero />
				<Spacer />
			</Container>
		</div>
	)
}

export default Home

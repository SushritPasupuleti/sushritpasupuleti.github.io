import { NextSeo } from 'next-seo';

const HomeSEO = () => (
	<>
		<NextSeo
			title="Sushrit Pasupuleti - Resume"
			description={"Hey there, it's Sushrit, a technical and business focused solo-entrepreneur who has been building, managing and scaling products for 7 years now. I’m quick to learn, adapt, innovate, and get scrappy when needed to ensure the product and I evolve as we should."}
			canonical="https://sushritpasupuleti.github.io/#"
			openGraph={{
				url: 'https://sushritpasupuleti.github.io/#',
				title: 'Sushrit Pasupuleti - Resume',
				description: "Hey there, it's Sushrit, a technical and business focused solo-entrepreneur who has been building, managing and scaling products for 7 years now. I’m quick to learn, adapt, innovate, and get scrappy when needed to ensure the product and I evolve as we should.",
				images: [
					{
						url: '/assets/hero-2.jpg',
						width: 800,
						height: 800,
						alt: 'Sushrit Pasupuleti',
						type: 'image/jpeg',
					},
				],
				site_name: 'Sushrit Pasupuleti - Resume',
			}}
			// twitter={{
			// 	handle: '@sushrit_lawliet',
			// 	site: '@sushrit_lawliet',
			// 	cardType: 'summary_large_image',
			// }}
		/>
	</>
);

export default HomeSEO;


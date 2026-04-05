import Image from "next/image";
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBlockquote from "../../TuiBlockquote";

const TedX = () => {
	const { c } = useTerminalTheme();
	return (
		<div>
			<h2 style={{ color: c.green, fontFamily: mono, fontSize: "1.15rem", fontWeight: 600, margin: "0 0 0.25rem 0" }}>
				<span style={{ color: c.dim, fontSize: "0.8em" }}>## </span>Featured
			</h2>
			<h3 style={{ color: c.textBright, fontFamily: mono, fontSize: "1rem", fontWeight: 600, margin: "0 0 1rem 0" }}>
				My TEDx Talk
			</h3>

			<div style={{
				border: `1px solid ${c.border}`,
				borderRadius: "4px",
				overflow: "hidden",
				marginBottom: "1rem",
			}}>
				<div style={{ position: "relative", width: "100%", height: "220px" }}>
					<Image
						src="/assets/video-bg.jpg"
						alt="TedX Video - The Big Transition"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div style={{
					padding: "0.75rem 1rem",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "0.5rem",
					background: c.titleBar,
				}}>
					<span style={{ color: c.textBright, fontFamily: mono, fontSize: "0.8rem", fontWeight: 600 }}>
						The Big Transition From Ants to Skynet @TedxSreyasInstitute
					</span>
					<a
						href="https://www.youtube.com/watch?v=0XXque5QdHg"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: c.green,
							fontFamily: mono,
							fontSize: "0.8rem",
							border: `1px solid ${c.green}`,
							padding: "0.3rem 0.6rem",
							borderRadius: "3px",
							textDecoration: "none",
						}}
					>
						▶ Watch Now
					</a>
				</div>
			</div>

			<TuiBlockquote color={c.muted} borderColor={c.green} dimColor={c.dim}>
				Everyone&apos;s watched The Terminator and similar movies where AI enslaves
				humanity or determines our existence to be what remains in it&apos;s way towards a &apos;perfect&apos;
				world. With the truck loads of AI enabled products flooding the
				market every second, the paranoia has been higher than ever.. but is it really that
				scary as the movies show it to be ? Well here are my views on the &apos;Terminator fears&apos;.
			</TuiBlockquote>
		</div>
	);
};

export default TedX;

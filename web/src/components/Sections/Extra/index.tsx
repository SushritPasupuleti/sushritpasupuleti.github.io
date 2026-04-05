import * as React from 'react'
import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiSectionHeader from "../../TuiSectionHeader";

const extra: any = [
	"Published my first Application (SAM, mentioned above) at the age of 15, all while organically growing a dedicated blog, FB Page to promote it.",
	"Self-Hosted my first Website at 16 on a Raspberry Pi 3B+ using LAMP Stack.",
	"Built my own linux distro from Gentoo Linux, with final installation size of ~350MB for self-hosting applications.",
	"Self-Hosting my HomeLab locally using Proxmox, which also hosts my local Windows VM (with GPU Passtrhough on non-enterprise Nvidia Hardware) and Docker (PostgreSQL, Jenkins, Gitea, NextCloud, HomeAssistant etc) for my development needs.",
	"Use Ansible to automate setup and tear down of all my HomeLab VMs.",
	"Have 150K+ Reads on Medium with over 700 followers.",
	"Taught myself Data Science to perform analyses on user data to improve my products and act on feedback, managed to increase user interest in products with the same.",
	"Taught myself Video Editing and Graphic Design to promote my projects (Lead to the creation of my YT channel and other dedicated Social Media handles for projects like skillShack(⚡);)",
	"Have been a part of the Microsoft for Startups Program for skillShack(⚡);",
	"Help out local startups with their tech needs (Web Dev, App Dev, UI/UX, System Design, DevOps, Hiring and Marketing) from time to time.",
	"Gave a TedX talk at the age of 17 (Mentioned above)",
	"I mentor students and help them with their projects and career guidance. Also host webinars for colleges (Mentioned below).",
	"I daily drive Neovim as my main editor, with a custom config that I've been working putting together to act as an IDE replacement for my needs.",
	"I started using NixOS as my daily driver recently, and have a hyper-customized setup for my needs, that can be deployed on any machine with a single command.",
	"Side Project of Note: Working on an ActivityPub based social network, that is completely decentralized and self-hostable, with a focus on privacy and security.",
]

function ExtraSection() {
	const { c } = useTerminalTheme();
	return (
		<div>
			<TuiSectionHeader c={c} command="cat -n extras.log" output={`${extra.length + 1} lines`} />
			<div style={{
				border: `1px solid ${c.border}`,
				borderRadius: "2px",
				overflow: "hidden",
			}}>
				<div style={{
					background: c.titleBar,
					borderBottom: `1px solid ${c.border}`,
					padding: "0.3rem 0.6rem",
					fontSize: "0.75rem",
					fontFamily: mono,
				}}>
					<span style={{ color: c.dim }}>┌─── </span>
					<span style={{ color: c.green, fontWeight: 600 }}>Accomplishments, Brags & Hobbies!</span>
				</div>
				<div style={{ padding: "0.5rem 0" }}>
					{extra.map((item: any, index: number) => (
						<div
							key={index}
							style={{
								display: "flex",
								fontFamily: mono,
								fontSize: "0.82rem",
								lineHeight: 1.7,
								padding: "0.15rem 0.75rem",
								transition: "background 0.1s",
							}}
							onMouseEnter={(e) => {
								(e.currentTarget as HTMLDivElement).style.background = c.hoverBg ?? c.titleBar;
							}}
							onMouseLeave={(e) => {
								(e.currentTarget as HTMLDivElement).style.background = "transparent";
							}}
						>
							<span style={{
								color: c.dim,
								minWidth: "2.5rem",
								textAlign: "right",
								marginRight: "1rem",
								userSelect: "none",
								flexShrink: 0,
								borderRight: `1px solid ${c.border}`,
								paddingRight: "0.75rem",
							}}>
								{String(index + 1).padStart(2, " ")}
							</span>
							<span style={{ color: c.text }}>{item}</span>
						</div>
					))}
					<div
						style={{
							display: "flex",
							fontFamily: mono,
							fontSize: "0.82rem",
							lineHeight: 1.7,
							padding: "0.15rem 0.75rem",
						}}
					>
						<span style={{
							color: c.dim,
							minWidth: "2.5rem",
							textAlign: "right",
							marginRight: "1rem",
							userSelect: "none",
							flexShrink: 0,
							borderRight: `1px solid ${c.border}`,
							paddingRight: "0.75rem",
						}}>
							{String(extra.length + 1).padStart(2, " ")}
						</span>
						<a
							href="https://knowyourmeme.com/memes/btw-i-use-arch"
							target="_blank"
							rel="noreferrer"
							style={{ color: c.green, textDecoration: "none", fontWeight: 700 }}
						>
							I use Arch btw
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExtraSection

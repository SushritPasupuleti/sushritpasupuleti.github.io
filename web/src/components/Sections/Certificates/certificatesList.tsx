import { Card, Button } from "@nextui-org/react";
import { Paper } from "react-iconly";

const CertificateItem = (props: any) => (
	<div style={{ width: "100%", height: "auto", position: "relative" }}>
		<Card style={{ width: "100%", height: "auto", position: "relative" }}>
			<div style={{ position: "absolute", zIndex: 1, top: 5 }} />
			<div style={{ padding: 0 }}>
				<embed src={props.url} type="application/pdf" width="100%" height="600px" />
			</div>
			<div
				style={{
					position: "absolute",
					background: "rgba(255,255,255,0.4)",
					borderTop: "1px solid rgba(255,255,255,0.2)",
					bottom: 0,
					zIndex: 1,
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0.5rem 1rem"
				}}
			>
				<span style={{ fontWeight: "bold", color: "#000" }}>{props.title}</span>
				<a href={props.originalUrl} style={{ textDecoration: "none" }}>
					<Button flat auto rounded color="secondary"
						iconRight={
							<Paper set="bold" primaryColor="blueviolet" />
						}
					>
						<span style={{ color: "inherit", fontSize: 12, fontWeight: "bold", textTransform: "uppercase" }}>
							View Certificate
						</span>
					</Button>
				</a>
			</div>
		</Card>
		<blockquote style={{ marginTop: "1rem" }}>
			{props.description}
		</blockquote>
	</div>
);

const CertificatesList = (props: any) => (
	<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
		{
			props.certificates.map((certificate: any, index: number) => (
				<div style={{ flex: "1 1 45%", minWidth: "300px" }} key={index}>
					<CertificateItem {...certificate} />
				</div>
			))
		}
	</div>
);

export default CertificatesList;

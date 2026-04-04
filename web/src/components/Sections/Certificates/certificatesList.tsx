import { useTerminalTheme, mono } from "../../../terminal-theme";

const CertificateItem = (props: any) => {
	const { c } = useTerminalTheme();
	return (
		<div style={{ border: `1px solid ${c.border}`, borderRadius: "4px", overflow: "hidden" }}>
			<embed src={props.url} type="application/pdf" width="100%" height="600px" />
			<div style={{ padding: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
				<span style={{ color: c.green, fontFamily: mono, fontSize: "0.9rem", fontWeight: 600 }}>{props.title}</span>
				<a
					href={props.originalUrl}
					style={{
						color: c.cyan,
						fontFamily: mono,
						fontSize: "0.8rem",
						border: `1px solid ${c.border}`,
						padding: "0.3rem 0.6rem",
						borderRadius: "3px",
						textDecoration: "none",
					}}
				>
					View Certificate
				</a>
			</div>
			<p style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", padding: "0 0.75rem 0.75rem", margin: 0, borderLeft: `2px solid ${c.green}`, marginLeft: "0.75rem" }}>
				{props.description}
			</p>
		</div>
	);
};

const CertificatesList = (props: any) => (
	<div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
		{props.certificates.map((certificate: any, index: number) => (
			<div style={{ flex: "1 1 45%", minWidth: "300px" }} key={index}>
				<CertificateItem {...certificate} />
			</div>
		))}
	</div>
);

export default CertificatesList;

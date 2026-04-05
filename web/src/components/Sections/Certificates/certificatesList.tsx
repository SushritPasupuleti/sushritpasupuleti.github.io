import { useTerminalTheme, mono } from "../../../terminal-theme";
import TuiBox from "../../TuiBox";

const CertificateItem = (props: any) => {
	const { c } = useTerminalTheme();
	return (
		<TuiBox c={c} title={props.title} badge="VERIFIED" badgeColor={c.green}>
			<embed src={props.url} type="application/pdf" width="100%" height="600px" />
			<div style={{ padding: "0.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
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
					🔗 View Original Certificate
				</a>
			</div>
			<div style={{ color: c.text, fontFamily: mono, fontSize: "0.85rem", borderLeft: `2px solid ${c.green}`, paddingLeft: "0.75rem" }}>
				{props.description}
			</div>
		</TuiBox>
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

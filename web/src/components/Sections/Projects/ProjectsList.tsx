import React from "react";
import { Grid, Card, Text, Button, Table, Spacer, Modal } from "@nextui-org/react";
import { Send } from "react-iconly";
import Tags from "../Skills/Keywords";

const Preview = (props: any): JSX.Element => {

	const closeHandler = () => {
		props.setVisible(false);
	};

	return (
		<div>
			<Modal noPadding open={props.visible} onClose={closeHandler}
				aria-labelledby="image-preview-modal"
				blur
				// width="90%"
				// closeButton
				width="70%"
			// fullScreen
			>
				<Modal.Header
					css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
				>
				</Modal.Header>
				<Modal.Body>
					<img src={props.url}
						style={{
							width: "auto",
							// maxWidth: "80vh",
							height: "auto",
							// maxHeight: "80vh",
						}}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

const GalleryItem = (props: any): JSX.Element => {

	const handler = () => {
		props.setUrl(props.img);
		props.setVisible(true);
	}

	return (
		<div
			onClick={() => handler()}
		>
			<Card
				style={{
					// display: !isMobile ? 'none' : 'block',
				}}
			>
				<Card.Body css={{ p: 0 }}
				>
					<img src={props.img} alt={props.product} style={{
						// maxHeight: '30vh',
						// width: 'auto',
						// height: 'auto',
					}}
					/>
				</Card.Body>
			</Card>
		</div>

	)
}

const Project = (props: any): JSX.Element => {

	const [visible, setVisible] = React.useState(false);
	const [url, setUrl] = React.useState("");

	const handler = () => setVisible(true);

	return (
		<div>
			<Grid.Container gap={2} style={{
				alignItems: 'baseline',
			}}>
				<Grid xs>
					<div>
						<Text h2 weight="bold">
							{props.projectInfo.product}
						</Text>
						<Text h4>
							{props.projectInfo.position}
						</Text>
					</div>
				</Grid>
				<Grid xs>
					<div>
						<Text h4>
							{props.projectInfo.start} to {props.projectInfo.end}
						</Text>
					</div>
				</Grid>
			</Grid.Container>
			<Spacer />
			<Text blockquote>
				{props.projectInfo.description}
			</Text>
			<Spacer />
			{
				props.projectInfo.highlightImage && (
					<>
						<div
							style={{
								padding: '2rem',
								marginTop: '-2rem',
								marginBottom: '-2rem',
							}}
						>
							<GalleryItem
								img={props.projectInfo.highlightImage}
								product={props.projectInfo.product}
								setUrl={setUrl}
								setVisible={setVisible}
							/>
						</div>
						<Spacer />
					</>
				)
			}
			<Tags skills={props.projectInfo.tags} />
			<Spacer />
			<div style={{
				padding: '1rem',
				paddingTop: '0',
			}}>
				{
					props.projectInfo.keywords.length > 0 && props.projectInfo.keywords.map((keyword: string, index: number) => {
						return (
							<Text key={index}>
								<li>
									{keyword}
								</li>
							</Text>
						)
					})
				}
			</div>
			<Spacer />
			<Grid.Container gap={2}>
				{
					props.projectInfo.images && props.projectInfo.images.length > 0 && props.projectInfo.images.map((img: string, index: number) => {
						return (
							<Grid xs key={index}>
								<GalleryItem
									key={index}
									img={img}
									product={props.projectInfo.product}
									setVisible={setVisible}
									setUrl={setUrl}
								/>
							</Grid>
						)
					})
				}
			</Grid.Container>
			<Spacer />
			<div>
				{
					props.projectInfo.link && (
						<a href={props.projectInfo.link}>
							<Button
								style={{
									marginLeft: '1rem',
								}}
								auto
								color="secondary"
								shadow
								icon={<Send set="bold" primaryColor="white" />}
							>
								{props.projectInfo.linkText}
							</Button>
						</a>
					)
				}
			</div>
			<Spacer />
			<Preview visible={visible} setVisible={setVisible} url={url} />
		</div>
	)
}

const ProjectList = (props: any): JSX.Element => {
	return (
		<div>
			{
				props.projectsList.map((projectInfo: any, index: number) => {
					return (
						<Project key={index} projectInfo={projectInfo} />
					)
				})
			}
		</div>
	)
}

export default ProjectList;

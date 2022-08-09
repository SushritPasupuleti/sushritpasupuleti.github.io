import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";
import { Send } from "react-iconly";
import Tags from "../Skills/Keywords";

const GalleryItem = (props: any): JSX.Element => {
	return (
		<div>
			<Card
				style={{
					// display: !isMobile ? 'none' : 'block',
				}}
			>
				<Card.Body css={{ p: 0 }}>
					<img src={props.img} alt={props.product} style={{
						// maxHeight: '30vh',
						// width: 'auto',
						// height: 'auto',
					}} />
				</Card.Body>
			</Card>
		</div>

	)
}

const Project = (props: any): JSX.Element => {
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
								<GalleryItem key={index} img={img} product={props.projectInfo.product} />
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

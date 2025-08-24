import { Grid, Card, Text, Button, Table, Spacer } from "@nextui-org/react";

const WorkExperience: React.FC<any> = (props) => {
	return (
		<div>
			<Grid.Container gap={2} style={{
				alignItems: 'baseline',
			}}>
				<Grid xs>
					<div>
						<Text h2 weight="bold">
							{props.workExperience.organization}
						</Text>
						<Text h4>
							{props.workExperience.position}
						</Text>
					</div>
				</Grid>
				<Grid xs>
					<Text h4>
						{props.workExperience.start} to {props.workExperience.end}
					</Text>
				</Grid>
			</Grid.Container>
			<Spacer />
			<Text blockquote>
				{props.workExperience.description}
			</Text>
			<Spacer />
			<div style={{
				padding: '1rem',
				paddingTop: '0',
			}}>
				{
					props.workExperience.keywords.length > 0 && props.workExperience.keywords.map((keyword: string, index: number) => {
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
		</div>
	)
}

const WorkExperienceList: React.FC<any> = (props) => {
	return (
		<div>
			{
				props.workExperienceList.map((workExperience: any, index: number) => {
					return (
						<WorkExperience key={index} workExperience={workExperience} />
					)
				})
			}
		</div>
	)
}

export default WorkExperienceList;

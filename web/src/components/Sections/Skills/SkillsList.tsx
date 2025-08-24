import { User, Text } from '@nextui-org/react';

const Skills: React.FC<any> = (props) => {

	return (
		<>
			{
				props.skills.map((skill: String, index: number) => {
					return (
						<div key={index}>
							<Text weight="semibold">
								<li>
									{skill}
								</li>
							</Text>
						</div>
					)
				})
			}
		</>
	)
}

export default Skills;

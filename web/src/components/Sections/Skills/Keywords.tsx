import { Text } from '@nextui-org/react';
import { StyledBadge } from '../../Badge';

const SkillKeywords = (props: any): JSX.Element => {

	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
		}}>
			{
				props.skills.map((skill: String, index: number) => {
					return (
						<div key={index}>
							<StyledBadge>
								{skill}
							</StyledBadge>
						</div>
					)
				})
			}
		</div>
	)
}

export default SkillKeywords;

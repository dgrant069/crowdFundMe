import { Card } from 'semantic-ui-react'
import { Link } from '../routes'

const CardList = ({ cardProps }) => {
	const cards = cardProps.map((address) => {
		return {
			header: address,
			description: (
				<Link route={`/campaigns/${address}`}>
					<a>View Campaign</a>
				</Link>
			),
			fluid: true,
		}
	})

	return <Card.Group items={cards} />
}

export default CardList

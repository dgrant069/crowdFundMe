import React from 'react'
import { Button } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'

import factory from '../ethereum/factory'
import { Link } from '../routes'

import CardList from '../components/CardList'
import Layout from '../components/Layout'

class CampaignIndex extends React.Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call()

		return { campaigns }
	}

	render() {
		return (
			<Layout>
				<div>
					<h3>Open Campaigns</h3>
					<Link route="/campaigns/new">
						<a>
							<Button
								floated="right"
								content="Create Campaign"
								icon="add circle"
								primary
							/>
						</a>
					</Link>

					<CardList cardProps={this.props.campaigns} />
				</div>
			</Layout>
		)
	}
}

export default CampaignIndex

import React from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
// import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class CampaignShow extends React.Component {
	static async getInitialProps(props) {
		console.log(props.query.address)
		const campaign = Campaign(props.query.address)

		const summary = await campaign.methods.getSummary().call()
		console.log(summary)
		return {
			address: props.query.address,
			minimumContribution: summary[0],
			balance: summary[1],
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4],
		}
	}

	render() {
		return (
			<Layout>
				<h1>Campaign</h1>
			</Layout>
		)
	}
}

export default CampaignShow

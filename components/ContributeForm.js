import React from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'

import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class ContributeForm extends React.Component {
	state = {
		contribution: '',
		loading: false,
		errorMessage: '',
	}

	onSubmit = async (event) => {
		event.preventDefault()
		const campaign = Campaign(this.props.address)

		this.setState({ loading: true, errorMessage: '' })

		try {
			const accounts = await web3.eth.getAccounts()
			await campaign.methods.contribute().send({
				value: web3.utils.toWei(this.state.contribution, 'ether'),
				from: accounts[0],
			})

			campaign.getPastEvents('Contribute', function(error, result) {
				console.log('past events', result)
			})

			Router.replaceRoute(`/campaigns/${this.props.address}`)
		} catch (err) {
			this.setState({ errorMessage: err.message })
		}

		this.setState({ loading: false })
	}

	render() {
		return (
			<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
				<Form.Field>
					<label>Amount to contribute</label>
					<Input
						label="ether"
						labelPosition="right"
						value={this.state.contribution}
						onChange={(event) =>
							this.setState({ contribution: event.target.value })
						}
					/>
				</Form.Field>

				<Message error header="Oops!" content={this.state.errorMessage} />
				<Button loading={this.state.loading} primary>
					Contribute
				</Button>
			</Form>
		)
	}
}

export default ContributeForm

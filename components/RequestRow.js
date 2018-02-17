import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

const RequestRow = ({ id, request, address, approversCount }) => {
	// console.log('id', id)
	// console.log('request', request)
	// console.log('address', address)
	// console.log('approversCount', approversCount)

	const { Row, Cell } = Table
	const campaign = Campaign(address)
	const readyToFinalize = request.approvalCount > approversCount / 2

	const onApprove = async () => {
		const accounts = await web3.eth.getAccounts()
		await campaign.methods.approveRequest(id).send({
			from: accounts[0],
		})

		Router.replaceRoute(`/campaigns/${address}/requests`)
	}

	const onFinalize = async () => {
		const summary = await campaign.methods.getSummary().call()
		const manager = summary[4]
		const accounts = await web3.eth.getAccounts()

		manager === accounts[0]
			? await campaign.methods.finalizeRequest(id).send({
					from: accounts[0],
				})
			: alert('you need to be the manager')

		Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
	}

	return (
		<Row
			disabled={request.complete}
			positive={readyToFinalize && !request.complete}>
			<Cell>{id}</Cell>
			<Cell>{request.description}</Cell>
			<Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
			<Cell>{request.recipient}</Cell>
			<Cell>
				{request.approvalCount}/{approversCount}
			</Cell>
			<Cell>
				{request.complete ? null : (
					<Button color="green" basic onClick={onApprove}>
						Approve
					</Button>
				)}
			</Cell>
			<Cell>
				{request.complete ? null : (
					<Button color="teal" basic onClick={onFinalize}>
						Finalize
					</Button>
				)}
			</Cell>
		</Row>
	)
}

export default RequestRow

// Author's original
// import React, { Component } from 'react'
// import { Table, Button } from 'semantic-ui-react'
// import web3 from '../ethereum/web3'
// import Campaign from '../ethereum/campaign'
//
// class RequestRow extends Component {
// 	onApprove = async () => {
// 		const campaign = Campaign(this.props.address)
//
// 		const accounts = await web3.eth.getAccounts()
// 		await campaign.methods.approveRequest(this.props.id).send({
// 			from: accounts[0],
// 		})
// 	}
//
// 	onFinalize = async () => {
// 		const campaign = Campaign(this.props.address)
//
// 		const accounts = await web3.eth.getAccounts()
// 		await campaign.methods.finalizeRequest(this.props.id).send({
// 			from: accounts[0],
// 		})
// 	}
//
// 	render() {
// 		const { Row, Cell } = Table
// 		const { id, request, approversCount } = this.props
// 		const readyToFinalize = request.approvalCount > approversCount / 2
//
// 		return (
// 			<Row
// 				disabled={request.complete}
// 				positive={readyToFinalize && !request.complete}>
// 				<Cell>{id}</Cell>
// 				<Cell>{request.description}</Cell>
// 				<Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
// 				<Cell>{request.recipient}</Cell>
// 				<Cell>
// 					{request.approvalCount}/{approversCount}
// 				</Cell>
// 				<Cell>
// 					{request.complete ? null : (
// 						<Button color="green" basic onClick={this.onApprove}>
// 							Approve
// 						</Button>
// 					)}
// 				</Cell>
// 				<Cell>
// 					{request.complete ? null : (
// 						<Button color="teal" basic onClick={this.onFinalize}>
// 							Finalize
// 						</Button>
// 					)}
// 				</Cell>
// 			</Row>
// 		)
// 	}
// }
//
// export default RequestRow

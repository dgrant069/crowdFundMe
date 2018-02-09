import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0xD48A4b0aA45652C7667CAad9A36764158B012716',
)

export default instance

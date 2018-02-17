import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'
const env = require('../envs/constants')

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	env.DEPLOYED_CONTRACT_ADDRESS,
)

export default instance

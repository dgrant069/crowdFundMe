const fs = require('fs')
const HdWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const compiledFactory = require('./build/CampaignFactory.json')
const env = require('../envs/constants')

const provider = new HdWalletProvider(
	env.DEV_MNEMONIC,
	`https://ropsten.infura.io/${env.INFURA_API_KEY}`,
)
const web3 = new Web3(provider)

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attempting to deploy from account', accounts[0])

	const result = await new web3.eth.Contract(
		JSON.parse(compiledFactory.interface),
	)
		.deploy({ data: compiledFactory.bytecode })
		.send({ gas: '1000000', from: accounts[0] })

	console.log('Contract deployed to', result.options.address)

	const stream = fs.createWriteStream('deployAddresses.txt')
	stream.write(result.options.address.toString() + '\n')
	stream.end()
}

deploy()

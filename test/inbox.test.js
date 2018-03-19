const assert = require('assert')
// The provider
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')





let accounts
let inbox

beforeEach(async () => {
  // Get a list of all accounts, async...use await, screw promises
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello'] })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider)
})


describe('Inbox', () => {

  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('sets an initial message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hello')
  })

  it('sets the message', async () => {
    await inbox.methods.setMessage('Goodbye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Goodbye')
  })
})


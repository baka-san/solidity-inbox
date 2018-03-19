// This file will take the contracts and compile them to generate 
// the bytecode and ABI

// path will generate a path that works on windows, mac, etc
const path = require('path')
// fs = file system, 
const fs = require('fs')
const solc = require('solc')

// build a path from here to contracts
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol')

// Store content from inbox.sol here
const source = fs.readFileSync(inboxPath, 'utf8')

// Compile code
module.exports = solc.compile(source,1).contracts[':Inbox']
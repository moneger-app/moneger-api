const transactionTypes = {
    Incoming: 0,
    Outgoing: 1,
    AccountIncoming: 2,
    AccountOutgoing: 3,
}

function getKeyByValue(value) {
    return Object.keys(transactionTypes).find(key => transactionTypes[key] === value)
}

module.exports = { transactionTypes: Object.freeze(transactionTypes), getKeyByValue}
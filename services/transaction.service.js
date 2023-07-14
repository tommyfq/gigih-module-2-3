const { getCustomer } = require("../model/customer.model")
const  { createTransaction, getTransaction } = require("../model/transaction.model")

function transfer(sourceId, destinationId, amount) {
    console.log(sourceId)
    console.log(destinationId)
    sourceAccount = getCustomer(sourceId);
    destinationAccount = getCustomer(destinationId);
    console.log(sourceAccount)
    console.log(destinationAccount)
    if(!sourceAccount || !destinationAccount) {
      throw new Error("Invalid source or destination account");
    }
    if (sourceAccount.balance < amount) {
      throw new Error("Insufficient balance in the source account")
    }
    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;
    createTransaction(sourceAccount.customerId, destinationAccount.destinationId, amount);
    return
  }

  

  function mutation(){
    return getTransaction()
  } 

  module.exports = {
    transfer,
    mutation
  }
const express = require('express')
const app = express()
const port = 3000

app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//require("./controller/transaction.controller")(app)
let customers = [
  {
     customerId: '12345',
     name: 'John Doe',
     email: 'johndoe@example.com',
     balance: 5000.00
  },
  {
    customerId: '98765',
     name: 'Doe John',
     email: 'doejohn@example.com',
     balance: 10000.00
  }
];

function getAllCustomers() {
  return customers;
}
function getCustomer(customerId) {
  return customers.find((c) => c.customerId === customerId);
}
function createCustomer(name, email, initialBalance) {
  let newCustomer = {
    customerId: generateCustomerId(),
    name: name,
    email: email,
    balance: initialBalance
  }
  return newCustomer
}

function generateCustomerId() {
  return Math.random().toString(10).substr(2,6)
}

let transactions = [
  {
     transactionId: '123456789',
     sourceId: "12345",
     destinationId: "67890",
     amount: 5.0,
     timestamp: "2023-06-01T00:00:00.000Z"
  }
];

function createTransaction(sourceId, destinationId, amount) {
  const transaction = {
    transactionId: generateTransactionId(),
    sourceId,
    destinationId,
    amount: amount,
    timestamp: new Date().toISOString()
  };
  transactions.push(transaction);
  return transaction;
}

function getTransactions(accountId){
  return transactions
}

// Helper function to generate a unique transaction ID
function generateTransactionId() {
  // Generate a random string or use a unique ID generation algorithm
  return Math.random().toString(36).substr(2, 9);
}

function transfer(sourceId, destinationId, amount) {
  sourceAccount = getCustomer(sourceId);
  destinationAccount = getCustomer(destinationId);
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
  return getTransactions()
} 


app.post("/transactions", (req,res) => {
  try {
    const { sourceAccount, destinationAccount, amount } = req.body;
    if(!sourceAccount || !destinationAccount || !amount) {
      throw new Error("Insufficient Parameter")
    }
    transfer(sourceAccount, destinationAccount, amount)
    res.status(201).json({message: "Transaction created successfully"})
  } catch(e) {
    //For example we'll always use code 500 (Internal Server Error)
    res.status(500).json({error: e.message})
  }
});

app.get("/transactions",(req,res)=>{
  res.status(200).json(mutation())
  return
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
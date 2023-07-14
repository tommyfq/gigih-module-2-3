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
  
  module.exports = {
    getAllCustomers,
    getCustomer,
    createCustomer
  }
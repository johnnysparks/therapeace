const MS_PER_DAY = 86400000
const DAYS_PER_MONTH = 30.42

let Calc = {
  wholeCount: (fractionalCount) => {
    // eg 2.5 kids per family = 2 or 3 (each 50 % of the time)
    let count = Math.floor(fractionalCount)
    let fraction = fractionalCount - count
    if (fraction > Math.random()) {
      count += 1
    }
    return count
  },

  make(times, callback){
    return Array.from(new Array(times), callback)
  }
}

class Assumptions {
  constructor(aveOrderPrice, aveOrderMargin, aveOrderCount, aveOrdersPerMonth, annualFixedCost, monthlyGrowthRate){
    // Simulation Parameters
    this.aveOrderPrice = aveOrderPrice
    this.aveOrderMargin = aveOrderMargin
    this.aveOrderCount = aveOrderCount
    this.aveOrdersPerMonth = aveOrdersPerMonth
    this.annualFixedCosts = annualFixedCost
    this.monthlyGrowthRate = monthlyGrowthRate
  }
}

class StoreFront {

  constructor(owner, customerPool, assumptions){
    this.owner = owner
    this.customerPool = customerPool
    this.assumptions = assumptions
  }

  randomOrder(date){
    let o = new Transaction(date, new Product(), this.customerPool.randomCustomer(), this.owner)
    return o
  }

  // Siumulation Helpers
  dailyOrders(date) {
    let dailyOrdersPerCustomer = this.assumptions.aveOrdersPerMonth / DAYS_PER_MONTH

    // add a few new Transactions to the mix based on expected customer behavior
    let numTransactions = Calc.wholeCount( this.customerPool.customers.length * dailyOrdersPerCustomer )
    let transactions = Calc.make(10, () => { return this.randomOrder(date) })
    return transactions
  }
}

class CustomerPool {

  constructor(assumptions){
    this.assumptions = assumptions

    // Stores
    this.customers = []
  }

  randomCustomer(){
    let customers = this.customers
    return customers[Math.floor(customers.length * Math.random())]
  }

  addCustomers(customers){
    this.customers = this.customers.concat(customers)
  }

  // Siumulation Helpers
  dailyNewCustomers(){
    let dailyGrowthRate = this.assumptions.monthlyGrowthRate / DAYS_PER_MONTH

    // add a few new customers to the mix based on daily growth rate
    let newCustomerCount = Calc.wholeCount(this.customers.length * dailyGrowthRate)
    let newCustomers = Array.from(new Array(newCustomerCount), (x,i) => { return new Party() })
    return newCustomers
  }
}

class BusinessSimulation {

  constructor(assumptions){

    // Simulation engine
    this.owner = new Party("Simpathi")
    this.customerPool = new CustomerPool(assumptions)
    this.customerPool.addCustomers(Array.from(new Array(10), () => { return new Party() }))
    this.storeFront = new StoreFront(this.owner, this.customerPool, assumptions)

    // Data stores
    this.transactionHistory = new TransactionHistory()
  }

  // Daily Generators
  simulate(dayCount){
    dayCount = dayCount || 100
    let start = new Date(2016, 1, 1)
    var date = new Date(start.getTime())
    var day = 0;

    for(; day < dayCount; day += 1 ){
      date = new Date(start.getTime() + day * MS_PER_DAY )
      this.simulateDay(date)
    }
    
    return [
        `Total transactions: ${this.transactionHistory.transactions.length}`,
        `Total customers: ${this.customerPool.customers.length}`,
        `Current day: ${date.toLocaleString()}`,
        `Balance: ${this.transactionHistory.balanceFor(this.owner)}`
      ]
  }

  simulateDay(date) {
    // Add new transactions
    this.customerPool.addCustomers(this.customerPool.dailyNewCustomers(date))
    this.transactionHistory.addTransactions(this.storeFront.dailyOrders(date))
  }
}

class TransactionHistory {
  constructor(transactions){
    this.transactions = transactions || []
  }

  addTransactions(transactions){
    this.transactions = this.transactions.concat(transactions)
  }

  balanceFor(party){
    if(!this.transactions.length) { return 0 }

    return this.transactions.reduce((total, curr, idx, list) => {

      let income = curr.payee.equals(party)
      let expense = curr.payer.equals(party)
      total = isNaN(total) ? 0 : total

      if (income) {
        total = total + curr.item.price
      }

      if (expense) {
        total = total - curr.item.price
      }
      return total
    }, 0)
  }

  from(start, end){
    return this.transactions.filter((t) => {
      return start.value < t.date.value && t.date.value < end.value
    })
  }
}

class Product {
  constructor(price, name){
    this.price = price || 100
    this.name = name || "1h Session"
  }
}

class Party {
  constructor(name) {
    this.name = name || `${Math.floor(Math.random() * 1000)}`
  }

  equals(otherParty){
      return this.name == otherParty.name
  }
}

class Event {
  constructor(date){
    this.date = date // Day the event occured on
  }
}

class Transaction extends Event {
  constructor(date, item, payer, payee){
    super(date)
    this.item = item
    this.payer = payer
    this.payee = payee
  }

  getItem(){
    return this.item
  }
}

module.exports = {
  Calc: Calc,
  Event: Event,
  Transaction: Transaction,
  Party: Party,
  Product: Product,
  TransactionHistory: TransactionHistory,
  BusinessSimulation: BusinessSimulation,
  StoreFront: StoreFront,
  Assumptions: Assumptions,
}

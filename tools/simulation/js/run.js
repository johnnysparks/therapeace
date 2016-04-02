
var s = require("./source.js")

// D3 simulation
// let ass = new Assumptions(aveOrderPrice, aveOrderMargin, aveOrderCount, aveOrdersPerMonth, annualFixedCost, monthlyGrowthRate)
let ass = new s.Assumptions(100, 0.15, 13, 3.5, 1000, .15)
let sim = new s.BusinessSimulation(ass)

console.log(sim.simulate(100))

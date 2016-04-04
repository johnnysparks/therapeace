// D3 simulation
// new Assumptions(aveOrderPrice, aveOrderMargin, aveOrderCount, aveOrdersPerMonth, annualFixedCost, monthlyGrowthRate)
// let ass = new Assumptions(100, 0.15, 13, 3.5, 1000, .15)
let ass = new Assumptions(1, 0.15, 1, 1, 1000, 0.15)
let sim = new BusinessSimulation(ass)
sim.simulate(1000)

var balances = (sim.transactionHistory.intervalsOf(10)).map((th)=>{
  return th.balanceFor(sim.owner)
})

// var xAxis = d3.svg.axis().scale(xScale);
// root.append('g')
//     .attr({
//       'class': 'x axis',
//       'transform': 'translate(0,' + (height - xAxisHeight) + ')',
//     })
//     .call(xAxis);
//
// var yAxis = d3.svg.axis().scale(yScale).orient('left');
// root.append('g')
//     .attr({
//       'class': 'y axis',
//       'transform': 'translate(' + yAxisWidth + ',0)',
//     })
//     .call(yAxis);

var color = {
  darkPrimary: "#F2CC24",
  primary: "#F2D44E", // Yellow
  lightPrimary: "#FFE67A",
  lighterPrimary: "#FFE67A",
  white: "#FAF5F5",    // white
  highlight: "#5E4C5A",
}


var svg = d3.selectAll("#graph")
.style("fill", color.white)
.style("stroke", color.darkPrimary)

var points = svg.selectAll("rect")
  .data(balances)

var size = svg[0][0].getBoundingClientRect()
var height = size.height
var width = size.width

var xScale = d3.scale.ordinal()
    .domain(d3.range(0, balances.length))
    .rangeBands([0, width])

var yScale = d3.scale.linear()
    .domain([0, d3.max(balances)])
    .range([0, height]);

points.enter().append("rect")
  .style("fill", color.white)
  .attr({
    y: height,
    height: 0,
    x: function(d,i) { return xScale(i) },
    width: function(d) { return xScale.rangeBand() },
  })
points.exit().remove()

points.transition().duration(1000).ease("elastic")
  .delay(function(d, i){ return i * 20 })
  .attr({
    y: function(d,i) { return height - yScale(d) },
    height: function(d) { return yScale(d) },
  })

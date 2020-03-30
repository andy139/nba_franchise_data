function valuationvsChampionshipsTransitions() {
    let valuationScale = d3
        .scaleSqrt()
        .domain([1.1, 4.5])
        .range([30, 100]);

    // let circleTransition = d3.selectAll("circle").transition();
    // circleTransition
    //     .attr("r", d => 40)
    //     .attr(
    //         "fill",
    //         d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
    //     )
    //     .duration(300);

    // lets regorganize nodes
    // sort nodes
    //Sorting by valuation (labels)
    let sortedTeams = data.sort((a, b) => {
        return b.Valuation - a.Valuation;
    })

    let columnScale = d3.scalePoint()
        .domain(d3.range(0, 18, 1)) // or ["1", "2", "3", "4", "5"]
        .range([30, width - 10])
        .padding(5);

    let rowScale = d3.scalePoint()
        .domain(d3.ticks(1, 5, 40)) // or ["1", "2", "3", "4", "5"]
        .range([30, height - 10])
        .padding(5);

    let xAxis = d3.axisTop(columnScale)(canvas.append("g").attr("transform", "translate(0,30)"));

    let yAxis = d3.axisLeft(rowScale)(canvas.append("g").attr("transform", "translate(30,0)"));


    simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(function (d) {
            return columnScale(d.Championships)
        }))
        .force("y", d3.forceY(function (d) {
            return rowScale(d.Valuation)
        }))
        .force("collide", d3.forceCollide(() => 0))

}
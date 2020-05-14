function championForce(){

    let champScale = d3
        .scaleSqrt()
        .domain([0, 20])
        .range([10, 80]);

    let columnScale = d3.scalePoint()
        .domain(d3.range(0, 18, 1)) // or ["1", "2", "3", "4", "5"]
        .range([30, width - 10])
        .padding(5);

    data.sort((a, b) => {
        return b.Championships - a.Championships;
    })

    console.log(data)


    // let forceX = d3.forceX(function (d) {
    //     return columnScale(d.Championships)
    // }).strength(0.5)

    let forceX = d3.forceX(
        (d) => {

            let index = data.findIndex(x => x.index === d.index)

            paddingLeft = -50
            if (index <= 5 && index >= 1) {
                return paddingLeft + index * 150
            }

            if (index <= 10 && index >= 6) {
                return paddingLeft + index * 150 - (5*150)
            }
            if (index <= 15 && index >= 11) {
                return paddingLeft + index * 150 - (10 * 150)
            }

            if (index <= 20 && index >= 16) {
                return paddingLeft + index * 150 - (15 * 150)
            }

            if (index <= 25 && index >= 21) {
                return paddingLeft + index * 150 - (20 * 150)
            }
            if (index <= 30 && index >= 26) {
                return paddingLeft + index * 150 - (25 * 150)
            }
        
            else {
                return 1000
            }
        }
    )

    let forceY = d3.forceY((d) => {

        let index = data.findIndex(x => x.index === d.index)


        if (index <= 5 && index >= 1) {
            return 100
        }

        if (index <= 10 && index >= 6) {
            return 225
        }
        if (index <= 15 && index >= 11) {
            return 350
        }

        if (index <= 20 && index >= 15) {
            return 475
        }

        if (index <= 25 && index >= 19) {
            return 600
        }
        if (index <= 30 && index >= 25) {
            return 725
        }
        
        // nba logo 

        if (index === 0) {
            return height /2
        }

    })
    

    simulation.force("x", forceX.strength(0.7))
    simulation.force("y", forceY.strength(0.7))
    simulation.force("collide", d3.forceCollide(0)).alpha(0.1).restart()

    let circleTransition = d3.selectAll("circle").transition();
    circleTransition
        .attr("r", d => champScale(d.Championships))
        .attr(
            "fill",
            d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
        )
        .duration(500);
}

$(".champion").click(function () {
    championForce()
});



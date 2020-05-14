function nbaLogo() {

    data.sort((a, b) => {
        return b.Championships - a.Championships;
    })

    console.log(data)

    let forceY = d3.forceY((d) => {

        return height/2

    }).strength(0.5)


    let forceX = d3.forceX( d => {
        if (d.Franchise === 'NBA Team'){
            return width /2 + 350
        } else {
            return 300
        }

    }).strength(0.5)

    let champScale = d3
        .scaleSqrt()
        .domain([0, 17])
        .range([20, 80]);


    simulation.force("x", forceX)
    simulation.force("y", forceY)

    simulation.force("collide", d3.forceCollide((d) => champScale(d.Championships) + 2))
    simulation.force("charge", chargeForce);
    simulation.alphaDecay(.0005)
        .velocityDecay(0.6)
        .alpha(.1).restart();

    // make nodes  continually move
    setInterval(function () { simulation.alpha(0.1); }, 250);



    let circleTransition = d3.selectAll("circle").transition();
    circleTransition
        .attr("r", d => {

            if (d.Franchise === 'NBA Team'){
                return 80
            } else{
                champScale(d.Championships)

            }
        

        })
    
        .attr(
            "fill",
            d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
        )
        .duration(50);

    console.log("champions")

}


d3.select("#nba-logo").on("click", () => nbaLogo());
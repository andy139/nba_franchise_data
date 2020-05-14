function regionForce() {

    data.sort((a, b) => {
        return b.Championships - a.Championships;
    })

    console.log(data)

    let forceY = d3.forceY((d) => {

        return height / 2

    }).strength(1)


    let forceX = d3.forceX(d => {
        if (d.Region === 'west'){
            return 300;
        } 
        
        if (d.Region === 'east'){
            return 900;
        }
        else {
            return -500
        }

    }).strength(1)

    let champScale = d3
        .scaleSqrt()
        .domain([0, 17])
        .range([20, 80]);


    simulation.force("x", forceX)
    simulation.force("y", forceY)
        .force("collide", d3.forceCollide(d => champScale(d.Championships)))
    simulation.force("charge", chargeForce);
    simulation.alpha(.1).restart();

}


function subRegionForce(){

    data.sort((a, b) => {
        return b.Championships - a.Championships;
    })

    console.log(data)

    let forceY = d3.forceY((d) => {
        if (d.Subregion === 'Central'){
            return height / 2
        } 
        
        if (d.Subregion === 'Pacific'){
            return height / 2
        }

        if (d.Subregion === 'Southwest'){
            return 650
        }

        if (d.Subregion === 'Atlantic'){
            return 150
        }

        if (d.Subregion === 'Northwest'){

            return 150
        }

        if (d.Subregion === 'Southeast'){
            return height / 1.5

        }

        else {
            return -500
        }

    }).strength(0.7)


    let forceX = d3.forceX(d => {
        if (d.Subregion === 'Central') {
            return width / 2
        }

        if (d.Subregion === 'Pacific') {
            return 150
        }

        if (d.Subregion === 'Southwest') {
            return 300
        }

        if (d.Subregion === 'Atlantic') {
            return 900
        }

        if (d.Subregion === 'Northwest') {

            return 250
        }

        if (d.Subregion === 'Southeast') {
            return 950

        }

        else{
            return 1500
        }

    }).strength(0.7)

    let champScale = d3
        .scaleSqrt()
        .domain([0, 17])
        .range([20, 80]);

    simulation.force("x", forceX)
    simulation.force("y", forceY)
    simulation.force("collide", d3.forceCollide(d => champScale(d.Championships)))
    simulation.force("charge", chargeForce);
    simulation.alpha(.1).restart();

}

$(".region").click(function () {
    regionForce()
});

$(".subregion").click(function () {
    subRegionForce()
});


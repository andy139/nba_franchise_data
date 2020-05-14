
function winTransitions() {


    let forceX = d3
        .forceX(d => {
            return width / 5;
        })
        .strength(0.05);

    let forceY = d3
        .forceY(d => {
            return height / 2;
        })
        .strength(1);

    simulation
        .force("x", d3.forceX(width / 5).strength(0.05))

    console.log("working")


}



d3.select("#wins").on("click", () => winTransitions());
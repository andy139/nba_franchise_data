// create canvas
let width = 1200;
let height = 800;
let canvas = d3
    .select("#svg-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(0,0)");

let defs = canvas.append("defs");



defs
    .append("pattern")
    .attr("id", "lakers")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "../images/lakers.png");

defs
    .selectAll(".team-pattern")
    .data(data)
    .enter()
    .append("pattern")
    .attr("class", "team-pattern")
    .attr("id", data => data.Franchise.toLowerCase().replace(/ /g, "-"))
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", data => data.image_path + data.path);

//scale based on championships
let champScale = d3
    .scaleSqrt()
    .domain([0, 20])
    .range([20, 80]);

let winScale = d3
    .scaleSqrt()
    .domain([671, 3500])
    .range([10, 80]);

let valuationScale = d3
    .scaleSqrt()
    .domain([1, 4.5])
    .range([10, 80]);

//draw bubbles
let bubbles = canvas
    .selectAll(".teams")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "team")
    .attr("r", d => 40)
    .attr(
    "fill",
        d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
    )
    .style("stroke", "gold")
    .on("click", d => console.log(d));

//create side menu


let createSideMenu = () => {
    console.log(data);
    let i = 0;
  
    $('#sideBar').append("<h1 class = 'header' > NBA Franchises </h1>")
    $('#sideBar').append("<div class = 'checkboxes'></div>")
    $('.checkboxes').append("<span id='championships'>Championships </span>")
    $(".checkboxes").append("<span id='valuation'>Valuation </span>");
    data.forEach( team => {
        team.id = i;
        $('#sideBar').append("<div class = 'team" + team.id + "'>" + team.Franchise + "</div>");
        i++;
    })

    $('#sideBar').append("<h1 class = 'header' > Sort By </h1>")
    $('#sideBar').append("<div class = 'region' > Region </div>")
    $('#sideBar').append("<div class = 'subregion' > Subregion </div>")
    $('#sideBar').append("<div class = 'champion' > Championships </div>")
    $('#sideBar').append("<div class = 'valuation' > Forbes Valuation 2019 </div>")
    $('#sideBar').append("<h1 class = 'reset' > Reset </h1>")

}

createSideMenu()


//simulations
let chargeForce = d3.forceManyBody()

let forceX = d3
    .forceX(d => {
        return width / 2;
    })
    .strength(0.05);

let forceY = d3
    .forceY(d => {

        if (d.Franchise === 'NBA Team') {
            return -500
        } else {
            return height / 2
        }
    })
    .strength(0.05);

let simulation = d3
    .forceSimulation()
    .force("charge", chargeForce)
    .force("x", forceX)
    .force("y", forceY)
    .force("collide", d3.forceCollide( d => 40))



    // Determines how far they will collide with eachohter
// simulation.force("charge", null);

// setInterval(function () { simulation.alpha(0.15); }, 250);

// allows forceCollide to be 0 when transitioning
function forceCollide(d) {
    return countryCenterGrouping() || populationGrouping() ? 0 : circleRadiusScale(d.Population) + 1;
}



let ticked = () => {
    bubbles
    .attr("cx", d => {
        return d.x;
    })
    .attr("cy", d => {
        return d.y;
    });
};

simulation.nodes(data).on("tick", ticked);


function reset(){

    let forceX = d3
        .forceX(d => {
            return width / 2;
        })
        .strength(1);

    let forceY = d3
        .forceY(d => {

            if (d.Franchise === 'NBA Team') {
                return -500
            } else {
                return height / 2
            }
        })
        .strength(1);

    simulation.force("charge", chargeForce)
        .force("x", forceX)
        .force("y", forceY)
        .force("collide", d3.forceCollide(41))
        .alpha(.1).restart();

    let circleTransition = d3.selectAll("circle").transition();
    circleTransition
        .attr("r", d => 40)
        .attr(
            "fill",
            d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
        )
        .duration(500);

}


function resetMiddle(){

   simulation
     .force("x", forceX.strength(1))
     .force("y", forceY.strength(1));

}

$(".reset").click(function () {
    reset()
});




$("#championships").click(function() {

    resetMiddle();
      simulation
        .force(
          "collide",
          d3.forceCollide(d => champScale(d.Championships))
        )
        .alpha(0.1)
        .restart();

      let circleTransition = d3.selectAll("circle").transition();
      circleTransition
        .attr("r", d => champScale(d.Championships))
        .attr(
          "fill",
          d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
        )
        .duration(500);
});


$("#valuation").click(function() {
    resetMiddle();
  simulation
    .force(
      "collide",
      d3.forceCollide(d => valuationScale(d.Valuation))
    )
    .alpha(0.1)
    .restart();

  let circleTransition = d3.selectAll("circle").transition();
  circleTransition
    .attr("r", d => valuationScale(d.Valuation))
    .attr(
      "fill",
      d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
    )
    .duration(500);
});


$("#wins").click(function() {


      simulation
        .force(
          "collide",
          d3.forceCollide(d => winScale(d.W))
        )
        .force("x", d3.forceX( d => {
            if (d.Franchise === "NBA Team") {
              return -500;
            } else {
              return width / 2;
            }
        }).strength(1))
        .force("y", d3.forceY(height / 2).strength(1))
        .alpha(0.1)
        .restart();



      let circleTransition = d3.selectAll("circle").transition();
      circleTransition
        .attr("r", d => winScale(d.W))
        .attr(
          "fill",
          d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
        )
        .duration(500);
});




// $("input[id=wins]").change(function() {
//   if (this.checked) {

//      simulation
//        .force(
//          "collide",
//          d3.forceCollide(d => winScale(d.W))
//        )
//        .alpha(0.1)
//        .restart();

//      let circleTransition = d3.selectAll("circle").transition();
//      circleTransition
//        .attr("r", d => winScale(d.W))
//        .attr(
//          "fill",
//          d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
//        )
//        .duration(500);
//   }
// });

$("input[id=valuation]").change(function() {
  if (this.checked) {

    
  }
});







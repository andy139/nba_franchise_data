let data2 = require("./playerData");

let data = data2.slice(0,600);
console.log(data);

export const playersChart = () => {


    let strength = 0.05;

    let width = 1000;
    let height = 1000;
    let canvas = d3
      .select("#svg-container")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 1200 600`)
   
      // .attr("width", width)
      // .attr("height",height)
    //   .attr("transform", "translate(0,0)");


    function createNodes(data){

        const newNodes = data.map( d=> ({
            ...d,
            x: Math.random()*width,
            y: Math.random()*height,


        }))

        return newNodes
    }

    let nodes = createNodes(data);
    console.log(nodes)


    let pointScale = d3
        .scaleLinear()
        .domain([2000, 30000])
        .range([1, 30]);


      //draw bubbles
    let bubbles = canvas
      .selectAll(".player")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "player")
      .attr("r", (d) => pointScale(d.PTS))
      .attr(
        "fill",
        (d) => "url(#" + d.PLAYER_NAME.toLowerCase().replace(/ /g, "-") + ")"
      )
      .style("fill", (d) => "#C9082A")
      .style("opacity", 0.5)
      .on("click", d => console.log(d));


    
    //scale based on points



    let chargeForce = d3.forceManyBody();
    let forceX = d3
        .forceX((d) => {
        return width / 2;
        })
        .strength(0.15);

    let forceY = d3
        .forceY((d) => {
        return height / 2;
        
        })
        .strength(0.15);

    let simulation = d3
        .forceSimulation()
        .force("charge", chargeForce)
        .force("x", forceX)
        .force("y", forceY)
        .force(
        "collide",
        d3.forceCollide((d) => pointScale(d.PTS))
        );



        let ticked = () => {
        bubbles
            .attr("cx", (d) => {
            return d.x;
            })
            .attr("cy", (d) => {
            return d.y;
            });
        };

        simulation.nodes(nodes).on("tick", ticked);





}



    
d3.csv(
    "https://gist.githubusercontent.com/andy139/3b0cf40b26f8a5bc088630a62a051e78/raw/46e0a824199b71cf18300aaa76fb7ce2f57a28de/nba_data.csv").then(data => {
    console.log(data);

    // create canvas
    let width = 1000;
    let height = 600;
    let canvas = d3
        .select("#svg-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(0,0)");
    
    let defs = canvas.append("defs");

    defs.append("pattern")
        .attr("id", "lakers")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", "../images/lakers.png")

    defs
      .selectAll(".team-pattern")
      .data(data)
      .enter()
      .append("pattern")
      .attr("class", "team-pattern")
      .attr("id", data => data.Franchise.toLowerCase().replace(/ /g,"-"))
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", "../images/lakers.png");
      //.attr("xlink:href", data => data.image_path);

        


    //scale based on championships
    let champScale = d3
        .scaleSqrt()
        .domain([0, 20])
        .range([10, 80]);

    //draw bubbles
    let bubbles = canvas
      .selectAll(".teams")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "team")
      .attr("r", d => champScale(d.Championships))

      .attr(
        "fill",
        d => "url(#" + d.Franchise.toLowerCase().replace(/ /g, "-") + ")"
      )
      .attr("cx", 100)
      .attr("cy", 100)
      .on("click", d => console.log(d));

    //simulations
    let forceX = d3.forceX(d => {
            return width / 2
        }).strength(0.05)

    let simulation = d3
        .forceSimulation()
        .force("x", forceX)
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        // Determines how far they will collide with eachohter
        .force("collide", d3.forceCollide(
            () => 80
        ));

    // ticked of clock, where should nodes be
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
});



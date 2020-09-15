
function Candles(props){
    if (props.loading || props.xAxis == null || props.yAxis == null) return null;
    console.log("CData",props.data);
    console.log("xAxis", props.xAxis);
    const g = props.canvas.append("g")
        .attr("stroke-linecap", "round")
        .attr("stroke", "black")
        .selectAll("g")
        .data(props.data)
        .join("g")
        .attr("transform", d => `translate(${props.xAxis(d.at)}, 0)`);

    g.append("line")
        .attr("y1", d => props.yAxis(d.low))
        .attr("y2", d => props.yAxis(d.high))
        .attr("stroke", d=> d.open <= d.close?"green":"red");

    g.append("line")
        .attr("y1", d => props.yAxis(d.open))
        .attr("y2", d => props.yAxis(d.close))
        .attr("stroke-width", 4)
        .attr("stroke", d=> d.open <= d.close?"green":"red");
    return null;
}

export default Candles;

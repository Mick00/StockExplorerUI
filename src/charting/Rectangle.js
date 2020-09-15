import useNiceCorners from "./hooks/useNiceCorners";

function Rectangle(props){
    const {pos1, pos2} = useNiceCorners(props.xAxis, props.yAxis, props.pos1, props.pos2);

    props.canvas.append("g")
        .attr("transform",`translate(${pos1.x},${pos1.y})`)
        .append("rect")
        .attr("fill", props.fill??"transparent")
        .attr("stroke", props.stroke??"black")
        .attr("height", pos2.y - pos1.y)
        .attr("width", pos2.x - pos1.x);
    return null;
}
export default Rectangle;

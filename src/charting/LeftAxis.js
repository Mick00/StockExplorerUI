import * as d3 from 'd3';

function LeftAxis(props){
    const axis = props.yAxis;
    if (axis == null) return null;
    props.canvas.append("g").call(g=>{
        g.attr("transform", `translate(${props.margin.left},0)`)
            .call(d3.axisLeft(axis)
                .tickFormat(props.tickFormat)
                .tickValues(props.tickValues(axis)))
            .call(g => g.selectAll(".tick line").clone()
                .attr("stroke-opacity", 0.2)
                .attr("x2", props.width - props.margin.right))
            .call(g => g.select(".domain").remove())
    })
    return null;
}

export default LeftAxis;

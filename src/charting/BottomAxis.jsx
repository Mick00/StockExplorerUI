import * as d3 from 'd3';

function BottomAxis(props){
    const axis = props.xAxis;
    if (axis == null) return null;
    props.canvas.append("g").call(g =>
        g.attr("transform", `translate(0,${props.height-props.margin.bottom})`)
            .call(d3.axisBottom(axis)
                .tickValues(props.tickValues(axis))
                .tickFormat(props.tickFormat)))
        .call(g => g.select(".domain").remove());
    return null;
}

export default BottomAxis;

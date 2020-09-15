import React, {useEffect, useState} from "react";
import * as d3 from 'd3';

const margin = {
    top: 30,
    bottom: 30,
    left: 40,
    right: 10,
}

function Chart(properties){
    const chartRef = React.createRef();
    const [canvas, setCanvas] = useState(null);
    if (properties.yAxis != null){
        properties.yAxis.range([properties.height - margin.bottom, margin.top]);
    }
    if (properties.xAxis != null){
        properties.xAxis.range([margin.left, properties.width - margin.right]);
    }
    useEffect(()=>{
        d3.select(chartRef.current).selectAll("*").remove();
        const svg = d3.select(chartRef.current).append("svg");
        svg.attr("viewBox", [0, 0, properties.width, properties.height]).style("border", "1px solid black");
        setCanvas(svg);
    },[]);


    function shareCanvasToChildren(){
        return React.Children.map(properties.children, child => {
            return React.cloneElement(child, {
                canvas: canvas,
                margin: margin,
                height: properties.height,
                width: properties.width,
                loading: properties.loading,
                xAxis: properties.xAxis,
                yAxis: properties.yAxis,
            });
        })
    }
    return (<div ref={chartRef}>{shareCanvasToChildren()}</div>)
}

export default Chart;

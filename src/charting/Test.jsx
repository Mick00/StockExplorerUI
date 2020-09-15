import React,{useEffect, useState} from "react";
import * as d3 from 'd3';
import client from '../api/client';
import {gql, useQuery} from '@apollo/client';
import useYAxis from "./LeftAxis";


function TestChart(properties){
    const chartRef = React.createRef();
    let [data, setData] = useState([]);

    useEffect(() => {
        client.query({
            query: gql`
                query stock{
                    stock(symbol: "SPY") {
                        priceHistory {
                            open
                            high
                            low
                            close
                            at
                        }
                    }
                }`
        }).then(result => {
            const dateParser = d3.utcParse("%Y-%m-%dT%H:%M:%S.%L%Z")
            return result.data[0].stock.priceHistory.map(dataPoint => {
                const dateTime = dataPoint.at+":00.000-0400";
                dataPoint.at = dateParser(dateTime);
                return dataPoint;
            });
        }).then(result => setData(result.slice(-120)));

    },[]);

    useEffect(()=>{
        const margin = {
            top: 30,
            bottom: 30,
            left: 40,
            right: 10,
        }
        if (data.length === 0){
            return;
        }
        const height = 500, width = 1000;
        d3.select(chartRef.current).selectAll("*").remove();
        const svg = d3.select(chartRef.current).append("svg");
        svg.attr("viewBox", [0, 0, width, height]).style("border", "1px solid black");
/*
* d3.utcDay
                .range(data[0].at, +data[data.length - 1].at + 1)
                .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6)*/
        console.log(d3.utcDay);
        const x = d3.scaleBand()
            .domain(data.map(d=>d.at))
            .range([margin.left, width - margin.right])


        const y = d3.scaleLinear()
            .domain([d3.min(data, d=>d.low), d3.max(data, d=>d.high)])
            .range([height - margin.bottom, margin.top]);

        /*
        *               d3.utcMonday
                        .every(2)
                        .range(data[0].at, data[data.length - 1].at)*/
        svg.append("g").call(g =>
                g.attr("transform", `translate(0,${height-margin.bottom})`)
                .call(d3.axisBottom(x)
                    .tickValues(data.map(d=>d.at).filter((d,i) => i%7 === 0))
                    .tickFormat(d3.utcFormat("%-m/%-d/%-Y"))))
            .call(g => g.select(".domain").remove())

        svg.append("g").call(g=>{
                g.attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y)
                    .tickFormat(d3.format("$~f"))
                    .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
                .call(g => g.selectAll(".tick line").clone()
                    .attr("stroke-opacity", 0.2)
                    .attr("x2", width - margin.right))
                .call(g => g.select(".domain").remove())
        })
        const mondays = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
            .selectAll("g")
            .data(data.map(d=>d.at).filter(d=>d.getDay()===1))
            .join("g")
            .attr("transform", d => {
                return `translate(${x(d)},0)`;
            });
        mondays.append("line")
            .attr("y1", margin.top)
            .attr("y2", height-margin.bottom)
            .attr("stroke", "yellow")

        const g = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", d => {
                return `translate(${x(d.at)},0)`;
            });

        g.append("line")
            .attr("y1", d => y(d.low))
            .attr("y2", d => y(d.high))
            .attr("stroke", d=> d.open <= d.close?"green":"red")
        ;

        g.append("line")
            .attr("y1", d => y(d.open))
            .attr("y2", d => y(d.close))
            .attr("stroke-width", 4)
            .attr("stroke", d=> d.open <= d.close?"green":"red");
    },[data])

    return (<div ref={chartRef}></div>)
}

export default TestChart;

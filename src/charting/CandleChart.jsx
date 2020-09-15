import React, {useEffect, useState} from "react";
import Chart from "./Chart";
import LeftAxis from "./LeftAxis";
import BottomAxis from "./BottomAxis";
import Candles from "./Candles";
import Rectangle from "./Rectangle";
import * as d3 from "d3";
import {gql, useQuery} from "@apollo/client";

const QUERY = gql`
query stock($symbol: String!){
    stock(symbol: $symbol) {
        symbol
        priceHistory {
            open
            high
            low
            close
            at
        }
        trendHistory {
            type
            ATH
            ATL
            start
            end
        }
    }
}`

function CandleChart(properties){

    const { loading, error, data } = useQuery(QUERY,
        {variables:{symbol:"SPY"}});
    let [priceHistory, setPriceHistory] = useState([]);
    let [simpleSequences, setSimpleSequences] = useState([])
    let [xAxis, setXAxis] = useState(null);
    let [lAxis, setlAxis] = useState(null);

    useEffect(()=>{
        if (loading) return;
        const dateParser = d3.utcParse("%Y-%m-%dT%H:%M:%S.%L%Z");
        const pHist = data.stock.priceHistory.map(dataPoint => {
            const dateTime = dataPoint.at+":00.000-0400";
            return {...dataPoint, at: dateParser(dateTime)};
        })
        setPriceHistory(pHist);
        if (pHist.length === 0) return;
        const x = d3.scaleBand()
            .domain(pHist.map(d=>d.at));
        setXAxis(()=>x);

        const y = d3.scaleLinear()
            .domain([d3.min(pHist, d=>d.low), d3.max(pHist, d=>d.high)]);
        setlAxis(()=>y);

        const highligth = data.stock.trendHistory.map(h=>{return{
            pos1: {x: dateParser(h.start+":00.000-0400"), y: h.ATH},
            pos2: {x: dateParser(h.end+":00.000-0400"), y: h.ATL}
        }});
        setSimpleSequences(highligth);
    },[data]);

    if (error) return (<p>{`${error}`}</p>);
    return (
        <Chart height={500} width={1000} loading={loading} xAxis={xAxis} yAxis={lAxis}>
            <LeftAxis tickFormat={d3.format("$~f")} tickValues={(axis) => d3.scaleLinear().domain(axis.domain()).ticks()}/>
            <BottomAxis tickFormat={d3.utcFormat("%-m/%-d/%-Y")} tickValues={()=>priceHistory.map(d=>d.at).filter((d,i) => i%7 === 0)}/>
            {simpleSequences.map((r,i)=><Rectangle key={i} pos1={r.pos1} pos2={r.pos2}/>)}
            <Candles data={priceHistory}/>
        </Chart>
    );
}

export default CandleChart;

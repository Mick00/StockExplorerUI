import React from 'react';
import {gql, useQuery} from "@apollo/client";

const query = gql`
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
    }`;

function TestQuery(props){
    const { loading, error, data } = useQuery(gql`
    query stock{
        stock(symbol: "SPY") {
            symbol
            type
        }
    }`);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (!data) return <p>Not found</p>;
    console.log(data);
    return (<p>
        {data.stock.symbol}
    </p>)
}

export default TestQuery;

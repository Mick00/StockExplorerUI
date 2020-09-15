import {gql} from "@apollo/client";

export const QUERY_STOCK_BY_SYMBOL = gql`
    query stock($symbol: String!){
        stock(symbol: $symbol) {
            priceHistory {
                open
                high
                low
                close
                at
            }
        }
    }`

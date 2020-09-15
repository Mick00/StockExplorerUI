import React from 'react';
import './App.css';
import {ApolloProvider} from "@apollo/client";
import CandleChart from './charting/CandleChart';
import client from './api/client';

function App() {
  return (
      <ApolloProvider client={client}>
          <div className="App">
              <CandleChart/>
          </div>
      </ApolloProvider>
  );
}

export default App;

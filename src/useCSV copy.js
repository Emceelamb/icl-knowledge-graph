import React, { useState, useEffect } from "react";
import { csv } from "d3";

export const useCSV = (dataURL) => {

  const [data, setData] = useState(null);

  const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  };

  const graph_data = (data) => {
    return data.map((datum) => {
      let source = datum.SYMBOL;
      delete datum["SYMBOL"];

      let row = [];
      for (const [key, value] of Object.entries(datum)) {
        let entry = {
          "source": source,
          "target": key,
          "value": +value,
        };
        row.push(entry);
      }
      return row;
    });
  };

  useEffect(()=>{    
    const parsedCSV = async() => {
      const data = await csv(dataURL)
      const graphData = await graph_data(data);
      const flat_data = await flatten(graphData);
      setData(flat_data)
    }

    parsedCSV()

  }, [])
  return data;
};

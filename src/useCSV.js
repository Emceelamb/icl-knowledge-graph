import React, { useState, useEffect } from "react";
import { csv, format } from "d3";

export const useCSV = (dataURL) => {

  const [data, setData] = useState(null);

  const formattedData = { nodes: [], links: [] };

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
    const formattedData = { nodes: [], links: [] };

    const parsedCSV = async() => {
      const data = await csv(dataURL)
      const graphData = await graph_data(data);
      const flat_data = await flatten(graphData);

      const uniqueParent = [...new Set(flat_data.map((item) => item["source"]))];
      uniqueParent.map((node) => formattedData.nodes.push({ id: node }));

      const uniqueChild = [...new Set(flat_data.map((item) => item["target"]))];
      uniqueChild.map((node) => {
        // console.log(formattedData.nodes.filter(e=>e.id===node), "nodes");
        if (formattedData.nodes.filter((e) => e.id === node).length === 0) {
          formattedData.nodes.push({ id: node });
        }
      });
      //links: [{"source": 3, "target": 2, "value": "aux"}, ...]
      // console.log(formattedData.nodes.filter((d) => d.id == "automobiles"));

      flat_data.map((item) => {
        // const source = formattedData["nodes"].findIndex(
        //   (obj) => obj.value === item["parent_node"]
        // );
        // const target = formattedData["nodes"].findIndex(
        //   (obj) => obj.value === item["child_node"]
        // );
        // formattedData["links"].push({source: source, target: target, value: item["score"]})
        formattedData["links"].push({
          source: item["source"],
          target: item["target"],
          value: item["value"],
        });
      });

      setData(formattedData)
    }

    parsedCSV()

  }, [])
  return data;
};

import React, { useState, useEffect } from "react";
import { json } from "d3";

export const useData = (NUM) => {
  const [data, setData] = useState(null);

  const jsonUrl = [
    "https://gist.githubusercontent.com",
    "Emceelamb",
    "565435c5930849fa9ad1b75571ac5d07",
    "raw",
    "b2904e1d8019318a8fa494261460574731a42b27", // commit string
    `gme_correlation_${NUM}.json`,
  ].join("/");

  useEffect(() => {
    const formattedData = { nodes: [], links: [] };
    json(jsonUrl)
      .then((d) => {
        const uniqueParent = [...new Set(d.map((item) => item["parent_node"]))];
        uniqueParent.map((node) => formattedData.nodes.push({ id: node }));

        const uniqueChild = [...new Set(d.map((item) => item["child_node"]))];
        uniqueChild.map((node) => {
          // console.log(formattedData.nodes.filter(e=>e.id===node), "nodes");
          if (formattedData.nodes.filter((e) => e.id === node).length === 0) {
            formattedData.nodes.push({ id: node });
          }
        });
        //links: [{"source": 3, "target": 2, "value": "aux"}, ...]
        // console.log(formattedData.nodes.filter((d) => d.id == "automobiles"));

        d.map((item) => {
          const source = formattedData["nodes"].findIndex(
            (obj) => obj.value === item["parent_node"]
          );
          const target = formattedData["nodes"].findIndex(
            (obj) => obj.value === item["child_node"]
          );
          // formattedData["links"].push({source: source, target: target, value: item["score"]})
          formattedData["links"].push({
            source: item["parent_node"],
            target: item["child_node"],
            value: item["score"],
          });
        });
        console.log(formattedData);
        return formattedData;
      })
      .then(setData);
  }, []);

  return data;
};

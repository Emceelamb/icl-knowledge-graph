import { ForceGraph2D } from "react-force-graph";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { scaleLinear } from "d3";

import { useData } from "./useData";

export const Twodeetest = () => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [dataLoad, setDataLoad] = useState(false);
  const [datasetID, setDatasetID] = useState(2);

  const forceGraph = useRef(null);

  const myScale = scaleLinear().domain([1, 10]).range([0, 3]);
  const colorScale = scaleLinear().domain([1, 10]).range(["#eff2f2", "red"]);

  const fetchData = async (id) => {
    const formattedData = { nodes: [], links: [] };
    const jsonUrl = [
      "https://gist.githubusercontent.com",
      "Emceelamb",
      "565435c5930849fa9ad1b75571ac5d07",
      "raw",
      "b2904e1d8019318a8fa494261460574731a42b27", // commit string
      `gme_correlation_${id}.json`,
    ].join("/");

    const res = await fetch(jsonUrl);
    const jsonData = await res.json();
    const uniqueParent = [
      ...new Set(jsonData.map((item) => item["parent_node"])),
    ];
    uniqueParent.map((node) => formattedData.nodes.push({ id: node }));

    const uniqueChild = [
      ...new Set(jsonData.map((item) => item["child_node"])),
    ];
    uniqueChild.map((node) => {
      // console.log(formattedData.nodes.filter(e=>e.id===node), "nodes");
      if (formattedData.nodes.filter((e) => e.id === node).length === 0) {
        formattedData.nodes.push({ id: node });
      }
    });
    //links: [{"source": 3, "target": 2, "value": "aux"}, ...]
    // console.log(formattedData.nodes.filter((d) => d.id == "automobiles"));

    jsonData.map((item) => {
      // const source = formattedData["nodes"].findIndex(
      //   (obj) => obj.value === item["parent_node"]
      // );
      // const target = formattedData["nodes"].findIndex(
      //   (obj) => obj.value === item["child_node"]
      // );
      // formattedData["links"].push({source: source, target: target, value: item["score"]})
      formattedData["links"].push({
        source: item["parent_node"],
        target: item["child_node"],
        value: item["score"],
      });
    });
    console.log(formattedData);
    setData(formattedData);
  };

  const getData = async (id, prevData) => {
    const jsonUrl = [
      "https://gist.githubusercontent.com",
      "Emceelamb",
      "565435c5930849fa9ad1b75571ac5d07",
      "raw",
      "b2904e1d8019318a8fa494261460574731a42b27", // commit string
      `gme_correlation_1.json`,
    ].join("/");

    let formattedData = prevData;
    console.log(formattedData, "previous");
    const res = await fetch(jsonUrl);
    const jsonData = await res.json();

    /* GET UNIQUE NODES */
    const uniqueParent = [
      ...new Set(jsonData.map((item) => item["parent_node"])),
    ];
    uniqueParent.map((node) => {
      if (formattedData["nodes"].some((n) => n["id"] === node)) {
      } else {
        formattedData["nodes"].push({ id: node });
      }
    });

    const uniqueChild = [
      ...new Set(jsonData.map((item) => item["child_node"])),
    ];
    uniqueChild.map((node) => {
      if (formattedData["nodes"].some((n) => n["id"] === node)) {
      } else {
        formattedData["nodes"].push({ id: node });
      }
    });

    /*************
      Get links
    *************/

    // jsonData.map((fetchedNode) => {
    //   const source = formattedData["nodes"].findIndex(
    //     (existingNode) => existingNode.value === fetchedNode["parent_node"]
    //   );
    //   console.log(source);
    // });

    jsonData.map((node) => {
      if (
        formattedData["links"].some(
          (n) =>
            n["source"] === node["parent_node"] &&
            n["target"] === node["child_node"]
        )
      ) {
        console.log("li.nk eits");
      } else {
        formattedData["links"].push({
          source: node["parent_node"],
          target: node["child_node"],
          value: node["score"],
        });
        // console.log(
        //   {
        //     source: node["parent_node"],
        //     target: node["child_node"],
        //     value: node["score"],
        //   },
        //   "link does notexists"
        // );
      }
    });

    console.log(formattedData, "formatted data");
    // setData(formattedData);
  };

  useEffect(() => {
    if (data["nodes"].length < 1) {
      console.log("not loaded");
      return <>Loading</>;
    }
    forceGraph.current.d3Force("charge").strength(-500);
  });

  let updateNo = 1;

  useEffect(() => {
    console.log(data, "data refresh");
  }, [data]);

  useEffect(() => {
    // getData(updateNo, data);
    // fetchData(2);
    const timer = setInterval(() => {
      fetchData(updateNo);
      updateNo > 8 ? (updateNo = 1) : updateNo++;
      setDataLoad(true);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // const demoData = useData(x);
  // setData(demoData);
  return (
    <div>
      {data ? (
        <ForceGraph2D
          graphData={data}
          nodeLabel={(d) => {
            console.log(d, d.id);
            return d.id;
          }}
          linkLabel={(d) => `Correlation value: ${d.value}`}
          // linkCurvature={0.1}
          nodeColor={(d) => (d.id[0] === "$" ? "#19686b" : "yellow")}
          linkWidth={(d) => myScale(d.value)}
          // linkCurveRotation={1}
          linkOpacity={0.5}
          // linkColor={(d) => colorScale(d.value)}
          // forceEngine={'graph'}
          ref={forceGraph}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
        />
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

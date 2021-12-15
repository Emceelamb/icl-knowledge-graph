import { ForceGraph2D } from "react-force-graph";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { scaleLinear } from "d3";

import { useData } from "./useData";

export const TwodeePolling = () => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [dataLoad, setDataLoad] = useState(false);
  const [datasetID, setDatasetID] = useState(2);

  const forceGraph = useRef(null);

  const myScale = scaleLinear().domain([1, 10]).range([0, 3]);
  const colorScale = scaleLinear().domain([1, 10]).range(["#eff2f2", "red"]);

  const getUniqueNodes = (nodeList) => {
    let parents = [...new Set(nodeList.map((node) => node["parent_node"]))];
    let children = [...new Set(nodeList.map((node) => node["child_node"]))];
    let concattedArray = parents.concat(children);
    let unique = [...new Set(concattedArray)];
    return unique.map((nd) => {
      return { id: nd };
    });
  };

  const filterById = (a, b) => {
    let res = [];
    res = a.filter((el) => {
      return !b.find((element) => {
        return element.id === el.id;
      });
    });
    return res;
  };

  const getLinks = (nodeList) => {
    return nodeList.map((nd) => {
      return {
        source: nd["parent_node"],
        target: nd["child_node"],
        value: nd["score"],
      };
    });
  };

  const fetchData = async (dataId, prevData) => {
    console.log("fetch data", dataId);
    const jsonUrl = [
      "https://gist.githubusercontent.com",
      "Emceelamb",
      "565435c5930849fa9ad1b75571ac5d07",
      "raw",
      "b2904e1d8019318a8fa494261460574731a42b27", // commit string
      `gme_correlation_${dataId}.json`,
    ].join("/");

    const res = await fetch(jsonUrl);
    const jsonData = await res.json();

    const new_nodes = getUniqueNodes(jsonData);

    const new_links = getLinks(jsonData);
    console.log(data);
    setData(({ nodes, links }) => {
      const filteredNodes = filterById(new_nodes, [...nodes]);
      return {
        nodes: [...nodes, ...filteredNodes],
        links: [...links, ...new_links],
      };
    });
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
    fetchData(updateNo);
    const timer = setInterval(() => {
      if (updateNo > 6) {
        clearInterval(timer);
      }
      fetchData(updateNo);
      updateNo > 8 ? (updateNo = 1) : updateNo++;
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

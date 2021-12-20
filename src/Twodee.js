import { ForceGraph2D } from "react-force-graph";

import { useRef, useState,  useEffect } from "react";
import { scaleLinear } from "d3";

// import { useData } from "./useData";
import { useCSV } from "./useCSV";

const csvURL = [
  'https://gist.githubusercontent.com',
  'Emceelamb',
  '184a627df887fc945d202c69333cb133',
  'raw',
  '016259ba32443fd673e01693b30f3f91920aed7c',
  //'transformers_2021-11-09.csv'   // AAPL STOCKS
  'correlation_bert_2021-10-13_10_59_32.csv'  // BERT
].join('/')

export const Twodee = () => {
  const data = useCSV(csvURL);
  // const data = useData(csvData);
  
  // const data = useData(csvData);
  //const [data, setData] = useState(null);
  const forceGraph = useRef(null);

  const myScale = scaleLinear().domain([1, 10]).range([0, 3]);
  const colorScale = scaleLinear().domain([1, 10]).range(["#eff2f2", "red"]);

  useEffect(() => {
    if (!data) {
      return <>Loading</>;
    }
    forceGraph.current.d3Force("charge").strength(-500);
  });

  // const demoData = useData(x);
  // setData(demoData);
  return (
    <div>
      {data ? (
        <ForceGraph2D
          graphData={data}
          nodeLabel={(d) => d.id}
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
        <>Loading</>
      )}
    </div>
  );
};

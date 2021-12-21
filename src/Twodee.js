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
  // 'transformers_2021-11-09.csv'   // AAPL STOCKS
  'correlation_bert_2021-10-13_10_59_32.csv'  // BERT
].join('/')

export const Twodee = () => {
  const data = useCSV(csvURL);
  // const data = useData(csvData);
  
  // const data = useData(csvData);
  //const [data, setData] = useState(null);
  const forceGraph = useRef(null);

  const myScale = scaleLinear().domain([0, 1]).range([0, 20]);
  const colorScale = scaleLinear().domain([1, 10]).range(["#eff2f2", "red"]);

  const linkDistScale = scaleLinear().domain([1,0]).range([0, 1000]);
  const linkStrengthScale = scaleLinear().domain([0,1]).range([0, 1]);

  useEffect(() => {
    if (!data) {
      return <>Loading</>;
    }
    forceGraph.current.d3Force("charge").strength(-500);
    forceGraph.current.d3Force("link")
      .distance(link =>{return linkDistScale(link.value)})
      .strength(link =>{console.log(link.value, linkStrengthScale(link.value)); return linkStrengthScale(link.value)})
  });

  // const demoData = useData(x);
  // setData(demoData);
  return (
    <div>
      <div>
        <p>Dataset: <a href="https://gist.githubusercontent.com/Emceelamb/184a627df887fc945d202c69333cb133/raw/016259ba32443fd673e01693b30f3f91920aed7c/correlation_bert_2021-10-13_10_59_32.csv">BERT</a></p>
      </div>
      {data ? (
        <ForceGraph2D
          ref={forceGraph}
          graphData={data}
          nodeLabel={(d) => d.id}
          linkLabel={(d) =>{ console.log(d) ;return `${d.source.id} > ${d.target.id} <br>Correlation value: ${d.value}`}}
          // linkCurvature={0.1}
          nodeColor={(d) => (d.id[0] === "$" ? "#19686b" : "yellow")}
          linkWidth={(d) => { return myScale(d.value)}}
          // linkCurveRotation={1}
          linkOpacity={0.8}
          // linkColor={(d) => colorScale(d.value)}
          // forceEngine={'graph'}

          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 16/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth= ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n=> n> fontSize * 0.2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] /2, ...bckgDimensions);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = "black";
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions;
          }}

          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] /2, ...bckgDimensions)
          }}



        />
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

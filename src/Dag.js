import { ForceGraph3D, ForceGraph2D } from "react-force-graph";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { scaleLinear } from "d3";
import { useData } from "./useData";
import SpriteText from 'three-spritetext';

export const Dag = () => {
  const data = useData(9);

  const forceGraph = useRef(null);

  const myScale = scaleLinear().domain([1, 10]).range([0, 3]);
  const colorScale = scaleLinear().domain([1, 10]).range(["#eff2f2", "red"]);

  useEffect(() => {
    console.log(data);
    if (!data) {
      return <>Loading</>;
    }
    forceGraph.current.d3Force("charge").strength(-500);
  });
  return (
    <div>
      {data ? (
        <ForceGraph2D
          graphData={data}
          nodeLabel={(d) => d.id}
          dagMode="td"
          linkLabel={(d) => `Correlation value: ${d.value}`}
          // linkCurvature={0.1}
          // nodeColor={(d) => (d.id[0] === "$" ? "#19686b" : "yellow")}
          linkWidth={(d) => myScale(d.value)}
          // linkCurveRotation={1}
          linkOpacity={0.5}
          // linkColor={(d) => colorScale(d.value)}
          // forceEngine={'graph'}
          ref={forceGraph}

         
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth= ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n=> n + fontSize * 0.2);

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

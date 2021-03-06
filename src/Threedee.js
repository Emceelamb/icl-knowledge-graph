import { ForceGraph3D, ForceGraph2D } from "react-force-graph";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { scaleLinear } from "d3";
import { useData } from "./useData";
import SpriteText from 'three-spritetext';

export const Threedee = () => {
  const data = useData(3);

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
        <ForceGraph3D
          graphData={data}
          nodeLabel={(d) => d.id}
          linkLabel={(d) => `Correlation value: ${d.value}`}
          // linkCurvature={0.1}
          // nodeColor={(d) => (d.id[0] === "$" ? "#19686b" : "yellow")}
          linkWidth={(d) => myScale(d.value)}
          // linkCurveRotation={1}
          linkOpacity={0.5}
          // linkColor={(d) => colorScale(d.value)}
          // forceEngine={'graph'}
          ref={forceGraph}

          nodeThreeObject={node => {
            const sprite = new SpriteText(node.id);
            sprite.color = "white";
            sprite.textHeight = 8;
            return sprite;
          }}
       
        />
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

import { useState, useEffect, useRef } from "react";
import { useCSV } from "./useCSV";
import { ForceGraph2D } from "react-force-graph";
import { scaleLinear, select } from 'd3';

export const TwoNodeD3 = () => {
  const forceGraph = useRef(null);

  const [source, setSource] = useState(null);
  const [targ, setTarget] = useState(null);
  const [sourceList, setSourceList] = useState(null);
  const [targList, setTargList] = useState(null);

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const [corScore, setCorScore] = useState(null);


  const dataURL = [
    "https://gist.githubusercontent.com",
    "Emceelamb",
    "184a627df887fc945d202c69333cb133",
    "raw",
    "016259ba32443fd673e01693b30f3f91920aed7c",
    //'transformers_2021-11-09.csv'   // AAPL STOCKS
    "correlation_bert_2021-10-13_10_59_32.csv", // BERT
  ].join("/");

  const data = useCSV(dataURL);

  useEffect(() => {
    if (!data) {
      return <>Loading...</>;
    }
    console.log(data)
    setSourceList(data.nodes.filter(n => n["id"].includes('stock')));
    setTargList(data.nodes.filter(n => !n["id"].includes('stock')));
  });

  const handleSourceSelect = (e) => {
    setSource(e.target.value);
  }

  const handleTargSelect = (e) => {
    setTarget(e.target.value);
  }

  const linkDistScale = scaleLinear().domain([1,0]).range([0, 100]);
  const linkStrengthScale = scaleLinear().domain([0,1]).range([0, 1]);

  useEffect(()=>{

    if(source && targ){
      const link = findLink(source, targ)
      setCorScore(link.value)
      setGraphData({nodes:[{id: source}, {id:targ}], links:[link]})
    }
  }, [source, targ])


  const findLink = (src, trg) => {
    let link = data["links"].filter((l)=> l.source === src && l.target === trg)
    return link[0]
  }

  useEffect(()=>{
    select('#graph')
      .text('Hello')

  }, [])

  return (
    <>
      <label>
        Select source node:
        <select name="source-list" onChange={(e) => handleSourceSelect(e)}>
          <option value="none" selected disabled hidden>Select a source</option>
          {sourceList &&
            sourceList.map((node, key) => {
              return <option key={key}>{node.id}</option>;
            })}
        </select>
      </label>

      <label style={{ marginLeft: "12px" }}>
        Select target node:
        <select name="target-list" onChange={e => handleTargSelect(e)}>
          <option value="none" selected disabled hidden>Select a target</option>
          {targList &&
            targList.map((node, key) => {
              return <option key={key}>{node.id}</option>;
            })}
        </select>
      </label>

      <p>Source: {source}</p>
      {
        corScore && (
          <p>Correlation: {corScore}</p>
        )
      }

      <div id="graph">
      </div>

    </>
  );
};

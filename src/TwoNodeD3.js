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
  const [firstLoad, setFirstLoad] = useState(false)

  const [isAnimating, setIsAnimating] = useState(false)


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
    setSourceList(data.nodes.filter(n => n["id"].includes('stock')));
    setTargList(data.nodes.filter(n => !n["id"].includes('stock')));
  }, [data]);

  const handleSourceSelect = (e) => {
    setSource(e.target.value);
  }

  const handleTargSelect = (e) => {
    setTarget(e.target.value);
  }

  const findLink = (src, trg) => {
    let link = data["links"].filter((l)=> l.source === src && l.target === trg)
    return link[0]
  }

  const linkDistScale = scaleLinear().domain([1,0]).range([0, 100]);
  const linkStrengthScale = scaleLinear().domain([0,1]).range([0, 1]);

  useEffect(()=>{
    console.log(source, targ, "from find link effect")
    if(source && targ){
      const link = findLink(source, targ)
      if(link){
        setCorScore(link.value)
        setGraphData({nodes:[{id: source}, {id:targ}], links:[link]})
      }
    }
    console.log(source, targ, "changed")
  }, [source, targ])






  useEffect(()=>{
    if(graphData){
      select('#graph')
      .selectAll('circle')
      .data(graphData["nodes"])
      .join('circle')
      .transition()
      .delay(100)
      .attr('cx', (d, i) =>{return i * graphData["links"][0].value * 800 + 100})
      .attr('cy', '10')
      .attr('r', 4)

      select('#graph')
      .selectAll('rect')
      .data(graphData["nodes"])
      .join('rect')
      .transition()
      .delay(100)
      .attr('x', '100')
      .attr('y', '10')
      .attr('width', (d, i )=> graphData["links"][0].value * i * 800)
      .attr('height', 1)

      select('#graph')
      .selectAll('text')
      .data(graphData["nodes"])
      .join('text')
      .transition()
      .delay(100)
      .text((d, i) => graphData["nodes"][i]["id"])
      .attr('x', (d, i) =>{return i * graphData["links"][0].value * 800 + 100})
      .attr('y', '40')
      .style('text-anchor', 'middle')
    }

  }, [graphData])

  const handleSrcSelect=(e)=>{

    setIsAnimating(true)
    console.log("isAnimating: ",isAnimating)
    setSource(e.target.value)
    console.log(source, "is the source from cycle")
    cycleSrcNode();

  }
  const cycleSrcNode = (e) => {
    // console.log(e.target.value)

    if(!firstLoad){
      console.log("FirstLoad False")

        for(let i = 0; i < targList.length; i++){
          setTimeout(()=>{
            setIsAnimating(false)
          }, targList.length * 1000)
          setTimeout(()=>{
            setTarget(targList[i].id)

            const link = findLink(source, targ)
            if(link){

            setCorScore(link.value)
            setGraphData({nodes:[{id: source}, {id:targ}], links:[link]})
            }
          }, 1000 * i)
        }

    }
    // setFirstLoad(true)
    // targList.map((d, i)=>{
    //   const timer = setTimeout(() => {
    //     console.log(d, i)
    //   }, 1000);
    // })
  }

  return (
    <>
      <label>
        Select source node:
        <select name="source-list" onChange={(e) => handleSrcSelect(e)}  disabled={isAnimating ? true : null}>
          <option value="none" selected disabled hidden>Select a source</option>
          {sourceList &&
            sourceList.map((node, key) => {
              return <option key={key}>{node.id}</option>;
            })}
        </select>
      </label>

      <p>Is Animating: {"" + isAnimating}</p>

      { firstLoad &&
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

      }

      <p>Source: {source}</p>
          <p>Correlation: {corScore}</p>

      <div>
        <svg id="graph" height="800" width="960"></svg>
      </div>

    </>
  );
};

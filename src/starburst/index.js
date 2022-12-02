import React, { useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import {
  getPartition,
  getArc,
  isArcVisible,
  isLabelVisible,
  getTransformedLabel,
} from "./helper";

const StarBurst = ({ data }) => {
  const width = 600;
  const radius = width / 6;

  const arc = getArc(radius);
  const format = d3.format(",d");
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  );

  useEffect(() => {
    const root = getPartition(data);
    root.each((d) => (d.current = d));
    const svg = d3.select("svg");

    const everything = svg.selectAll("*");
    everything.remove();

    const g = svg
      .attr("width", width)
      .attr("height", width)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

    const path = g
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d) =>
        isArcVisible(d.current) ? (d.children ? 1 : 0.6) : 0
      )
      .attr("d", (d) => arc(d.current))

 

    path.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")} - ${format(d.value)} patients`
    );

    g.append("g")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("fill-opacity", (d) => +isLabelVisible(d.current))
      .attr("transform", (d) => getTransformedLabel(d.current, radius))
      .text((d) => d.data.name);

    // g.append("circle")
    //   .datum(root)
    //   .attr("r", radius)
    //   .attr("fill", "none")
    //   .attr("pointer-events", "all");
  }, [data]);

  return (
    <StarBurstContainer>
      <svg />
      <h5>Mite Eradication</h5>
    </StarBurstContainer>
  );
};

export default StarBurst;

const StarBurstContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  color: white;
  justify-content: center;
  row-gap: 10px;
`;

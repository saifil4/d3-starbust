import React, { useEffect } from "react";
import * as d3 from "d3";
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
    const createChart = () => {
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
          isArcVisible(d.current) ? (d.children ? 1 : 0.7) : 0
        )
        .attr("pointer-events", (d) =>
          isArcVisible(d.current) ? "auto" : "none"
        )
        .attr("d", (d) => arc(d.current));

      path
        .filter((d) => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

      path.append("title").text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => d.data.name)
            .reverse()
            .join("/")}\n${format(d.value)}`
      );

      const label = g
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", (d) => +isLabelVisible(d.current))
        .attr("transform", (d) => getTransformedLabel(d.current, radius))
        .text((d) => d.data.name);

      const parent = g
        .append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

      function clicked(event, p) {
        parent.datum(p.parent || root);

        root.each(
          (d) =>
            (d.target = {
              x0:
                Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              x1:
                Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                2 *
                Math.PI,
              y0: Math.max(0, d.y0 - p.depth),
              y1: Math.max(0, d.y1 - p.depth),
            })
        );

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path
          .transition(t)
          .tween("data", (d) => {
            const i = d3.interpolate(d.current, d.target);
            return (t) => (d.current = i(t));
          })
          .filter(
            (d) => +this.getAttribute("fill-opacity") || isArcVisible(d.target)
          )
          .attr("fill-opacity", (d) =>
            isArcVisible(d.target) ? (d.children ? 1 : 0.7) : 0
          )
          .attr("pointer-events", (d) =>
            isArcVisible(d.target) ? "auto" : "none"
          )
          .attrTween("d", (d) => () => arc(d.current));

        label
          .filter(
            (d) =>
              +this.getAttribute("fill-opacity") || isLabelVisible(d.target)
          )
          .transition(t)
          .attr("fill-opacity", (d) => +isLabelVisible(d.target))
          .attrTween(
            "transform",
            (d) => () => getTransformedLabel(d.current, radius)
          );
      }
    };

    createChart();
  }, [data]);

  return (
    <div>
      <svg></svg>
    </div>
  );
};

export default StarBurst;

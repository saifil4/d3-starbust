import React, { useEffect } from "react";
import * as d3 from "d3";

var nodeData = {
  name: "TOPICS",
  children: [
    {
      name: "Topic A",
      children: [
        { name: "Sub A1", size: 4 },
        { name: "Sub A2", size: 4 },
      ],
    },
    {
      name: "Topic B",
      children: [
        { name: "Sub B1", size: 3 },
        { name: "Sub B2", size: 3 },
        {
          name: "Sub B3",
          size: 3,
        },
      ],
    },
    {
      name: "Topic C",
      children: [
        { name: "Sub A1", size: 4 },
        { name: "Sub A2", size: 4 },
      ],
    },
  ],
};

const StarBurst = ({ data }) => {
  
  useEffect(() => {
    const createChart = () => {
      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;
      //   const color = d3.scaleOrdinal(d3.schemeCategory20b);

      // Create primary <g> element
      const g = d3
        .select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Data strucure
      const partition = d3.partition().size([2 * Math.PI, radius]);

      // Find data root
      const root = d3.hierarchy(data).sum(function (d) {
        return d.value;
      });

      // Size arcs
      partition(root);
      const arc = d3
        .arc()
        .startAngle(function (d) {
          return d.x0;
        })
        .endAngle(function (d) {
          return d.x1;
        })
        .innerRadius(function (d) {
          return d.y0;
        })
        .outerRadius(function (d) {
          return d.y1;
        });

      // Put it all together
      g.selectAll("path")
        .data(root.descendants())
        .enter()
        .append("path")
        .attr("display", function (d) {
          return d.depth ? null : "none";
        })
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", function (d) {
          return "red";
        });
    };

    createChart();
  }, []);

  return (
    <div>
      <svg></svg>
    </div>
  );
};

export default StarBurst;

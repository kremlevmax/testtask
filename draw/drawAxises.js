import { axisBottom, axisLeft } from "d3-axis";
import { xScale, invertedYScale } from "../utils/scales";
import { width, padding, height } from "../utils/data";
import { $root } from "../utils/containers";

const xAxis = axisBottom().scale(xScale);
const yAxis = axisLeft()
  .scale(invertedYScale)
  .tickSize(-width)
  .tickFormat((y, x) => y + "%");

export const drawAxises = () => {
  $root
    .append("g")
    .attr("transform", `translate(${padding}, ${height + 100})`)
    .call(xAxis);
  $root.append("g").attr("transform", "translate(40, 100)").call(yAxis);
  $root.selectAll(".tick line").attr("opacity", 0.3);
};

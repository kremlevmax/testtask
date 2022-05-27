import { scaleLinear, scaleBand } from "d3-scale";
import { months, width, height } from "./data";

export const xScale = scaleBand()
  .domain(months)
  .range([0, width])
  .paddingInner(0.2);
export const yScale = scaleLinear().domain([0, 100]).range([0, height]);
export const invertedYScale = scaleLinear().domain([0, 100]).range([height, 0]);
export const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#d22626", "#086cdc"]);

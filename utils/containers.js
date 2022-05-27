import { select } from "d3-selection";
import { padding } from "./data";

export const $root = select(".mz-chart");

export const $chartContainer = $root
  .append("g")
  .classed("mz-chart__container", true)
  .attr("transform", `translate(${padding}, ${100})`);

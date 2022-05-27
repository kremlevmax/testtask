import { easeLinear } from "d3-ease";
import { height } from "./data";
import { yScale } from "./scales";

export const growFromBottomTransition = (element) => {
  element
    .transition()
    .ease(easeLinear)
    .duration(500)
    .attr("y", (d, i) => height - yScale(d.value))
    .attr("height", (d, i) => yScale(d.value));
};

export const growFromTopTransition = (element) => {
  element
    .transition()
    .ease(easeLinear)
    .duration(500)
    .attr("y", (d, i) => height - yScale(d.value))
    .attr("height", (d, i) => yScale(d.value));
};

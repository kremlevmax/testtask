import { $chartContainer } from "../utils/containers";
import { height, width, getData, getMedian } from "../utils/data";
import { yScale } from "../utils/scales";

export const drawMedian = (median) => {
  $chartContainer.select("line").remove();

  $chartContainer
    .append("line")
    .attr("x1", 0)
    .attr("y1", height - yScale(median))
    .attr("x2", width)
    .attr("y2", height - yScale(median))
    .attr("stroke", "orange")
    .attr("stroke-width", "4")
    .attr("stroke-dasharray", "15, 5");
};

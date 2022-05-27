import { $chartContainer } from "../utils/containers";
import { xScale, colorScale } from "../utils/scales";
import { mouseOver, mouseOut } from "../utils/mouseEvents";
import { getData, getMedian } from "../utils/data";

export const drawChartbars = () => {
  const data = getData();
  const median = getMedian(data);

  chartbars = $chartContainer.selectAll(".mz-chart__bar").data(data);
  chartbars.exit().remove();

  let newbars = chartbars
    .enter()
    .append("g")
    .classed("mz-chart__bar", true)
    .append("rect");

  let updatedChartbars = chartbars
    .select("rect")
    .merge(newbars)
    .attr("x", (d, i) => xScale(d.label))
    .attr("width", (d, i) => xScale.bandwidth())
    .attr("fill", (d) => colorScale(d.value));

  updatedChartbars.on("mouseover", mouseOver).on("mouseout", mouseOut);

  return { updatedChartbars, median };
};

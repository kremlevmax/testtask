import { select } from "d3-selection";
import { easeLinear } from "d3-ease";

export const mouseOver = function (event, datum) {
  select("rect")
    .transition()
    .ease(easeLinear)
    .duration("100")
    .attr("opacity", ".7");

  let tooltip = select(".mz-chart__tooltip")
    .style("left", event.clientX + 4 + "px")
    .style("top", event.screenY - 20 + "px")
    .style("display", "block");

  tooltip.select(".mz-chart__tooltip-header").text(datum.label);
  tooltip.select(".mz-chart__tooltip-value").text(datum.value + "%");
};

export const mouseOut = function (event, datum) {
  select("rect")
    .transition()
    .ease(easeLinear)
    .duration("100")
    .attr("opacity", "1");

  select(".mz-chart__tooltip").style("display", "none");
};

import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { randomInt } from "d3-random";
import { axisBottom, axisLeft } from "d3-axis";
import { easeLinear } from "d3-ease";
import { addLogo } from "./utils/logo";
import { addHeader } from "./utils/labels";
import * as d3 from "d3";

const padding = 40;
const W = 960;
const height = 500;
const width = W - padding * 2;
const $root = select(".mz-chart");

addLogo($root, 150, W - 150 - padding, 30);
addHeader(
  $root,
  padding,
  50,
  "Тут находится заголовок вашего\nтестового задания"
);

const randomValue = randomInt(0, 100);
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

let data = months.map((m) => ({
  label: m,
  value: randomValue(),
}));

const yScale = scaleLinear().domain([0, 100]).range([0, height]);
const colorScale = scaleLinear().domain([0, 100]).range(["#d22626", "#086cdc"]);
const $chartContainer = $root
  .append("g")
  .classed("mz-chart__container", true)
  .attr("transform", `translate(${padding}, ${100})`);

const xScale = scaleBand().domain(months).range([0, width]).paddingInner(0.2);
const hAxis = axisBottom().scale(xScale);
$root
  .append("g")
  .attr("transform", `translate(${padding}, ${height + 100})`)
  .call(hAxis);

const vAxisScale = scaleLinear().domain([0, 100]).range([height, 0]);
const vAxis = axisLeft()
  .scale(vAxisScale)
  .tickSize(-width, 0, 0)
  .tickFormat((y, x) => y + "%");
$root.append("g").attr("transform", "translate(40, 100)").call(vAxis);

function MouseOver(event, datum) {
  select(this)
    .transition()
    .ease(easeLinear)
    .duration("100")
    .attr("opacity", ".7");

  let tooltip = d3
    .select(".mz-chart__tooltip")
    .style("left", event.clientX + 4 + "px")
    .style("top", event.screenY - 20 + "px")
    .style("display", "block");

  tooltip.select(".mz-chart__tooltip-header").text(datum.label);
  tooltip.select(".mz-chart__tooltip-value").text(datum.value + "%");
}

function MouseOut(event, datum) {
  select(this)
    .transition()
    .ease(easeLinear)
    .duration("100")
    .attr("opacity", "1");

  select(".mz-chart__tooltip").style("display", "none");
}

let chartbars = $chartContainer.selectAll(".mz-chart__bar").data(data);
chartbars
  .enter()
  .append("g")
  .classed("mz-chart__bar", true)
  .append("rect")
  .attr("x", (d, i) => xScale(d.label))
  .attr("width", (d, i) => xScale.bandwidth())
  .attr("fill", (d) => colorScale(d.value))
  .attr("y", (d, i) => height)
  .attr("height", (d, i) => 0)
  .transition()
  .ease(easeLinear)
  .duration(500)
  .attr("y", (d, i) => height - yScale(d.value))
  .attr("height", (d, i) => yScale(d.value));

function updateChart() {
  $chartContainer.select("line").remove();

  data = months.map((m) => ({
    label: m,
    value: randomValue(),
  }));

  let values = data.map((m) => m.value);

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

  updatedChartbars
    .transition()
    .ease(easeLinear)
    .duration(500)
    .attr("y", (d, i) => height - yScale(d.value))
    .attr("height", (d, i) => yScale(d.value));

  updatedChartbars.on("mouseover", MouseOver).on("mouseout", MouseOut);

  $chartContainer
    .append("line")
    .attr("x1", 0)
    .attr("y1", height - yScale(d3.median(values)))
    .attr("x2", width)
    .attr("y2", height - yScale(d3.median(values)))
    .attr("stroke", "orange")
    .attr("stroke-width", "4")
    .attr("stroke-dasharray", "15, 5");
}
d3.select(".mz-button").on("click", updateChart);

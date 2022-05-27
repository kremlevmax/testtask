import { select } from "d3-selection";
import { addLogo } from "./utils/logo";
import { addHeader } from "./utils/labels";
import { padding, W, height, $root, getData, getMedian } from "./utils/data";
import { drawAxises } from "./draw/drawAxises";
import { drawChartbars } from "./draw/drawChartbars";
import { drawMedian } from "./draw/drawMedian";
import {
  growFromBottomTransition,
  growFromTopTransition,
} from "./utils/transitions";

import { $root } from "./utils/containers";

addLogo($root, 150, W - 150 - padding, 30);
addHeader($root, padding, 50, "Заголовок например");
drawAxises();

let { updatedChartbars, median } = drawChartbars();
updatedChartbars.attr("y", (d, i) => height);
growFromBottomTransition(updatedChartbars);

drawMedian(median);

function updateChart() {
  let { updatedChartbars, median } = drawChartbars();
  growFromTopTransition(updatedChartbars);
  drawMedian(median);
}
select(".mz-button").on("click", updateChart);

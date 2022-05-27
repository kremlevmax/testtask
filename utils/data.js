import { randomInt } from "d3-random";
import { median } from "d3";

export const padding = 40;
export const W = 960;
export const height = 500;
export const width = W - padding * 2;

const randomValue = randomInt(0, 100);
export const months = [
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

export const getData = () => {
  return months.map((m) => ({
    label: m,
    value: randomValue(),
  }));
};

export const getMedian = (data) => {
  return median(data.map((m) => m.value));
};

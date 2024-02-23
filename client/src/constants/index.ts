import { items } from "./items";

interface cronsRequired {
  id: number;
  amount: number;
}

const testYellowCronRequired: cronsRequired[] = [
  { id: 1, amount: 24 },
  { id: 2, amount: 74 },
  { id: 3, amount: 224 },
  { id: 4, amount: 625 },
  { id: 5, amount: 2999 },
];

const enhanceLevel = [
  { id: 1, name: "真Ⅰ" },
  { id: 2, name: "真Ⅱ" },
  { id: 3, name: "真Ⅲ" },
  { id: 4, name: "真Ⅳ" },
  { id: 5, name: "真Ⅴ" },
];

const baseStack = [0, 1, 2, 3, 4];

export { testYellowCronRequired, enhanceLevel, baseStack, items };

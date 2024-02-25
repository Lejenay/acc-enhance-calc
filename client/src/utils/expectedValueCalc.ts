import { ItemData } from "../api/bdoMarketAPI";

const expectedValueCalc = (
  selectedItem: ItemData | undefined,
  selectedLevel: number,
  successRate: number,
  fsCost: number
) => {
  if (selectedItem === undefined) {
    return -1;
  }
  successRate = successRate / 100;

  const tax = 0.845;

  const expectedValue =
    successRate * (selectedItem[selectedLevel].basePrice * tax - fsCost) +
    (1 - successRate) *
      -(selectedItem[selectedLevel - 1].basePrice + selectedItem[0].basePrice);

  return expectedValue;
};

export default expectedValueCalc;

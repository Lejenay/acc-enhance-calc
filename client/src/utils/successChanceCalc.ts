import { enhanceLevelMapper } from "../utils";

const accSuccessChanceCalc = (
  failStacks: number,
  enhanceLevel: number
): number => {
  const baseSuccessRate = {
    pri: 25.0,
    duo: 10.0,
    tri: 7.5,
    tet: 2.5,
    pen: 0.5,
  };

  switch (enhanceLevel) {
    case 1:
      if (failStacks >= 0 && failStacks <= 18) {
        // 25.0 (base) + 2.5 per fail stacks
        return baseSuccessRate.pri + failStacks * 2.5;
      } else if (failStacks >= 19 && failStacks <= 58) {
        // 25.0 (base) + 2.5 per stacks (until 18) + 0.5 per fail stacks (after 18 => soft cap)
        return baseSuccessRate.pri + 18 * 2.5 + (failStacks - 18) * 0.5;
      } else if (failStacks >= 59) {
        return 90.0;
      }
      break;

    case 2:
      if (failStacks >= 0 && failStacks <= 40) {
        return baseSuccessRate.duo + failStacks * 1.0;
      } else if (failStacks >= 41 && failStacks <= 239) {
        return baseSuccessRate.duo + 40 * 1.0 + (failStacks - 40) * 0.2;
      } else if (failStacks >= 240) {
        return 90.0;
      }
      break;

    case 3:
      if (failStacks >= 0 && failStacks <= 45) {
        return baseSuccessRate.tri + failStacks * 0.75;
      } else if (failStacks >= 46 && failStacks <= 369) {
        return baseSuccessRate.tri + 45 * 0.75 + (failStacks - 45) * 0.15;
      } else if (failStacks >= 370) {
        return 90.0;
      }
      break;

    case 4:
      if (failStacks >= 0 && failStacks <= 110) {
        return baseSuccessRate.tet + failStacks * 0.25;
      } else if (failStacks >= 111 && failStacks <= 1309) {
        return baseSuccessRate.tet + 110 * 0.25 + (failStacks - 110) * 0.05;
      } else if (failStacks >= 1310) {
        return 90.0;
      }
      break;

    case 5:
      if (failStacks >= 0 && failStacks <= 490) {
        return baseSuccessRate.pen + failStacks * 0.05;
      } else if (failStacks >= 491 && failStacks <= 6989) {
        return baseSuccessRate.pen + 490 * 0.05 + (failStacks - 490) * 0.01;
      } else if (failStacks >= 6990) {
        return 90.0;
      }
      break;
  }

  return -1;
};


const otherEquipSuccessChanceCalc = (
  failStacks: number,
  enhanceLevel: number,
  equipmentType: string
): number => {
  const literalEnhanceLevel = enhanceLevelMapper(enhanceLevel);

  const baseSuccessRate: Record<string, Record<string, number>> = {
    whiteAndYellowArmour: {
      pri: 7.6923,
      duo: 6.25,
      tri: 2.0,
      tet: 0.3,
    },
    blackStarWeapon: {
      pri: 10.625,
      duo: 3.4,
      tri: 0.51,
      tet: 0.2,
    },
    fallenGodArmour: {
      pri: 1.0,
      duo: 0.5,
      tri: 0.2,
      tet: 0.0025,
    },
  };

  const result = baseSuccessRate[equipmentType][literalEnhanceLevel] *
  (1 + (0.1 * failStacks))

  // 100分率に変換
  return result / 100;
};

export { accSuccessChanceCalc, otherEquipSuccessChanceCalc };

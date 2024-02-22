import { otherEquipSuccessChanceCalc } from "../utils";

interface itemUseCountForStack {
  targetStack: number;
  baseStack: number;
  volksCryUses: boolean;
  bsStoneUses: number;
  reblathUses: number;
  tetBossArmourUses: number;
  tetBSWeaponUses: number;
  triFallenGodArmourUses: number;
  originOfDarkHungerUses: number;
}

const itemUseForStackCalc = (
  targetStack: number,
  baseStack: number,
  volksCry: boolean
): itemUseCountForStack => {
  const itemUsage = {
    bsStone: 0,
    reblath: 0,
    tetBossArmour: 0,
    tetBSWeapon: 0,
    triFallenGodArmour: 0,
    originOfDarkHunger: 0,
  };

  let currentStack = baseStack;

  /* bs stone */
  if (targetStack <= 30 + baseStack) {
    itemUsage.bsStone += targetStack - baseStack;
    currentStack = targetStack;
  } else {
    itemUsage.bsStone += 30;
    currentStack += 30;
  }

  /* Reblath */
  // pri reblath / suc chance until 35% / increase stack per fail 3
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 1, "whiteAndYellowArmour") < 0.35
  ) {
    itemUsage.reblath += 1;
    currentStack += 3;
  }

  // duo reblath / suc chance until 40% / increase stack per fail 4
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 2, "whiteAndYellowArmour") < 0.4
  ) {
    itemUsage.reblath += 1;
    currentStack += 4;
  }

  // tri reblath / suc chance until 20% / increase stack per fail 5
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 3, "whiteAndYellowArmour") < 0.2
  ) {
    itemUsage.reblath += 1;
    currentStack += 5;
  }

  // tet reblath / stack until 120 / increase stack per fail 6
  while (currentStack < targetStack && currentStack < 120) {
    itemUsage.reblath += 1;
    currentStack += 6;
  }

  /* Volks cry */
  if (volksCry) {
    currentStack += 13;
  }

  /* Boss armour */
  // tet boss armour / stack until 218 / increase stack per fail 6
  while (currentStack < targetStack && currentStack < 218) {
    itemUsage.tetBossArmour += 1;
    currentStack += 6;
  }

  /* BS weapon */
  // tet bs weapon / stack until 249 / increase stack per fail 6
  while (currentStack < targetStack && currentStack < 249) {
    itemUsage.tetBSWeapon += 1;
    currentStack += 6;
  }

  /* Origin of dark hunger */
  // 250-279 / increase stack 3 per use
  while (currentStack < targetStack) {
    if (currentStack < 280) {
      itemUsage.originOfDarkHunger += 1;
      currentStack += 3;
    }
  }

  // 280-298 / increase stack 2 per use
  while (currentStack < targetStack) {
    if (currentStack < targetStack && currentStack < 299) {
      itemUsage.originOfDarkHunger += 1;
      currentStack += 2;
    }
  }

  // 299 / increase stack 1 per use
  while (currentStack < targetStack) {
    if (currentStack < targetStack && currentStack < 300) {
      itemUsage.originOfDarkHunger += 1;
      currentStack += 1;
    }
  }

  /* Fallen god armour */
  // tet fallen god armour / stack until inf / increase stack per fail 5
  while (currentStack < targetStack) {
    itemUsage.triFallenGodArmour += 1;
    currentStack += 5;
  }

  return {
    targetStack,
    baseStack,
    volksCryUses: volksCry,
    bsStoneUses: itemUsage.bsStone,
    reblathUses: itemUsage.reblath,
    tetBossArmourUses: itemUsage.tetBossArmour,
    tetBSWeaponUses: itemUsage.tetBSWeapon,
    triFallenGodArmourUses: itemUsage.triFallenGodArmour,
    originOfDarkHungerUses: itemUsage.originOfDarkHunger,
  };
};

import { ItemData, fetchMarketData } from "../api/bdoMarketAPI";
import { otherEquipSuccessChanceCalc } from "../utils";
import enhanceLevAndIndexMapper from "./Mapping/enhanceLevelIndexMapper";

interface itemUseCountForStack {
  targetStack: number;
  baseStack: number;
  volksCryUses: boolean;
  bsStoneUses: number;
  priReblathUses: number;
  duoReblathUses: number;
  triReblathUses: number;
  tetReblathUses: number; // concerned when tet reblath succeeds
  tetBossArmourUses: number;
  tetBSWeaponUses: number;
  triFallenGodArmourUses: number;
  originOfDarkHungerUses: number;
}

const getMaterialPriceForStack = async (itemId: number): Promise<number> => {
  try {
    const data: ItemData | undefined = await fetchMarketData(itemId);
    return data ? data[0].basePrice : -1;
  } catch (error) {
    console.error("Fetch error:", error);
    return -1;
  }
};

const getEquipmentPriceForStack = async (
  itemId: number,
  enhanceLevel: number
): Promise<number> => {
  try {
    const data: ItemData | undefined = await fetchMarketData(itemId);
    return data
      ? data[Object.keys(data).length - enhanceLevAndIndexMapper(enhanceLevel)]
          .basePrice
      : -1;
  } catch (error) {
    console.error("Fetch error:", error);
    return -1;
  }
};

const requiredBsStoneForStack = (stack: number): number => {
  const a = 0.117;
  const b = -1.071;
  const c = 9;
  const result = a * stack * stack + b * stack + c;
  return Math.floor(result);
};

const itemUseForStackCalc = (
  targetStack: number,
  baseStack: number,
  volksCry: boolean
): itemUseCountForStack => {
  const itemUsage = {
    bsStone: 0,
    priReblath: 0,
    duoReblath: 0,
    triReblath: 0,
    tetReblath: 0,
    tetBossArmour: 0,
    tetBSWeapon: 0,
    triFallenGodArmour: 0,
    originOfDarkHunger: 0,
  };

  let currentStack = baseStack;

  /* bs stone */
  if (targetStack <= 30 + baseStack) {
    itemUsage.bsStone += requiredBsStoneForStack(targetStack - baseStack);
    currentStack = targetStack;
  } else {
    itemUsage.bsStone += 84;
    currentStack += 30;
  }

  /* Reblath */
  // pri reblath / suc chance until 35% / increase stack per fail 3
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 1, "whiteAndYellowArmour") < 0.35
  ) {
    itemUsage.priReblath += 1;
    currentStack += 3;
  }

  // duo reblath / suc chance until 40% / increase stack per fail 4
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 2, "whiteAndYellowArmour") < 0.4
  ) {
    itemUsage.duoReblath += 1;
    currentStack += 4;
  }

  // tri reblath / suc chance until 20% / increase stack per fail 5
  while (
    currentStack < targetStack &&
    otherEquipSuccessChanceCalc(currentStack, 3, "whiteAndYellowArmour") < 0.2
  ) {
    itemUsage.triReblath += 1;
    currentStack += 5;
  }

  // tet reblath / stack until 120 / increase stack per fail 6
  while (currentStack < targetStack && currentStack < 120) {
    itemUsage.tetReblath += 1;
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
  while (currentStack < targetStack && currentStack < 280) {
    itemUsage.originOfDarkHunger += 1;
    currentStack += 3;
  }

  // 280-298 / increase stack 2 per use
  while (currentStack < targetStack && currentStack < 299) {
    itemUsage.originOfDarkHunger += 1;
    currentStack += 2;
  }

  // 299 / increase stack 1 per use
  while (currentStack < targetStack && currentStack < 300) {
    itemUsage.originOfDarkHunger += 1;
    currentStack += 1;
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
    priReblathUses: itemUsage.priReblath,
    duoReblathUses: itemUsage.duoReblath,
    triReblathUses: itemUsage.triReblath,
    tetReblathUses: itemUsage.tetReblath,
    tetBossArmourUses: itemUsage.tetBossArmour,
    tetBSWeaponUses: itemUsage.tetBSWeapon,
    triFallenGodArmourUses: itemUsage.triFallenGodArmour,
    originOfDarkHungerUses: itemUsage.originOfDarkHunger,
  };
};

const stackCostCalc = async (
  targetStack: number,
  baseStack: number,
  volksCry: boolean
): Promise<number> => {
  const itemUse = itemUseForStackCalc(targetStack, baseStack, volksCry);
  let totalCost = 0;

  /* Black stone */
  const bsArmourCost = await getMaterialPriceForStack(16001);
  /* NOTE: bs weapon is estimated to not be used anymore due to the update on 4/3/2024 
  two line below is outdated */
  // const bsWeaponCost = await getMaterialPriceForStack(16002);
  // totalCost += itemUse.bsStoneUses * Math.min(bsArmourCost, bsWeaponCost);

  totalCost += itemUse.bsStoneUses * bsArmourCost;

  /* Reblath pri */
  // reblath repair cost (12900) + Concentrated BS cost (weapon)
  /* NOTE: Concentrated magic bs (armour - id:16005) is deleted due to the update on 4/3/2024*/
  const reblathRepairCost = 12900;
  const ConcentratedBSCost = await getMaterialPriceForStack(16004);
  if (itemUse.priReblathUses > 0) {
    const priReblathAvgSuccessRate = 0.3308;
    const reblathCost =
      priReblathAvgSuccessRate * (totalCost + ConcentratedBSCost) +
      (1 - priReblathAvgSuccessRate) * (reblathRepairCost + ConcentratedBSCost);
    totalCost += itemUse.priReblathUses * reblathCost;
  }

  /* Reblath duo */
  const duoReblathAvgSuccessRate = 0.34375;
  if (itemUse.duoReblathUses > 0) {
    const duoReblathCost =
      duoReblathAvgSuccessRate * (totalCost + ConcentratedBSCost) +
      (1 - duoReblathAvgSuccessRate) * (reblathRepairCost + ConcentratedBSCost);
    totalCost += itemUse.duoReblathUses * duoReblathCost;
  }

  /* Reblath tri */
  const triReblathAvgSuccessRate = 0.165;
  if (itemUse.triReblathUses > 0) {
    const triReblathCost =
      triReblathAvgSuccessRate * (totalCost + ConcentratedBSCost) +
      (1 - triReblathAvgSuccessRate) * (reblathRepairCost + ConcentratedBSCost);
    totalCost += itemUse.triReblathUses * triReblathCost;
  }

  /* Reblath tet */
  // Vレブラスはさすがにマイナスなので、成功の期待値を含めて計算
  // fail chance * [reblath repair cost (12900) + Concentrated BS cost (armour)]
  // + success chance * [totalCost until then + Concentrated BS cost (armour)]
  if (itemUse.tetReblathUses > 0) {
    const costUntilTetReblath = totalCost;
    const tetReblathCost =
      itemUse.tetReblathUses *
      (((1 - otherEquipSuccessChanceCalc(120, 4, "whiteAndYellowArmour")) /
        100) *
        (reblathRepairCost + ConcentratedBSCost) +
        (otherEquipSuccessChanceCalc(120, 4, "whiteAndYellowArmour") / 100) *
          (costUntilTetReblath + ConcentratedBSCost));
    totalCost += tetReblathCost;
  }

  /* Volks cry */
  // volks is defined as no cost here

  /* Boss armour tet */
  // succeeds 5.385% avg. when without volks cry / 4.615% avg. when with volks cry
  // 家門名声7000とプレパケ時のtax: ((100 - 35) * 1.315 ) / 100
  const taxRate = ((100 - 35) * 1.315) / 100;
  const memoryFragmentCost = await getMaterialPriceForStack(44195);
  if (itemUse.tetBossArmourUses > 0) {
    const tetUrugonCost = await getEquipmentPriceForStack(11103, 4); // pen price
    const triUrgonCost = await getEquipmentPriceForStack(11103, 3); // tet price
    const duoUrgonCost = await getEquipmentPriceForStack(11103, 2); // tri price

    const tetBossArmourAvgSuccessRate = volksCry ? 0.04615 : 0.05385;
    const tetBossArmourCostPerAttempt =
      tetBossArmourAvgSuccessRate * // when succeeds
        (-1 * tetUrugonCost * taxRate + ConcentratedBSCost + totalCost) +
      (1 - tetBossArmourAvgSuccessRate) * // when fails
        ((triUrgonCost - duoUrgonCost) * taxRate +
          ConcentratedBSCost +
          memoryFragmentCost * 10);

    totalCost += itemUse.tetBossArmourUses * tetBossArmourCostPerAttempt;
  }

  /* BS weapon tet */
  // succeeds 4.88% avg.
  const flawlessMagicalBSCost = (await getMaterialPriceForStack(4998)) * 2;
  /* NOTE: hard black crystal shard (堅い, id - 4997) has been removed from the game on 4/3/2024 
  three line below is outdated */
  // const flawlessMagicalBSCost =
  //   (await getMaterialPriceForStack(4998)) +
  //   (await getMaterialPriceForStack(4997));

  if (itemUse.tetBSWeaponUses > 0) {
    const tetBSWeaponCost = await getEquipmentPriceForStack(715003, 4); // pen price
    const triBSWeaponCost = await getEquipmentPriceForStack(715003, 3); // tet price
    const duoBSWeaponCost = await getEquipmentPriceForStack(715003, 2); // tri price

    const tetBSWeaponAvgSuccessRate = 0.0488;
    const tetBSWeaponCostPerAttempt =
      tetBSWeaponAvgSuccessRate * // when succeeds
        (-1 * tetBSWeaponCost * taxRate + flawlessMagicalBSCost + totalCost) +
      (1 - tetBSWeaponAvgSuccessRate) * // when fails
        ((triBSWeaponCost - duoBSWeaponCost) * taxRate +
          flawlessMagicalBSCost +
          memoryFragmentCost * 20);

    totalCost += itemUse.tetBSWeaponUses * tetBSWeaponCostPerAttempt;
  }

  /* Origin of dark hunger(闇捕食の起源) */
  if (itemUse.originOfDarkHungerUses > 0) {
    const originOfDarkHungerCost = await getMaterialPriceForStack(65319);
    totalCost += itemUse.originOfDarkHungerUses * originOfDarkHungerCost;
  }

  /* Fallen god armour tri */
  // succeeds 6.7% avg. (300fs to 350fs)
  if (itemUse.triFallenGodArmourUses > 0) {
    const flawlessChaoticBSCost =
      (await getMaterialPriceForStack(721003)) + flawlessMagicalBSCost;
    // 無欠な混沌のブラックストーン = カプラス(721003) + 無欠な魔力
    const triFallenGodArmourCost = await getEquipmentPriceForStack(719897, 3); // tet price of labreska
    const triFallenGodArmourCronCost = 4459214501; // 1,651,560(price per cron) * 2,700 = 4,459,214,501

    const triFallenGodArmourAvgSuccessRate = 0.067;
    const triFallenGodArmourCostPerAttempt =
      triFallenGodArmourAvgSuccessRate * // when succeeds
        (-1 * triFallenGodArmourCost * taxRate +
          totalCost +
          flawlessChaoticBSCost +
          triFallenGodArmourCronCost) +
      (1 - triFallenGodArmourAvgSuccessRate) * // when fails
        (memoryFragmentCost * 30 +
          flawlessChaoticBSCost +
          triFallenGodArmourCronCost);

    totalCost +=
      itemUse.triFallenGodArmourUses * triFallenGodArmourCostPerAttempt;
  }

  return totalCost;
};

export default stackCostCalc;

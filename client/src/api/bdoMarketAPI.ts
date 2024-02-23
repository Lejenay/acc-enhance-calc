interface resData {
  resultCode: number;
  resultMsg: string;
}

export interface ItemData {
  [level: number]: {
    itemId: number;
    enhancementRangeMin: number;
    enhancementRangeMax: number;
    basePrice: number;
    currentStock: number;
    totalTrades: number;
    priceHardCapMin: number;
    priceHardCapMax: number;
    lastSalePrice: number;
    lastSaleTime: number;
  };
}

const fetchMarketData = async (itemId: number | undefined) => {
  if (itemId === undefined) {
    console.error("mainKey is undefined");
    return;
  }

  try {
    const response = await fetch("/api/market", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mainKey: itemId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was bad.");
    }

    const data: resData = await response.json();
    const resultMsg = data.resultMsg.split("|").filter((msg: string) => msg);

    const itemData: ItemData = {};

    resultMsg.forEach((item, index) => {
      const itemInfo = item.split("-");
      const level = index;

      itemData[level] = {
        itemId: Number(itemInfo[0]),
        enhancementRangeMin: Number(itemInfo[1]),
        enhancementRangeMax: Number(itemInfo[2]),
        basePrice: Number(itemInfo[3]),
        currentStock: Number(itemInfo[4]),
        totalTrades: Number(itemInfo[5]),
        priceHardCapMin: Number(itemInfo[6]),
        priceHardCapMax: Number(itemInfo[7]),
        lastSalePrice: Number(itemInfo[8]),
        lastSaleTime: Number(itemInfo[9]),
      };
    });

    return itemData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { fetchMarketData };

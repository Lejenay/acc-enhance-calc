// interface resData {
//   resultCode: number;
//   resultMsg: string;
// }

// export interface ItemData {
//   [level: number]: {
//     itemId: number;
//     enhancementRangeMin: number;
//     enhancementRangeMax: number;
//     basePrice: number;
//     currentStock: number;
//     totalTrades: number;
//     priceHardCapMin: number;
//     priceHardCapMax: number;
//     lastSalePrice: number;
//     lastSaleTime: number;
//   };
// }

// const fetchMarketData = async (itemId: number | undefined) => {
//   if (itemId === undefined) {
//     console.error("mainKey is undefined");
//     return;
//   }

//   try {
//     const response = await fetch("/api/market", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         mainKey: itemId,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was bad.");
//     }

//     const data: resData = await response.json();
//     const resultMsg = data.resultMsg.split("|").filter((msg: string) => msg);

//     const itemData: ItemData = {};

//     resultMsg.forEach((item, index) => {
//       const itemInfo = item.split("-");
//       const level = index;

//       itemData[level] = {
//         itemId: Number(itemInfo[0]),
//         enhancementRangeMin: Number(itemInfo[1]),
//         enhancementRangeMax: Number(itemInfo[2]),
//         basePrice: Number(itemInfo[3]),
//         currentStock: Number(itemInfo[4]),
//         totalTrades: Number(itemInfo[5]),
//         priceHardCapMin: Number(itemInfo[6]),
//         priceHardCapMax: Number(itemInfo[7]),
//         lastSalePrice: Number(itemInfo[8]),
//         lastSaleTime: Number(itemInfo[9]),
//       };
//     });

//     return itemData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export interface Item {
  name: string;
  id: number;
  sid: number;
  minEnhance: number;
  maxEnhance: number;
  basePrice: number;
  currentStock: number;
  totalTrades: number;
  priceMin: number;
  priceMax: number;
  lastSoldPrice: number;
  lastSoldTime: number;
}

export type ItemData = { [key: number]: Item };

const fetchMarketData = async (itemId: number) => {
  if (itemId === undefined) {
    console.error("main key is undefined");
    return;
  }

  const reqOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.arsha.io/v2/jp/GetWorldMarketSubList?id=${itemId}&lang=jp`,
      reqOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export { fetchMarketData };

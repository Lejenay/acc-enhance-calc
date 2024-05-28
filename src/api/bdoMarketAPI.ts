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

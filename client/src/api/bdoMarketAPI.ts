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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { fetchMarketData };

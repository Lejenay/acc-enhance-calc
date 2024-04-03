import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.post("/api/market", async (req, res) => {
  const { mainKey } = req.body;

  try {
    const response = await fetch(
      "https://trade.jp.playblackdesert.com/Trademarket/GetWorldMarketSubList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "BlackDesert",
        },
        body: JSON.stringify({
          keyType: 0,
          mainKey,
        }),
      }
    );
    const data = await response.json();

    // 🌟 cache clear
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

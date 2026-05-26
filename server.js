import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.resolve("verify-events.json");

/*
  CONFIG:
  - FRONTEND_ORIGIN: domain GitHub Pages của anh.
    Ví dụ: https://USERNAME.github.io
  - VALID_TOKENS: danh sách token hợp lệ demo.
*/
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";
const VALID_TOKENS = (process.env.VALID_TOKENS || "abc123,demo-token").split(",");

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

async function readEvents() {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeEvents(events) {
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), "utf8");
}

function getIp(req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    ""
  );
}

app.get("/", (req, res) => {
  res.json({ ok: true, service: "verify-backend" });
});

app.post("/api/verify", async (req, res) => {
  const body = req.body || {};
  const token = body.token || "";
  const productId = body.productId || "";

  /*
    Demo rule:
    - token nằm trong VALID_TOKENS thì verified.
    - Thực tế nên check token/hash/signature trong database.
  */
  const verified = Boolean(productId) && VALID_TOKENS.includes(token);

  const event = {
    serverTime: new Date().toISOString(),
    verified,
    productId,
    token,
    productInfo: body.productInfo || {},
    visitorInfo: body.visitorInfo || {},
    ip: getIp(req),

    /*
      GeoIP:
      - Nếu deploy Cloudflare Worker/Pages Functions có thể lấy country/city từ request.cf.
      - Nếu deploy Render/Railway thì cần gọi MaxMind/IPinfo/ipapi ở backend.
    */
    geo: {
      country: req.headers["cf-ipcountry"] || "",
      city: ""
    }
  };

  const events = await readEvents();
  events.unshift(event);
  await writeEvents(events.slice(0, 5000));

  res.json({
    verified,
    message: verified ? "Verified successfully" : "Verification failed"
  });
});

app.get("/api/verify-events", async (req, res) => {
  /*
    Demo đang public.
    Thực tế phải thêm API key / login.
  */
  const events = await readEvents();
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`Verify backend running on port ${PORT}`);
});

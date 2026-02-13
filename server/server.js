import "dotenv/config";
import express from "express";
import cors from "cors";

import analyticsRoutes from "./src/routes/analytics.routes.js";
import githubRoutes from "./src/routes/github.routes.js";

import { pool } from "./src/db.js";

const app = express();
app.set("trust proxy", true);

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

// routes
app.use("/api/analytics", analyticsRoutes);
app.use("/api/github", githubRoutes);

// quick checks
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/dbcheck", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as ok");
    res.json({ ok: true, rows });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`✅ Portfolio API running at http://localhost:${port}`);
  console.log(`✅ Allowed origins: ${allowedOrigins.join(", ") || "(none set)"}`);
});

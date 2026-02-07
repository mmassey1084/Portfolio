import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get current totals
router.get("/stats", async (req, res) => {
  const [rows] = await pool.query("SELECT views, likes FROM analytics WHERE id = 1");
  const stats = rows?.[0] ?? { views: 0, likes: 0 };
  res.json(stats);
});

// Increment views by 1
router.post("/view", async (req, res) => {
  console.log("✅ /view hit");
  await pool.query("UPDATE analytics SET views = views + 1 WHERE id = 1");
  const [rows] = await pool.query("SELECT views, likes FROM analytics WHERE id = 1");
  res.json(rows[0]);
});
// Like/unlike (delta = +1 or -1)
router.post("/like", async (req, res) => {
  const delta = Number(req.body?.delta ?? 0);

  if (![1, -1].includes(delta)) {
    return res.status(400).json({ message: "delta must be 1 or -1" });
  }

  // Prevent negative likes
  await pool.query(
    "UPDATE analytics SET likes = GREATEST(likes + ?, 0) WHERE id = 1",
    [delta]
  );

  const [rows] = await pool.query("SELECT views, likes FROM analytics WHERE id = 1");
  res.json(rows[0]);
});

export default router;

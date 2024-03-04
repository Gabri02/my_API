const express = require("express");
const query = require("./db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await query("SELECT * FROM goals");
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const goal_id = req.params.id;
    const results = await query("SELECT * FROM goals WHERE id = ?", [goal_id]);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { goal_name } = req.body;

    if (!goal_name) {
      return res.status(400).json({ message: "Goal name is required" });
    }

    await query("INSERT INTO goals (goal_name) VALUES (?)", [goal_name]);
    res.status(201).json({ message: "Goal created successfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const goal_id = req.params.id;
    const { goal_name } = req.body;
    await query("UPDATE goals SET goal_name = ? WHERE id = ?", [
      goal_name,
      goal_id,
    ]);
    res.status(204).json({ message: "Goal updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const goal_id = req.params.id;
    const result = await query("DELETE FROM goals WHERE id = ?", [goal_id]);
    if (result.affectedRows > 0) {
      res.status(204).json({ message: "Goal deleted successfully" });
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

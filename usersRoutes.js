const express = require("express");
const query = require(".db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const results = await query("SELECT * FROM users WHERE id = ?", [userId]);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, first_name, last_name } = req.body;
    await query(
      "INSERT INTO users (email, first_name, last_name) VALUES (?, ?, ?)",
      [email, first_name, last_name]
    );
    res.status(201).send("User added successfully");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { email, first_name, last_name } = req.body;
    await query(
      "UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE id = ?",
      [email, first_name, last_name, userId]
    );
    res.status(200).send("User updated successfully");
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    let updateQuery = "UPDATE users SET ";
    updateValues = [];
    const { email, first_name, last_name } = req.body;

    if (email) {
      updateQuery += "email = ?, ";
      updateValues.push(email);
    }
    if (first_name) {
      updateQuery += "first_name = ?, ";
      updateValues.push(first_name);
    }
    if (last_name) {
      updateQuery += "last_name = ?, ";
      updateValues.push(last_name);
    }

    updateQuery = updateQuery.slice(0, -2);

    updateQuery += " WHERE id = ?";
    updateValues.push(userId);

    await query(updateQuery, updateValues);
    res.status(200).send("User updated successfully");
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    await query("DELETE FROM users WHERE id = ?", [userId]);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

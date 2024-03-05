const express = require("express");
const moment = require('moment');
const query = require("./dbModule");

const router = express.Router();

const getIntervalsWithGoals = async (queryString, queryParams) => {
  const intervals = await query(queryString, queryParams);

  const intervalMap = new Map();

  intervals.forEach((interval) => {
    const { interval_id, start_date, end_date, goal_id, goal_name, ...intervalInfo } = interval;

    if (!intervalMap.has(interval_id)) {
      intervalMap.set(interval_id, { ...intervalInfo, start_date: moment(start_date).format('YYYY-MM-DD'), end_date: moment(end_date).format('YYYY-MM-DD'), goals: [] });
    }

    if (goal_id) {
      intervalMap.get(interval_id).goals.push({ id: goal_id, name: goal_name });
    }
  });

  return Array.from(intervalMap.values());
};

router.get("/", async (req, res, next) => {
  try {
    let queryString = `
      SELECT intervals.id AS interval_id, intervals.start_date, intervals.end_date, users.id AS user_id, goals.id AS goal_id, goals.name AS goal_name
      FROM intervals
      INNER JOIN users ON intervals.user_id = users.id
      LEFT JOIN interval_goals ON intervals.id = interval_goals.interval_id
      LEFT JOIN goals ON interval_goals.goal_id = goals.id
      WHERE 1=1
    `;

    let values = [];

    if (req.query.start_date) {
      queryString += " AND intervals.start_date = ?";
      values.push(req.query.start_date);
    }
    if (req.query.end_date) {
      queryString += " AND intervals.end_date = ?";
      values.push(req.query.end_date);
    }
    if (req.query.user_id) {
      queryString += " AND users.id = ?";
      values.push(req.query.user_id);
    }
    if (req.query.goal_id) {
      queryString += " AND goals.id = ?";
      values.push(req.query.goal_id);
    }

    const intervalsWithGoals = await getIntervalsWithGoals(queryString, values);

    res.status(200).json(intervalsWithGoals);
  } catch (error) {
    next(error);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const intervalId = req.params.id;

    const queryString = `
      SELECT intervals.id AS interval_id, intervals._date, intervals.end_date, users.id AS user_id, goals.id AS goal_id, goals.name AS goal_name
      FROM intervals
      INNER JOIN users ON intervals.user_id = users.id
      LEFT JOIN interval_goals ON intervals.id = interval_goals.interval_id
      LEFT JOIN goals ON interval_goals.goal_id = goals.id
      WHERE intervals.id = ?;
    `;

    const intervalsWithGoals = await getIntervalsWithGoals(queryString, [
      intervalId,
    ]);

    if (intervalsWithGoals.length > 0) {
      res.status(200).json(intervalsWithGoals[0]);
    } else {
      res.status(404).json({ message: "Interval not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { start_date, end_date, user_id, goalsIds } = req.body;

    const insertIntervalQuery = `
      INSERT INTO intervals (start_date, end_date, user_id)
      VALUES (?, ?, ?);
    `;
    const result = await query(insertIntervalQuery, [start_date, end_date, user_id]);
    const intervalId = result.insertId;

    if (goalsIds && goalsIds.length > 0) {
      const insertIntervalGoalsQuery = `
        INSERT INTO interval_goals (interval_id, goal_id)
        VALUES (?, ?);
      `;
      for (const goalId of goalsIds) {
        await query(insertIntervalGoalsQuery, [intervalId, goalId]);
      }
    }

    res.status(201).json({ message: "Interval added successfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const intervalId = req.params.id;
    const { start_date, end_date, user_id } = req.body;
    await query(
      "UPDATE intervals SET start_date = ?, end_date = ?, user_id = ? WHERE id = ?",
      [start_date, end_date, user_id, intervalId]
    );
    res.status(200).json({ message: "Interval updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const intervalId = req.params.id;
    let updateQuery = "UPDATE intervals SET ";
    let updateValues = [];
    const { start_date, end_date, user_id } = req.body;

    if (start_date) {
      updateQuery += "start_date = ?, ";
      updateValues.push(start_date);
    }
    if (end_date) {
      updateQuery += "end_date = ?, ";
      updateValues.push(end_date);
    }
    if (user_id) {
      updateQuery += "user_Id = ?, ";
      updateValues.push(user_id);
    }

    if (!start_date && !end_date && !user_id) {
      throw new Error("At least one field must be provided for partial update");
    }

    updateQuery = updateQuery.slice(0, -2);

    updateQuery += " WHERE id = ?";
    updateValues.push(intervalId);

    await query(updateQuery, updateValues);
    res.status(200).json({ message: "Interval patched successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const intervalId = req.params.id;
    await query("DELETE FROM intervals WHERE id = ?", [intervalId]);
    res.status(204).json({ message: "Interval deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

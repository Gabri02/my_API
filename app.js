const express = require("express");
const userRoutes = require("./appModules/usersRoutes");
const goalsIntervalsRoutes = require("./appModules/intervalsRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/intervals", goalsIntervalsRoutes);

app.get("/", async (req, res) => {
  res.send("Welcome!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server online on ${port} port`);
});

import express from "express";
import routes from "./routes/routes";
import helmet from "helmet";

const app = express();
const port = 3000;

app.use(helmet());

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.status(200);
  res.json("Server working!");
});

app.listen(port, () => {
  console.log(`Basic HTTP server live on port ${port}`);
});

export default app;

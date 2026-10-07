import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5050;
const app = express();
var corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200
};

app.use(express.json()); // auto parse
app.use(cors());

var count = 0

app.get("/", (req, res) => {
  count += 1
  res.send(`Hello, world! ${count}`);
})

app.get("/ping", (req, res) => {
  console.log("Ping pong~");
  res.send("Pong!");
})

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).send("a and b must be numbers");
  }
  res.send(a+b)
});


app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

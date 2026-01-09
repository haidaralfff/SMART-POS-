import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express berhasil jalan 🚀");
});

app.listen(3001, () => {
  console.log("Server running di http://localhost:3001");
});

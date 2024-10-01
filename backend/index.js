import express from "express";
import cors from "cors"

import userRoutes from "./routes/users.js";

const app = express();
const port = 3000;

app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Succesfuly listening on port ${port}`);
})
import express from "express";
import cors from "cors";
import videos from "./routes/videos.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/videos", videos);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

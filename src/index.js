import dotenv from "dotenv";
import { app } from "./server.js";
dotenv.config();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
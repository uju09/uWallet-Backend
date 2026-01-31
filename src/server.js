import express from "express";
import walletRoute from "./routes/wallet.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from your frontend origin
}));
app.use("/api/wallet", walletRoute);

export { app };

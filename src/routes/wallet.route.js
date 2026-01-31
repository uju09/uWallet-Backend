import { Router } from "express";
import { generateWallet } from "../controllers/wallet.controller.js";

const router = Router();

router.post("/generate", generateWallet);

export default router;
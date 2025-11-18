import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./shared/middleware/errorHandler";
import { AuthController } from "./modules/auth/presentation/AuthController";
import { authenticate } from "./shared/middleware/authMiddleware";
import { ChatController } from "./modules/chat/presentation/ChatController";
import { SubscriptionRepository } from "./modules/subscriptions/infrastructure/SubscriptionRepository";

dotenv.config();
const app = express();
app.use(express.json());

const authController = new AuthController();
const chatController = new ChatController();
const subscriptionRepo = new SubscriptionRepository();

// user auth routes
app.post("/api/auth/signup", (req, res) => authController.signup(req, res));
app.post("/api/auth/login", (req, res) => authController.login(req, res));
app.get("/api/auth/me", authenticate, (req, res) => authController.me(req, res));

// Chat
app.post("/api/chat/message", authenticate, (req, res) => chatController.ask(req, res));

// Subscriptions
app.post("/api/subscriptions", authenticate, async (req, res) => {
  const user = (req as any).user;
  const { tier, billingCycle } = req.body;
  const subscription = await subscriptionRepo.create(user.id, tier, billingCycle);
  res.json({ success: true, data: subscription });
});

const PORT = process.env.PORT || 3000;
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

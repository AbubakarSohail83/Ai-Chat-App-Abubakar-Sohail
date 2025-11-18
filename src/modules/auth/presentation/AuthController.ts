import { Request, Response } from "express";
import { UserRepository } from "../infrastructure/UserRepository";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const userRepo = new UserRepository();

export class AuthController {
  async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new AppError("Email already registered", 400);

    const user = await userRepo.create(email, password, name);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ success: true, data: { user, token } });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userRepo.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 401);

    const valid = await userRepo.validatePassword(user.password, password);
    if (!valid) throw new AppError("Invalid credentials", 401);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ success: true, data: { user, token } });
  }

  async me(req: Request, res: Response) {
    const user = (req as any).user;
    return res.json({ success: true, data: user });
  }
}

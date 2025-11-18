import { Request, Response } from "express";
import { ChatRepository } from "../infrastructure/ChatRepository";
import { AppError } from "../../../shared/errors/AppError";

const chatRepo = new ChatRepository();

export class ChatController {
  async ask(req: Request, res: Response) {
    const user = (req as any).user;
    const { question } = req.body;

    // Mocked OPen AI ResponSe
    const answer = `This is a mocked answer for: ${question}`;
    const tokens = Math.floor(Math.random() * 50) + 1;

    const today = new Date();
    const usage = await chatRepo.getMonthlyUsage(
      user.id,
      today.getMonth() + 1,
      today.getFullYear()
    );
    if (usage.messagesUsed >= 3) throw new AppError("Free quota exceeded. Please subscribe.", 403);

    await chatRepo.incrementUsage(usage.id);
    await chatRepo.create(user.id, question, answer, tokens);
    await new Promise((res) => setTimeout(res, 1000));

    return res.json({ success: true, data: { question, answer, tokens } });
  }
}

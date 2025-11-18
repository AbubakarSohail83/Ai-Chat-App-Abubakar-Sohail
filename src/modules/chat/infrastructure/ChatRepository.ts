import prisma from "../../../shared/prisma";

export class ChatRepository {
  async create(userId: string, question: string, answer: string, tokens: number) {
    return prisma.chatMessage.create({
      data: { userId, question, answer, tokens },
    });
  }

  async getMonthlyUsage(userId: string, month: number, year: number) {
    let usage = await prisma.monthlyUsage.findFirst({ where: { userId, month, year } });
    if (!usage) {
      usage = await prisma.monthlyUsage.create({ data: { userId, month, year } });
    }
    return usage;
  }

  async incrementUsage(id: string) {
    return prisma.monthlyUsage.update({ where: { id }, data: { messagesUsed: { increment: 1 } } });
  }
}

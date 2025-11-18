import prisma from "../../../shared/prisma";
import { Tier } from "@prisma/client";

export class SubscriptionRepository {
  async create(userId: string, tier: Tier, billingCycle: "MONTHLY" | "YEARLY") {
    const maxMessages = tier === "BASIC" ? 10 : tier === "PRO" ? 100 : 9999999;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + (billingCycle === "MONTHLY" ? 1 : 12));
    return prisma.subscription.create({
      data: { userId, tier, billingCycle, maxMessages, startDate, endDate, renewalDate: endDate }
    });
  }

  async findActiveByUser(userId: string) {
    return prisma.subscription.findMany({ where: { userId, active: true } });
  }
}
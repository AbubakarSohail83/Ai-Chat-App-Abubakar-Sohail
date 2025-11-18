import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { AppError } from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "very secret";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if(!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");
  try {
    const payload: any = jwt.verify(token, JWT_SECRET); //have to use use any bcs jwt.verify returns any
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new AppError("User not found", 404);
    (req as any).user = user;
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

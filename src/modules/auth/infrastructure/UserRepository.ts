import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

export class UserRepository {
  async create(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { email, password: hashedPassword, name } });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async validatePassword(userPassword: string, inputPassword: string) {
    return bcrypt.compare(inputPassword, userPassword);
  }
}

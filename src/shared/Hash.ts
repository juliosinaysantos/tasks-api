import bcrypt from 'bcrypt';

export class Hash {
  public static async generatePasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public static async comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}

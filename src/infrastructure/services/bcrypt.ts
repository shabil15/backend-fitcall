import bcrypt from 'bcryptjs';
import IHashpassword from '../../useCase/interface/services/IHashpassword';

class Encrypt implements IHashpassword {
       async createHash(password: string): Promise<string> {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password,salt);
      return hashedPassword;
  }

   async compare(password: string, hashpassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password,hashpassword);
    return match;     
  }
}

export default Encrypt;
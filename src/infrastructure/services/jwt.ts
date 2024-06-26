import jwt from 'jsonwebtoken';
import Ijwt  from '../../useCase/interface/services/IJwt';
import ErrorResponse from '../../useCase/handler/errorResponse';

class JwtPassword implements Ijwt {
  createJWT(userId: string, email: string, role: string, name: string): string {
      const jwtKey = process.env.JWT_KEY;
      if(jwtKey) {
        const token :string = jwt.sign(
          {id:userId,email:email,role:role,name:name},
          jwtKey
        )
        return token;
      }
      throw new Error('JWT_KEY is not defined');
  }
}

export default JwtPassword;
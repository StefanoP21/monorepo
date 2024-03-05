import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { User } from '../schemas/user.schema';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

export interface ExpressRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, res: Request, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verify(token, 'JWT_SECRET') as { email: string };
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}

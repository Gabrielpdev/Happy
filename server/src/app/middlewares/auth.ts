import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  userId: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provied' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(verify)(token, authConfig.jwt.secret);

    const { userId } = decoded as ITokenPayload;

    request.user.id = userId;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};

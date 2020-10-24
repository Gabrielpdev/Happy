import { Request, Response } from 'express';
import { isAfter, addHours } from 'date-fns';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import userView from '../views/UsersView';
import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const { password, token } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { password_token: token },
    });

    if (!user) {
      return response
        .status(400)
        .json({ message: 'User token does not exists' });
    }

    const tokenCreatedAt = user.password_token_expiration;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(new Date(), compareDate)) {
      return response.status(400).json({ message: 'Token expired' });
    }

    user.password = await hash(password, 8);

    return response.status(201).json({ user: userView.render(user), token });
  },
};

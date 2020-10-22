import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import userView from '../views/UsersView';
import User from '../models/User';
import authConfig from '../../config/authConfig';

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(
      { email, password },
      {
        abortEarly: false,
      },
    );

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(403).json({ message: 'User not found' });
    }

    if (!(await compare(password, user.password))) {
      return response.status(401).json({ error: 'Password does not correct' });
    }

    const token = sign({ userId: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return response.status(201).json({ user: userView.render(user), token });
  },
};

import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { hash } from 'bcryptjs';
import userView from '../views/UsersView';
import User from '../models/User';

export default {
  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(userView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User);

    const passwordHash = await hash(password, 8);

    const data = {
      id: v4(),
      name,
      email,
      password: passwordHash,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const checkEmail = await userRepository.findOne({ where: { email } });

    if (checkEmail) {
      return response.status(403).json({ message: 'Email already exists' });
    }

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(userView.render(user));
  },
};
